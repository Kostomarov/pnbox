import React, { useEffect, useState } from "react";
import "./app.component.scss";
import { BrowserMultiFormatReader } from '@zxing/library';


const ScanPanel = () => {

    const [videoDevices, setVideoDevices] = useState([]);//label: " Камера не выбрана ", deviceId: "0000" 
    //const [selectedDeviceLabel, setSelectedDeviceLabel] = useState('--');
    const [selectedDeviceId, setSelectedDeviceId] = useState('0000');
    const [resulttext, setResulttext] = useState('--');

    const codeReader = new BrowserMultiFormatReader();
    useEffect(() => {
        console.log("upd1  -- "+ selectedDeviceId);
        codeReader.getVideoInputDevices()
        .then((videoInputDevices) => {
            
            // Получаю список камер добавляю к нему пункт камера не выбрана
            
            if (videoDevices.length === 0 && videoInputDevices.length !== 0) {
                // Данные для комбобокса 
                let addDev = [];
                addDev = videoInputDevices.map((item => { return { label: item.label, deviceId: item.deviceId } }));
                addDev.unshift({ label: " Камера не выбрана ", deviceId: "0000" });
                setVideoDevices(addDev);
                //setSelectedDeviceId('0000');
                
            }

            console.log(selectedDeviceId);
            
            if (selectedDeviceId == '0000' || selectedDeviceId === null || selectedDeviceId === undefined) {
                codeReader.reset();
                console.log('not not not');
                //setResulttext('--')
            }
            else {
                console.log('ie ie ie');
                codeReader.decodeFromVideoDevice(selectedDeviceId, 'video', (result, err) => {
                    if (result) {
                        setResulttext(result.text)
                    }
                    // if(err){
                    //     console.log(err);
                    // }
                });
            }
        })
        .catch((err) => {
            console.error(err)
        })


    });

    //value={selectedDeviceId} 
    
    let onChangeSource = (event) => {
        console.log(event.target.value);
        
        setSelectedDeviceId(event.target.value);
    };

    return (
        <main className="wrapper">
            <section className="container" id="demo-content">
                <div className='intro'>ЭМЕКС. Сканирование. Тест.</div>
                <p>Тест сканирования линейных и QR-кодов</p>

                <div className="sourceSelectPanel" >
                    <label className="sourceSelectPanel">Выбор камеры:</label>

                    <select className="sourceSelect" onChange={onChangeSource}>
                        {videoDevices.map((item) => <option key={item.label} value={item.deviceId}>{item.label}</option>)}
                    </select>
                </div>
                

                {/* <div className="buttonWrapper">
                    <button className="button" id="startButton" onClick={Start}>Включить камеру</button>
                    <button className="button" id="stopButton" onClick={Stop}>Выключить камеру</button>
                </div> */}


                <div className='videowrapper'>
                    <video className='videoblock' id="video" width="300" height="200"></video>
                </div>

                {/* <div className="mark">Выбор камеры:</div>
                <div className="resultWrap">
                    <span className="resultData">{selectedDeviceLabel}</span>
                </div> */}

                <div className="mark">Результат сканирования:</div>
                <div className="resultWrap">
                    <span className="resultData">{resulttext}</span>
                </div>
            </section>
        </main>

    );
}

export default ScanPanel;

