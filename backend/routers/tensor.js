const router = require("express").Router();
let bodyParser = require("body-parser");
const cors = require('cors');
const tensorflow = require('../module/getEninfo.js');

const { Client } = require('pg');
let config_pg = require('../config/config');

router.use(bodyParser.urlencoded({extended:true}));
router.use(bodyParser.json()); 
router.use(cors());


router.get("/",async (req,res) => { 

  let client = new Client(config_pg);

  const query = {
    text: "SELECT * FROM predict",
  };

  try { 
    await client.connect();
    const response = await client.query(query);
    console.log("fdjsklaaslfAAAAAAAAAAAAAAAAAAAAAAAAAAAAda;d"+JSON.stringify(response.rows));
    res.json(response.rows);
  } catch(err) { 
    console.log(err);
  } finally { 
    await client.end();
  }
 
});

router.post("/",async (req,res) => {
  if(req.body.lat && req.body.lng){ 
    let lat = req.body.lat;
    let lng = req.body.lat;

    const ans = await tensorflow.getEnInfo(lat,lng)
      .then((res)=>{ console.log(res)})
      .catch((err) => { console.log(err)});
        
    console.log("ans" +ans);
    res.json(ans);

  } else { 
    res.json({message:"error"});
  }
});

module.exports = router;
