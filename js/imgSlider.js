function startImageSlider () {

  var currentIndex = 0,
  items = $('.img-container div'),
  itemAmt = items.length;

  var autoSlide = setInterval(function() {
    currentIndex += 1;
    if (currentIndex > itemAmt - 1) {
      currentIndex = 0;
    }
    cycleItems();
  }, 6000);

  function cycleItems() {

    var item = $('.img-container div').eq(currentIndex);
    items.hide();
    item.css('display','inline-block');

  }

  $('.next').click(function(event) {
    event.preventDefault();
    clearInterval(autoSlide);
    currentIndex += 1;
    if (currentIndex > itemAmt - 1) {
      currentIndex = 0;
    }
    cycleItems();
  });

  $('.prev').click(function(event) {
    event.preventDefault();
    clearInterval(autoSlide);
    currentIndex -= 1;
    if (currentIndex < 0) {
      currentIndex = itemAmt - 1;
    }
    cycleItems();
  });

}
