import React, { useEffect, useState } from "react";
import "./app.component.scss";
import { BrowserMultiFormatReader } from '@zxing/library';
import KeyboardEventHandler from 'react-keyboard-event-handler';


const ScanPanel = (props) => {
    useEffect(() => {
        let selectedDeviceId;
        const codeReader = new BrowserMultiFormatReader()
        console.log('ZXing code reader initialized')

        codeReader.getVideoInputDevices()
            .then((videoInputDevices) => {
                const sourceSelect = document.getElementById('sourceSelect')
                selectedDeviceId = videoInputDevices[0].deviceId
                if (videoInputDevices.length >= 1) {
                    videoInputDevices.forEach((element) => {
                        const sourceOption = document.createElement('option')
                        sourceOption.text = element.label
                        sourceOption.value = element.deviceId
                        sourceSelect.appendChild(sourceOption)
                    })

                    sourceSelect.onchange = () => {
                        selectedDeviceId = sourceSelect.value;
                        alert('выбрано');
                    };

                    const sourceSelectPanel = document.getElementById('sourceSelectPanel')
                    //sourceSelectPanel.style.display = 'block'
                }

                document.getElementById('startButton').addEventListener('click', () => {
                    codeReader.decodeFromVideoDevice(selectedDeviceId, 'video', (result, err) => {
                        if (result) {
                            console.log(result)
                            document.getElementById('result').textContent = result.text
                        }
                        // if (err && !(err instanceof ZXing.NotFoundException)) {
                        //   console.error(err)
                        //   document.getElementById('result').textContent = err
                        // }
                    })
                    console.log(`Started continous decode from camera with id ${selectedDeviceId}`)
                })

                document.getElementById('resetButton').addEventListener('click', () => {
                    codeReader.reset()
                    document.getElementById('result').textContent = '';
                    console.log('Reset.')
                })

            })
            .catch((err) => {
                console.error(err)
            })
    });

    return (
        <main className="wrapper">
            <section className="container" id="demo-content">
                <div className='intro'>ЭМЕКС. Тест-сканер.</div>
                <div className="sourceSelectPanel" >
                    <select id="sourceSelect" className="sourceSelect" ></select>
                </div>
                <div className="buttonWrapper">
                    <button className="button" id="startButton" >Включить </button>
                    <button className="button" id="resetButton" >Выключить </button>
                </div>
                <div className='videowrapper'>
                    <video className='videoblock' id="video" width="300" height="300"></video>
                </div>

                <div className="mark">Результат сканирования:</div>
                <div className="resultWrap">
                    <span id='result' className="resultData"></span>
                </div>
                {/* <div>key detected: {props.eventKey}</div> */}
            </section>
            <KeyboardEventHandler
                handleKeys={['all']}
                onKeyEvent={(key, e) => { 
                    var el = document.getElementById('result');
                    if(key !== 'enter'){el.textContent = el.textContent + key;}
                    else{
                        el.textContent ='';
                    }
                    console.log(`do something upon keydown event of ${key}`);
                    }} />
        </main>

    );
}

export default ScanPanel;

