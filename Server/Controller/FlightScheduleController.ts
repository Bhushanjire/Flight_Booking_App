import express = require('express');
import FlightScheduleSchema = require('../Database/Schema/FlightScheduleSchema');
import ResponceFormat = require('../Configuration/ResponceFormat');
import ResponeFormat = require('../Configuration/ResponceFormat');
class FlightScheduleController{
    constructor(){

    }

    create(request : express.request,responce :express.request){
        let flightScheduleData = request.body;
        FlightScheduleSchema.create(flightScheduleData,(error,result)=>{
            if(error){
                responce.status(400).send(ResponeFormat.setResponce(400,false,'Error while create flight schedule',error));
            }else{
                responce.status(200).send(ResponeFormat.setResponce(200,true,'Flight schedule created successfully',result));
            }
        })
    }

    retrive(request : express.request,responce :express.request){
        FlightScheduleSchema.find({},(error,result)=>{
            if(error){
                responce.status(400).send(ResponeFormat.setResponce(400,false,'Error while retrive flight schedule',null));
            }else{
                responce.status(200).send(ResponeFormat.setResponce(200,true,'Flight schedule list',result));
            }
        }).populate([
            {
                path : "flightId",
                model : "Flight"
            },
            {
                path : "fromCityId",
                model : "City"
            },
            {
                path : "toCityId",
                model : "City"
            }
        ])
    }
    retriveById(request : express.request,responce :express.request){
        let {id} = request.body
        FlightScheduleSchema.find({_id : id},(error,result)=>{
            if(error){
                responce.status(400).send(ResponeFormat.setResponce(400,false,'Error while retrive by id flight schedule',null));
            }else{
                responce.status(200).send(ResponeFormat.setResponce(200,true,'Flight schedule list',result));
            }
        })
    }
}

export = FlightScheduleController;
