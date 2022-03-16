import { useSelector } from "react-redux";
import UserList from "../components/user-list/UserList";
import PlantList from "../components/plant-list/PlantList";
// import { Link } from "react-router-dom";
import './DashboardScreen.css';
import { Link } from "react-router-dom";

const DashboardScreen = (props) => {

    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;

    const manager = userInfo ? userInfo.user.role === 'manager' : false;

    if (!userInfo) {
        props.history.push('/login')
    } else if (!manager) {
        props.history.push('/')
    }

    return (
        <div>
            <h1 className="no-margin">Dashboard</h1>
            <Link className="subheader-link" to="/plants/create">Create a new plant</Link>
            <div className="dashboard-content-container">
                <PlantList />
                <UserList />
            </div>
        </div>
    )

}

export default DashboardScreen;