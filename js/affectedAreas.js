function getAffectedAreas () {

  // call getAreaReports service
  var qData = {
    method:'getAffectedAreas',
    disasterID: disasterID
  };
  callDisasterService(qData, listAffectedAreasList);

}
function listAffectedAreasList (data) {

  // var to calculate total population
  var totalPop = 0;

  data.map( area => {

    totalPop += area[2];

  });

  // format number with commas
  var formattedPopulation = addCommas(totalPop);

  // update populate count
  $('.js-potential-population-impacted').html(`Potential Population Impact: ${formattedPopulation}`);

}
