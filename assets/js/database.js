var config = {
    apiKey: "AIzaSyD-clEmCVscqOXmVSgKciWDVhz1xZt-Nw4",
    authDomain: "project1-2b99c.firebaseapp.com",
    databaseURL: "https://project1-2b99c.firebaseio.com",
    projectId: "project1-2b99c",
    storageBucket: "project1-2b99c.appspot.com",
    messagingSenderId: "213514987735"
  };
firebase.initializeApp(config);

var leadstatsKeys = {
  "potential": "0",
  "interested": "0",
  "purchased": "0",
  "dropped": "0"
};

var database = firebase.database();
var customerID = database.ref('counter/customer');
var followupID = database.ref('counter/followup');
var customers = database.ref('customers/');
var potential = database.ref('leadstats/potential');
var interested = database.ref('leadstats/interested');
var purchased = database.ref('leadstats/purchased');
var dropped = database.ref('leadstats/dropped');
var leadstats = database.ref('leadstats/');
var statActs = {
  "Customer is Busy": "Call back",
  "Call but no answer": "Call back",
  "Need to discuss": [
    "Follow-Up",
    "Change lead status to Dropped"
  ],
  "Already purchased": [
    "Follow-Up",
    "Change lead status to Dropped"
  ],
  "No longer Need": [
    "Follow-Up",
    "Change lead status to Dropped"
  ],
  "Not purchase now": "Change lead status to Potential",
  "Follow up Sales Order": [
    "Request shipping Date",
    "Waiting to Ship",
    "Check Inventory"
  ],
  "Shipped": "No Action needed",
  "Order Completed": "No Action needed"
}

///////////////////// add event listeners for database references
function addCustomerFollowUpListener(id) {
  database.ref('customer/'+ id + '/followups').on('child_added',function(snap){
    database.ref('leadstats/'+snap.val()).transaction(function(stat){
      if (stat === null) {
        return stat + 1;
      } else {
        return stat + 1;
      }
    },function(error,committed,snapshot){

    });
  }); 
}

customers.orderByKey().limitToLast(5).on("value", function(snapshot) {
  $('#lead-table').empty();
  snapshot.forEach(e =>{
    $('#lead-table').append('<tr><td>'+e.key+'</td><td>'+e.val().firstname+' '+e.val().lastname+'</td><td>'+e.val().businessname+'</td></tr>');
  });
});

customers.on("child_added",function(snapshot) {
  database.ref('leadstats/'+snapshot.val().leadstatus).transaction(function(stat){
    if (stat === null) {
      return stat + 1;
    } else {
      return stat + 1;
    }
  },function(error,committed,snapshot){

  });
});

///////////////////// add event listeners for database references
///////////////////// functions that add records to the database
function addCustomer () {
  customerID.transaction(function(customer){
    //customerID.transaction executes the callback function twice
    //@ first call customer === null
    //@ second call customer === counter/customer.val() 
    if (customer === null) {
      return customer + 1;
    } else {
      return customer + 1;
    }
  }, function(error, committed, snapshot) {
    if (error) {
      console.log('Customer ID unchanged!', error);
    } else if (committed) {
      console.log('Incremented Customer ID.');
      customers.child(snapshot.val()).set({
        firstname: formvariables.customer.firstname,
        lastname: formvariables.customer.lastname,
        businessname: formvariables.customer.businessname,
        businessaddress: formvariables.customer.businessaddress,
        workphone: formvariables.customer.workphone,
        mobilephone: formvariables.customer.mobilephone,
        leadstatus: formvariables.customer.leadstatus,
        followups: {
          status: formvariables.followups.status,
          action: formvariables.followups.action,
          date: formvariables.followups.date,
          note: formvariables.followups.note
        }
      });
    }
  });
}

///////////////////// functions that add records to the database
///////////////////// functions that get records from the database
function getCustomerFields(id,objGetter) {

}






///////////////////// functions that get records from the database

//create event listener for each lead status
