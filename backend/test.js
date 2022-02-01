let config_pg = require('./config/config.js');
let { Client } = require('pg');

let client = new Client(config_pg);

client.connect();
//
/* client.query("SELECT NOW()", (err, res) => {
    console.log(err, res);
    client.end();
  }); 
*/

//データ登録
/* const query = {
    text: "INSERT INTO spots VALUES($1, $2, $3, $4 ,$5)",
    values: [48.6434323,134.0981432,"埼玉県結城市","フナ",5]
};
client
.query(query)
.then(res => { 
    console.log(res);
    client.end();
}).catch((err) => console.log(err.stack));
 */

//データを取得
const query = { 
    text: "SELECT * FROM spots",
};

client
.query(query)
.then((response)=> { 
    console.log(response.rows);
    client.end();
}).catch((err) => console.log(err.stack));

//データを削除する
/* const query = { 
    text: "DELETE FROM spots WHERE number = $1",
    values:[5]
};
client
.query(query)
.then((res) => { 
    console.log(res);
    client.end();
}).catch((err)=>{ console.log(err.stack) }); */


