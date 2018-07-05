var currentDate = moment().format('MM-DD-YYYY');
var nextCounter = 0;
var lastCounter = 0;

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

    $('#nextDay').on('click', function(){
        nextCounter++;

        newDate = moment().add(nextCounter, 'day').format('MM-DD-YYYY');
        $('#date').html(newDate);
        console.log(newDate);

        $('#today').show();
    })

    $('#today').on('click', function(){
        $('#date').html(currentDate);
        nextCounter = 0;
        $('#today').hide();
    })


    $('#new-lead-confirmed').on('click', function () {
        addCustomer();
    });
});


$("#next-follow-up-date").daterangepicker({
    "minDate": moment()
}, function (start, end, label) {
    console.log('New date range selected: ' + start.format('MM-DD-YYYY') + ' to ' + end.format('MM-DD-YYYY') + ' (predefined range: ' + label + ')');
});






