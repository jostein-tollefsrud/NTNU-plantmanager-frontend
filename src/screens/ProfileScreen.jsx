// import UpdateProfile from '../components/update-profile/UpdateProfile';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Actions
import { getUserDetails, updateUser, updateUserProfile } from '../redux/actions/userActions';

import './ProfileScreen.css';
import Loading from '../components/loading/Loading';
import MessageBox from '../components/message-box/MessageBox';
import TextInput from '../components/text-input/TextInput';
import Button from '../components/button/Button';

const ProfileScreen = (props) => {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('');
    const [id, setId] = useState('');
    const [updated, setUpdated] = useState(false);

    // Check if user is logged in, else redirect to login page
    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;
    if (!userInfo) props.history.push('/login')

    const manager = userInfo.user.role === 'manager';

    const dispatch = useDispatch();

    const userDetails = useSelector(state => state.getUserDetails);
    const { user, loading, error } = userDetails;

    const userUpdateProfile = useSelector(state => state.userUpdateProfile);
    const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = userUpdateProfile;

    const userUpdate = useSelector(state => state.userUpdate);
    const { loading: userLoadingUpdate, error: userErrorUpdate, success: userSuccessUpdate } = userUpdate;

    useEffect(() => {
        if (user && props.match.params.id !== user._id) {
            dispatch(getUserDetails(props.match.params.id))
        } 
        if (user) {
            if (manager) {
                setFirstName(user.firstName);
                setLastName(user.lastName);
                setEmail(user.email);
                setRole(user.role);
                setId(user._id);
            } else {
                setFirstName(user.firstName);
                setLastName(user.lastName);
                setId(user._id);
            }
        }
    }, [dispatch, props.match.params.id, user, manager]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (manager) {
            await dispatch(updateUser(firstName, lastName, email, role, id))
            await dispatch(getUserDetails(id))
            
        } else {
            await dispatch(updateUserProfile(firstName, lastName, id))
            await dispatch(getUserDetails(id))
        }
        setUpdated(true)
    }

    return (
        <div>
            <h1>Your information</h1>

            {loading && <Loading />}
            {error && <MessageBox variant="danger">{error}</MessageBox>}
            <div className="profile-container">
                <div className="component-container">
                    <h2>Name</h2>
                    <p>{user.firstName} {user.lastName}</p>
                    <h2>Email</h2>
                    <p>{user.email}</p>
                    <h2>Role</h2>
                    <p>{user.role}</p>
                </div>
                {/* <UpdateProfile user={user} /> */}
                <div>
                    {/* For regular users */}
                    {loadingUpdate && <Loading />}
                    {errorUpdate && <MessageBox variant="danger">{errorUpdate}</MessageBox>}
                    {updated && <MessageBox variant="success">Profile updated.</MessageBox>}

                    {/* For managers */}
                    {userLoadingUpdate && <Loading />}
                    {userErrorUpdate && <MessageBox variant="danger">{errorUpdate}</MessageBox>}
                    <div className="component-container">
                        <form onSubmit={handleSubmit} method="PUT">
                            <TextInput 
                                label="First name" 
                                name="firstName" 
                                id="firstName" 
                                value={firstName} 
                                required={true} 
                                onChange={(e) => setFirstName(e.target.value)} />
                            
                            <TextInput 
                                label="Last name" 
                                name="lastName" 
                                id="lastName" 
                                value={lastName} 
                                required={true} 
                                onChange={(e) => setLastName(e.target.value)} />
                            
                            {manager && (
                                <>
                                    <TextInput 
                                        label="Email address" 
                                        type="email"
                                        name="email" 
                                        id="email" 
                                        value={email} 
                                        required={true} 
                                        onChange={(e) => setEmail(e.target.value)} />
            
                                    <label htmlFor="role">Role</label>
                                    <select name="role" id="role" value={role} onChange={(e) => setRole(e.target.value)}>
                                        <option value="user">User</option>
                                        <option value="gardener">Gardener</option>
                                        <option value="manager">Manager</option>
                                    </select>
                                </>
                            )}
                            
                            <Button type="submit" value="Update"/>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfileScreen;