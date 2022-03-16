import React, { Component } from 'react';
import axios from 'axios';
import './plant.css';
import Button from '../button/Button';

class Plant extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            location: '',
            waterFrequency: '',
            fertilizingFrequency: '',
            light: '',
            lastWateredBy: '',
            lastWateredAt: '',
            lastFertilizedBy: '',
            lastFertilizedAt: '',
            isManager: false
        }
    }

    componentDidMount() {
        axios
            .get(`/plants/${this.props.match.params.id}`)
            .then(res => {
                console.log(res.data);
                const { name, location } = res.data;
                const { waterFrequency, fertilizingFrequency, light } = res.data.plantNeeds;
                //const lastWateredBy = res.data.meta.lastWatered.byUserId;
                //const { lastWateredBy, lastWateredAt, lastFertilizedBy, lastFertilizedAt } = res.data.meta;
                
                this.setState({
                    name: name,
                    location: location,
                    waterFrequency: waterFrequency,
                    fertilizingFrequency: fertilizingFrequency,
                    light: light,
                    /*lastWateredBy: lastWateredBy,
                    lastWateredAt: lastWateredAt,
                    lastFertilizedBy: lastFertilizedBy,
                    lastFertilizedAt: lastFertilizedAt*/
                });
            })
    }

    render() {

        const { name, location, waterFrequency, fertilizingFrequency, light, lastWateredBy, lastWateredAt, lastFertilizedBy, lastFertilizedAt, isManager } = this.state;
        return (
            <div>
                <img className="card__image" src={process.env.PUBLIC_URL + '/assets/img/default-plant.jpg'} alt={this.state.altText} />
                <div className="plant-container">
                    <div className="left">
                        <h2>Name</h2>
                        <p>{ name }</p>
                        <h2>Location</h2>
                        <p>{ location }</p>
                        <h2>Last Watered</h2>
                        <p>{ !lastWateredAt ? 'Never' : 'By ' + lastWateredBy + ' at ' + lastWateredAt }</p>
                        <h2>Last Fertilized</h2>
                        <p>{ !lastFertilizedAt ? 'Never' : 'By ' + lastFertilizedBy + ' at ' + lastFertilizedAt }</p>
                    </div>
                    <div classname="right">
                        <h2>Water</h2>
                        <p>Every { waterFrequency } days</p>
                        <h2>Fertilizer</h2>
                        <p>Every { fertilizingFrequency } days</p>
                        <h2>Light</h2>
                        <p>{ light }</p>
                    </div>
                </div>
                {isManager ? <Button type="submit" value="Water" variant="btn--primary--solid" size="btn-medium"/>
                : <Button type="submit" value="Request Water" variant="btn--primary--solid" size="btn-medium"/>
                }
            </div>
        )
    }
}

export default Plant;