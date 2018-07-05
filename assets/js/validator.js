// formvariables.customer.constraints = {
//     firstname: {
//         presence: true
//     },
//     lastname: {
//         presence: true
//     },
//     businessname: {
//         presence: true
//     },
//     workphone: {
//         length: 10
//     },
//     mobilephone: {
//         length: 10
//     }
// }

$(document).ready(function () {
    $('#form-customer').parsley().on('field:validated', function() {
        var ok = $('.parsley-error').length === 0;
        $('.bs-callout-info').toggleClass('hidden', !ok);
        $('.bs-callout-warning').toggleClass('hidden', ok);
    })
    .on('form:submit', function() {
        return false; // Don't submit form for this demo
    });
});
