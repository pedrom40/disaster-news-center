// load facebook data
function loadFacebookData () {

  window.fbAsyncInit = function() {

    FB.init({
      appId  : '1815852052059120',
      cookie : true,  // enable cookies to allow the server to access the session
      xfbml  : true,  // parse social plugins on this page
      version: 'v2.8' // use graph api version 2.8
    });

    FB.getLoginStatus(function(response) {
      statusChangeCallback(response);
    });

  };

  // Load the SDK asynchronously
  (function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = "https://connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));

}

// load facebook user's feed
function getFacebookUsersFeed (facebookResponse) {

  let facebookUserData = [facebookResponse.authResponse.userID, facebookResponse.authResponse.accessToken]
  callFacebookGraphAPI(facebookUserData, listFacebookFeed);

}

// This is called with the results from from FB.getLoginStatus().
function statusChangeCallback(response) {
  //console.log('statusChangeCallback');
  //console.log(response);
  // The response object is returned with a status field that lets the app know the current login status of the person.
  // Full docs on the response object can be found in the documentation for FB.getLoginStatus().
  if (response.status === 'connected') {

    // hide login instructions
    $('.js-facebook-status').hide();

    // send response to make call to FB API
    getFacebookUsersFeed(response);

  }
  else {
    // The person is not logged into your app or we are unable to tell.
    document.getElementById('status').innerHTML = '<p style="color:red">Please log into to view posts.</p>';
  }
}

// This function is called when someone finishes with the Login Button. See the onlogin handler attached to it in the sample code below.
function checkLoginState() {
  FB.getLoginStatus(function(response) {
    statusChangeCallback(response);
  });
}

// list facebook feed
function listFacebookFeed (data) {
  console.log(data);
}

// calls youtube video search by video ID
function callFacebookGraphAPI (facebookUserData, callback) {
  console.log(facebookUserData);
  // set API call parameters
  const settings = {//
    url: `https://graph.facebook.com/${facebookUserData[0]}/feed`,
    data: {
      access_token: facebookUserData[1]
    },
    dataType: 'json',
    type: 'GET',
    success: callback,
    fail: function(data){
      console.log(data);
    }
  };

  $.ajax(settings);

}
