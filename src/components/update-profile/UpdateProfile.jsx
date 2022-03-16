import React, { Component } from 'react';
import Button from '../button/Button';
import TextInput from '../text-input/TextInput';

class EditUser extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            firstName: '',
            lastName: '',
            _id:'',
         };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        const { firstName, lastName, _id } = this.props.user;
        this.setState({
            firstName: firstName,
            lastName: lastName,
            _id: _id,
        })
        console.log(this.props.user)
    }

    handleChange(e) {
        this.setState({
            [e.target.name] : e.target.value
        })
    };

    handleSubmit(e) {
        e.preventDefault();
        const { firstName, lastName, _id } = this.state;
        console.log(`
            firstName: ${firstName},
            lastName: ${lastName},
            _id: ${_id},
        `)

        this.setState({
            firstName: firstName,
            lastName: lastName,
        })
    };

    render() {
        const { firstName, lastName } = this.state;
        return ( 
            <div className="component-container">
                <h3>Update your information</h3>
                <form onSubmit={this.handleSubmit} method="PUT">
                    <TextInput 
                        label="First name" 
                        name="firstName" 
                        id="firstName" 
                        value={firstName} 
                        required={true} 
                        onChange={this.handleChange} />
                    
                    <TextInput 
                        label="Last name" 
                        name="lastName" 
                        id="lastName" 
                        value={lastName} 
                        required={true} 
                        onChange={this.handleChange} />
                    <Button type="submit" value="Update"/>
                </form>
            </div>
        );
    }
}

export default EditUser;