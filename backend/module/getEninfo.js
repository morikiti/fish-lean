require('@tensorflow/tfjs-node');
//const tf = require('@tensorflow/tfjs');
const request = require('request');
const tensor = require('../module/tensorflow.js');

exports.getEnInfo = async function(lat,lng){ 
  let predict = 0;
  const url = "https://api.openweathermap.org/data/2.5/onecall?lat="+lat+"&lon="+lng+"&exclude=current,minutely,hourly&units=metric&appid="+(process.env.APIKEY);
  const options = { 
    url:url,
    method:'GET',
    headers: {  'Content-Type': 'application/json'}
  }
  console.log(lat);
  console.log(lng);

  try { 
    request(options,(err,res,body)=>{ 
      let tempinfo = JSON.parse(body);
        
      let temp_ave_mean = 13.6825; let temp_ave_std = 5.851837;
      let temp_max_mean = 17.66625; let temp_max_std = 5.997467;
      let temp_min_mean = 10.386250; let temp_min_std = 6.126819;
      let lain_mean = 2.668750; let lain_std = 6.567538;
      let sun_time_mean = 5.962500; let sun_time_std = 4.238294;
      let wind_gust_mean = 3.412500; let wind_gust_std = 0.936378;
      let hpa_mean = 1011.282500; let hpa_std = 5.502146;
            
      console.log(tempinfo);
      console.log(tempinfo.cod);
      if(!tempinfo.cod){ 
        let temp_ave = (tempinfo.daily[1].temp.day - temp_ave_mean)/temp_ave_std;
        let temp_max = (tempinfo.daily[1].temp.max - temp_max_mean)/temp_max_std;
        let temp_min = ( tempinfo.daily[1].temp.min - temp_min_mean)/temp_min_std;
        let lain = (tempinfo.daily[1].rain - lain_mean)/lain_std;
        let sun_time = (((tempinfo.daily[1].sunset-tempinfo.daily[1].sunrise)/3600) - sun_time_mean) / sun_time_std;
        let wind_gust = (tempinfo.daily[1].wind_gust - wind_gust_mean) / wind_gust_std;
        let pressure = (tempinfo.daily[1].pressure - hpa_mean)/hpa_std;
                
        if(!lain ) { 
          lain = 0;
        }
        //正規化後の数値
        console.log("平均気温"+temp_ave);
        console.log('最高気温'+temp_max);
        console.log('最低気温'+temp_min);
        console.log("降水量"+lain);
        console.log("日照時間"+sun_time);
        console.log("風光"+wind_gust);
        console.log("気圧"+pressure);
            
        predict = tensor.run(temp_ave,temp_max,temp_min,lain,sun_time,pressure);
        console.log("retun getEnInfo1 :: "+predict);
        //resolve(predict[0]);
        return predict[0];
                    
      }else { 
        return new Error('計算に失敗しました');
      }
    })
  } catch(err) { 
    console.log(err);
  }
        
/*     }
)  */};
//getEnInfo(35.678786,139.768575897);

