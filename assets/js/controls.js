var currentDate = moment().format('MM-DD-YYYY');


$(document).ready(function () {
    ///initialize all modals           
    $('.modal').modal();
    //initialize option selection within form
    $('select').formSelect();
    //initialize date picker
    $('.datepicker').datepicker();


    console.log($(".modal").modal());

    $('#date').html(currentDate);
    console.log(currentDate);

    $('#lastDay').on('click', function (event) {
        event.preventDefault();

        yesterday = moment().subtract(1, 'day').format('MM-DD-YYYY');
        $('#date').html(yesterday);
        console.log(yesterday);
    })

    $('#nextDay').on('click', function(){
        tomorrow = moment().add(1, 'day').format('MM-DD-YYYY');
        $('#date').html(tomorrow);
    })

    $('#new-lead-confirmed').on('click',function(){
        addCustomer();
    });
});


$("#next-follow-up-date").daterangepicker({
    "minDate": moment()
}, function(start, end, label) {
  console.log('New date range selected: ' + start.format('MM-DD-YYYY') + ' to ' + end.format('MM-DD-YYYY') + ' (predefined range: ' + label + ')');
});






