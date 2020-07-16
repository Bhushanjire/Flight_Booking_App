import express = require('express');
import FlightBookingSchema = require('../Database/Schema/FlightBookingSchema');
import FlighScheduleSchema = require('../Database/Schema/FlightScheduleSchema');
import UserSchema = require('../Database/Schema/UserSchema');
import ResponeFormat = require('../Configuration/ResponceFormat');

class FlightBookingController{
    constructor(){}

    create(request : express.request,responce : express.request){
        let flightBookingData = request.body;
        FlightBookingSchema.create(flightBookingData,(error,createResult)=>{
            if(error){
                responce.status(400).send(ResponeFormat.setResponce(400,false,'Error while create flight booking',error));
            }else{
                FlighScheduleSchema.update({_id : flightBookingData.flightScheduleId},{$push :{bookingSeats : flightBookingData.seactNumbers}},(error,updateResult)=>{
                    if(error){
                        responce.status(400).send(ResponeFormat.setResponce(400,false,'Error while update seat number booking',error));
                    }else{
                        UserSchema.update({_id : flightBookingData.userId},{$push : {bookingIds : createResult._id}},(error,userResult)=>{
                           if(error){
                            responce.status(400).send(ResponeFormat.setResponce(400,false,'Error while update booking Id',error));
                           }else{
                            responce.status(200).send(ResponeFormat.setResponce(200,true,'Flight booking created successfully',createResult));
                           } 
                        })
                    }
                })
            }
        })
    }

    retrive(request : express.request,responce : express.request){
        FlightBookingSchema.find({},(error,result)=>{
            if(error){
                responce.status(400).send(ResponeFormat.setResponce(400,false,'Error while retrive flight booking',error));
            }else{
                responce.status(200).send(ResponeFormat.setResponce(200,true,'Flight booking list',result));
            }
        }).populate([
            {
                path : "userId",
                model : "Users"
            },
            {
                path : "flightScheduleId",
                model : "FlightSchedule",
                populate : [
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
                ]
            }
        ])
    }

    retriveById(request : express.request,responce : express.request){
        let {id} = request.body
        FlightBookingSchema.find({_id : id},(error,result)=>{
            if(error){
                responce.status(400).send(ResponeFormat.setResponce(400,false,'Error while retrive by id flight booking',error));
            }else{
                responce.status(200).send(ResponeFormat.setResponce(200,true,'Flight booking list',result));
            }
        }).populate([
            {
                path : "userId",
                model : "Users"
            },
            {
                path : "flightScheduleId",
                model : "FlightSchedule",
                populate : [
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
                ]
            }
        ])
    }

    getBookingByUserId(request : express.request,responce : express.request){
        let {userId} = request.body
        FlightBookingSchema.find({userId : userId},(error,result)=>{
            if(error){
                responce.status(400).send(ResponeFormat.setResponce(400,false,'Error while retrive by user id flight booking',error));
            }else{
                responce.status(200).send(ResponeFormat.setResponce(200,true,'Flight booking list by userID',result));
            }
        }).populate([
            {
                path : "userId",
                model : "Users"
            },
            {
                path : "flightScheduleId",
                model : "FlightSchedule",
                populate : [
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
                ]
            }
        ])
    }
}

export = FlightBookingController;