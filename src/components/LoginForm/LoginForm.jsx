import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import './LoginForm.css';

// import components
import TextField from '../TextField/TextField';
import PasswordField from '../TextField/PasswordField';
import Button from '../button/Button';

// const { data } = await axios.post('/login', { email, password });
// localStorage.setItem('userInfo', JSON.stringify(data));
// token = data.token;

const LoginForm = () => {

    // const userLogin = useSelector(state => state.userLogin);
    // const { loading, error, userInfo } = userLogin;

    // const dispatch = useDispatch();

    return (
        <div className="form">
            <a href="#">Forgot password</a>
            <span>Don't have an account? <a href="#">Register here</a></span>
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
                    // dispatch(login(email, password))
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
    );
}

export default LoginForm;