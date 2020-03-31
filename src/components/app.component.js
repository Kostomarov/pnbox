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
                            //document.getElementById('inputCode').focus();
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
                    document.getElementById('main').focus();
                })

                document.getElementById('main').focus();

            })
            .catch((err) => {
                console.error(err)
            })
    });

    let isDelete = false;



    let GetCustomKeyValue = (kode) => {
        let az = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'

        let numbers = '0123456789'


        if (kode >= 65 && kode <= 90) {
            return az[kode - 65];
        }

        if (kode >= 97 && kode <= 122) {
            return az[kode - 97];
        }

        if (kode >= 48 && kode <= 57) {
            return numbers[kode - 48];
        }

        if (kode === 191 || kode === 47) {//|| kode === 111
            return '/';
        }

        if (kode === 190 || kode === 46) {//
            return '.';
        }

        if (kode === 220 || kode === 92) {
            return "\\";
        }

        if (kode === 42) {//kode === 106 || 
            return '*';
        }

        if (kode === 95) {//kode === 106 || 
            return '_';
        }

        if (kode === 58) {//kode === 106 || 
            return ':';
        }

        if (kode === 189 || kode === 45 || kode === 173) {// || kode === 109
            return '-';
        }

        return '';
    }




    let GetUtf16KeyValue = (kode) => {
        return String.fromCharCode(kode);
    }

    return (
        <main id='main' className="wrapper">

            <KeyboardEventHandler
                handleKeys={['all']}
                handleEventType='keypress'
                onKeyEvent={(key, e) => {
                    var el = document.getElementById('result');
                    var el1 = document.getElementById('symb');
                    if (isDelete) {
                        el.textContent = '';
                        isDelete = false;
                    };

                    if (e.keyCode !== 13 && e.keyCode !== 0 && e.keyCode !== 94) {
                        el.textContent = el.textContent + GetCustomKeyValue(e.keyCode);
                    }
                    else {
                        isDelete = true;
                    }

                    //el1.textContent = `keyCode ${e.keyCode} of which ${e.which} and charCode ${e.charCode}`;
                    console.log(`do something upon keydown keyCode ${e.keyCode} of which ${e.which} and charCode ${e.charCode}`);
                }} >
                <section className="container" id="demo-content">
                    <div className='intro'>ЭМЕКС. Тест-сканер.</div>

                    <div className="mark">Результат сканирования:</div>
                    {/* <div className="resultWrap">
                    <span id='symb' className="resultDatacComm"> </span>
                </div> */}
                    <div className="resultWrap">
                        <span id='result' className="resultData"></span>
                    </div>

                    {/* <input id='inputCode' className='inputWrap' onPaste={onPasteEventHandler} /> */}
                    <div className='videowrapper'>
                        <video className='videoblock' id="video" width="300" height="300"></video>
                    </div>
                    <div className="mark">Выбор камеры - выключить после исп.:</div>
                    <div className="sourceSelectPanel" >
                        <select id="sourceSelect" className="sourceSelect" ></select>
                    </div>
                    <div className="buttonWrapper">
                        <button className="button" id="startButton" >Вкл. </button>
                        <button className="button" id="resetButton" >Выкл. </button>
                    </div>
                </section>


            </KeyboardEventHandler>

        </main>

    );
}

export default ScanPanel;

