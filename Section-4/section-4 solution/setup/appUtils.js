const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors')
const {getHistoricalEvents, subscribeToNewEvents} = require('../service/web3Service');


module.exports = function (app) {
    const corsOptions ={
        origin: "*", //'https://b283-2400-adc1-476-8200-9a03-5ffb-a666-1945.in.ngrok.io', 
        credentials:true, 
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE",           
        optionSuccessStatus:200
    }
    app.use(helmet());
    app.use(morgan('tiny'));
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(cors(corsOptions));
    getHistoricalEvents();
    subscribeToNewEvents();

}