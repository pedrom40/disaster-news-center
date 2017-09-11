function getAffectedAreas () {

  // call getAreaReports service
  var qData = {
    method:'getAffectedAreas',
    disasterID: disasterID
  };
  callDisasterService(qData, listAffectedAreasList);

}
function listAffectedAreasList (data) {

  // start with empty list
  $('.area-list').empty();

  // var to calculate total population
  var totalPop = 0;

  data.map( area => {

    $('.area-list').append(`<li>${area[0]}</li>`);

    totalPop += area[1];

  });

  // format number with commas
  const formattedPopulation = addCommas(totalPop);

  // update populate count
  $('.js-potential-population-impacted').html(`<em>Potential Population Impact:</em> ${formattedPopulation}`);

}
