# IoT Incubator

**Table of Contents:**

1. <a href="#why">What & Why? 🤔</a>
2. <a href="#ov">System Overview 🌎 </a>
3. <a href="#setup_1">How to setup this system on a dev env / local machine: </a>
   1. <a href="#setup_iot">IoT Devices (the incubator) 🏡 📡</a>
   2. <a href="#setup_frontend">Frontend 🏡 📱</a>
4. <a href="#run">How to run this system on a dev env / local machine 🏡 📱 📡</a>

<span id="why"></span>

## What is this and why? 🤔

It is often the case for people who do small-scale (backyard) free-range poultry farming to have too many fertilised eggs which **simply did not hatch** due to insufficient heat from the hen (too many eggs for one hen), and or the eggs being eaten by other chickens / the hen itself / another predators.

For fertilised eggs to hatch, there are some variables to keep in mind, such as: temperature, relative humidity, and where & how they’re stored (enclosed & not moving a lot or shaky).

The development & the use of this smart incubator is in hopes of maximising the rate of hatch of the eggs while being cost effective and environmental friendly due to its nature of using some materials that are regarded as scraps / waste for most people (commonly referred as upcycling ♻️.). For example, the incubator is from used cardboard box and it is leveraging the power of IoT in current days ⚡ 👨‍💻.

**Web App / Live Demo: [here](https://smart-incubator.netlify.app/app).**

🥚 &nbsp;➡️ &nbsp;🐣 &nbsp;➡️ &nbsp;🐥 &nbsp;➡️ &nbsp;🐓 ➡️ &nbsp;🍗

🥚 &nbsp;**Grow your own foods - be responsible and sustainable** &nbsp; 🍗

<span id="ov"></span>

## System Overview

<hr/>

### How does this system work?

Read the entire project documentation (all the devices used and its reasons, and high level diagram): [here](https://docs.google.com/document/d/1mxj_BMj2L9t08ct8H3UyUC8Iw47t3ddjCCNoUKCeipc/edit?usp=sharing)

See the schematic diagram for the incubator: [here](https://drive.google.com/file/d/1ia_JC_gOGSWNLD4Ac3hA5Idx0zuUnNhe/view)

**In simple terms**, users can set a desired temperature and humidity of the incubator via the frontend, as well as monitoring the current readings in 'real time'.

The IoT application (also called frontend) creates a new JSON object / collection in the Realtime DB for each device (distinguished by its device name).

This collection contains the essential data such as temperature, humidity, current temperature, as well as current humidity, and also some other data such as hatch preset name, created time, etc.

The exchange of data between the IoT devices (the incubator) and the Realtime DB happens over the air via internet.

There's an intentional delay of around `10000ms` for the exchange of the data.

<hr/>

⭐&nbsp; The code for the IoT application is located is in the `./webapp` directory.

⭐&nbsp; It's mainly built using ReactJS as its frontend JS framework.

⭐&nbsp; Click <a href="#setup_frontend">here</a> to learn how to set-up the IoT Application locally

⭐&nbsp; The code (`.ino`) for the IoT Devices (the incubator) is located is in the `./device` directory.

⭐&nbsp; Click <a href="#setup_iot">here</a> to learn how to set-up the the IoT Devices (the incubator).

## Preparing for a Development Environment Setup

Before running the system locally (e.g: in a dev environment), please pay attention these requirements / steps:

⭐&nbsp; To run and use the app locally, please make sure to have: everything on our tech stack installed, and a stable internet connection to at least be able to reach Google's Firebase Services.

⭐&nbsp; All JS (`npm`) commands should be ran inside the `./webapp` directory  
 <a id="configDb"></a>

⭐&nbsp; Create a [Firebase](https://firebase.google.com/) project with Realtime Database and store the `databaseURL` as well as the `database secret` somwhere (these two will be used later)

⭐&nbsp; Use the Firebase Authentication, and create a user using an email and a password.

⭐&nbsp; Download and Insteall Arduino IDE

<span id="setup_1"></span>

## Setting Up a Development Environment

This section is going to be separated into two. The first one is setting up the **IoT devices / the hardware** (mainly dealing with Arduino), and the second one is setting up the **IoT application** (ReactJS Web App / Frontend).

This section also assumes that you've downloaded / cloned this entire repo.

<span id="setup_iot"></span>

### 📡 &nbsp; Setting Up the IoT Devices

This section assumes that you are using **exactly** the same devices / components as what we were using AND has done the wiring according to the wiring diagram above.

**Note:** If the sentence above isn't true, you can still follow the guides if you use the component(s) from one of the options listed [here](https://docs.google.com/document/d/1mxj_BMj2L9t08ct8H3UyUC8Iw47t3ddjCCNoUKCeipc/edit?usp=sharing) as it should be fairly similar. You would need to adjust which libraries should be installed and do a minor Arduino code alteration (`./device/Incubator.ino`).

The same case for wiring, if you've wired / assembled the incubator boxed differently than ours, then feel free to alter the Arduino sketch file (`./device/Incubator.ino`) if necessarry.

1.&nbsp; Download and Install ESP8266 Board Manager for the Arduino IDE - Official documentation [here](https://arduino-esp8266.readthedocs.io/en/latest/installing.html).

2.&nbsp; Download and Install these external libraries for Arduino:

1. [ClosedCube_HDC1080_Arduino (Temperature & Humidity Sensor)](https://github.com/closedcube/ClosedCube_HDC1080_Arduino)
2. [Arduino-LiquidCrystal-I2C-library](https://github.com/fdebrabander/Arduino-LiquidCrystal-I2C-library)
3. [Firebase Arduino](https://github.com/FirebaseExtended/firebase-arduino)
4. [ArduinoJSON Version 5](https://arduinojson.org/v5/doc/installation/)
   <span id="s3"></span>

3.&nbsp; Go to `./device` and open `Incubator.ino`

4.&nbsp; Inside `Incubator.ino`, alter `FIREBASE_HOST` and `FIREBASE_AUTH` to the information you <a href="#configDb">stored previously,</a> which are the `databaseURL` and `database secret` respectively.
<span id="dName"></span>

5.&nbsp; Verify the code on the Arduino IDE to make sure nothing breaks.

<span id="setup_frontend"></span>

### 📱 &nbsp; Setting Up the IoT Application

Assuming you are inside the `./webapp` directory:

1.&nbsp; Install the web app (frontend) by moving into the `./webapp` directory

2.&nbsp; Run `npm install` to install the dependencies needed for the frontend web application

3.&nbsp; Copy and rename the .env_dummy to .env, and change the values to suit your firebase project's detail.

<span id="run"></span>

## 🚀 &nbsp; Running The System in Development Environment (Locally)

Assuming you have done all the steps above to set-up both the IoT Application and IoT Devices:

1.&nbsp; Run `npm run start` to start the web application.

2.&nbsp; On the web application, sign in to your account (created previously). Then, create a new incubator and give it a name. Following that, choose any hatch preset for that incubator or create your own.

3.&nbsp; Inside the `Incubator.ino`, alter `deviceName` to the name above. Please note that this name is case insensitive (e.g. "TEST" and "test" will be equal).

4.&nbsp; Run the `Incubator.ino` from the Arduino IDE (install it to the ESP8266)

5.&nbsp; You can now see that the incubator will work according to your hatch preset. Feel free to change the hatch preset and play around with it.

6.&nbsp; Congrats, you have set-up your Incubator, now hatch those eggs!

Creating / adding another incubator for the same account:

⭐&nbsp; To add another incubator for the same account, make sure you have another incubator (the IoT Devices) setup properly. Repeat <a href="#s3">steps 3-5</a> for that incubator. Then, repeat the same steps <a href="#run">above</a> (except the first one assuming your frontend app is already running).
