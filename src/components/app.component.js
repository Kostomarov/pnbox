import React from "react";
import "./app.component.scss";
import { BrowserMultiFormatReader } from '@zxing/library';

const ScanPanel = () => {
    let selectedDeviceId;
    const codeReader = new BrowserMultiFormatReader();
    const items = new [{itemName: "Number one", itemId: 1}, {itemName:"Number two", itemId: 2}, {itemName:"Number three", itemId: 3}];
    console.log('ZXing code reader initialized');

    codeReader.getVideoInputDevices()
        .then((videoInputDevices) => {
            alert("Здесь")
            //   const sourceSelect = document.getElementById('sourceSelect')
            //   selectedDeviceId = videoInputDevices[0].deviceId
            //   if (videoInputDevices.length >= 1) {
            //     videoInputDevices.forEach((element) => {
            //       const sourceOption = document.createElement('option')
            //       sourceOption.text = element.label
            //       sourceOption.value = element.deviceId
            //       sourceSelect.appendChild(sourceOption)
            //     })

            //     sourceSelect.onchange = () => {
            //         selectedDeviceId = sourceSelect.value;
            //       };

            //       const sourceSelectPanel = document.getElementById('sourceSelectPanel')
            //       sourceSelectPanel.style.display = 'block'
            //     }

            // document.getElementById('startButton').addEventListener('click', () => {
            //     codeReader.decodeFromVideoDevice(selectedDeviceId, 'video', (result, err) => {
            //       if (result) {
            //         console.log(result)
            //         document.getElementById('result').textContent = result.text
            //       }
            //       if (err && !(err instanceof ZXing.NotFoundException)) {
            //         console.error(err)
            //         document.getElementById('result').textContent = err
            //       }
            //     })
            //     console.log(`Started continous decode from camera with id ${selectedDeviceId}`)
            //   })

            //   document.getElementById('resetButton').addEventListener('click', () => {
            //     codeReader.reset()
            //     document.getElementById('result').textContent = '';
            //     console.log('Reset.')
            //   })


        })
        .catch((err) => {
            console.error(err)
        })

    let Reset = () => {
        alert('Reset');
        //codeReader.reset()
        //document.getElementById('result').textContent = '';
        console.log('Reset.')
    };

    return (
        <main className="wrapper">
            <section className="container" id="demo-content">
                <div className='intro'>Scan pannel</div>
                <p>This example shows how to scan any supported 1D/2D code with ZXing javascript library from the device</p>

                <div>
                    <button className="button" id="startButton" onClick={Reset}>Start</button>
                    <button className="button" id="resetButton" onClick={Reset}>Reset</button>
                </div>
                <div className='videowrapper'>
                    <video className='videoblock' id="video" width="300" height="200"></video>
                </div>
                <div сlassName="sourceSelectPanel" >
                    <label сlassName="sourceSelectPanel">Change video source:</label>
                    <select сlassName="sourceSelect" >
    {items.map((item) => <option key={item.itemId} >{item.itemName}</option>)}
                        

                    </select>
                </div>

                <label>Result:</label>
                <pre сlassName="resultWrap">
                    <code сlassName="result"></code>
                </pre>
            </section>
        </main>

    );
}

export default ScanPanel;

