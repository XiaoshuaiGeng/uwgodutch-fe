import React from "react";
import ReactDOM from 'react-dom';
import { fireEvent, render, screen } from "@testing-library/react";
import { unmountComponentAtNode } from "react-dom";
import SignupLayout from "../pages/signup";
import userEvent from "@testing-library/user-event";


// pay attention to write it at the top level of your file
const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
   ...jest.requireActual('react-router-dom'),useNavigate: () => mockedUsedNavigate,
}));


let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  
  container = document.createElement("div");
  document.body.appendChild(container);
  
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

describe('SignUp Component Testing', () => {
  it('Render Login Layout', ()=>{
    const {getByText} =  render(<SignupLayout/>, container)
    // console.log(getByText)

    // const emailInputField = screen.("Email Address")
    const passwordInputField = screen.getByTestId('password')
    const emailInputField = screen.getByTestId('email')

    // expect(emailInputField).toBeInTheDocument()
    expect(passwordInputField).toBeInTheDocument()
    expect(emailInputField).toBeInTheDocument()
  })

  it('Test Handle Submit Func when form submitted', ()=>{
    
    // const LoginForm = 
    render(<LoginLayout/>)

    const form = screen.getByTestId('login-form')
    const loginBtn = screen.getByTestId('login-btn')
    const handleSubmit = jest.spyOn(form, 'handleSubmit')
    const passwordInputField = screen.getByTestId('password')
    const emailInputField = screen.getByTestId('email')

    // jest.mock('LoginLayout', () => ({
    //   ...jest.requireActual('LoginLayout'),
    //   handleSubmit: jest.fn(),

    //  }));

    userEvent.type(emailInputField, "xiaoshuaigeng@gmail.com")
    userEvent.type(passwordInputField, "123456")
    userEvent.click(loginBtn)
    // fireEvent.submit(form)
    expect(handleSubmit).toBeCalled()


  })
})