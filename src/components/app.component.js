import React, { useEffect, useState } from "react";
import "./app.component.scss";
import { BrowserMultiFormatReader } from '@zxing/library';

const ScanPanel = () => {

    const [videoDevices, setVideoDevices] = useState([{ itemName: "Number one", itemId: 1 }, { itemName: "Number two", itemId: 2 }, { itemName: "Number three", itemId: 3 }]);
    const [selectedDeviceId, setSelectedDeviceId] = useState('--');
    const [resulttext, setResulttext] = useState('--');


    const codeReader = new BrowserMultiFormatReader();
    
    let Start = () => {
        setResulttext('--')
        codeReader.getVideoInputDevices()
            .then((videoInputDevices) => {

                if (videoInputDevices.length >= 1) {
                    setSelectedDeviceId(videoInputDevices[0].label);
                }

                codeReader.decodeFromVideoDevice(videoInputDevices[0].deviceId, 'video', (result, err) => {
                    if (result) {
                        setResulttext(result.text)
                    }
                });
            })
            .catch((err) => {
                console.error(err)
            })
    };


    return (
        <main className="wrapper">
            <section className="container" id="demo-content">
                <div className='intro'>Scan pannel</div>
                <p>This example shows how to scan any supported 1D/2D code with ZXing javascript library from the device</p>

                <div className="buttonWrapper">
                    <button className="button" id="startButton" onClick={Start}>Start</button>
                </div>
                <div className='videowrapper'>
                    <video className='videoblock' id="video" width="300" height="200"></video>
                </div>

                <div className="mark">Device:</div>
                <div className="resultWrap">
                    <span className="resultData">{selectedDeviceId}</span>
                </div>

                <div className="mark">Result:</div>
                <div className="resultWrap">
                    <span className="resultData">{resulttext}</span>
                </div>
            </section>
        </main>

    );
}

export default ScanPanel;

