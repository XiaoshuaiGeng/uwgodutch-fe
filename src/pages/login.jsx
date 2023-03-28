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
    Typography
} from '@mui/material';

import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
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
    // const responseGoogle = (response) => {
    //     // console.log(response);
    // }
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

        fetch(`${process.env.REACT_APP_HOSTNAME}/login`,{
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
                    // console.log(result)
                    // console.log(result.data.name)
                    nav('/userLayout',{state:{mail: email, name: result.data.name}})
                }
                else if (res.code===0){
                    alert("Invalid credentials")
                }
            })

    }

    // write code to 
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
                        <Box data-testid="login-form" component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>

                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                data-testid="email"
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
                                data-testid="password"
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
                                name="login"
                                type="submit"
                                data-testid="login-btn"
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