import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/actions/userActions";
import { Link } from "react-router-dom";
import Loading from "../components/loading/Loading";
import MessageBox from "../components/message-box/MessageBox";
import TextInput from "../components/text-input/TextInput";
import Button from "../components/button/Button";
import LoginForm from "../components/LoginForm/LoginForm";
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import '../components/LoginForm/LoginForm.css';
import TextField from "../components/TextField/TextField";
import PasswordField from "../components/TextField/PasswordField";

const LoginScreen = (props) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // const redirect = props.location.search ? props.location.search.split('=')[1] : '/';

    const userLogin = useSelector(state => state.userLogin);
    const { loading, error, userInfo } = userLogin;

    // console.log(userInfo)

    const dispatch = useDispatch();

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     dispatch(login(email, password))
    // }

    useEffect(() => {
        if (userInfo) {
            props.history.push(`/profile/${userInfo.user.id}`);
        }
    }, [userInfo, props.history])

    return (
        <div className="centered-container">
            <div className="component-container">
                {error && <MessageBox className="login__error" variant="danger">{error}</MessageBox>}
                <div className="form">
                    <h1>Login</h1>
                    <Link to="/forgot">Forgot password</Link>
                    <span>Don't have an account? <Link to="/register">Register here</Link></span>

                    <Formik
                        initialValues={{
                            email: '',
                            password: '',
                        }}
                        validationSchema={Yup.object({
                            email: Yup.string()
                                .email('Invalid email address!')
                                .required('Email is required!'),
                            password: Yup.string()
                                .required('Password is required!'),
                        })}
                        onSubmit={(values, { setSubmitting, resetForm }) => {
                            const email = values.email;
                            const password = values.password;
                            setSubmitting(true);
                            dispatch(login(email, password));
                            setSubmitting(false);
                            resetForm();
                        }}
                    >
                        {props => (
                            <Form>
                                <TextField label="Email" name="email" type="email" id="email" />
                                <PasswordField label="Password" name="password" id="password" />
                                <Button type="submit" value="Login" variant="primary" loading={props.isSubmitting} />
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </div>
    )
}

export default LoginScreen;