import './index.css';
import { AppBar, Toolbar, Typography, Button } from '@material-ui/core';
import {
    useHistory
} from "react-router-dom";

export const Header = () => {
    const history = useHistory();
    const logoutHandler = () => {
        //first clear localstorage...
        localStorage.clear();
        // redirect the user to login page...
        history.push("/");
    }
    const loggedInUser = JSON.parse(localStorage.getItem("user"));

    return (
        <AppBar position="static">
            <Toolbar variant="dense" className="header">
                <Typography variant="h6" className="test">
                    {loggedInUser.name}
                </Typography>
                <Button color="inherit" onClick={logoutHandler}>Logout</Button>
            </Toolbar>
        </AppBar>
    );
}