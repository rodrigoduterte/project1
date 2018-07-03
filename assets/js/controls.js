
$(document).ready(function () {
    ///initialize all modals           
    $('.modal').modal();   
    //initialize option selection within form
    $('select').formSelect();
    //initialize date picker
    $('.datepicker').datepicker();
     

    console.log($(".modal").modal());
});



