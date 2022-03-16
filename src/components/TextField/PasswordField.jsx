import { useField } from 'formik';
import { useState } from 'react';
import './TextField.css';

const PasswordField = ({ label, ...props }) => {

    const [field, meta] = useField(props);
    const [isHidden, setIsHidden] = useState(true)

    const togglePassword = () => {
        setIsHidden(!isHidden)
    }

    let success = false;
    if (meta.touched && !meta.error) {
        success = true;
    }

    return ( 
        <div className="input">
            <div className="password-container">
                <label className="input__label" htmlFor={props.id || props.name}>{label}</label>
                <button className="toggle-password" type="button" onClick={togglePassword}>{isHidden ? 'Show password' : 'Hide password'}</button>
            </div>
            <span className="inputgroup">
                    {meta.touched && meta.error && <span className="fas fa-exclamation-circle error__icon"></span>}
                    {success && <span className="fas fa-check-circle success__icon"></span>}
                    <input type={isHidden ? 'password' : 'text'} className={`input__field ${meta.touched && meta.error && 'input__invalid'} ${success && 'input__success'}`} {...field} {...props} aria-label={label} />
            </span>
            {meta.touched && meta.error ? (
                <div className="input__error">{meta.error}</div>
            ) : null}
        </div>
    );
}

export default PasswordField;