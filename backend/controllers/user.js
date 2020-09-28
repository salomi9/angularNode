
const userSchema = require('../models/user')
const nodeDataSchema = require('../models/nodeData');
const ObjectId = require('mongoose').Types.ObjectId
const { check, validationResult, buildCheckFunction } = require('express-validator')
const moment = require('moment');



function convertArraysTo2DecimalPoints(data) {
        if (data == undefined || null) {
            return [];
        }
        else {
            for (var i = 0; i < data.length; i++) {
                if (typeof (data[i]) == "number") {
                    data[i] = parseFloat(data[i].toFixed(2))
                }
    
            }
            return data;
        }
    
    }

function demo(req, res) {
  
        return res.status(200).send({ "name": "Salomi Edward!" })
   

}

function demoPost(req, res){
        console.log("req params", req.body);
}


function harmonics(req, res) {
        try {
            console.log("**********Calling Power Quality Harmonics**************");
        //     if (req.body.companyId && req.body.selectedDate) {
                let companyId = "58a1585836deed564c3c223d";
                let selectedDate = "2020-03-18T00:00:00Z";
                let startdate = new Date(new Date(selectedDate).setHours(00, 00, 00));
                let enddate = new Date(new Date(selectedDate).setHours(23, 59, 59));
                let avgthd = 0;
                let avgarray = [];
                let iterator = 0;
                let axis = [];
                // getNodeIdWithoutCallback(companyId)
                //     .then(nodeData => {
                        let nodeData = ["0013A200415A4D0601","0013A200415A4D0602"];
                        let temp = 3 * nodeData.length;
                        for (let i = 0; i < nodeData.length; i++) {
                            nodeDataSchema.find({
                                "node_id": nodeData[i],
                                "timestamp": {
                                    "$gte": startdate,
                                    "$lte": enddate
                                }
                            })
                            .limit(20)
                                .then(data => {
                                    if (data.length > 0) {
                                        for (let j = 0; j < data.length; j++) {
                                                if(axis.length < 20){
                                                        axis.push(moment(data[j].timestamp).utc().format("HH:mm"));
                                                }
                                            
                                            avgthd = (data[j].value[0].yphthd + data[j].value[0].bphthd + data[j].value[0].rphthd) / temp;
                                            avgarray[j] = avgarray[j] == undefined ? avgthd : avgarray[j] + avgthd;
                                        }
                                    }
                                    iterator++;
                                    senddetails(iterator, avgarray);
                                })
                                .catch(e => {
                                    console.log("********** Error caught in Power Quality Harmonics**************", e);
                                    res.send({
                                        "message": "Internal Server Error 1"
                                    })
                                })
                        }

                        function senddetails(iterator, avgarray) {
                            console.log("in send details", iterator)
                            // console.log("frequency values :", freq(avgarray));
                            if (iterator == nodeData.length) {
                                res.send({
                                    "axis": axis,
                                    "AvgArr": convertArraysTo2DecimalPoints(avgarray),
                                })
                            }
                        }
                
                //     })
                //     .catch(e => {
                //         console.log("********** Error caught in Power Quality Harmonics**************", e);
                //         res({
                //             "message": "Internal Server Error 1"
                //         })
                //     })
        //     }
        //     else {
        //         res({
        //             "message": "Company Id/ Selected Date is null or undefined"
        //         })
        //     }
        }
        catch (e) {
            console.log("********** Error caught in Power Quality Harmonics**************", e);
            res.send({
                "message": "Internal Server Error"
            })
        }
    }




module.exports = {
  
   
    //APIs
   demo,
   demoPost,
   harmonics
}