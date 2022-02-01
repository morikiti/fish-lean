const request = require('request');


exports.change_spots = async function(lat,lng) { 
  const url = `http://geoapi.heartrails.com/api/json?method=searchByGeoLocation&x=${lat}&y=${lng}`;
  console.log(url);
  request(url,(err,res,body) => {
    let position = JSON.parse(body);
    console.log(position.response);
    if(!position.response.error) {
      return (position.response.location[0].prefecture + position.response.location[0].city);
    } else { 
      return '海上';
    }
  })
}