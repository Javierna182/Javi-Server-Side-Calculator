const express = require('express');

const app = express();
const PORT = 8000;

app.use(express.static("server/public"));
app.use(express.json());

let totalArray = []// the values of mathFun will go here

app.get("/values", (req, res) => {
    res.send(totalArray);
});//Get for values

app.post('/values', (req, res) => {
    console.log(req.body);
    mathFun(req.body.value1, req.body.value2, req.body.symbol);//use the function for the values
    res.sendStatus(200);
});//post for values

app.get('/delete', (req, res) => {
    //to empty the total array
    console.log('delete');
    totalArray = [];
    res.sendStatus(200);
})

app.listen(PORT, () => {
    console.log("listening on port:", PORT);
});//listening to port

function mathFun(value1, value2, symbol){
    let total = 0
console.log(value1, value2, symbol);
    if(symbol === '+' ){
        total = value1 + value2;
    } if (symbol === '-' ){
        total = value1 - value2;
    } if (symbol === '*' ){
        total = value1 * value2;
    } if (symbol === '/' ){
        total = value1 / value2;
    }
    // math logic for the calculator
    totalArray.push({value1:value1, symbol:symbol, value2:value2, total:total});
}//ends mathFun
