import { useSelector } from "react-redux";
// import UserRegister from "../components/create-user/CreateUser"
import RegisterForm from '../components/RegisterForm/RegisterForm';

const UserRegisterScreen = (props) => {

    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;

    if (userInfo) props.history.push('/')

    return (
        <div className="centered-container">
            <div className="component-container">
                <h1>Create an account</h1>
                <RegisterForm />
            </div>
        </div>
    )
}

export default UserRegisterScreen;