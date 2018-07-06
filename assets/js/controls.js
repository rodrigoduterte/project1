var currentDate = moment().format('MM-DD-YYYY');
var datepicker = document.querySelector('.datepicker');
var leadstatus = document.getElementById("lead-status");

var formvariables = {
    customer: {firstname:"",lastname:"",businessname:"",businessaddress:"",workphone:"",mobilephone:"",leadstatus:""}
};

var nextCounter = 0;
var lastCounter = 0;
var arrayOption = [];


$(document).ready(function () {
   Object.getOwnPropertyNames(statActs).forEach(e => {
        console.log(e);
        $('#followup-status').append('<option>'+ e +'</option>');
    });
    
    $('#lead-status').append('<option>aaaaaaa</option>');   
    $('#followup-status').select(function(){
        statActs[$(this).text()]
    });
    ///initialize all modals           
    $('.modal').modal();
    //initialize option selection within form
    $('select').formSelect();

    // $("select").material_select();
    // $("#lead-status").empty().html();
    
    // $("#lead-status").material_select('update');
    // $("#lead-status").closest('.input-field').children('span.caret').remove();
    //initialize date picker
    M.Datepicker.init(datepicker,{
        minDate: new Date() /// prevents the user from selecting dates before now
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
        formvariables.saveCustomer(true);
        addCustomer();
        displayCustomerOnFollowUpModal();
    });
    $('#follow-up-confirmed').on('click',function(){
        ////////is not running addFollowUp() when follow-up-confirmed button is clicked
        addFollowUp();
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
        formvariables.customer.leadstatus = $('#lead-status option:selected').val()
        // customerValidator(formvariables.customer)
        // console.log(formvariables.customer.firstname);
        // console.log(formvariables.customer.lastname);
        // console.log(formvariables.customer.businessname);
        // console.log(formvariables.customer.businessaddress);
        // console.log(formvariables.customer.workphone);
        // console.log(formvariables.customer.mobilephone);
        // console.log(formvariables.customer.leadstatus);
    }
}

formvariables.saveFollowup = function () {
    // this.followup.
}

function displayCustomerOnFollowUpModal () {
    $("#show-customer-name").val(formvariables.customer.firstname)
}
