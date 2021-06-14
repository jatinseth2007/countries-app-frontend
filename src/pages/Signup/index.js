import './index.css';
import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { SIGNUP_USER } from '../../dataLayer/models/user';
import { Container, Button, Typography, Grid, TextField, Box } from '@material-ui/core';
import {
    Link
} from "react-router-dom";

export const Signup = () => {
    const defaultErrorMessage = `we are facing error while register, please try again later.`;
    const defaultSuccessMessage = `User has been registered successfully.`;
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [success, setSuccess] = useState(false);
    const [signUpUser, { loading }] = useMutation(SIGNUP_USER, {
        onCompleted: ({ Signup: { message, success: successResponse } }) => {
            try {
                // check if success is true...
                if (!successResponse) throw "error";
                // otherwise set success mesaage..
                setSuccess(true);
                setErrorMessage(``);
            } catch (error) {
                console.error(error);
                setErrorMessage(defaultErrorMessage);
            }
        },
        onError: (error) => {
            const message = (error?.message) ? error.message : defaultErrorMessage;
            setErrorMessage(message);
            setSuccess(false);
        }
    });

    const signupSubmitHandler = (e) => {
        e.preventDefault();
        // call the signup method...
        signUpUser({
            variables: {
                name,
                email,
                password
            }
        });
    }

    console.log(loading);

    return (
        <Container component="main" maxWidth="xs">
            <div className="signup">
                <div className="signup-form-container">
                    <Typography component="h1" variant="h5" className="mb-1">
                        Sign up
                    </Typography>
                    <form className={``} onSubmit={signupSubmitHandler}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="name"
                                    label="Name"
                                    name="name"
                                    autoComplete="name"
                                    value={name}
                                    onChange={(e) => {
                                        setName(e.target.value);
                                    }}
                                />
                            </Grid>
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
                        {
                            (success) && (<Box component="span" className="fs-m success">{defaultSuccessMessage}</Box>)
                        }
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className="mt-1"
                            disabled={loading}
                        >
                            Sign Up
                        </Button>
                        <Grid container justify="flex-end" className="mt-1">
                            <Grid item>
                                <Link to="/login" variant="body2">
                                    Already have an account? Sign in
                                </Link>
                            </Grid>
                        </Grid>
                    </form>
                </div>
            </div>
        </Container >
    );
};