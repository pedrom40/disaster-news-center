'use strict';

// main theme
const disaster = 'Hurricane Harvey';

// local news video sources (ch. 3, ch. 6, ch. 10)
const localNewsYouTubeChannelIds = ['UCPjgzQgWuPsrYDSuP_CENOw', 'UCvM_k1scQ1YU50HiQc-4xyg', 'UCPXLf8gz8WzzdgidGmXWBtg'];

// national new sources (abc, nbc, cbs)
const nationalNewsYouTubeChannelIds = ['UCBi2mrWuNuyYy4gbM6fU18Q', 'UCeY0bbntWzzVIaj2z3QigXg', 'UC8p1vwvWtl6T73JiExfWs1g'];

// get area reports
const areaReports = [
  {
    dateReported: '09/01/2017',
    report: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris eu mi sit amet tellus tempus sagittis. Donec eget turpis aliquam, tincidunt tellus imperdiet, auctor quam.',
    reportedBy: 'Jane Doe'
  },
  {
    dateReported: '09/01/2017',
    report: 'Suspendisse maximus risus ut rhoncus ultricies. Duis placerat accumsan lobortis. Vestibulum imperdiet consectetur venenatis.',
    reportedBy: 'John Roe'
  },
  {
    dateReported: '08/31/2017',
    report: 'Curabitur posuere nunc molestie magna fermentum venenatis. Sed pulvinar arcu nec neque tristique dictum.',
    reportedBy: 'Joe Bloe'
  },
];

// local help information
const localHelpInformation = [
  {
    type:'person',
    name:'Jack Dawson',
    address:'1234 Main st.',
    city:'Rockport',
    state:'TX',
    zip:'88888',
    phone:'888.888.8888',
    email:'person@contactme.com',
    message:'Contact me if you need food.'
  },
  {
    type:'center',
    name:'Ronald McDonald House',
    address:'1234 Main st.',
    city:'Corpus Christi',
    state:'TX',
    zip:'88888',
    phone:'888.888.8888',
    email:'person@contactme.com',
    message:'We will donate any clothes you bring to Hurricane Harvey survivors'
  },
  {
    type:'person',
    name:'Marky Mark',
    address:'1234 Main st.',
    city:'Aransas Pass',
    state:'TX',
    zip:'88888',
    phone:'888.888.8888',
    email:'person@contactme.com',
    message:'I can help with clearing debris from your home.'
  }
];


// call all function
function initApp () {

  // get local videos
  localNewsYouTubeChannelIds.map( (source, index) => {

    // take the first local video for featured video
    if (index === 0) {
      getMainVideo(source, disaster);
    }

    // load the local results
    getLocalNewsVideoFromSource(source, disaster);

  });

  // get National videos
  nationalNewsYouTubeChannelIds.map( source => {
    getNationalNewsVideoFromSource(source, disaster);
  });

  // get area reports
  getAreaReports();

  // get social media feed

  // load map

  // get local help info
  getLocalHelpInfo();

  // get national organizations


}

// set main video
function getMainVideo (source, q) {
  callYouTubeSearchAPI(source, q, setMainVideo);
}

// get local news source most recent video
function getLocalNewsVideoFromSource (source, q) {
  callYouTubeSearchAPI(source, q, listLocalVideos);
}

// get national news source most recent video
function getNationalNewsVideoFromSource (source, q) {
  callYouTubeSearchAPI(source, q, listNationalVideos);
}

// get area reports
function getAreaReports () {

  // call getAreaReports service

  // start fresh
  $('.js-area-reports').empty();

  // loop thru reports
  areaReports.map( report => {

    const template = `
      <div class="date">${report.dateReported}</div>
      <div class="report">${report.report}</div>
      <div class="reporter">- ${report.reportedBy}</div>
    `;

    $('.js-area-reports').append(template);

  });

}

// get local help info
function getLocalHelpInfo () {

  // call to service

  // start fresh
  $('.js-local-help').empty();

  // loop thru reports
  localHelpInformation.map( contact => {

    const template = `
      <div class="name">${contact.name}</div>
      <div class="address">
        ${contact.address}<br>
        ${contact.city}, ${contact.state} ${contact.zip}
      </div>
      <div class="phone">Phone: ${contact.phone}</div>
      <div class="phone">Email: ${contact.email}</div>
      <div class="phone">Message: ${contact.message}</div>
    `;

    $('.js-local-help').append(template);

  });

}

// set main video
function setMainVideo (data) {

  // reset html
  $('.js-main-video').empty();

  // set template
  const template = `
    <div class="iframe-container">
      <iframe width="320" height="180" title="Featured Video" src="https://www.youtube.com/embed/${data.items[0].id.videoId}" frameborder="0" class="js-main-video-iframe" allowfullscreen></iframe>
    </div>
    <h3>${data.items[0].snippet.title}</h3>
    <p>${data.items[0].snippet.description}</p>
  `;

  $('.js-main-video').append(template);

}

// list video from source
function listLocalVideos (data) {

  // start fresh
  //$('.js-local-news-video-list').empty();

  // if an error occurred
  if (typeof textStatus !== 'undefined') {

    // let user know
    showAjaxError('.js-local-news-video-list', textStatus);

  }

  // if no results returned
  else if (data.items.length === 0) {

    // let user know
    $('.js-local-news-video-list').append('Sorry, no results found for your search. Please try again.');

  }

  // if results found
  else {

    // loop thru data to create most viewed ul li's
    data.items.map( (item, index) => {

      // setup li html with data
      const template = `
        <li>
          <a href="#" videoID="${item.id.videoId}" class="js-preview-btn">
            <div class="thumb left-side">
              <img src="${item.snippet.thumbnails.default.url}" alt="${item.snippet.title} image">
            </div>
            <div class="description right-side">
              ${trimString(item.snippet.title.toString(), 49)}
            </div>
            <div class="source">
              <a href="#">More from ${item.snippet.channelTitle}</a>
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

  // start fresh
  //$('.js-national-news-video-list').empty();

  // if an error occurred
  if (typeof textStatus !== 'undefined') {

    // let user know
    showAjaxError('.js-national-news-video-list', textStatus);

  }

  // if no results returned
  else if (data.items.length === 0) {

    // let user know
    $('.js-national-news-video-list').append('Sorry, no results found for your search. Please try again.');

  }

  // if results found
  else {

    // loop thru data to create most viewed ul li's
    data.items.map( (item, index) => {

      // setup li html with data
      const template = `
        <li>
          <a href="#" videoID="${item.id.videoId}" class="js-preview-btn">
            <div class="thumb left-side">
              <img src="${item.snippet.thumbnails.default.url}" alt="${item.snippet.title} image">
            </div>
            <div class="description right-side">
              ${trimString(item.snippet.title.toString(), 49)}
            </div>
            <div class="source">
              <a href="#">More from ${item.snippet.channelTitle}</a>
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
function callYouTubeSearchAPI (channelID, q, callback) {

  // set API call parameters
  const settings = {
    url: 'https://www.googleapis.com/youtube/v3/search/',
    data: {
      part: 'snippet',
      key: 'AIzaSyBAPx_IKzkO0KLZ9TOGGcLTUixNZmFRiX4',
      channelId: channelID,
      q: q,
      type: 'video',
      order: 'date',
      maxResults: 1
    },
    dataType: 'json',
    type: 'GET',
    success: callback,
    fail: callback
  };

  $.ajax(settings);

}

// show ajax error
function showAjaxError (element, errorMsg) {

  $(element).html(`Search Failed: ${errorMsg}`);

}

// trim the video description for preview lists
function trimString (str, trimAt) {
  return `${str.substring(0, trimAt)}...`;
}

$(initApp)
