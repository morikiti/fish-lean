const router = require('express').Router();
const config_pg = require('../config/config.js');
const { Client } = require('pg');



router.get('/',async (req,res)=>{ 

  const query = { 
    text: "SELECT * FROM spots",
  };

  let client = new Client(config_pg);

  try { 
    await client.connect();
    const response = await client.query(query);
    res.json(response.rows);
  } catch (err) { 
    console.log(err);
  } finally { 
    await client.end();
  }

    
});

router.get('/:id',async(req,res)=>{ 
  console.log(req.params.id);
  const query = { 
    text:`SELECT * FROM spots WHERE name = '${req.params.id}'`,
  };

  let client = new Client(config_pg);

  try { 
    await client.connect();
    const response = await client.query(query);
    res.json(response.rows)
  } catch (err) { 
    console.log(err)
  } finally { 
    await client.end();
  }
});



module.exports = router;