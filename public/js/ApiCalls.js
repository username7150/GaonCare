

module.exports = async function Api(location) {
  const api = `https://api.opencagedata.com/geocode/v1/json?q=${location}&key=${process.env.API_KEY}`;
  console.log(api)
  const res = await fetch(api);
  const data = await res.json();
  const lat = data.results[0].geometry.lat;
  const lng = data.results[0].geometry.lng;
  return { lat , lng };
}

