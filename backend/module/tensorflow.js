require('@tensorflow/tfjs-node');
const tf = require('@tensorflow/tfjs');
const { Client } = require('pg');
const config_pg = require('../config/config');

exports.run =  async function run(temp_ave,temp_max,temp_min,lain,sun_time,pressure) { 
  const path = "file://"+__dirname+"/tfjs_model2/model.json";
  const model = await tf.loadLayersModel(path);

  const a = tf.tensor2d([[temp_ave,temp_max,temp_min,lain,sun_time,pressure]]);
  //predict
  let y_pred = await model.predict(a);

  //配列に変換
  const values = await y_pred.data();
  const arr = Number(values);
  console.log("values : "+ arr);

  let client = new Client(config_pg);

  let query = {
    text:"DELETE FROM predict",
  };
    
  try { 
    await client.connect();
    const response = await client.query(query);
    console.log(response);
  } catch(err) { 
    console.log(err);
  } finally { 
    // await client.end();
  }

  query = { 
    text: "INSERT INTO predict VALUES($1)",
    values: [arr]
  };

  try { 
    const response = await client.query(query);
    console.log(response);
  } catch(err) { 
    console.log(err);
  } finally { 
    await client.end();
  }

  return values;
}
//run(0.156788	,0.072322,	0.132818,	-0.406355	,-0.628201	,-0.440527	,0.639296);
