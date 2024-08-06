2024-07-27 Johnny-Five via BLE

- Context
    - Experimenting with Fischertechnik Robotics
    - Using Arduino Uno 
    - Found Johnny-Five
    - Some robots are static but other are mobile
        - Hence the need for a wireless solution with Johnny-Five
    - Constraints
        - Reuse existing hardware, I.e. Arduino boards and motor shields

- HC-05
    - [Configure HC-05 Bluetooth module](https://pofay.github.io/2018/11/08/setup-wireless-tethering-for-johnny-five-in-arduino-using-hc05-BT.html)
    - Macbook does not connect to HC-05

- Arduino Uno Wifi r4
    - [Moving to BLE](https://github.com/firmata/arduino/tree/main/examples/StandardFirmataBLE)
    - [Adding Arduino Uno Wifi r4 to Firmata board.h file](https://forum.arduino.cc/t/adding-arduino-r4-wifi-to-firmata-board-h-file/1247689)
    - Adding Arduino Uno Wifi r4 to Firmata bleConfig.h	
        - 
    - [ble-j5-test.js](https://gist.github.com/soundanalogous/4c30f9bae23cedc015a5)
    - [ble-serial](https://github.com/monteslu/ble-serial) and noble
        - Updating dev dependencies
    - [From noble to @abandonware/noble](https://github.com/noble/noble/issues/918)
        - [Allow macOS terminal to use bluetooth](https://www.npmjs.com/package/@abandonware/noble#installation)
