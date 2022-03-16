import './Footer.css';

const Footer = () => {

    return (
        <footer>
            <p>
                This is a plant manager project given by the department of design faculty at NTNU.
                In this project we were meant to make a basic user and plant system, where you can log in,
                have a role that allows you to water or fertilize the plants. These plants will be listed
                at the front page where you can sort through which needs watering or fertilizing first.
                <hr/>

                Coded by Ida Therese Hongset Trøan, Jostein Tollefsrud and Ragni Støen
            </p>
            <img src={process.env.PUBLIC_URL + '/assets/img/ntnu-logo.png'} alt="" />
        </footer>
    )
}

export default Footer;