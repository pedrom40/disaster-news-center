var facebookAccessToken = '';
var facebookUserId = '';

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

// This is called with the results from from FB.getLoginStatus().
function statusChangeCallback(response) {

  // if logged in
  if (response.status === 'connected') {

    // hide login instructions
    $('.js-facebook-status').hide();

    facebookAccessToken = response.authResponse.accessToken;
    facebookUserId = response.authResponse.userID;

    getFacebookPages();

  }

  // if not logged in or login failed
  else {

    $('#fb-status').html(`<p>Click the login button below to allow your Facebook Timeline to appear here. We will not post to your timeline or change anything, we just display your info.</p>`);

  }

  $('.js-facebook-loader').css('display', 'none');
  $('.social-media-feed.js-facebook-feed').css('display', 'block');

}

// called when someone finishes with the Login Button
function checkLoginState() {
  FB.getLoginStatus(function(response) {
    statusChangeCallback(response);
  });
}

function getFacebookPages () {
  callFacebookPageSearchApi(listFacebookPages);
}

function listFacebookPages (data) {

  // start fresh
  $('.js-facebook-list').empty();

  data['data'].map( page => {

    // setup about
    var pageAbout = '';
    if ('about' in page) {
      pageAbout = `<div class="post-name">${page.about}</div>`;
    }

    // setup phone
    var pagePhone = '';
    if ('phone' in page) {
      pagePhone = `Phone: ${page.phone}<br>`;
    }

    const template = `
      <li>
        <a href="${page.link}" target="_blank">
          <div class="post-story">${page.name}</div>
          <div class="post-picture"><img src="${page.cover.source}"></div>
          <div class="post-description">
            ${pageAbout}
            ${pagePhone}
            Category: ${page.category}<br>
            Likes: ${page.fan_count}
          </div>
        </a>
      </li>
    `;

    $('.js-facebook-list').append(template);

  });

}

function callFacebookPageSearchApi (callback) {

  const settings = {
    url: `https://graph.facebook.com/search/`,
    data: {
      access_token: facebookAccessToken,
      q: disasterName,
      type: 'page',
      fields: 'name,about,link,category,cover,fan_count,phone'
    },
    dataType: 'json',
    type: 'GET',
    success: callback,
    fail: showAjaxError
  };

  $.ajax(settings);

}
