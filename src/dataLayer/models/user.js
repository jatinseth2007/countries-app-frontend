import {
    gql
} from "@apollo/client";

export const SIGNUP_USER = gql`
    mutation Signup($name: String!, $email: String!, $password: String!) {
        Signup(name: $name, email: $email, password: $password){
            message,
            success,
            user {
                name,
                email
            }
        }
    }
`;

export const LOGIN_USER = gql`
    mutation Login($email: String!, $password: String!) {
        Login(email: $email, password: $password){
            token,
            refreshToken,
            success,
            message,
            user {
                name,
                email
            }
        }
    }
`;