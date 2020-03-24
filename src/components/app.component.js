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

                    //const sourceSelectPanel = document.getElementById('sourceSelectPanel')
                    //sourceSelectPanel.style.display = 'block'
                }

                document.getElementById('startButton').addEventListener('click', () => {
                    codeReader.decodeFromVideoDevice(selectedDeviceId, 'video', (result, err) => {
                        if (result) {
                            console.log(result)
                            document.getElementById('result').textContent = result.text
                            document.getElementById('inputCode').focus();
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
                    document.getElementById('inputCode').focus();
                })

                document.getElementById('inputCode').focus();

            })
            .catch((err) => {
                console.error(err)
            })
    });


let onPasteEventHandler = (e) => {
    var el1 = document.getElementById('symb');
    el1.textContent = e.clipboardData.getData('Text');
    document.getElementById('inputCode').focus();
    document.getElementById('inputCode').select();
}

    let isDelete = false;

    let GetAndroidKeyValue = (kode) => {
        let az = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
        let numbers = '0123456789'

        if (kode >= 29 && kode <= 54) {
            return az[kode - 29];
        }

        if (kode >= 7 && kode <= 16) {
            return numbers[kode - 7];
        }

        return '-';
    }

    return (
        <main className="wrapper">
            <section className="container" id="demo-content">
                <div className='intro'>ЭМЕКС. Тест-сканер.</div>
                <div className="sourceSelectPanel" >
                    <select id="sourceSelect" className="sourceSelect" ></select>
                </div>
                <div className="buttonWrapper">
                    <button className="button" id="startButton" >Вкл. </button>
                    <button className="button" id="resetButton" >Выкл. </button>
                </div>
                <div className='videowrapper'>
                    <video className='videoblock' id="video" width="300" height="300"></video>
                </div>

                <div className="mark">Результат сканирования:</div>
                <div className="resultWrap">
                    <span id='symb' className="resultDatacComm"> </span>
                </div>
                <div className="resultWrap">
                    <span id='result' className="resultData"></span>
                </div>
                <input id='inputCode' className='inputWrap' onPaste={onPasteEventHandler}/>
                

            </section>
            <KeyboardEventHandler
                handleKeys={['all']}
                handleEventType='keyup'
                onKeyEvent={(key, e) => {
                    var el = document.getElementById('result');
                    var el1 = document.getElementById('symb');
                    if (isDelete) {
                        el.textContent = '';
                        isDelete = false;
                    };

                    if (key === 'other') {
                        if (key !== 66) { el.textContent = el.textContent + e.keyCode; }//GetAndroidKeyValue(e.keyCode); }
                        else {
                            isDelete = true;
                        }
                    } else {
                        if (key !== 'enter') { el.textContent = el.textContent + key; }
                        else {
                            isDelete = true;
                        }

                    }
                    el1.textContent = `keyCode ${e.keyCode} of which ${e.which} and charCode ${e.charCode}`;
                    console.log(`do something upon keydown keyCode ${e.keyCode} of which ${e.which} and charCode ${e.charCode}`);
                }} />
        </main>

    );
}

export default ScanPanel;

