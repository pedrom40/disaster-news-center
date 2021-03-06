// get local youtube channel ids
function getLocalNewsYouTubeChannels () {

  var qData = {
    method: 'getLocalYouTubeChannelIds',
    disasterID: disasterID
  }
  callDisasterService(qData, getLocalVideos);

}

// gets local videos from channel ids
function getLocalVideos (data) {

  // start fresh
  $('.js-local-news-video-list').empty();

  data.map( (source, index) => {

    // take the first local video for featured video
    if (index === 0) {
      getMainVideo(source[0], source[1]);
    }

    // load the local results
    getLocalNewsVideoFromSource(source[0], source[1]);

  });

}

// get national video channels
function getNationalVideoChannels () {

  // setup data
  var qData = {
    method: 'getNationalYouTubeChannelIds',
    disasterID: disasterID
  };

  callDisasterService(qData, getNationalVideos);
}

function getNationalVideos (data) {

  // start fresh
  $('.js-national-news-video-list').empty();

  data.map( source => {
    getNationalNewsVideoFromSource(source[0], source[1]);
  });

}

// set main video
function getMainVideo (source, q) {
  callYouTubeSearchAPI(source, q, 1, setMainVideo);
}

// get local news source most recent video
function getLocalNewsVideoFromSource (source, q) {
  callYouTubeSearchAPI(source, q, 1, listLocalVideos);
}

// get national news source most recent video
function getNationalNewsVideoFromSource (source, q) {
  callYouTubeSearchAPI(source, q, 1, listNationalVideos);
}

// set main video
function setMainVideo (data) {

  // reset html
  $('.js-main-video').empty();

  // set template
  var template = `
    <div class="iframe-container">
      <iframe width="320" height="180" title="Featured Video" src="https://www.youtube.com/embed/${data.items[0].id.videoId}" frameborder="0" class="js-main-video-iframe" allowfullscreen></iframe>
    </div>
    <h3>${data.items[0].snippet.title}</h3>
    <p>${data.items[0].snippet.description}</p>
  `;

  $('.js-main-video').append(template);

  $('.js-youtube-loader').css('display', 'none');
  $('.social-media-feed.js-youtube-feed').css('display', 'block');

}


// reset main video content from anchor link
function updateMainVideoFromAnchorClick (videoObj) {

  // reset html to start fresh
  $('.js-main-video').empty();

  // set template
  var template = `
    <div class="iframe-container">
      <iframe width="320" height="180" title="Featured Video" src="https://www.youtube.com/embed/${videoObj.items[0].id}" frameborder="0" class="js-main-video-iframe" allowfullscreen></iframe>
    </div>
    <h3>${videoObj.items[0].snippet.title}</h3>
    <p>${videoObj.items[0].snippet.description}</p>
  `;

  $('.js-main-video').append(template);

  // scroll to top of page
  $(window).scrollTop(0);

}

// process thumbnail clicks, set as main video
function listenForPreviewClicks () {

  $('.video-list').click( event => {

    if (event.target.target !== '_blank') {
      event.preventDefault();

      // get a tag info
      var anchorClicked = $(event.target).closest('a');

      // call video api
      callYouTubeVideoAPI(anchorClicked[0].attributes.videoID.value, updateMainVideoFromAnchorClick);

      $('.social-media-feed').animate({
        scrollTop: 0
      }, 'slow');

    }

  });

}

// list video from source
function listLocalVideos (data) {

  // if no results returned
  if (data.items.length === 0) {

    // let user know
    $('.js-local-news-video-list').append('Sorry, no results found for your search. Please try again.');

  }

  // if results found
  else {

    // loop thru data to create most viewed ul li's
    data.items.map( (item, index) => {

      // setup li html with data
      var template = `
        <li>
          <a href="#" videoID="${item.id.videoId}" class="js-preview-btn" target="">
            <div class="thumb left-side">
              <img src="${item.snippet.thumbnails.default.url}" alt="${item.snippet.title} image">
            </div>
            <div class="description right-side">
              ${trimString(item.snippet.title.toString(), 49)}
              <div class="source">
                <a href="https://www.youtube.com/channel/${item.snippet.channelId}" target="_blank" class="channel">
                  More from ${item.snippet.channelTitle}
                </a>
              </div>
            </div>
          </a>
        </li>
      `;

      // append li to ul
      $('.js-local-news-video-list').append(template);

    });

  }

}

// list video from source
function listNationalVideos (data) {

  // if no results returned
  if (data.items.length === 0) {

    // let user know
    $('.js-national-news-video-list').append('Sorry, no results found for your search. Please try again.');

  }

  // if results found
  else {

    // loop thru data to create most viewed ul li's
    data.items.map( (item, index) => {

      // setup li html with data
      var template = `
        <li>
          <a href="#" videoID="${item.id.videoId}" class="js-preview-btn">
            <div class="thumb left-side">
              <img src="${item.snippet.thumbnails.default.url}" alt="${item.snippet.title} image">
            </div>
            <div class="description right-side">
              ${trimString(item.snippet.title.toString(), 49)}
              <div class="source">
                <a href="https://www.youtube.com/channel/${item.snippet.channelId}" target="_blank" class="channel">
                  More from ${item.snippet.channelTitle}
                </a>
              </div>
            </div>
          </a>
        </li>
      `;

      // append li to ul
      $('.js-national-news-video-list').append(template);

    });

  }

}

// calls youtube search API with search term and credentials
function callYouTubeSearchAPI (channelID, q, maxResults, callback) {

  // setup data
  var qData = {
    part: 'snippet',
    key: 'AIzaSyBAPx_IKzkO0KLZ9TOGGcLTUixNZmFRiX4',
    channelId: channelID,
    q: q,
    type: 'video',
    order: 'date',
    maxResults: maxResults
  };

  if (channelID === '') {
    delete qData.channelId;
  }

  // set API call parameters
  var settings = {
    url: 'https://www.googleapis.com/youtube/v3/search/',
    data: qData,
    dataType: 'json',
    type: 'GET',
    success: callback,
    fail: showAjaxError
  };

  $.ajax(settings);

}

// calls youtube video search by video ID
function callYouTubeVideoAPI (videoID, callback) {

  // set API call parameters
  var settings = {
    url: 'https://www.googleapis.com/youtube/v3/videos',
    data: {
      part: 'snippet,contentDetails,statistics',
      key: 'AIzaSyBAPx_IKzkO0KLZ9TOGGcLTUixNZmFRiX4',
      id: videoID
    },
    dataType: 'json',
    type: 'GET',
    success: callback,
    fail: showAjaxError
  };

  $.ajax(settings);

}
