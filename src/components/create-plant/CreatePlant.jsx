import axios from 'axios';
import React, { Component } from 'react';
import Button from '../button/Button';
import Loading from '../loading/Loading';
import MessageBox from '../message-box/MessageBox';
import TextInput from "../text-input/TextInput"

class CreatePlantScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            type: '',
            location: '',
            waterFrequency: '',
            fertilizingFrequency: '',
            light: '',
        };
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
            name: this.state.name,
            type: this.state.type,
            location: this.state.location,
            waterFrequency: this.state.waterFrequency,
            fertilizingFrequency: this.state.fertilizingFrequency,
            light: this.state.light,
        }
        this.setState({loading: true})
        const response = await axios.post('/plants', data);
        try {
            console.log(response)
            this.setState({success: 'Plant is created!'})
            this.setState({loading: false})
            this.setState({
                name: '',
                type: '',
                location: '',
                waterFrequency: '',
                fertilizingFrequency: '',
                light: '',
            })
        } catch (error) {
            this.setState({error: error.message})
            this.setState({loading: false})
        }
    }

    render () {
        return (
            <div>
            {this.state.loading && <Loading />}
            {this.state.success && <MessageBox variant="success">{this.state.success}</MessageBox>}
            <form onSubmit={this.handleSubmit} method="POST" className="component-container">
                <TextInput 
                    label="Name" 
                    name="name" 
                    id="name" 
                    value={this.state.name} 
                    required={true} 
                    onChange={this.handleChange} />

                <TextInput 
                    label="Type" 
                    name="type" 
                    id="type" 
                    value={this.state.type} 
                    required={true} 
                    onChange={this.handleChange} />
                
                <TextInput 
                    label="Location" 
                    name="location" 
                    id="location" 
                    value={this.state.location} 
                    required={true} 
                    onChange={this.handleChange} />
                
                <TextInput 
                    type="number"
                    label="Water frequency" 
                    name="waterFrequency" 
                    id="waterFrequency" 
                    value={this.state.waterFrequency} 
                    required={true} 
                    onChange={this.handleChange} />
                
                <TextInput 
                    type="number"
                    label="Fertilizing frequency" 
                    name="fertilizingFrequency" 
                    id="fertilizingFrequency" 
                    value={this.state.fertilizingFrequency} 
                    required={true} 
                    onChange={this.handleChange} />
                
                <label htmlFor="light">Plant lighting</label>
                <select name="light" id="light" value={this.state.light} onChange={this.handleChange} required={true}>
                    <option value="">Select...</option>
                    <option value="shadow">Shadow</option>
                    <option value="direct sunlight">Direct sunlight</option>
                    <option value="indirect sunlight">Indirect sunlight</option>
                </select>

                <Button type="submit" value="Create plant"/>
            </form>
            </div>
        )
    }
}

export default CreatePlantScreen;