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

  let facebookUserData = [facebookResponse.authResponse.userID, facebookResponse.authResponse.accessToken];
  callFacebookGraphApiForTimeline(facebookUserData, listFacebookFeed);

}

// list facebook feed
function listFacebookFeed (data) {

  data['data'].map( post => {

    // setup post story for display
    let postStory = '';
    if ('story' in post) {
      postStory = `<div class="post-story">${post.story}</div>`;
    }

    // setup post message for display
    let postName = '';
    if ('name' in post) {
      postName = `<div class="post-name">${post.name}</div>`;
    }

    // setup post message for display
    let postMsg = '';
    if ('message' in post) {
      postMsg = `<div class="post-message">${post.message}</div>`;
    }

    // setup post description for display
    let postDescription = '';
    if ('description' in post) {
      postDescription = `<div class="post-description">${post.description}</div>`;
    }

    // setup post picture for display
    let postPicture = '';
    if ('picture' in post) {
      postPicture = `<div class="post-picture"><img src="${post.picture}"></div>`;
    }

    // put it all together
    let template = `
      <li>
        <a href="${post.permalink_url}" target="_blank">
          ${postStory}
          ${postName}
          ${postMsg}
          ${postPicture}
          ${postDescription}
        </a>
      </li>
    `;

    // send html to page
    $('.js-facebook-list').append(template);

  });

}

// This is called with the results from from FB.getLoginStatus().
function statusChangeCallback(response) {

  // if logged in
  if (response.status === 'connected') {

    // hide login instructions
    $('.js-facebook-status').hide();

    // send response to make call to FB API
    getFacebookUsersFeed(response);

  }

  // if not logged in or login failed
  else {

    $('#fb-status').html(`<p>Click the login button below to allow your Facebook Timeline to appear here. We will not post to your timeline or change anything, we just display your info.</p>`);

  }

  $('.js-facebook-loader').css('display', 'none');
  $('.social-media-feed.js-facebook-feed').css('display', 'block');

}

// This function is called when someone finishes with the Login Button. See the onlogin handler attached to it in the sample code below.
function checkLoginState() {
  FB.getLoginStatus(function(response) {
    statusChangeCallback(response);
  });
}

// calls youtube video search by video ID
function callFacebookGraphApiForTimeline (facebookUserData, callback) {

  // set API call parameters
  const settings = {
    url: `https://graph.facebook.com/${facebookUserData[0]}/feed`,
    data: {
      fields: 'id,from,name,message,created_time,story,description,link,picture,status_type,object_id,permalink_url',
      access_token: facebookUserData[1]
    },
    dataType: 'json',
    type: 'GET',
    success: callback,
    fail: showAjaxError
  };

  $.ajax(settings);

}
