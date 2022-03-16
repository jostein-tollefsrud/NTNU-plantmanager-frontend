import React, { Component } from 'react';
import axios from 'axios';
import Button from "../button/Button";
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import TextField from '../TextField/TextField';
import MessageBox from '../message-box/MessageBox';

class ForgotPassword extends Component {
    constructor(props) {
        super(props);

        this.state = {
            emailSent: false
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit = (e) => {
        e.preventDefault();

        axios
            .post(' /forgot', {
                email: this.state.email
            })
            .then(res => {
                console.log(res.data);
                this.setState({
                    emailSent: true
                })
            })
    };

    render() {
        const { emailSent, error } = this.state;

        return (
            <>
                {error && <MessageBox variant="danger">{error}</MessageBox>}
                {emailSent ? <MessageBox variant="success">E-mail with reset instructions on it's way!</MessageBox> : (
                    <div className="form">
                        <Formik
                            initialValues={{
                                email: '',
                            }}
                            validationSchema={Yup.object({
                                email: Yup.string()
                                    .email('Invalid email address!')
                                    .required('Email is required!'),
                            })}
                            onSubmit={async (values, { setSubmitting, resetForm }) => {
                                const email = values.email;
                                try {
                                    setSubmitting(true);
                                    const message = await axios.post('/forgot', { email: email });
                                    console.log(message);
                                    setSubmitting(false);
                                    resetForm();
                                    this.setState({ error: '', emailSent: true });
                                } catch (err) {
                                    setSubmitting(false);
                                    console.error(err.response.statusText)
                                    this.setState({
                                        error: err.response.statusText
                                    })
                                }
                            }}
                        >
                            {props => (
                                <Form>
                                    <TextField label="Enter your email" name="email" type="email" id="email" />
                                    <Button type="submit" value="Reset" variant="primary" loading={props.isSubmitting} />
                                </Form>
                            )}
                        </Formik>
                    </div>
                )}
            </>
        )
    }
}

export default ForgotPassword;