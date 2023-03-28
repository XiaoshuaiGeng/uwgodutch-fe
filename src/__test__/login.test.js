import React from "react";
import ReactDOM from 'react-dom';
import { fireEvent, render, screen } from "@testing-library/react";
import { unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import LoginLayout, {handleSubmit} from "../pages/login"
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

describe('Login Component Testing', () => {
  it('Render Login Layout', ()=>{
    const {getByText} =  render(<LoginLayout/>, container)
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
    const handleSubmit = jest.spyOn(form, 'submit')
    const passwordInputField = screen.getByTestId('password')
    const emailInputField = screen.getByTestId('email')


    userEvent.type(emailInputField, "xiaoshuaigeng@gmail.com")
    userEvent.type(passwordInputField, "123456")
    userEvent.click(loginBtn)
    expect(handleSubmit).toBeCalled()


  })
})