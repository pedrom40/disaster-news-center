function getWeatherData () {

  const qData = {

  }
  callNoaaService(qData, listWeatherData);
}
function listWeatherData (data) {
  console.log(data);
}

function callNoaaService (data, callback) {

  const settings = {
    url: 'https://www.ncdc.noaa.gov/cdo-web/api/v2/datasets',
    data: data,
    headers: {
      token: 'snbDcgAEeRsqwiTNzUuiGFoLIPhunBhG'
    },
    dataType: 'json',
    type: 'GET',
    success: callback,
    fail: showAjaxError
  }
  $.ajax(settings);

}
