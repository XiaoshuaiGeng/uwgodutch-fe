import * as React from 'react';
import { 
    Avatar,
    Button,
    CssBaseline,
    TextField,
    FormControlLabel,
    Checkbox,
    Link,
    Paper,
    Box,
    Grid,
} from '@mui/material';

import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import {useState} from "react";
import {useNavigate} from "react-router-dom";
import md5 from 'js-md5'
import {blue} from "@mui/material/colors";


function Copyright(props) {
    let newDate = new Date()
    let date = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="/">
                UWGoduth.com
            </Link>{' '}
            {/*{new Date().getFullYear()}*/}
            {year}-{month<10?`0${month}`:`${month}`}-{date}
            {/*{new Date().getDate()}*/}
            {'.'}
        </Typography>
    );
}
// const persistConfig = {
//     key: 'root',
//     storage,
// };

// const persistedReducer = persistReducer(persistConfig, rootReducer);
//
// export const store = createStore(persistedReducer);
// export const persistor = persistStore(store);
const theme = createTheme();

export default function LoginLayout() {
    const responseGoogle = (response) => {
        console.log(response);
    }
    const[cell,setCell]=useState('')
    const[email,setEmail]=useState('')
    const[password,setPassword]=useState('')
    const[id,setId]=useState('')
    const[user, setUser]=useState('')
    const nav = useNavigate();
    const navto = (use_id,token) => {
        nav('/userlayout',{state:{name: {use_id}, tok:{token}}});

    }
    const handleSubmit = (e) => {
        e.preventDefault();
        const encrypted_password = md5(password);
        const user={email,encrypted_password}

        fetch("/login",{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            mode: 'cors',
            body:JSON.stringify(user)

        }).then(res=>res.json())
            .then((res)=>{
                if (res.code===1) {
                    alert("login successfully")

                    let result = res;
                    let arr = []
                    arr.push(result.data)
                    console.log(result)
                    console.log(result.data.name)
                    nav('/userLayout',{state:{mail: email}})
                }
                    // navto(res.data,res.accessToken)}
                // else if(res.code===0){
                //
                //     alert("User not found with the given email/phone")
                // }
                else if (res.code===0){
                    alert("Invalid credentials")
                }
            })

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
                            logIn
                        </Typography>
                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>

                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                autoFocus
                                value={email}
                                onChange={(e)=>setEmail(e.target.value)}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                value={password}
                                onChange={(e)=>setPassword(e.target.value)}
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
                                LogIn
                            </Button>
                            <Grid container>
                                <Grid item xs>
                                    <Link href="/" variant="body2">
                                        Forgot password?
                                    </Link>
                                </Grid>
                                <Grid item>
                                    <Link href="/signup" variant="body2">
                                        {"Don't have an account? Sign Up"}
                                    </Link>
                                </Grid>
                            </Grid>

                        </Box>
                        <Copyright sx={{ mt: 5 }} />
                    </Box>

                </Grid>
            </Grid>
        </ThemeProvider>
    );
}