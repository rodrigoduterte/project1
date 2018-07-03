var config = {
    apiKey: "AIzaSyD-clEmCVscqOXmVSgKciWDVhz1xZt-Nw4",
    authDomain: "project1-2b99c.firebaseapp.com",
    databaseURL: "https://project1-2b99c.firebaseio.com",
    projectId: "project1-2b99c",
    storageBucket: "project1-2b99c.appspot.com",
    messagingSenderId: "213514987735"
  };
firebase.initializeApp(config);

var database = firebase.database();
var customerID = database.ref('counter/customer');
var followupID = database.ref('counter/followup');
var customers = database.ref('customers/');
var followups = database.ref('followups/');


/// we should not use 

customers.on('child_added',function(s){


  ///insert customer on the Last 10 Leads View
});


// $(#buttonID).on('click',function(){
//     
// });
// addCustomer();
// 

function addCustomer () {
  //add custom counter to the customer 
  customerID.transaction(function(counter){
    customers.child(counter + 1).set({
      "firstname": $('#first-name').val(),
      "lastname": $('last-name').val(),
      "businessname": $('#business-name').val(),
      "businessaddress": $('#business-address').val(),
      "businessphone": $('#business-phone').val(),
      "mobilephone": $('#Mobile-phone').val(),
    });
    return counter + 1;
  });
  
}

function addFollowUp () {
  followupID.transaction(function(counter){
    followups.child()
  });
}

