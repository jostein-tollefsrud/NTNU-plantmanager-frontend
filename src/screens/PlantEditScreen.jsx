// import EditUser from '../components/edit-user/EditUser';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Actions
import { getPlantDetails, updatePlant } from '../redux/actions/plantActions';
import { PLANT_UPDATE_RESET } from '../redux/constants/plantConstants';
import MessageBox from '../components/message-box/MessageBox';
import Loading from '../components/loading/Loading';
import TextInput from '../components/text-input/TextInput';
import Button from '../components/button/Button';

const PlantEditScreen = (props) => {

    // const [updated, setUpdated] = useState(false)
    const [name, setName] = useState('');
    const [type, setType] = useState('');
    const [location, setLocation] = useState('');
    const [waterFrequency, setWaterFrequency] = useState('');
    const [fertilizingFrequency, setFertilizingFrequency] = useState('');
    const [light, setLight] = useState('');
    const [id, setId] = useState('');
    const [updated, setUpdated] = useState(false);

    // redirect to login if not logged in, else you must be manager to access
    /*const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;
    const manager = userInfo ? userInfo.user.role === 'manager' : false;
    if (!userInfo) {
        props.history.push('/login')
    } else if (!manager) {
        props.history.push('/')
    }*/

    const plantDetails = useSelector(state => state.getPlantDetails);
    const { plant, loading, error } = plantDetails;

    const plantUpdate = useSelector(state => state.plantUpdate);
    const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = plantUpdate;

    const dispatch = useDispatch();

    useEffect(() => {
        // if (successUpdate) {
        //     dispatch({type: USER_UPDATE_RESET})
        // }
        if (plant && props.match.params.id !== plant._id) {
            dispatch(getPlantDetails(props.match.params.id))
        }
        if (plant) {
            setName(plant.name);
            setType(plant.type);
            setLocation(plant.location);
            setWaterFrequency(plant.waterFrequency);
            setFertilizingFrequency(plant.fertilizingFrequency);
            setLight(plant.light);
            setId(plant._id);
        }
    }, [dispatch, props.match.params.id, plant]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        await dispatch(updatePlant(name, type, location, waterFrequency, fertilizingFrequency, light, id));
        await dispatch(getPlantDetails(id))
        setUpdated(true)
    }

    return (
        <div>
            {loading ? <Loading/> : error ? <MessageBox variant="danger">{error}</MessageBox> : (
                <>
                <h1>Edit {plant.name}</h1>
                {loadingUpdate && <Loading />}
                {errorUpdate && <MessageBox variant="danger">{errorUpdate}</MessageBox>}
                {updated && <MessageBox variant="success">Plant is updated</MessageBox>}
                <div className="component-container">
                    <form onSubmit={handleSubmit}>
                        <TextInput
                            label="Name"
                            name="name"
                            id="name"
                            value={name}
                            required={true}
                            onChange={(e) => setName(e.target.value)} />

                        <TextInput
                            label="Type"
                            name="type"
                            id="type"
                            value={type}
                            required={true}
                            onChange={(e) => setType(e.target.value)} />

                        <TextInput
                            label="Location"
                            name="location"
                            id="location"
                            value={location}
                            required={true}
                            onChange={(e) => setLocation(e.target.value)} />

                        <TextInput
                            type="number"
                            label="Water frequency"
                            name="waterFrequency"
                            id="waterFrequency"
                            value={waterFrequency}
                            required={true}
                            onChange={(e) => setWaterFrequency(e.target.value)} />

                        <TextInput
                            type="number"
                            label="Fertilizing frequency"
                            name="fertilizingFrequency"
                            id="fertilizingFrequency"
                            value={fertilizingFrequency}
                            required={true}
                            onChange={(e) => setFertilizingFrequency(e.target.value)} />

                        <label htmlFor="light">Plant lighting</label>
                        <select name="light" id="light" value={light} onChange={(e) => setLight(e.target.value)} required={true}>
                            <option value="shadow">Shadow</option>
                            <option value="direct sunlight">Direct sunlight</option>
                            <option value="indirect sunlight">Indirect sunlight</option>
                        </select>

                        <Button type="submit" value="Update"/>
                    </form>
                </div>
                </>
            )}
        </div>
    )
}

export default PlantEditScreen;