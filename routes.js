/*
 Copyright 2016 Google, Inc.

 Licensed to the Apache Software Foundation (ASF) under one or more contributor
 license agreements. See the NOTICE file distributed with this work for
 additional information regarding copyright ownership. The ASF licenses this
 file to you under the Apache License, Version 2.0 (the "License"); you may not
 use this file except in compliance with the License. You may obtain a copy of
 the License at

 http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 License for the specific language governing permissions and limitations under
 the License.
 */

'use strict';

var express = require('express');
var SheetsHelper = require('./sheets');
var router = express.Router();

//Build request to SheetsHelper
var helper = new SheetsHelper(function(){
    console.log('SheetsHelper initialized');
});

router.get('/spreadsheets/reservations', function (req, res, next) {

    if(!helper){
        res.status(500).send({error: "Sheets helper not defined. Cannot retrieve sheet"});
        return;
    }

    helper.getSpreadsheet(function(result){
        console.log('Success getting spreadsheet!', result);
        res.send(result);
    }, function(error){
        console.log('Error getting spreadsheet', error);
    });
});


router.post('/spreadsheets/reservations', function (req, res, next) {

    if(!helper){
        res.status(500).send({error: "Sheets helper not defined. Will not update"});
        return;
    }

    //Open a buffer to read the request body.
    var reservation = [];
    req.on('data', function (chunk) {
        reservation .push(chunk);
    }).on('end', function () {
        reservation = JSON.parse(Buffer.concat(reservation).toString());

        console.log('Gonna updateSpreadsheet');
        helper.updateSpreadsheet(reservation, function(err) {
            if (err) {
                return next(err);
            } else {
                res.send({"message":"successful update"});
            }
        });
    });
});

module.exports = router;