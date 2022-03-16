import './LoadingSpinner.css';

const LoadingSpinner = ({color="light", size="small"}) => {
    return (
        <div className={`sk-fading-circle ${size}`}>
            <div className={`sk-circle1 ${color}`}></div>
            <div className={`sk-circle2 ${color}`}></div>
            <div className={`sk-circle3 ${color}`}></div>
            <div className={`sk-circle4 ${color}`}></div>
            <div className={`sk-circle5 ${color}`}></div>
            <div className={`sk-circle6 ${color}`}></div>
            <div className={`sk-circle7 ${color}`}></div>
            <div className={`sk-circle8 ${color}`}></div>
            <div className={`sk-circle9 ${color}`}></div>
            <div className={`sk-circle10 ${color}`}></div>
            <div className={`sk-circle11 ${color}`}></div>
            <div className={`sk-circle12 ${color}`}></div>
        </div>
    )
}

export default LoadingSpinner;