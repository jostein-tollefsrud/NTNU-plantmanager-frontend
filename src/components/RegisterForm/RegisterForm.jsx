import React, { Component } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import './RegisterForm.css';

// import components
import TextField from '../TextField/TextField';
import PasswordField from '../TextField/PasswordField';
import Button from '../button/Button';
import MessageBox from '../message-box/MessageBox';
import { Link } from 'react-router-dom';

class RegisterForm extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            error: '',
         }
    }

    render() { 
        return ( 
            <div className="form">
                {this.state.error && <MessageBox variant="danger">{this.state.error}</MessageBox>}
                {this.state.createdAccount ? (
                    <>
                        <MessageBox variant="success">Your account is created</MessageBox>
                        <br></br>
                        <Link to="/login">You can now login</Link>
                    </> ) : (
                    <Formik 
                    initialValues={{
                        firstName: '',
                        lastName: '',
                        email: '',
                        password: '',
                        confirmPassword: '',
                    }}
                    validationSchema={Yup.object({
                        firstName: Yup.string()
                            .max(100, 'Cannot be over 100 characters!')
                            .required('First name is required!'),
                        lastName: Yup.string()
                            .max(100, 'Cannot be over 100 characters!')
                            .required('Last name is required!'),
                        email: Yup.string()
                            .email('Invalid email address!')
                            .required('Email is required!'),
                        password: Yup.string()
                            .min(8, 'Password must be at least 8 characters!')
                            .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/, 'Must contain at lest one uppercase and one number!')
                            .required('Password is required!'),
                        confirmPassword: Yup.string()
                            .oneOf([Yup.ref('password'), null], 'Password must match!')
                            .required('Confirm password is required!'),
                    })}
                    onSubmit={ async (values, { setSubmitting, resetForm }) => {
                        
                        const data = {
                            firstName: values.firstName,
                            lastName: values.lastName,
                            email: values.email,
                            password: values.password,
                        }

                        try {
                            setSubmitting(true);
                            const message = await axios.post('/register', data)
                            console.log(message)
                            setSubmitting(false);
                            resetForm();
                            this.setState({ error: '', createdAccount: true })
                        } catch (error) {
                            console.error(error.response)
                            this.setState({
                                error: error.response.data.message
                            })
                        }

                    }}
                >
                    {props => (
                        <Form>
                            <TextField label="First name" name="firstName" type="text" id="firstName" />
                            <TextField label="Last name" name="lastName" type="text" id="lastName" />
                            <TextField label="Email" name="email" type="email" id="email" />
                            <PasswordField label="Password" name="password" id="password"/>
                            <PasswordField label="Confirm password" name="confirmPassword" id="confirmPassword" />
                            <Button type="submit" value="Register" variant="primary" loading={props.isSubmitting} />
                        </Form>
                    )}
                </Formik>
                )}
                
            </div>
         );
    }
}

export default RegisterForm;