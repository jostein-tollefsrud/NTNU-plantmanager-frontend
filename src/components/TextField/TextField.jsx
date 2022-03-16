import { useField } from 'formik';
import './TextField.css';

const TextField = ({ label, ...props }) => {

    const [field, meta] = useField(props);

    let success = false;
    if (meta.touched && !meta.error) {
        success = true;
    }

    return ( 
        <div className="input">
            <label className="input__label" htmlFor={props.id || props.name}>{label}</label>
            <span className="inputgroup">
                {meta.touched && meta.error && <span className="fas fa-exclamation-circle error__icon"></span>}
                {success && <span className="fas fa-check-circle success__icon"></span>}
                <input className={`input__field ${meta.touched && meta.error && 'input__invalid'} ${success && 'input__success'}`} {...field} {...props} aria-label={label} />
            </span>
            {meta.touched && meta.error ? (
                <div className="input__error">{meta.error}</div>
            ) : null}
        </div>
    );
}
export default TextField;