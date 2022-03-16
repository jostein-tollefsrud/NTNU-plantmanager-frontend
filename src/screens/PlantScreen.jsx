//import Plant from "../components/plant/Plant";
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Actions
import { getPlantDetails, waterPlant, fertilizePlant } from '../redux/actions/plantActions';
import { daysSince } from '../helpers/countDays';

// Components
import Button from '../components/button/Button';
import Loading from '../components/loading/Loading';
import MessageBox from '../components/message-box/MessageBox';

// Styling
import './PlantScreen.css';


const PlantScreen = (props) => {

    const [name, setName] = useState('');
    const [type, setType] = useState('');
    const [location, setLocation] = useState('');
    const [waterFrequency, setWaterFrequency] = useState('');
    const [fertilizingFrequency, setFertilizingFrequency] = useState('');
    const [light, setLight] = useState('');
    const [lastWateredBy, setLastWateredBy] = useState('');
    const [lastWateredAt, setLastWateredAt] = useState('');
    const [lastFertilizedAt, setLastFertilizedAt] = useState('');
    const [lastFertilizedBy, setLastFertilizedBy] = useState('');
    const [managerOrGardener, setManagerOrGardener] = useState(false);

    // Check if user is logged in and if they're a gardener or manager
    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;

    const dispatch = useDispatch();

    const plantDetails = useSelector(state => state.getPlantDetails);
    const { plant, loading, error } = plantDetails;

    useEffect(() => {
        if (plant && props.match.params.id !== plant._id) {
            dispatch(getPlantDetails(props.match.params.id))
        }

        // If the user is logged in, check if they're manager or gardener
        if (userInfo) {
            if (userInfo.user.role === 'manager' || userInfo.user.role === 'gardener') {
                setManagerOrGardener(true)
            }
        }

        if (plant) {
            setName(plant.name);
            setType(plant.type);
            setLocation(plant.location);
            setWaterFrequency(plant.waterFrequency);
            setFertilizingFrequency(plant.fertilizingFrequency);
            setLight(plant.light);
            setLastWateredBy(plant.lastWateredByUser);
            setLastWateredAt(daysSince(plant.lastWateredAtTime));
            setLastFertilizedAt(daysSince(plant.lastFertilizedAtTime));
            setLastFertilizedBy(plant.lastFertilizedByUser);
        }

    }, [dispatch, props.match.params.id, plant, managerOrGardener]);

    const handleWater = async (e) => {
        e.preventDefault();

        if(managerOrGardener) {
            await dispatch(waterPlant(plant._id))
            await dispatch(getPlantDetails(plant._id))
        }
    }

    const handleFertilize = async (e) => {
        e.preventDefault();

        if(managerOrGardener) {
            await dispatch(fertilizePlant(plant._id))
            await dispatch(getPlantDetails(plant._id))
        }
    }

    return (
        <div className="component-container">
            <img className="card__image" src={process.env.PUBLIC_URL + '/assets/img/default-plant.jpg'} alt="" />
                {loading && <Loading />}
                {error && <MessageBox variant="danger">{error}</MessageBox>}
                <div className="plant-container">
                    <div>
                        <h2>Name</h2>
                        <p>{ name }</p>
                        <h2>Type</h2>
                        <p>{ type }</p>
                        <h2>Location</h2>
                        <p>{ location }</p>
                    </div>

                    <div>
                        <h2>Water</h2>
                        <p>Every { waterFrequency } days</p>
                        <h2>Fertilizer</h2>
                        <p>Every { fertilizingFrequency } days</p>
                        <h2>Light</h2>
                        <p>{ light }</p>
                    </div>

                    <div>
                        <h2>Last Watered</h2>
                        <p>{ !lastWateredBy ? 'Never' : `${lastWateredAt} days ago by ${lastWateredBy}` }</p>
                        <h2>Last Fertilized</h2>
                        <p>{ !lastFertilizedBy ? 'Never' : `${lastFertilizedAt} days ago by ${lastFertilizedBy}` }</p>
                    </div>
                </div>
                {managerOrGardener && (
                    <div className="plantButtons">
                        <Button type="submit" value="Water" size="btn--small" onClick={handleWater}/>
                        <Button type="submit" value="Fertilize" size="btn--small" onClick={handleFertilize}/>
                    </div>
                )}
                {!managerOrGardener && (
                    <Button type="submit" value="Request Water" size="btn--small"/>
                )}

        </div>
    )
}

export default PlantScreen;