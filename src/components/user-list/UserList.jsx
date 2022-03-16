import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import './UserList.css';

// Actions
import { userDelete, getUsers as listUsers } from '../../redux/actions/userActions';
import Loading from '../loading/Loading';
import MessageBox from '../message-box/MessageBox';
import Button from '../button/Button';
import { USER_DELETE_RESET } from '../../redux/constants/userConstants';

const UserList = () => {

    const [sort, setSort] = useState('role');

    const dispatch = useDispatch();

    const getUsers = useSelector(state => state.getUsers);
    const { users, loading, error } = getUsers;

    const deleteUser = useSelector(state => state.deleteUser);
    const { loading: loadingDelete, error: errorDelete, success: successDelete } = deleteUser;

    useEffect(() => {
        dispatch(listUsers());
        if (successDelete) {
            dispatch({type: USER_DELETE_RESET});
        }
    }, [dispatch]);

    // Sort by role, first name or last name
    if (users) {
    users.sort((a, b) => {
        if (sort === 'role') {
            if (a.role.toLowerCase() < b.role.toLowerCase()) return -1;
            if (a.role.toLowerCase() > b.role.toLowerCase()) return 1;
        } else if (sort === 'firstName') {
            if (a.firstName.toLowerCase() < b.firstName.toLowerCase()) return -1;
            if (a.firstName.toLowerCase() > b.firstName.toLowerCase()) return 1;
        } else if (sort === 'lastName') {
            if (!a.lastName || !b.lastName) return;
            if (a.lastName.toLowerCase() < b.lastName.toLowerCase()) return -1;
            if (a.lastName.toLowerCase() > b.lastName.toLowerCase()) return 1;
        }
        return 0;
    })
    }

    const deleteHandler = async (id) => {
        if (window.confirm('Are you sure you want do delete this user?')) {
            await dispatch(userDelete(id))
            await dispatch(listUsers())
        }
    }

    return ( 
        <div>
            {loadingDelete && <Loading/>}
            {errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}
            {successDelete && <MessageBox variant="success">User deleted!</MessageBox>}
            <div className="component-container">
                <h2>Users</h2>
                <form className="sorting">
                    <label htmlFor="sort">Sort by</label>
                    <select name="sort" id="sort" value={sort} onChange={(e) => setSort(e.target.value)}>
                        <option value="role">Role</option>
                        <option value="lastName">Last Name</option>
                        <option value="firstName">First Name</option>
                    </select>
                </form>
                {loading ? <Loading /> : error ? <MessageBox variant="danger">{error}</MessageBox> : users.map(user => (
                    <div key={user._id} className="user">
                        <div>{user.firstName} {user.lastName}</div>
                        <div>{user.email}</div>
                        <div>{user.role}</div>
                        <Link to={`/users/edit/${user._id}`}>Edit</Link>
                        <Button onClick={() => deleteHandler(user._id)} value="Delete" variant="danger" size="small"/>
                    </div>
                ))}
            </div>
        </div>
    );
}
 
export default UserList;