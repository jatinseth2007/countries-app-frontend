import './index.css';
import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../../dataLayer/models/user';
import { Container, Button, Typography, Grid, TextField, Box } from '@material-ui/core';
import {
    Link, useHistory
} from "react-router-dom";

export const Login = () => {
    const defaultErrorMessage = `we are facing error while login, please try again later.`;
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const history = useHistory();
    const [loginUser, { loading }] = useMutation(LOGIN_USER, {
        onCompleted: ({ Login: { token, refreshToken, user, success } }) => {
            try {
                // check if success is true...
                if (!success) throw "error";
                // otherwise set success mesaage..
                setErrorMessage(``);
                // add user details in global state...
                localStorage.setItem("user", JSON.stringify(user));
                // add token to local storage...
                localStorage.setItem("csrfToken", token);
                // redirect the page to main page...
                history.push("/homepage");
            } catch (error) {
                console.error(error);
                setErrorMessage(defaultErrorMessage);
            }
        },
        onError: (error) => {
            const message = (error?.message) ? error.message : defaultErrorMessage;
            setErrorMessage(message);
        }
    });

    const loginSubmitHandler = (e) => {
        e.preventDefault();
        // call the signup method...
        loginUser({
            variables: {
                email,
                password
            }
        });
    }

    console.log(loading);

    return (
        <Container component="main" maxWidth="xs">
            <div className="login">
                <div className="login-form-container">
                    <Typography component="h1" variant="h5" className="mb-1">
                        Login
                    </Typography>
                    <form className={``} onSubmit={loginSubmitHandler}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => {
                                        setEmail(e.target.value);
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="current-password"
                                    value={password}
                                    onChange={(e) => {
                                        setPassword(e.target.value);
                                    }}
                                />
                            </Grid>
                        </Grid>
                        {
                            (errorMessage.length > 0) && (<Box component="span" className="fs-m error">{errorMessage}</Box>)
                        }
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className="mt-1"
                            disabled={loading}
                        >
                            LOG IN
                        </Button>
                        <Grid container justify="flex-end" className="mt-1">
                            <Grid item>
                                <Link to="/register" variant="body2">
                                    don't have an account? Sign up
                                </Link>
                            </Grid>
                        </Grid>
                    </form>
                </div>
            </div>
        </Container >
    );
};