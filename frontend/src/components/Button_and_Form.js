import React from 'react';
console.log(process.env.APIKEY);

const Button = (props) => { 

  const containerStyle = { 
    height: "80vh",
    width: "100%",
  };

   
  return (
    <div style={containerStyle} >
      <div className="App">
        {<p>緯度:{props.lat}</p>} {<p>経度:{props.lng}</p>}
            
        {/*  <button onClick={props.getEnInfo2}>気候情報取得</button>
            {<p>温度:{props.Info.temperture}</p>} {<p>降水量:{props.Info.lain}</p>}
            {<p>日照時間:{props.Info.sun_time}時間</p>} {<p>気圧:{props.Info.pressure}</p>} */}
      </div>
          
      <div className="contents">
        <div className="item">
          {<p>緯度</p>} 
        </div>
            
        <div className="item">
          {<p>経度</p>} 
        </div>

        <div className="item">
          {<p>魚種</p>}
        </div>

        <div className="item">
          {<p>匹数</p>}
        </div>
      </div>

      <div className="App">
        <form onSubmit={props.handleSubmit}>
          <input value={props.lat}  name='lat' type='text'/>
          <input value={props.lng} name='lng' type='text'/>
          <input name='name' type = 'text' onChange={props.changeName} />
          <input name='number' type = 'number' onChange={props.changeNumber} />
          <button type='submit'>位置登録ボタン</button>
        </form>
      </div>

      <div className = "App">
        <form onSubmit={props.handleSubmit2}>
          <button type='submit'>機械学習ボタン</button>
          <button onClick={props.loadInfo}>表示</button>
        </form>
        {<p>予想釣果:{props.predict}匹くらいつれるかも。。。</p>}
      </div>
        
    </div>
  );
};

export default Button;