const config_pg = require('../config/config.js');
const router = require("express").Router();
const { Client } = require('pg');
const bodyParser = require("body-parser");
const cors = require('cors');
const changeSpot = require('../module/change_spot.js');


router.use(bodyParser.urlencoded({extended:true}));
router.use(bodyParser.json());
router.use(cors());

router.get("/",(req,res) => { 
  console.log('--GET Request---');
  console.log('nameは、'+req.query.lat);
  console.log('ageは、'+req.query.lng);
  res.send("fish");
});

router.post("/",async (req,res) => { 
  console.log('--POST Request---');
  console.log('latは、'+req.body.lat);
  console.log('lngは、'+req.body.lng);
  console.log('nameは、'+req.body.name);
  console.log('numberは、'+req.body.number);

   
    

  if(req.body.lat && req.body.lng && req.body.name && req.body.number && req.body.number >= 1 ){ 
    let spots = await changeSpot.change_spots(req.body.lng,req.body.lat);
    /*  .catch(()=>{return "海上"}); */
        
    let client = new Client(config_pg);

    console.log(spots);
    const query = { 
      text: "INSERT INTO spots(lat,lng,spot,name,number) VALUES($1,$2,$3,$4,$5)",
      values: [req.body.lat, req.body.lng,spots ,req.body.name,req.body.number]
    };

    try { 
      await client.connect();
      const response = await client.query(query);
      console.log(response);
    } catch (err) { 
      console.log(err);
    } finally { 
      await client.end();
    }



  } else { 
    console.log("空の要素があります。")
    res.json({message:"error"});
  }
});


module.exports = router;
