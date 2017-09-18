function callUserService (data, callback) {

  const settings = {
    url: '/cfcs/users.cfc',
    data: data,
    dataType: 'json',
    type: 'GET',
    success: callback,
    fail: showAjaxError
  }

  $.ajax(settings);

}
function callDisasterService (data, callback) {

  const settings = {
    url: '/cfcs/disaster.cfc',
    data: data,
    dataType: 'json',
    type: 'GET',
    success: callback,
    fail: showAjaxError
  }

  $.ajax(settings);

}
function callUserInfoService (callback) {

  const settings = {
    url:'//ipfind.co/me',
    data:{
      auth:'24b87b97-a038-4552-90ad-a6f02489b5a2'
    },
    dataType:'json',
    type: 'GET',
    success: callback,
    fail: showAjaxError
  }
  $.ajax(settings);

}

function showAjaxError (data) {

  console.log(data);

}
