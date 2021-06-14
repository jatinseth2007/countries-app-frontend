import { Home } from './pages/Home';
import { Signup } from './pages/Signup';
import { Login } from './pages/Login';
import { Container } from '@material-ui/core';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import { ProtectedRoute } from './components/common/ProtectedRoute';

const App = () => {
    return (
        <Container maxWidth="md" className="app-container">
            <Router>
                <Switch>
                    <ProtectedRoute path="/homepage">
                        <Home />
                    </ProtectedRoute>
                    <Route path="/register">
                        <Signup />
                    </Route>
                    <Route path="/">
                        <Login />
                    </Route>
                </Switch>
            </Router>
        </Container>
    );
}

export default App;
