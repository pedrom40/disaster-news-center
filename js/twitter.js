function loadHarveyTwitterWidget () {

  $('.js-twitter-loader').css('display', 'none');
  $('.social-media-feed.js-twitter-feed').css('display', 'block');
  $('#harveyTwitterWidgetContainer').show();
  $('#irmaTwitterWidgetContainer').hide();

}

function loadIrmaTwitterWidget () {

  $('.js-twitter-loader').css('display', 'none');
  $('.social-media-feed.js-twitter-feed').css('display', 'block');
  $('#harveyTwitterWidgetContainer').hide();
  $('#irmaTwitterWidgetContainer').show();

}

function updateTwitterWidget () {

  if (disasterID === 1) {
    loadHarveyTwitterWidget();
  }
  else {
    loadIrmaTwitterWidget();
  }

}
