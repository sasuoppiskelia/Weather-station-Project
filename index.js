'use strict'

var mysql = require('mysql')
var connection;
testFunction();

function testFunction(){
  connection = mysql.createConnection( {
      host      : '127.0.0.1',
      user      : 'weather_station_manager', //your user details here
      password  : 'cat123',
      database  : 'weather_stations'
  });
connection.connect();
/*  getAllSensorData();
  getSpecificSensorData(2).then(results =>{
      console.log('results from sensor :' + results);
  })
  let newSensor = {
    id: 5,
    name: "windSensor",
    station_id: 1,
    type: "wind"
  };

  getNewSensor(newSensor.id, newSensor.station_id, newSensor.name, newSensor.type);
  let data = `{
    "sensor_ID:" 345 ,
    "Station_ID:" 4,
    "name:" 4air
    "Type:" air_pressure
    "latest:" 1024
    "Error:" false
  }`;

*/
  changeStatusError(2)
  connection.end();


  }
//  insertDataPulse(data);


/*
getSensorDataByLocation(gps).then(results => {
  console.log(results);
})


function getSensorDataByLocation(gps) {
  let sql = `SELECT sd.measurementTime, sd.measurement FROM sensor_data sd, station st, sensor_id = ${sensor_ID}`
  return new Promise( (resolve, reject) => {
    connection.query(sql, (error,results) =>{
      if(error) reject(error);
      else if (result.length === 0) resolve("No records found")
      else {
        resolve(JSON.stringify(results));
      }
    })
  })
}; */


/*testFunction();

function testFunction(){
  connection.connect();*/
        /*then() will get executed after the promise has been resolved,
      /*  selectSpecificSensorData(1).then(results =>{
          console.log(results);
        });
        selectSpecificSensorData(4).then(results =>{
          console.log(results);
        });
        selectSpecificSensorData(7).then(results => {
          console.log(results);
          connection.end();
        });
        conole.log("Hello"); //gets console.log first. Why?
}*/

function selectSpecificSensorData(sensor_ID){
    let sql = `SELECT measurement FROM sensor_data WHERE sensor_ID = ${sensor_ID}`

    return new Promise( (resolve, reject) => {
      connection.query(sql, (error, results) =>{
        if(error) reject(error);
        else if (results.length === 0) resolve("No records found")
        else {
          resolve(JSON.stringify(results));
        }
      });
    });
}
function getAllSensorData() {

let sql = 'SELECT * FROM sensor_data';

  connection.query(sql, function(error, results){
    if(error == true) console.log("Something went wrong");
    else console.log("Success, here are the results: "+ JSON.stringify(results));
  });
}

function getSpecificSensorData(sensor_ID) {
  let sql = `SELECT measurement FROM sensor_data WHERE sensor_ID = ${sensor_ID}`

  return new Promise( (resolve, reject) => {
    connection.query(sql, (error,results) => {
      if(error) reject(error);
      else if (results.length === 0) resolve("No records found")
      else {
        resolve(JSON.stringify(results));
      }
    })
  })
};

function getNewSensor(sensor_ID, station_ID, name, type) {

    let sql = `INSERT INTO sensor(Sensor_ID, Station_ID, Name, Type) VALUES (${sensor_ID}, ${station_ID}, "${name}", "${type}") `;

    return new Promise( (resolve, reject) => {
      connection.query(sql, (error,results) => {
        if(error) reject(error);
        else if (results.length === 0) resolve("No records found")
        else {
          console.log("Inserte into table succesfully")
          resolve(JSON.stringify(results));
        }
      })
    })
  }


function changeStatusError(sensor_id) {

console.log(sensor_id)

  let sql = `UPDATE stations SET Error = 0 WHERE Station_ID = 2; `;

      connection.query(sql, (error,results) =>{
        if(error) throw error;
        else console.log("success")
      });

}
