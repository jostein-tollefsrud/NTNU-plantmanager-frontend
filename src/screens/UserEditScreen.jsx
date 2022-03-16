// import EditUser from '../components/edit-user/EditUser';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Actions
import { getUserDetails, updateUser } from '../redux/actions/userActions';
import { USER_UPDATE_RESET } from '../redux/constants/userConstants';
import MessageBox from '../components/message-box/MessageBox';
import Loading from '../components/loading/Loading';
import TextInput from '../components/text-input/TextInput';
import Button from '../components/button/Button';

const UserEditScreen = (props) => {

    // const [updated, setUpdated] = useState(false)
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('');
    const [id, setId] = useState('');
    const [updated, setUpdated] = useState(false);

    // redirect to login if not logged in, else you must be manager to access
    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;
    const manager = userInfo ? userInfo.user.role === 'manager' : false;
    if (!userInfo) {
        props.history.push('/login')
    } else if (!manager) {
        props.history.push('/')
    }

    const userDetails = useSelector(state => state.getUserDetails);
    const { user, loading, error } = userDetails;

    const userUpdate = useSelector(state => state.userUpdate);
    const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = userUpdate;

    const dispatch = useDispatch();

    useEffect(() => {
        // if (successUpdate) {
        //     dispatch({type: USER_UPDATE_RESET})
        // }
        if (user && props.match.params.id !== user._id) {
            dispatch(getUserDetails(props.match.params.id))
        } 
        if (user) {
            setFirstName(user.firstName);
            setLastName(user.lastName);
            setEmail(user.email);
            setRole(user.role);
            setId(user._id);
        }
    }, [dispatch, props.match.params.id, user]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        await dispatch(updateUser(firstName, lastName, email, role, id));
        await dispatch(getUserDetails(id))
        setUpdated(true)
    }

    return (
        <div>
            {loading ? <Loading/> : error ? <MessageBox variant="danger">{error}</MessageBox> : (
                <>
                <h1>Edit {user.firstName} {user.lastName}</h1>
                {loadingUpdate && <Loading />}
                {errorUpdate && <MessageBox variant="danger">{errorUpdate}</MessageBox>}
                {updated && <MessageBox variant="success">User is updated</MessageBox>}
                <div className="component-container">
                    <form onSubmit={handleSubmit}>
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

                        <Button type="submit" value="Update"/>
                    </form>
                </div>
                </>
            )}
        </div>
    )
}

export default UserEditScreen;