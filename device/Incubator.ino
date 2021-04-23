
#include <Wire.h>
#include "ClosedCube_HDC1080.h"
#include <LiquidCrystal_I2C.h>
#include <FirebaseArduino.h>
#include <ESP8266WiFi.h>
#include <math.h>
#include <Servo.h>

Servo servo;

#define FIREBASE_HOST ""
#define FIREBASE_AUTH ""
#define WIFI_SSID ""
#define WIFI_PASSWORD ""
const String deviceName = ""; // give any device name here - READ DOCS FIRST!

const int relay = 2; // relay pin number
const String documentsPrefix = "incubators/"+deviceName;
const int servoPin = 14; // servo pin number
// Set the LCD address to 0x27 for a 16 chars and 2 line display

LiquidCrystal_I2C lcd(0x27, 16, 2);
ClosedCube_HDC1080 hdc1080;

int humSensor = 0;
int tempSensor = 0;
int tempDb = 0;
int humDb = 0;
bool wasNotFound = false;

void setup(){

  Serial.begin(9600);

 WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  while(WiFi.status() != WL_CONNECTED){
    Serial.print("."); // loading...
    delay(500);
   }

   Serial.println();
   Serial.print("Connected!");
   Serial.println(WiFi.localIP());
   Firebase.begin(FIREBASE_HOST, FIREBASE_AUTH);
  
   pinMode(relay, OUTPUT);
   servo.attach(servoPin);
   servo.write(200);

  // Default settings: 
  //  - 14 bit Temperature and Humidity Measurement Resolutions
  hdc1080.begin(0x40);
  lcd.begin();

  // Print a test message.
  lcd.print("LCD INITIALISING...");
  delay(3000);
  lcd.clear();
}

void loop()
{
  String  res = Firebase.getString(documentsPrefix+"/deviceName");

  if (Firebase.failed()) {
   lcd.setCursor(0,0);
  lcd.print("ERR - CON FAIL");
  wasNotFound = true;
  }else{
  if(res == ""){
    errorWithCode("001"); // DEVICE NAME NOT FOUND
    wasNotFound = true;
   }else{

   bool desiredStatus = Firebase.getBool(documentsPrefix+"/shouldBeActive");

   syncIncubator(desiredStatus);

  if(desiredStatus){ //should be active
    
    tempSensor = round(hdc1080.readTemperature()); // get temperature from sensor
    humSensor = round(hdc1080.readHumidity()); // get humidity from sensor
  
    tempDb = tempFromDb(); // get desired temperature from Db
    humDb = humFromDb(); // get desired humidity from Db
  
    relayControl(tempSensor,tempDb); // controls relay (turning heater ON and OFF) according to desired temp and current temp
    servoControl(humSensor, humDb); // controls servo (opens and closes ventilation) according to desired humidity and current humidity
  
    if(tempDb != -500 || humDb != -500){
    lcd.setCursor(0,0);
    lcd.print("T: ");
    lcd.print(tempSensor);
    lcd.print("C || H:");
    lcd.print(humSensor);
    lcd.print("%");
    
    lcd.setCursor(0,1);
    lcd.print("dT:");
    lcd.print(tempDb);
    lcd.print("C ||dH:");
    lcd.print(humDb);
    lcd.print("%");

    sendToDatabase(tempSensor, humSensor); // setting current temp and humidity to Db
   }
    
  }else{
    lcd.clear();
     lcd.setCursor(0,0);
    lcd.print("SYSTEM PAUSED");
     digitalWrite(relay, LOW); // HEATER OFF
     servo.write(200);
    }
  
  }

  }
    

  delay(7000);
}

void errorWithCode(String errorCode){
   lcd.setCursor(0,0);
    lcd.print("PLS CHECK DOCS:");
  lcd.setCursor(0,1);
  lcd.print("ERROR CODE: " + errorCode);
  
}

void syncIncubator(bool desiredStatus) { // to start/stop incubator according to the db (from client)
 

   Firebase.setBool(documentsPrefix+"/active", desiredStatus);
   if (Firebase.failed()) {
    Serial.println("Error setting 'desiredStatus' to DB ");
    Serial.println(Firebase.error());
    errorWithCode("071");
   }
}

int tempFromDb(){
  int res = Firebase.getInt(documentsPrefix+"/hatchPreset/maxTemp");
  if (Firebase.failed()) {
    Serial.println("Getting 'desiredTemp' from DB failed: ");
    Serial.println(Firebase.error());
    errorWithCode("081");
    return -500;
  }else{
    return res;
  }
}

int humFromDb() {
  int res = Firebase.getInt(documentsPrefix+"/hatchPreset/maxHum");
    if (Firebase.failed()) {
      Serial.println("Getting 'desiredH' from DB failed: ");
      Serial.println(Firebase.error());
      errorWithCode("082");
      return -500;
    }else{
      return res;
    }
}

void sendToDatabase(int t, int h){
   Firebase.setInt(documentsPrefix+"/currentTemp", t);
   if (Firebase.failed()) {
    Serial.println("Setting 'currentTemp' from DB failed: ");
    Serial.println(Firebase.error());
      errorWithCode("091");
  }
  Firebase.setInt(documentsPrefix+"/currentHum", h);
   if (Firebase.failed()) {
    Serial.println("Setting 'currentH' from DB failed: ");
    Serial.println(Firebase.error());
      errorWithCode("092");
  }
}

void relayControl(int t,int tempDb){
 if(t >= tempDb){
    digitalWrite(relay, LOW); // HEATER OFF
  }else if(t < tempDb){
    digitalWrite(relay, HIGH); // HEATER ON
  }
}

void servoControl(int h, int humidityDb){
  if(h > humidityDb) {
      servo.write(0); // ventilation opens
   }else{
      servo.write(200);  // ventilation closes
   }
}

void errorLcd() { // when there's DB error
  lcd.clear();
  lcd.setCursor(0,0);
  lcd.print("DB ERROR");
  
  lcd.println("PLS CHECK LOG");
}
