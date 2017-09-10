function getAreaReports () {

  // call getAreaReports service
  let qData = {
    method:'getAreaReports',
    disasterID: disasterID
  };
  callDisasterService(qData, listAreaReports);

}
function listAreaReports (data) {

  // if no reports
  if (data.length !== 0) {

    // start fresh
    $('.js-area-reports').empty();

    // loop thru reports
    data.map( (report, index) => {

      // set containter class
        let containterClassName = 'area-report-container';
        if (data.length === 1) {
          containterClassName = 'area-report-container-1';
        }
        else if (data.length === 2) {
          containterClassName = 'area-report-container-2';
        }

        else if (data.length === 3) {
          containterClassName = 'area-report-container-3';
        }

      const reportDate = new Date(report[0]);

      const dateString = setupDateString(reportDate);
      const timeString = setupTimeString(reportDate);

      const template = `
        <div class="${containterClassName}">
          <div class="date">${dateString} @ ${timeString}</div>
          <div class="report">${report[1]}</div>
          <div class="reporter">${report[2]}</div>
          <div class="location">${report[3]}</div>
        </div>
      `;

      $('.js-area-reports').append(template);

    });

  }

}
