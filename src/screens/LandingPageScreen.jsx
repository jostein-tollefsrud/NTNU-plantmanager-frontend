import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

// Actions
import { getPlants as listPlants } from '../redux/actions/plantActions';

// Components
import Card from "../components/card/Card"
import Loading from '../components/loading/Loading';

// Helpers
import { daysLeft } from '../helpers/countDays';
import MessageBox from "../components/message-box/MessageBox";

const LandingPageScreen = () => {

    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;

    const [sort, setSort] = useState('watering');

    // const getPlants = useSelector(state => state.getPlants);
    // const { plants, loading, error } = getPlants;

    // const dispatch = useDispatch;

    const [plants, setPlants] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('')

    useEffect(async () => {
        // dispatch(listUsers());
        setLoading(true)
        try {
            const { data } = await axios.get('/plants')
            setPlants(data)
            setLoading(false)
        } catch (error) {
            setError(error)
            setLoading(false)
        }
    }, []);

    if (userInfo) {
        if ((userInfo.user.role === 'manager') || (userInfo.user.role === 'gardener')) {
            if ((JSON.parse(localStorage.getItem('notified')) === false) || !localStorage.getItem('notified')) {
                plants.forEach(plant => {
                    let lastWatered = daysLeft(plant.lastWateredAtTime, plant.waterFrequency)
                    let lastFertilized = daysLeft(plant.lastFertilizedAtTime, plant.fertilizingFrequency)
                    if ((lastWatered === 0) || (lastWatered < 0) || (lastFertilized === 0) || (lastFertilized < 0)) {
                        localStorage.setItem('notify', 'true')
                    }
                })
            }

            if (JSON.parse(localStorage.getItem('notify'))) {
                plants.forEach(plant => {
                    let lastWatered = daysLeft(plant.lastWateredAtTime, plant.waterFrequency)
                    let lastFertilized = daysLeft(plant.lastFertilizedAtTime, plant.fertilizingFrequency)
                    if (lastWatered === 0) {
                        alert(`${plant.name} need watering today!`)
                        localStorage.setItem('notified', 'true')
                        localStorage.setItem('notify', 'false')
                    }
                    else if (lastWatered < 0) {
                        alert(`Watering for ${plant.name} is overdue by ${lastWatered} days!`)
                        localStorage.setItem('notified', 'true')
                        localStorage.setItem('notify', 'false')
                    }
                    else if (lastFertilized < 0) {
                        alert(`Fertilizing for ${plant.name} is overdue by ${lastFertilized} days!`)
                        localStorage.setItem('notified', 'true')
                        localStorage.setItem('notify', 'false')

                    }
                    else if (lastFertilized === 0) {
                        alert(`${plant.name} need fertilizing today!`)
                        localStorage.setItem('notified', 'true')
                        localStorage.setItem('notify', 'false')
                    }
                })
            }
        }
    }

    // Sort by watering or fertilizing
    if (plants) {
        plants.sort((a, b) => {
            let aDaysLeftWater = daysLeft(a.lastWateredAtTime, a.waterFrequency)
            let bDaysLeftWater = daysLeft(b.lastWateredAtTime, b.waterFrequency)
            let aDaysLeftFertilizer = daysLeft(a.lastFertilizedAtTime, a.fertilizingFrequency)
            let bDaysLeftFertilizer = daysLeft(b.lastFertilizedAtTime, b.fertilizingFrequency)
            if (sort === 'watering') {
                if (aDaysLeftWater < bDaysLeftWater) return -1;
                if (aDaysLeftWater > bDaysLeftWater) return 1;
            } else if (sort === 'fertilizing') {
                if (aDaysLeftFertilizer < bDaysLeftFertilizer) return -1;
                if (aDaysLeftFertilizer > bDaysLeftFertilizer) return 1;
            }
            return 0;
        })
    }

    const plantCards = plants.map(plant => {
        return <Card key={plant._id} header={plant.name} subheader={plant.type} watering={daysLeft(plant.lastWateredAtTime, plant.waterFrequency)} fertilizing={daysLeft(plant.lastFertilizedAtTime, plant.fertilizingFrequency)} _id={plant._id} />
    })


    return (
        <div>
            {error && <MessageBox variant="danger">Something went wrong</MessageBox>}
            <div className="cards">
                <form className="plant-sort">
                    <label htmlFor="plant-sort">Sort by</label>
                    <select name="plant-sort" id="plant-sort" value={sort} onChange={(e) => setSort(e.target.value)}>
                        <option value="watering">Watering</option>
                        <option value="fertilizing">Fertilizing</option>
                    </select>
                </form>
                <div className="card-container">
                    {loading && <Loading />}
                    {plantCards}
                </div>
            </div>
        </div>
    )

}

export default LandingPageScreen;