import React from "react";
import ReactDOM from 'react-dom';
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { unmountComponentAtNode } from "react-dom";
import LoginLayout from "../pages/login"
import userEvent from "@testing-library/user-event";


// pay attention to write it at the top level of your file
const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
   ...jest.requireActual('react-router-dom'),useNavigate: () => mockedUsedNavigate,
}));


let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  // fetch.
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

describe('Login Component Testing', () => {
  it('Render Login Layout', ()=>{
    const {getByText} =  render(<LoginLayout/>, container)
    // console.log(getByText)

    // const emailInputField = screen.("Email Address")
    const passwordInputField = screen.getByTestId('password')
    const emailInputField = screen.getByTestId('email')
    const submitBtn = screen.getByTestId('login-btn')
    // expect(emailInputField).toBeInTheDocument()
    expect(passwordInputField).toBeInTheDocument()
    expect(emailInputField).toBeInTheDocument()
    expect(submitBtn).toBeInTheDocument()
  })

  test('submits login form with correct data', async () => {
    // const fakeUser = { email: 'test@example.com', password: 'testpassword' };
    const mockFetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ code: 1, data: { name: 'John' } }),
      })
      );
    global.fetch = mockFetch;
    
    render(<LoginLayout />);
    const emailInput = screen.getByTestId('email');
    const passwordInput = screen.getByTestId('password');
    const submitBtn = screen.getByTestId('login-btn');
      userEvent.type(emailInput, "xiaoshuaigeng@gmail.com")
      userEvent.type(passwordInput, "123456")
    // fireEvent.change(emailInput, { target: { value: fakeUser.email } });
    // fireEvent.change(passwordInput, { target: { value: fakeUser.password } });
    fireEvent.click(submitBtn);
    
    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledWith(expect.anything(), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        mode: 'cors',
        body: JSON.stringify({
          email: "xiaoshuaigeng@gmail.com",
          encrypted_password: expect.anything(),
        }),
      });
      expect(screen.getByText(/login successfully/i)).toBeInTheDocument();
    });
  });
  // it('Test Handle Submit Func when form submitted', ()=>{
    
  //   // const LoginForm = 
  //   render(<LoginLayout/>)
  //   jest.mock(handleSubmit, () => jest.fn())
  //   // const handleSubmit = jest.spyOn(LoginLayout.prototype, 'handleSubmit')
  //   // jest.mock('LoginLayout)
  //   const form = screen.getByTestId('login-form')
  //   console.log(form)
  //   const loginBtn = screen.getByTestId('login-btn')
  //   const passwordInputField = screen.getByTestId('password')
  //   const emailInputField = screen.getByTestId('email')

  //   // jest.mock('LoginLayout', () => ({
  //   //   ...jest.requireActual('LoginLayout'),
  //   //   handleSubmit: jest.fn(),

  //   //  }));

  //   userEvent.type(emailInputField, "xiaoshuaigeng@gmail.com")
  //   userEvent.type(passwordInputField, "123456")
  //   userEvent.click(loginBtn)
  //   // fireEvent.submit(form)
  //   expect(handleSubmit).toHaveBeenCalledTimes(1)


  // })
})