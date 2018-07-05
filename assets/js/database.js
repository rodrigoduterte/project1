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
var followups = database.ref('followups/');
var statActs = database.ref('status-action/');
var leadstats = database.ref('leadstats/');

var customerIDForFollowups = 0;
var statusList = [];

///////////////////// add event listeners for database references
////////// once
statActs.once("value", function(snapshot) {
  //// get list of actions once
  snapshot.forEach(e => {
	  statusList.push(e.key);
  });
});
////////// once
////////// on




////////// on

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
    customerIDForFollowups = snapshot.val();
    if (error) {
      console.log('Customer ID unchanged!', error);
    } else if (committed) {
      console.log('Incremented Customer ID.');
      customers.child(customerIDForFollowups).set({
        firstname: formvariables.customer.firstname,
        lastname: formvariables.customer.lastname,
        businessname: formvariables.customer.businessname,
        businessaddress: formvariables.customer.businessaddress,
        workphone: formvariables.customer.workphone,
        mobilephone: formvariables.customer.mobilephone,
        leadstatus: formvariables.customer.leadstatus
      });
    }
  });
}

function addFollowUp () {
  followupID.transaction(function(followup){
    //followupID.transaction executes the callback function twice
    //@ first call followup === null
    //@ second call followup === counter/followup.val() 
    if (followup === null) {
      return followup + 1;
    } else {
      return followup + 1;
    }
  }, function(error, committed, snapshot) {
    if (error) {
      console.log('Followup ID unchanged!', error);
    } else if (committed) {
      console.log('Incremented Followup ID.');
      followups.child(snapshot.val()).set({
        customerid: customerIDForFollowups,
        status: "not yet there",
        action: "not yet there",
        date: $('#next-follow-up-date').val(),
        note: $('#memo').val()
      });
    }
  });
}
function addObjectHistory () {
  
}
///////////////////// functions that add records to the database
///////////////////// functions that get records from the database
function getCustomerFields(id,objGetter) {

}
function getStatus () {
  // statActs.
}








///////////////////// functions that get records from the database

//create event listener for each lead status
for (var k in leadstatsKeys) {
  customers.orderByChild("leadstatus").equalTo(k).on("child_added", function(snapshot) {
    if( leadstatsKeys.hasOwnProperty(k) ) {
      leadstatsKeys[k] = snapshot.numChildren();
    }
  });
}
