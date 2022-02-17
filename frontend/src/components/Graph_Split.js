import React from 'react';
import { BarChart, Bar, XAxis, YAxis,  ResponsiveContainer } from 'recharts';

const Graph = (props) => { 

  return(
    <div className = "graph2">
      <div className = "App"><button  onClick = {props.get_fish}>再描画</button></div>
      {<h3 className = "Title">部分統計</h3>}
      <div style={props.containerStyle}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart width={150} height={40} data={props.graph}>
            <XAxis label={{value:"魚種", offset: -5,position: "insideBottom"}} dataKey= "name"/>
            <YAxis label={{value:"匹数", angle: 90, position: "insideLeft"}}/>
            <Bar dataKey="uv" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Graph;