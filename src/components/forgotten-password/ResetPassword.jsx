import React, { Component } from 'react';
import axios from 'axios';
import TextInput from "../text-input/TextInput";
import Button from "../button/Button";
import { Link } from "react-router-dom";

class ResetPassword extends Component {
    constructor(props) {
        super(props);

        this.state = {
            password: '',
            confirmPassword: '',
            passwordChanged: false
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        axios
            .get('/reset', {
                params: {
                    id: this.props.match.params.id
                }
            })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const { password, confirmPassword } = this.state;

        if (password !== confirmPassword) {
            alert('Passwords don\'t match');
        } else {
            const body = {
                token: this.props.match.params.id,
                password: password,
                confirmPassword: confirmPassword
            }
    
            axios
                .patch(`/reset/${body.token}`, body)
                .then(() => {
                    this.setState({
                        passwordChanged: true
                    })
                })
        }
    };

    render() {
        const { password, confirmPassword, passwordChanged } = this.state;

        return (
            <div>
                {!passwordChanged ?
                    <form onSubmit={this.handleSubmit}>
                        <label htmlFor="password">Password</label>
                        <TextInput
                            type="password"
                            name="password"
                            id="password"
                            value={password}
                            onChange={e => this.setState({ password: e.target.value })}
                            required />

                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <TextInput
                            type="password"
                            name="confirmPassword"
                            id="confirmPassword"
                            value={confirmPassword}
                            onChange={e => this.setState({ confirmPassword: e.target.value })}
                            required />

                        <Button type="submit" value="Send" variant="primary" onSubmit={this.handleSubmit}/>
                    </form>
                    :
                    <div>
                        <span>Password have successfully been reset, continue to login page: </span>
                        <Link className="btn" to="/login">Login</Link>
                    </div>
                }
            </div>
        )
    }
}

export default ResetPassword;