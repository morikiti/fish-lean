import  { useState,useEffect } from 'react';
import axios from "axios";
import Title from './components/Title';
import './App.css';
import Button from './components/Button';
import React from 'react';
import Map from './components/Map';
import Graph from './components/Graph';
import Graph2 from './components/Graph2';
import GetInfo from './components/GetInfo';
import env from "dotenv"
env.config()

//console.log(process.env.APIKEY);
//const Apikey = dotenv.config(process.env.APIKEY);

const Apikey = (process.env.REACT_APP_APIKEY);
console.log(Apikey);

function App() { 
  const [spots, setSpots] = useState('');
  const [predict, setPredict] = useState('');
  const [graph,setGraph] = useState('');
  const [lat, setLat] = useState('');
  const [lng, setLng] = useState('');
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [Info, setInfo] = useState({
    whether:"",
    icon:"",
    temperture:"",
    lain:"",
    sun_time:"",
    wind:"",
    pressure:"",
  });

  const containerStyle = { 
    height: "80vh",
    width: "100%",
  };

  const changeName = (e) => { 
    setName(e.target.value);
  }

  const changeNumber = (e) => { 
    setNumber(Number(e.target.value));
  }

  const setLatLng = ({ lat, lng }) => {
    console.log(lat);
    console.log(lng);
    setLat(lat);
    setLng(lng);
  };

  const header = {'Content-Type':'application/json'};
  const handleSubmit = async(e) => { 
    e.preventDefault();
    const data = {lat : lat, lng : lng, name: name, number:number};
    const options = { 
      method: 'POST',
      mode:'cors',
      cache: 'no-cache',
      headers: header,
      body: JSON.stringify(data)
    }

    await fetch('/api/fish',options).then((res)=>{ 
      console.log('finish api call -response:::',res);
      console.log(res.body)
      if(!lat || !lng || !name || !number || number <= 0 ) { 
        alert('入力値に誤りがあるか、空白があります。');
      }
    }).catch((error)=>{ 
      console.log('something wrong:::',error);
    });
  }

  //関数の不具合による代替処理。
  let run_learn = false;
  const handleSubmit2 = async(e) => { 
    e.preventDefault();
    run_learn = true;
    const data = {lat : lat, lng : lng};
    const options = { 
      method: 'POST',
      mode:'cors',
      cache: 'no-cache',
      headers: header,
      body: JSON.stringify(data)
    }
    //"http://localhost:3001/api/tensorflow"
    await fetch("/api/tensorflow",options).then((res)=>{ 
      console.log(res);
      if(!lat || !lng) { 
        alert("座標が入力されていません");
      }
    }).catch((error)=>{ 
      console.log('something wrong:::',error);
    });
  }

  const getEnInfo2 = async function(e){ 
    e.preventDefault();
    const url = "https://api.openweathermap.org/data/2.5/onecall?lat="+lat+"&lon="+lng+"&units=metric&appid="+Apikey;
    if(!lat || !lng) { 
      alert("座標が入力されていません。地図上をクリックしてください。");
    } else { 
      axios.get(url)
        .then(res => {
          setInfo({
            whether: res.data.daily[1].weather[0].main,
            icon: res.data.daily[1].weather[0].icon,
            temperture:  res.data.daily[1].temp.day,
            lain: res.data.daily[1].rain,
            sun_time: (res.data.daily[1].sunset - res.data.daily[1].sunrise)/3600,
            wind: res.data.daily[1].wind_gust,
            pressure: res.data.daily[1].pressure
          })
        }).catch((err)=>{ 
          console.log(err);
        });
    }
  }

    
  useEffect(()=>{ 
    fetch('/api/spots')
      .then((res) => res.json())
      .then((data) => setSpots(data));
  },[])

   
  let locates = [];
  for(let la of spots) { 
    let locate = {lat:Number(la.lat), lng : Number(la.lng), name: la.name, number: la.number};
    locates.push(locate);
  } 

  let fishes = []
  for (let fish of spots) { 
    let flag = true;
    let fishs = {name:fish.name,uv:Number(fish.number)};
    for(let j = 0; j < fishes.length; ++j) { 
      if(fishes[j].name === fishs.name) { 
        fishes[j].uv += fishs.uv;
        flag = false; 
      }
    }
    if(flag === true) fishes.push(fishs);
  }

    
  //グラフを再描画するための配列を用意するメソッド
  const get_fish = async function(e) { 
    e.preventDefault();
    let fishs = [],fishs2 = [];
    if(!lat || !lng) { 
      alert("座標が入力されていません。地図上をクリックしてください。")
    } else { 
      for (let i of spots) { 
        if(Math.sqrt(Math.pow((i.lat-lat),2)+Math.pow((i.lng-lng),2)) < 0.2) { 
          fishs.push({name: i.name, uv: Number(i.number)});
        }
      }
      for (let fish of fishs) { 
        let flag = true;
        let f = {name:fish.name,uv:Number(fish.uv)};
        console.log(f);
        for(let j = 0; j < fishs2.length; ++j) { 
          if(fishs2[j].name === f.name) { 
            console.log("fishes"+Number(fishs2[j].uv));
            console.log("f"+f.uv);
            fishs2[j].uv += f.uv;
            flag = false; 
          }
        }
        if(flag === true) fishs2.push(f);
      }

      setGraph(fishs2);
    }
  };

      
  const handleApiLoaded = ({map,maps})=>{ 
    const bounds = new maps.LatLngBounds();

    locates.forEach((locate)=>{ 
      const info = new maps.InfoWindow({ 
        position:{ 
          lat: locate.lat,
          lng: locate.lng,
        },
        content: `${locate.name}: ${locate.number}匹`,
        map,
      });
      const marker = new maps.Marker({
        position:{ 
          lat: locate.lat,
          lng: locate.lng,
        },
        map,
      });
      bounds.extend(info.position);
      bounds.extend(marker.position);
    });
  }

  const loadInfo = () => { 
    if(run_learn){ 
      run_learn = false;
      axios.get('/api/tensorflow')
        .then(res => { setPredict(res.data[0].predict);
          console.log(res.data.predict) 
        }).catch(err => { console.log(err)});
    }else { 
      alert('機械学習ボタンを押してください')
    }
  };


    
  return(
    <div >
      <Title />
      <Map class = "App"  setLatLng={setLatLng} handleApiLoaded = {handleApiLoaded}/>
      <GetInfo getEnInfo2={getEnInfo2} Info ={Info}/>
      <Button 
        lat={lat} lng = {lng} naem={name} number = {number} Info ={Info} predict = {predict} 
        getEnInfo2={getEnInfo2} handleSubmit ={handleSubmit}
        handleSubmit2={handleSubmit2} loadInfo = {loadInfo} 
        changeName = {changeName} changeNumber ={changeNumber}
      /> 
      <Graph containerStyle={containerStyle}  fishes = {fishes}/>
      {/* マーカを近距離に置き続けると重なって見えなくなる。
      そのため、クリックした場所の近くの統計をグラフとして表示 */}
      <Graph2 containerStyle={containerStyle} get_fish = {get_fish}  graph = {graph}/>
    </div>
  );
}

export default App;