import { Link } from 'react-router-dom';
import './Card.css';
import Button from '../button/Button';
import { useSelector } from 'react-redux';

const Card = ({
    imageSrc = "assets/img/default-plant.jpg",
    altText = "default plant",
    header,
    subheader,
    watering,
    fertilizing,
    _id,
}) => {

    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;

    let canViewWaterBtn = false;
    if (userInfo) {
        const manager = userInfo.user.role === 'manager';
        const gardener = userInfo.user.role === 'gardener';
        canViewWaterBtn = manager || gardener;
    }

    const warning = (fertilizing === 0) || (watering === 0);
    const danger = (fertilizing < 0) || (watering < 0);
    const wateringToday = watering === 0;
    const wateringOverdue = watering < 0;
    const fertilizingToday = fertilizing === 0;
    const fertilizingOverdue = fertilizing < 0;
    const neverFertilized = fertilizing > 1000;
    const neverWatered = watering > 1000;

    return (
        <div className={`card`}>
            <div className="card__info">
                <div className="card__header">{header}</div>
                <div className="card__subheader">{subheader}</div>

                {wateringToday && <div className={`${warning && 'warning'}`}>Plant need watering today!</div>}
                {wateringOverdue && <div className={`${danger && 'overdue'}`}>{`Watering overdue by ${watering} days!`}</div>}
                {neverWatered && <div className={`${warning && 'warning'}`}>Plant not watered yet.</div>}
                {watering > 0 && <div>{`Next watering in ${watering} days`}</div>}

                {fertilizingToday && <div className={`${warning && 'warning'}`}>Plant need fertilizing today!</div>}
                {fertilizingOverdue && <div className={`${danger && 'overdue'}`}>{`Fertilizing overdue by ${fertilizing} days!`}</div>}
                {neverFertilized && <div className={`${warning && 'warning'}`}>Plant not fertilized yet.</div>}
                {fertilizing > 0 && <div>{`Next fertilizing in ${fertilizing} days`}</div>}

                <div className="card__actions">
                    <Link className="card__link" to={`plants/${_id}`}>View details</Link>
                    {canViewWaterBtn && <Button className="card__button" size="btn--small" value="Water" />}
                </div>
            </div>
            <img className="card__image" src={imageSrc} alt={altText} />
        </div>
    )
}

export default Card;