const express = require('express');
const cors = require('cors');
const { json, response } = require('express');
const request = requires('request');

const app = express();
app.use(cors())


const CLIENT = 'AfPJMQBHFBvmDRPv2fqRdq4_mLlJhhIUdoeOADVTOlB1hntHqB2nTMhDKvACIai2R3MYE4C6CPNKn01i'
const SECRET = 'EGnCQkfv0qah69-Ro8cMw5P3_eNQ2PwPVmQGzOKvvR7_T653nQDU75v6eQpkHt-PqyL8sklP0hVnrmKI'
const PAYPAL_API = 'https://api-m.sandbox.paypal.com'; //'https://api-m.paypal.com'

const auth = {user: CLIENT, pass: SECRET} 


const createPayment = (req,res) =>{

    const body = {
        intent: 'CAPTURE',
        purchase_units: [{
            amount: {
                currency_code: 'USD',
                value:'80'
            }
        }],
        application_context:{
            brand_name: 'Parchita.com',
            landind_page: 'NO PREFERENCE',
            user_action: 'PAY_NOW',
            return_url: 'http://localhost:3000/execute-payment',
            cancel_url: 'http://localhost:3000/cancel-payment'
        }
    }

    request.post(`${PAYPAL_API}/v2/checkout/orders`,{
        auth,
        body,
        json: true
    }, (err,response) => {
        res.json({ data: response.body })
    })
}

const executePayment = (req, res) => {
    const token = req.query.token;
    console.log(`${PAYPAL_API}/v2/checkout/orders/${token}/capture`)

    request.post(`${PAYPAL_API}/v2/checkout/orders/${token}/capture`,{
        auth,
        body: {},
        json: true
    }, (err,response) => {
        res.json({ data: response.body})
    })
}
    


//     http://localhost:3000/create-payment [POST]
app.post(`/create-payment`, createPayment)


app.get(`/execute-payment`, executePayment)


app.listen(3000, () =>{
console.log(`Comenzamos a generar dinero ---> http://localhost:3000`)
})