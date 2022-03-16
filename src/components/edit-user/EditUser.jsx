import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import TextInput from '../text-input/TextInput';
import './EditUser.css';

class EditUser extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            firstName: '',
            lastName: '',
            email: '',
            role: '',
            _id: '',
         }

         this.handleInputChange = this.handleInputChange.bind(this);
         this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount = () => {
        this.setState(this.props.user)
    }

    handleInputChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        const { firstName, lastName, email, role, _id } = this.state;
        console.log(`
            firstName: ${firstName},
            lastName: ${lastName},
            email: ${email},
            role: ${role},
            id: ${_id}
        `)

        this.setState({
            firstName: firstName,
            lastName: lastName,
            email: email,
            role: role,
            _id: _id
        })

        const token = `Bearer ${this.props.loggedInUser.token}`;

        const body = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            role: role,
        };

        await axios.put(`/users/${this.state._id}`, body, {
            headers: { Authorization: token }
        } )

        this.props.onUpdate();
    }

    render() { 
        return ( 
            <div className="component-container">
                <form onSubmit={this.handleSubmit} method="PUT">
                <TextInput 
                    label="First name" 
                    name="firstName" 
                    id="firstName" 
                    value={this.state.firstName} 
                    required={true} 
                    onChange={this.handleInputChange} />
                
                <TextInput 
                    label="Last name" 
                    name="lastName" 
                    id="lastName" 
                    value={this.state.lastName} 
                    required={true} 
                    onChange={this.handleInputChange} />

                    <input id="lastName" type="text" name="lastName" value={this.state.lastName} onChange={this.handleInputChange}/>
                    <label htmlFor="email">Email</label>
                    <input id="email" type="email" name="email" value={this.state.email} onChange={this.handleInputChange}/>
                    <label htmlFor="role">Role</label>
                    <select id="role" name="role" value={this.state.role} onChange={this.handleInputChange}>
                        <option value="user">User</option>
                        <option value="manager">Manager</option>
                    </select>
                    <Link className="btn" to="/dashboard">Cancel</Link>
                    <button className="btn" type="submit">Update</button>
                </form>
            </div>
         );
    }
}

export default EditUser;