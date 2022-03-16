import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";

// Screens
import DashboardScreen from "./screens/DashboardScreen";
import UserEditScreen from "./screens/UserEditScreen";
import LoginScreen from "./screens/LoginScreen";
import Header from "./components/header/Header";
import RegisterUserScreen from "./screens/CreateUserScreen";
import ProfileScreen from "./screens/ProfileScreen";
import LandingPageScreen from "./screens/LandingPageScreen";
import Container from "./components/container/Container";
import ForgotPasswordScreen from "./screens/ForgotPasswordScreen";
import ResetPasswordScreen from "./screens/ResetPasswordScreen";
import PlantScreen from "./screens/PlantScreen";
import CreatePlantScreen from "./screens/CreatePlantScreen";
import Footer from "./components/footer/Footer";
import PlantEditScreen from "./screens/PlantEditScreen";

function App() {

    return (
        <Router>
            <Header />
            <Container>
                <Switch>
                    <Route exact path="/" component={LandingPageScreen} />
                    <Route path="/dashboard" component={DashboardScreen} />
                    <Route path="/users/edit/:id" component={UserEditScreen} />
                    <Route path="/login" component={LoginScreen} />
                    <Route path="/register" component={RegisterUserScreen} />
                    <Route path="/profile/:id" component={ProfileScreen} />
                    <Route path="/forgot" component={ForgotPasswordScreen} />
                    <Route path="/reset/:id" component={ResetPasswordScreen} />
                    <Route path="/plants/create" component={CreatePlantScreen} />
                    <Route path="/plants/edit/:id" component={PlantEditScreen} />
                    <Route path="/plants/:id" component={PlantScreen} />
                </Switch>
            </Container>
            <Footer />
        </Router>
    );
}

export default App;
