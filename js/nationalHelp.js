function getNationalOrganizations () {

    let qData = {
      method:'getNationalOrganizations',
      disasterID: disasterID
    }
    callDisasterService(qData, listNationalOrganizations)

  }
  function listNationalOrganizations (data) {

    // start fresh
    $('.js-national-help').empty();

    // loop thru reports
    data.map( org => {

      const template = `
        <a href="${org[2]}" target="_blank">
          <div class="logo"><img src="/img/${org[1]}" alt="${org[0]} Logo"></div>
        </a>
      `;

      $('.js-national-help').append(template);

    });

  }
