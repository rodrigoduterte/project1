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
    
    

    // $('#lead-status').append('<option>aaaaaaa</option>');   
    // $('#followup-status').select(function(){
    //     statActs[$(this).text()]
    // });
    ///initialize all modals           
    $('.modal').modal();
    //initialize option selection within form
    $('select').formSelect();

    $("#followup-status").on('change',function () {
        // your function here
        // console.log($("#ollowup-status option:selected").text());
        $("#followup-action").empty();
        $("#followup-action").append("<option disabled selected>"+"Select Next Action"+"</option>");
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

    $('#new-lead-confirmed').on('click',function(){
        console.log("add customer button clicked");
        ///// must hide 
        displayCustomerOnFollowUpModal();
    });
    $('#follow-up-confirmed').on('click',function(){
        formvariables.saveCustomer(true);
        addCustomer();
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
        formvariables.customer.leadstatus = $('#lead-status option:selected').val(),
        formvariables.followups.status = $('#followup-status option:selected').text() ? $('#followup-status option:selected').text() : "",
        formvariables.followups.action = $('#followup-action option:selected').text() ? $('#followup-action option:selected').text() : "",
        formvariables.followups.date = $('#next-follow-up-date').val(),
        formvariables.followups.note = $('#memo').val()
    }
}


function displayCustomerOnFollowUpModal () {
    $("#show-lead-status").val(formvariables.customer.leadstatus);
    $("#show-business-name").val(formvariables.customer.businessname);
    $("#show-customer-name").val(formvariables.customer.firstname + " " + formvariables.customer.lastname);
    $("#show-business-name").val(formvariables.customer.businessname);
    $("#show-work-phone").val(formvariables.customer.workphone);
    $("#show-mobile-phone").val(formvariables.customer.mobilephone);

}
