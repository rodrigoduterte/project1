    var currentDate = moment().format('MM-DD-YYYY');
var datepicker = document.querySelector('.datepicker');
var leadstatus = document.getElementById("lead-status");

var formvariables = {
    customer: {firstname:"",lastname:"",businessname:"",businessaddress:"",workphone:"",mobilephone:"",leadstatus:""},
    followups: {status: "",action: "",date: "",note: ""}
};

var nextCounter = 0;
var lastCounter = 0;
var arrayOption = [];


$(document).ready(function () {
    Object.getOwnPropertyNames(statActs).forEach(e => {
        // $('#followup-status').append('<option class="stat" value="'+ e +'">'+ e +'</option>');
        $('#followup-status').append('<option>'+ e +'</option>');
    });
    
    $("#followup-action").append('<option>' + statActs['Customer is Busy'] + '</option>');
    
    ///initialize all modals           
    $('.modal').modal();
    //initialize option selection within form
    $('select').formSelect();


    $("#followup-status").on('change',function () {
        // your function here
        // console.log($("#ollowup-status option:selected").text());
        $("#followup-action").empty();
        var selected = $("#followup-status :selected").text();
        console.log(statActs[selected]);
        if (Array.isArray(statActs[selected])){statActs[selected].forEach(e=>{$("#followup-action").append('<option>' + e + '</option>')})} else {
            $("#followup-action").append('<option>' + statActs[selected] + '</option>');
        }
        $('select').formSelect();
    });

    //initialize date picker
    $('#next-follow-up-date').datepicker({
        minDate: new Date()
    });

    //pickadate.js
    // $('#next-follow-up-date').pickadate({
    //     minDate: new Date()
    // });
    
    
    ///please change this code
    M.Datepicker.init(datepicker,{
        minDate: new Date() /// prevents the user from selecting dates before today
    });


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
    $('#close-button1').on('click',function(){
        clearFieldsOnModal1();
    });

    $('#new-lead-confirmed').on('click',function(){
        console.log("add customer button clicked");
        ///// must hide 
        formvariables.saveCustomer(true);
        console.log(formvariables);
        displayCustomerOnFollowUpModal();
        console.log(formvariables);
        clearFieldsOnModal1();
    });
    $('#follow-up-confirmed').on('click',function(){
        formvariables.saveFollowup(true);
        addCustomer();
        clearFieldsOnModal2();
    });
});

formvariables.saveCustomer = function (cansave) {
    if (cansave) {
        formvariables.customer.firstname = $('#first-name').val(),
        formvariables.customer.lastname = $('#last-name').val(),
        formvariables.customer.businessname = $('#business-name').val(),
        formvariables.customer.businessaddress = $('#business-autocomplete').val(),
        formvariables.customer.workphone = $('#work-phone').val(),
        formvariables.customer.mobilephone = $('#mobile-phone').val(),
        formvariables.customer.leadstatus = ($('#lead-status option:selected').val() != "") ? $('#lead-status option:selected').text() : ""
    }
}

formvariables.saveFollowup = function (cansave) {
    if (cansave) {
        formvariables.followups.status = ($('#followup-status option:selected').val() != "") ? $('#followup-status option:selected').text() : "",
        formvariables.followups.action = ($('#followup-action option:selected').val() != "") ? $('#followup-action option:selected').text() : "",
        formvariables.followups.date = $('#next-follow-up-date').val(),
        formvariables.followups.note = $('#memo').val()
    }
}

function displayCustomerOnFollowUpModal () {
    $("#show-lead-status").text(formvariables.customer.leadstatus);
    $("#show-business-name").text(formvariables.customer.businessname);
    $("#show-customer-name").text(formvariables.customer.firstname + " " + formvariables.customer.lastname);
    $("#show-work-phone").text(formvariables.customer.workphone);
    $("#show-mobile-phone").text(formvariables.customer.mobilephone);
}

function clearFieldsOnModal1 () {
    $('#lead-status option:first').prop('selected',true);
    $('#first-name').val("");
    $('#last-name').val("");
    $('#business-name').val("");
    $('#business-autocomplete').val("");
    $('#work-phone').val("");
    $('#mobile-phone').val("");
}

function clearFieldsOnModal2 () {
    $('#followup-status option:first').prop('selected',true);
    $('#followup-action').empty();
    $('#memo').val("");
}
