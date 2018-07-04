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
var statActs = database.ref('status-action/');
var leadstats = database.ref('leadstats/');

/// we should not use 

customers.on('child_added',function(s){


  ///insert customer on the Last 10 Leads View
});



// $(#buttonID).on('click',function(){
//     
// });
// addCustomer();
// 

function addObjectHistory () {
  
}

function addCustomer () {
  //add custom counter to the customer 
  customerID.transaction(function(counter){
    customers.child(counter + 1).set({
      "firstname": $('#first-name').val(),
      "lastname": $('#last-name').val(),
      "businessname": $('#business-name').val(),
      "businessaddress": $('#business-address').val(),
      "workphone": $('#work-phone').val(),
      "mobilephone": $('#Mobile-phone').val(),
      "leadstatus": $('#sel1 option:selected').val()
    });
    return counter + 1;
  });
  
}

function addFollowUp () {
  followupID.transaction(function(counter){
    followups.child(counter + 1).set({})
  });
}

function incrementLeadStatus(stat) {
  leadstats.transaction
}

function getCountofLeadstats () {
  //  0,potential
  //  1,interested
  //  2,purchased
  //  3,dropped
  var leadstatsArray = [];
  customers.orderByChild("leadstatus").equalTo("potential").on("child_added", function(snapshot) {
    console.log(snapshot.key());
  });
}