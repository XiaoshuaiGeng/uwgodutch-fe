
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import Container from '@mui/material/Container';

import Header from '../components/Header.js';
import Body from '../components/Body.js';
import { useState, createContext, useContext,useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {useLocation} from "react-router-dom";

export const UserContext = createContext();
export default function MainLayer() {

    const nav = useNavigate()
    const location = useLocation();
    const [usermail,setumail]=useState('');
    useEffect(()=>{
        if (location.state == null){
            alert("unauthorized visit")
            nav('/')
        }
        else{setumail(location.state.mail);
        }},[])

    return   (
        <UserContext.Provider value={usermail}>
        <Container maxWidth="false">

            <Header/>
            {/* <DynamicRow/> */}
            <Body/>

        </Container>
        </UserContext.Provider>
    );
}