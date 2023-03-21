import React from "react";
import ReactDOM from 'react-dom';
import { render } from "@testing-library/react";
import { unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import LoginLayout from "../pages/login"


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
  })

})