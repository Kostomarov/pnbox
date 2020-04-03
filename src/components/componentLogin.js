import React, { useEffect, useState } from "react";
import "./componentLogin.scss";
import ScanPannel from './ScanPannel'

let scannedBarCode = '';

const LoginPanel = (props) => {

    useEffect(() => {
    });

    return (
        <div className="loginWrapper">
            <div className="loginContainer">
                <div className='loginHeader'>Авторизация</div>
                <div className='loginSubHeader'>Сканировать пропуск</div>
                <ScanPannel />
            </div>
        </div>

    );
}

export default LoginPanel;

