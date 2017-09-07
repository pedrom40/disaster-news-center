function loadTwitterWidget () {

  $('.social-media-feed.js-twitter-feed').html(`<a class="twitter-timeline" href="https://twitter.com/hashtag/HurricaneHarvey" data-widget-id="905814717444349952">#HurricaneHarvey Tweets</a>`);

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

  }(document,"script","twitter-wjs");

}
