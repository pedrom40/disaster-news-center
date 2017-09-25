function loadHarveyTwitterWidget () {
  $('.js-twitter-loader').css('display', 'none');
  $('.social-media-feed.js-twitter-feed').css('display', 'block');
  $('#harveyTwitterWidgetContainer').show();
  $('#irmaTwitterWidgetContainer').hide();
  /*$('.social-media-feed.js-twitter-feed').html(``);

  !function(d,s,id){
    var js,
    fjs=d.getElementsByTagName(s)[0],
    p=/^http:/.test(d.location)?'http':'https';
    if(!d.getElementById(id)) {
      js=d.createElement(s);
      js.id=id;
      js.src=p+"://platform.twitter.com/widgets.js";
      fjs.parentNode.insertBefore(js,fjs);
    }

    $('.js-twitter-loader').css('display', 'none');
    $('.social-media-feed.js-twitter-feed').css('display', 'block');

  }(document,"script","twitter-wjs");*/

}

function loadIrmaTwitterWidget () {
  $('.js-twitter-loader').css('display', 'none');
  $('.social-media-feed.js-twitter-feed').css('display', 'block');
  $('#harveyTwitterWidgetContainer').hide();
  $('#irmaTwitterWidgetContainer').show();
  /*$('.social-media-feed.js-twitter-feed').html(``);

  !function(d,s,id){
    var js,fjs=d.getElementsByTagName(s)[0],
    p=/^http:/.test(d.location)?'http':'https';
    if(!d.getElementById(id)){
      js=d.createElement(s);
      js.id=id;
      js.src=p+"://platform.twitter.com/widgets.js";
      fjs.parentNode.insertBefore(js,fjs);
    }

    $('.js-twitter-loader').css('display', 'none');
    $('.social-media-feed.js-twitter-feed').css('display', 'block');

  }(document,"script","twitter-wjs");*/

}

function updateTwitterWidget () {

  //$('.js-twitter-loader').css('display', 'block');
  //$('.social-media-feed.js-twitter-feed').css('display', 'none');

  if (disasterID === 1) {
    loadHarveyTwitterWidget();
  }
  else {
    loadIrmaTwitterWidget();
  }

}
