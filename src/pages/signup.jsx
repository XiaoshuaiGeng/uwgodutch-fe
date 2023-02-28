import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import md5 from 'js-md5'

import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {useCallback,useMemo} from 'react'

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="/">
                UWGodutch
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const theme = createTheme();

export default function SignupLayout() {
    const[name,setName]=useState('')
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordErrorText, setPasswordErrorText] = React.useState("");
    const[password,setPassword]=useState('')
    const[email,setEmail]=useState('')
    const[cell,setCell]=useState('')
    const [nameerror, setnameError] = useState("");
    const [nameCheckError, setnameCheckError] = useState("");
    const [passerror, setpassError] = useState("");
    const [mailerror, setmailError] = useState("");
    const [cellerror, setcellError] = useState("");
    const[user, setUser]=useState('')
    const nav = useNavigate();
    const autocheckPasswords = () => {
        if (password !== confirmPassword) {

            setPasswordErrorText("Passwords do not match");

        } else {
            setPasswordErrorText("");
        }
    }

    const passerror1 = useMemo(() => {

        if (password) {
            
            setpassError("")
        };
    }, [password]);
    const automatch= useMemo(() => {

        autocheckPasswords()

    }, [confirmPassword]);



    const checkEmail = (e) => {

        fetch(`${process.env.REACT_APP_HOSTNAME}/checkmail`,{

            method:"POST",
            mode: 'cors',
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({email})

        }).then(res=>res.json())
            .then((res)=>{
                if(res.code===0){
                    setmailError("Email not Avaliable");

                }
                else{
                    setmailError("");
                }
            })

    }
    const checkPasswords = (event) => {
        if (password !== confirmPassword) {

            setPasswordErrorText("Passwords do not match");
            event.preventDefault();
        } else {
            setPasswordErrorText("");
        }
    }

    // const checkUsername = (event) => {
    //     fetch("/users/isUsername",{
    //         method:"POST",
    //         headers:{"Content-Type":"application/json"},
    //         body:JSON.stringify(name)
    //
    //     }).then(res=>res.json())
    //         .then((res)=>{
    //         if(!res.success){
    //             setnameCheckError("not avaliable")
    //             event.preventDefault();
    //         }
    //         else{
    //             setnameCheckError("avaliable")
    //         }
    //     })
    // }
    // const checkUsername = (event) => {
    //     setnameCheckError("not avaliable")
    // }

    const handleSubmit = (e) => {
        checkPasswords(e)
        e.preventDefault();
        if (!email) {
            setmailError("Please enter email");

        } else {
            setmailError("");
        }
        if (!password) {
            setpassError("Please enter password")
        } else {
            setpassError("");
        }
        if (!name) {
            setnameError("Please enter name");
        } else {
            setnameError("");
        }
        if (!cell) {
            setcellError("Please enter cell");
        } else {
            setcellError("");
        }
        if (cell&&name&&email&&password){
            const encrypted_password = md5(password);
            const user={name,cell,email,encrypted_password}

            console.log(user)
            fetch(`${process.env.REACT_APP_HOSTNAME}/register`,{
                method:"POST",
                mode: 'cors',
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify(user)

            }).then(res=>res.json())
                .then((res)=>{
                    if (res.code===1){alert("register successfully");

                        nav('/')}
                    else {
                        alert("email exists")
                    }

                })}


    }


    return (
        <ThemeProvider theme={theme}>
            <Grid container component="main" sx={{ height: '100vh' }}>
                <CssBaseline />
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    sx={{
                        backgroundImage: 'url(/uwcampus.jpg)',
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: (t) =>
                            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <Box
                        sx={{
                            my: 8,
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign Up
                        </Typography>
                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                            <TextField
                                margin="normal"

                                fullWidth
                                id="Name"
                                label="Name"
                                name="Name"
                                autoComplete="name"
                                required={true}
                                value={name}
                                autoFocus={true}

                                onChange={(e)=>{setName(e.target.value)}}
                                error={nameerror}
                                helperText={nameerror}
                            />
                            {/*<div style={{ color: "red" }}> <Button*/}
                            {/*    halfWidth*/}
                            {/*    variant="contained"*/}
                            {/*    sx={{ mt: 1, mb: 0 }}*/}
                            {/*    onClick={(e)=>checkUsername(e)}*/}
                            {/*>*/}
                            {/*    Check name availability:  {nameCheckError}*/}
                            {/*</Button></div>*/}
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e)=>setPassword(e.target.value)}
                                error={passerror}
                                helperText={passerror}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="Confirm-Password"
                                label="Confirm-Password"
                                type="Password"
                                id="Confirm-Password"
                                value={confirmPassword}
                                onChange={(e)=>setConfirmPassword(e.target.value)}
                                error={passwordErrorText}
                                helperText={passwordErrorText}

                            />

                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="Email-Address"
                                label="Email-Address"
                                type="Email-Address"
                                id="Email-Address"
                                autoComplete="email"
                                value={email}
                                onChange={(e)=>setEmail(e.target.value)}
                                error={mailerror}
                                helperText={mailerror}
                                onBlur={(e)=>checkEmail(e)}

                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="Cell"
                                label="Cell"
                                type="Cell"
                                id="Cell"
                                autoComplete="tel"
                                value={cell}
                                onChange={(e)=>setCell(e.target.value)}
                                error={cellerror}
                                helperText={cellerror}
                            />
                            <FormControlLabel
                                control={<Checkbox value="remember" color="primary" />}
                                label="Remember me"
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Sign Up
                            </Button>
                            <Grid container>
                                <Grid item xs>
                                    <Link href="/" variant="body2">
                                        Forgot password?
                                    </Link>
                                </Grid>
                                <Grid item >
                                    <Link href="/" variant="body2">
                                        Already Have an Account?
                                    </Link>
                                </Grid>
                            </Grid>
                            <Copyright sx={{ mt: 5 }} />
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}