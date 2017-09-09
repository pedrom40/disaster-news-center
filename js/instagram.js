function listenForInstagramClick () {

  $('.js-instagram-feed').click( event => {

    if (event.target.className === 'js-authorize-instagram') {

      const appInfo = getInstagramAppInfo();
      window.location.href = `${appInfo.authUrl}?client_id=${appInfo.client_id}&redirect_uri=${appInfo.redirect_uri}&response_type=${appInfo.response_type}`;

    }

  });

}

function loadInstagramContent () {

  // look for token cookie
  let accessToken = getCookieValue('instagramToken');

  // check for access token cookie
  if (accessToken !== '') {

    // call instagram api
    callInstagramApi(accessToken, listInstagramContent);

  }

  // no cookie, so check for token in url
  else {

    // get current url
    let currentUrl = window.location.href.toString();

    // check for access token
    if (currentUrl.search('access_token') !== -1) {

      // split url
      let splitUrl = currentUrl.split('=');

      // save access token value
      accessToken = splitUrl[1];

      // save token as cookie
      document.cookie = `instagramToken=${accessToken}`;

      // call instagram api
      callInstagramApi(accessToken, listInstagramContent);

    }

    // if not there, user has not authorized app
    else {

      loadInstagramAuthorizationMsg();

    }

  }

}

function listInstagramContent (data) {

  showInstagramDiv();

  data['data'].map( post => {

    let postCaption = '';
    if (post.caption !== null) {
      postCaption = post.caption.text;
    }

    const template = `
      <li>
        <a href="${post.link}" target="_blank">
          <img src="${post.images.low_resolution.url}">
          <div class="post-story">${postCaption}</div>
        </a>
      </li>
    `;

    $('.js-instagram-list').append(template);

  });

}

function loadInstagramAuthorizationMsg () {

  // add html
  $('.js-instagram-feed').html(`
    <p>Load your instagram feed here for your convenience. We will not post content to your account or save any of your data.</p>
    <button class="js-authorize-instagram">Load Instagram Content</button>
  `);

  // make content visible
  showInstagramDiv();

}
function showInstagramDiv () {
  $('.js-instagram-loader').hide();
  $('.social-media-feed.js-instagram-feed').show();
}

function callInstagramApi (token, callback) {
  const appInfo = getInstagramAppInfo();

  const settings = {
    url: appInfo.apiUrl,
    data: {
      access_token: token,
      count: 20
    },
    dataType:'jsonp',
    type: 'GET',
    success: callback,
    fail: showAjaxError
  }
  $.ajax(settings);

}

function getInstagramAppInfo () {

  const authInfo = {
    authUrl:'https://api.instagram.com/oauth/authorize/',
    client_id:'9bf645b54555422699139e92b34f7152',
    redirect_uri:'https://hurricaneharveynewscenter.com',
    response_type:'token',
    apiUrl:'https://api.instagram.com/v1/users/self/media/recent'
  }

  return authInfo;

}
