//import { coinFlip, coinFlips, flipACoin, countFlips } from './modules/coin.mjs'
// Require Express.js
const express = require('express')
const app = express()

const args = require("minimist")(process.argv.slice(2))
// Define allowed argument name 'port'.
args["port"]

const HTTP_PORT = args.port || process.env.port || 3000

// Start an app server
const server = app.listen(HTTP_PORT, () => {
    console.log('App listening on port %PORT%'.replace('%PORT%',HTTP_PORT))
});

app.get('/app/', (req, res) => {
    // Respond with status 200
        res.statusCode = 200;
    // Respond with status message "OK"
        res.statusMessage = 'OK';
        res.writeHead( res.statusCode, { 'Content-Type' : 'text/plain' });
        res.end(res.statusCode+ ' ' +res.statusMessage)
});

app.get('/app/flip/', (req, res) => {
    result = coinFlip();
    res.status(200).json({"flip": result})
});

app.get('/app/flips/:number', (req, res) => {
    const flips = coinFlips(req.params.number)
    const count = countFlips(flips);
    res.status(200).json({"raw":flips, "summary": {"heads": count, "tails": flips.length-count}})
});

app.get('/app/flip/call/heads', (req, res) => {
    const game = flipACoin("heads");
    coinResult = coinFlip();

    if (coinResult === "heads") {
        result = 'win';
    } else {
        result = 'lose'
    }

    res.status(200).json({"call":"heads","flip":coinResult,"result":result});
});

app.get('/app/flip/call/tails', (req, res) => {
    const game = flipACoin("tails");
    coinResult = coinFlip();

    if (coinResult === "heads") {
        result = 'win';
    } else {
        result = 'lose'
    }

    res.status(200).json({"call":"tails","flip":coinResult,"result":result});
});


app.use(function(req, res){
    res.status(404).send('404 NOT FOUND')
});






/** Coin flip functions 
 * This module will emulate a coin flip given various conditions as parameters as defined below
 */

 /** Simple coin flip
  * 
  * Write a function that accepts no parameters but returns either heads or tails at random.
  * 
  * @param {*}
  * @returns {string} 
  * 
  * example: coinFlip()
  * returns: heads
  * 
  */
 
 function coinFlip() {
   return (Math.floor(Math.random()*2) == 0) ? 'heads' : 'tails';
 }
 
 /** Multiple coin flips
  * 
  * Write a function that accepts one parameter (number of flips) and returns an array of 
  * resulting "heads" or "tails".
  * 
  * @param {number} flips 
  * @returns {string[]} results
  * 
  * example: coinFlips(10)
  * returns:
  *  [
       'heads', 'heads',
       'heads', 'tails',
       'heads', 'tails',
       'tails', 'heads',
       'tails', 'heads'
     ]
  */
 
 function coinFlips(flips) {
   let array = new Array();
   for (let i = 0; i < flips; i++) {
     array.push(coinFlip());
   }
   return array;
 }
 
 /** Count multiple flips
  * 
  * Write a function that accepts an array consisting of "heads" or "tails" 
  * (e.g. the results of your `coinFlips()` function) and counts each, returning 
  * an object containing the number of each.
  * 
  * example: conutFlips(['heads', 'heads','heads', 'tails','heads', 'tails','tails', 'heads','tails', 'heads'])
  * { tails: 5, heads: 5 }
  * 
  * @param {string[]} array 
  * @returns {{ heads: number, tails: number }}
  */
 
 function countFlips(array) {
   let headsNum = 0;
   let tailsNum = 0;
   array.forEach(element => {
     if (element === 'heads') {
       headsNum++;
     } else {
       tailsNum++;
     }
   });
   return headsNum;
 }
 
 /** Flip a coin!
  * 
  * Write a function that accepts one input parameter: a string either "heads" or "tails", flips a coin, and then records "win" or "lose". 
  * 
  * @param {string} call 
  * @returns {object} with keys that are the input param (heads or tails), a flip (heads or tails), and the result (win or lose). See below example.
  * 
  * example: flipACoin('tails')
  * returns: { call: 'tails', flip: 'heads', result: 'lose' }
  */
 
 function flipACoin(call) {
     let result = '';
     const coinResult = coinFlip();
 
     if (coinResult === call) {
         result = 'win';
     } else {
         result = 'lose'
     }
 
     return "{\"call\":\""+ call +"\",\"flip\":\""+ coinResult+"\",\"result\":\""+result+"\"\\}"
 
     
 }
 
 
 /** Export 
  * 
  * Export all of your named functions
 */
 