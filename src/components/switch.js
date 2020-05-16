import React from "react";
import "./switch.scss";

const Switch = ({isOn, onSwichClick, label}) => {
    return (
        <div id="switcherVideo" className="switchContainer" onClick={onSwichClick}>
            <div className="mark">{label}</div>
            <div className="switchBase">
                <div className={"switchPin" + (!isOn ? "" : " On")}></div>
            </div>
        </div>

    );
}

export default Switch;

