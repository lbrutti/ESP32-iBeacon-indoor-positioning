# ESP32 iBeacon Indoor Positioning System (IPS)
This is a small demo application showing how to use **ESP32 modules** as anchors/stations to do indoor positioning of iBeacon tags (tagged people, dogs, cats and objects) with trilateration.

**A minimum of three ESP32 modules are needed** to run the application, since this is required to do the trilateration.


## Getting Started

### Installation

#### Mosquitto MQTT Broker (server)
MacOS using [homebrew](https://brew.sh)
```bash
$ brew install mosquitto
```

Ubuntu 16.04 using apt
```bash
$ sudo apt install mosquitto
```

Other Platforms
* For other platforms e.g. Windows, check out https://mosquitto.org/download/

#### NPM for running the web dashboard
MacOS using [homebrew](https://brew.sh)
```bash
$ brew install npm
```

Ubuntu 16.04 using apt
```bash
$ sudo apt install npm
```

Windows:

You may try out the guide here (untested): https://www.techomoro.com/how-to-install-and-setup-a-react-app-on-windows-10/

**Note!** You may need to install some extra libraries via NPM e.g. *chalk*. You will see an error if so, when you run the dashboard.

```bash
$ npm install chalk
```

#### ESP32 IDE and libraries
You can either use the [Arduino IDE](https://www.arduino.cc/en/Main/Software) or [PlatformIO](https://platformio.org) for [Visual Studio Code](https://code.visualstudio.com) to upload the code to the ESP32.

If you are not familiar with PlatformIO and Visual Studio Code (vscode), then I can highly recommend you to check it out. vscode is a very nice IDE for programming whatever, and PlatformIO is a nice way to program Arduino's and ESP32 in general with good code completion.

**Arduino BLE and MQTT libraries**

You need the following two libraries, both can be installed from the Arduino IDE Library Manager or PlatformIO:
* [PubSubClient](https://pubsubclient.knolleary.net)
* [ESP32 BLE Arduino](https://github.com/nkolban/ESP32_BLE_Arduino)

**Note!** See Troubleshooting section below in regards to PubSubClient and packet size.

### Setup and running
#### Mosquitto MQTT Broker (server)
Edit the file `mosquitto-demo.conf`. Set the path to acl files, like:

```bash
acl_file /home/w3/Downloads/iBeacon-indoor-positioning-demo/mosquitto_acl.config
password_file /home/w3/Downloads/iBeacon-indoor-positioning-demo/mosquitto_pw.config
```

Start mosquitto with the following command:
```bash
$ mosquitto -v -c ./mosquitto-demo.conf
```

MQTT users are "station" and "dashboard", and all passwords are "bledemo".

**Note!** :On MacOS mosquitto may not be a recognized command after installation. You will then need to add mosquitto to PATH, like so and restart your terminal:

```bash
$ sudo echo 'export PATH="/usr/local/sbin:$PATH"' >> ~/.bash_profile
```

#### ESP32 stations
Edit the file `credentials.h` and change wifi ssid and password, and also change `mqttServer` to the IP of the computer running the mosquitto server. Upload the Arduino sketch `ESP32_station.ino` to your ESP32.

Place the ESP32 modules around the area where you want to do positioning, preferably 10-15 meters appart and also in wifi range.

ESP32 modules will work as iBeacon monitoring stations, reporting all found bluetooth beacons to the MQTT topic, with their MAC address and RSSI.

#### Web dashboard

The dashboard is a simple React app, connecting to the mosquitto MQTT server and showing each beacon on screen.

To run the dashboard from a terminal go to the dashboard folder and run `npm start`
```bash
$ cd dashboard/
$ npm start
```

A browser window will automatically open the dashboard react app, else go to [http://localhost:3000/](http://localhost:3000/)

Stations and beacons will show up on the map when at least three ESP32 stations are connected.

<!-- ![Screenshot](screenshot.jpg) -->

<img src="screenshot.jpg" alt="Screenshot" width="500">

## Troubleshooting

### PubSubClient MQTT_MAX_PACKET_SIZE
The **PubSubClient** library may have problems sending big packages to the MQTT server e.g. when ESP32 finds many beacons. In the Arduino sketch you can set `#define MQTT_MAX_PACKET_SIZE` to e.g. 2048, but I have experienced that it may not work anyway. Instead I downloaded the PubSubClient library and added it to my PlatformIO project. Here I could change the code of `PubSubClient.h` around line 26 to `#define MQTT_MAX_PACKET_SIZE 2048`.

I may add the PlatformIO project here later for easier setup.

## TODO
* improve accuracy (average value, faster beacons, sync stations)
* add beacon MAC whitelist to sidebar
* add server settings to sidebar
* add properties to beacon icons
* connect to iTAG's
* ... what else?

## Acknowledgement
The initial code is forked and derived from the example by @jarkko-hautakorpi
https://github.com/jarkko-hautakorpi/iBeacon-indoor-positioning-demo.