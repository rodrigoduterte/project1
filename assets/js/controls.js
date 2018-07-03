
$(document).ready(function () {
    ///initialize all modals           
    $('.modal').modal();   
    //initialize option selection within form
    $('select').formSelect();
    //initialize date picker
    $('.datepicker').datepicker();
     

    console.log($(".modal").modal());
});


$("#next-follow-up-date").daterangepicker({
    "minDate": moment()
}, function(start, end, label) {
  console.log('New date range selected: ' + start.format('MM-DD-YYYY') + ' to ' + end.format('MM-DD-YYYY') + ' (predefined range: ' + label + ')');
});


