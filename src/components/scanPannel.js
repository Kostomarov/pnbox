import React, { useEffect, useState, useRef } from "react";
import "./scanPannel.scss";
import { BrowserMultiFormatReader } from '@zxing/library';
import KeyboardEventHandler from 'react-keyboard-event-handler';
import Switch from './Switch'


const ScanPanel = ({scannedCode}) => {

    let isDelete = false;

    const [isCameraOn, setIsCameraOn] = useState(false);

    let isCameraUp = false;

    let resultRef = useRef();
    let sourceSelectRef = useRef();

    let CameraSwichClick = () => { setIsCameraOn(!isCameraOn) };



    let GetCustomKeyValue = (kode) => {
        let az = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        let numbers = '0123456789';


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

    useEffect(() => {
        let selectedDeviceId;
        const codeReader = new BrowserMultiFormatReader()
        console.log('ZXing code reader initialized')

        codeReader.getVideoInputDevices()
            .then((videoInputDevices) => {

                const sourceSelect = sourceSelectRef.current;
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
                    };
                }

                //Это не хорошо... вяжемся внутрь компонента
                document.getElementById('switcherVideo').addEventListener('click', () => {
                    isCameraUp = !isCameraUp;
                    if (isCameraUp) {
                        codeReader.decodeFromVideoDevice(selectedDeviceId, 'video', (result, err) => {
                            if (result) {
                                console.log(result);
                                scannedCode = result.text;
                                resultRef.current.textContent = result.text;
                            }
                        });
                        console.log(`Started continous decode from camera with id ${selectedDeviceId}`);
                    } else {
                        codeReader.reset()
                        resultRef.current.textContent = '';
                        console.log('Reset.')
                    }
                })
            })
            .catch((err) => {
                console.error(err)
            })
    }, []);



    return (
        <div className="scanPannelContainer">
            <div className="iconScan"></div>
        <div className="scanMarkHeader">Сканируй ШК</div>
        <div className="scanMarkComment">При отсутствии встроенного сканера, <br/> используйте камеру</div>
            {/* <div className="scanMark">Результат сканирования:</div> */}
            <div className="resultWrap">
                <div id='result' className="resultData" ref={resultRef}></div>
            </div>

            {/* <input id='inputCode' className='inputWrap' onPaste={onPasteEventHandler} /> */}
            {isCameraOn && <div className='videowrapper'>
                <video className='videoblock' id="video" width="300" height="300"></video>
            </div>}
            <div className={"sourceSelectPanel" + (isCameraOn ? "" : " hidden")} >
                <select ref={sourceSelectRef} className="sourceSelect" ></select>
            </div>
            <Switch isOn={isCameraOn} onSwichClick={CameraSwichClick} label={"Камера:"} />
            
            <KeyboardEventHandler
                handleKeys={['all', 'shift+8']}
                handleEventType='keypress'
                handleFocusableElements={true}
                onKeyEvent={(key, e) => {

                    let el = resultRef.current;

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
                    console.log(`do something upon keydown keyCode ${e.keyCode} of which ${e.which} and charCode ${e.charCode}`);
                }} />
        </div>




    );
}

export default ScanPanel;

