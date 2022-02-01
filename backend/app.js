const express = require('express');
//let bodyParser = require("body-parser");
const app = express();
//const cors = require('cors');
const path = require('path');
require('dotenv').config();
const port = process.env.PORT || 3001;

console.log(process.env.PORT);
console.log(process.env.APIKEY);
console.log(process.env.DATABASE_URL);

app.disable("x-powered-by");

app.use(express.static(path.join(__dirname, '../frontend/build')));

console.log(path.join(__dirname,'/routers'));

/* app.use('/',require('./routers/common.js'));
app.use("/api/spots", require('./routers/marker_spot.js'));
app.use('/api/fish', require('./routers/input_fish.js'));
app.use('/api/tensorflow',require('./routers/tensor.js')); */

app.use('/',require(path.join(__dirname,'/routers/common.js')))
app.use('/api/spots',require(path.join(__dirname,'/routers/marker_spot.js')));
app.use('/api/fish',require(path.join(__dirname,'/routers/input_fish.js')));
app.use('/api/tensorflow',require(path.join(__dirname,'/routers/tensor.js')));

app.use((req,res,next)=>{ 
  res.status(404);
  res.end('err'+req.path);
});

app.use((err,req,res,next)=>{ 
  res.status(500);
  res.end('500 err'+err);
});


app.get('*', (req, res) => { 
  res.sendFile(path.join(__dirname,'../frontend/build/index.html'));
}); 



app.listen(port,()=>{ 
  console.log(`Start Server ${port}`);
})