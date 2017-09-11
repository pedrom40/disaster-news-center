function getLocalHelpInfo () {

  let qData = {
    method:'getLocalHelpInfo',
    disasterID: disasterID
  }
  callDisasterService(qData, listLocalHelpInfo);

}
function listLocalHelpInfo (data) {

  // start fresh
  $('.js-local-help').empty();

  // loop thru reports
  data.map( contact => {

    const template = `
      <div class="name">${contact[1]}</div>
      <div class="address">
        ${contact[2]}<br>
        ${contact[3]}, ${contact[4]} ${contact[5]}
      </div>
      <div class="phone"><a href="tel:${contact[6]}">${contact[6]}</a></div>
      <div class="email"><a href="mailto:${contact[7]}">${contact[7]}</a></div>
      <div class="message">${contact[8]}</div>
    `;

    $('.js-local-help').append(template);

  });

}
