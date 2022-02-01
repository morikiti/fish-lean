const GetInfo = (props) =>{ 
    

  return( 
    <div className ="App">
      {props.lat && <p>緯度:{props.lat}°</p>} {props.lng && <p>経度:{props.lng}°</p>}
      <button onClick={props.getEnInfo2}>気候情報取得</button>
      {props.Info.whether && <p>天気:{props.Info.whether}</p>} 
      {props.Info.icon && <img src= {`http://openweathermap.org/img/w/${props.Info.icon}.png`} alt="icon"/>} 
      {props.Info.temperture && <p>温度:{props.Info.temperture}℃</p>} 
      {props.Info.lain && <p>降水量:{props.Info.lain}mm</p>}
      {props.Info.sun_time && <p>日照時間:{props.Info.sun_time}時間</p>} 
      {props.Info.pressure && <p>気圧:{props.Info.pressure}hPa</p>}
    </div>
  );
}
export default GetInfo;