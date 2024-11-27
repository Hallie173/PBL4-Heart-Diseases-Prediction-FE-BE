import React from "react";
import hearthealth from '../../hearthealth.jpg';
import './Intro.css';

function Intro() {
    return (
        <div className="introduction">
            <div className="slogan-div">
                <img src={hearthealth} className="hearthhealth-img" />
            </div>
        </div>
    )
}

export default Intro;