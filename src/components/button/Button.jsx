import './Button.css';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';

const Button = ({onClick, type, value, size, loading=false, variant="primary" }) => {

    return ( 
        <button 
            onClick={onClick}
            className={`button ${variant} ${size}`} 
            type={type}>
                {value} 
                {loading && <LoadingSpinner size="small" color="light"/>}
        </button>
    );
    
}
 
export default Button;