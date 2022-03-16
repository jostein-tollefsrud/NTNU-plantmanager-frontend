import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom"
import { logout } from "../../redux/actions/userActions";
import './Header.css';

const Header = () => {

    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;

    const manager = userInfo ? userInfo.user.role === 'manager' : false;

    // remove user info from local storage
    const dispatch = useDispatch();
    const handleLogout = () => {
        dispatch(logout())
    }

    return ( 
        <header>
            <nav>
                {/*<img src={process.env.PUBLIC_URL + '/assets/img/plantlogo2.png'} alt="" />*/}
                <Link className="logo" to="/">
                    Plant Manager
                </Link>
                <ul>
                    {manager && <li><Link className="link-text" to="/dashboard">Dashboard</Link></li>}
                    {userInfo && <li><Link className="link-text-name" to={`/profile/${userInfo.user.id}`}>{userInfo.user.firstName} {userInfo.user.lastName}</Link></li>}
                    {!userInfo && <li><Link className="login-btn" to="/login">Log in</Link></li>}
                    {userInfo && <li><Link className="login-btn" to="/" onClick={handleLogout}>Log out</Link></li>}
                </ul>
            </nav>
        </header>
    );
}
 
export default Header;