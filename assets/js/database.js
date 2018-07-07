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
var customerID = database.ref("counter/customer");
var followupID = database.ref("counter/followup");
var customers = database.ref("customers/");
var statActs = {
  "Customer is Busy": "Call back",
  "Call but no answer": "Call back",
  "Need to discuss": ["Follow-Up", "Change lead status to Dropped"],
  "Already purchased": ["Follow-Up", "Change lead status to Dropped"],
  "No longer Need": ["Follow-Up", "Change lead status to Dropped"],
  "Not purchase now": "Change lead status to Potential",
  "Follow up Sales Order": [
    "Request shipping Date",
    "Waiting to Ship",
    "Check Inventory"
  ],
  Shipped: "No Action needed",
  "Order Completed": "No Action needed"
};
var leadstats = {
  potential: 0,
  interested: 0,
  purchased: 0,
  dropped: 0
};

///////////////////// add event listeners for database references
function addCustomerFollowUpListener(id) {
  database
    .ref("customer/" + id + "/followups")
    .on("child_added", function(snap) {
      database.ref("leadstats/" + snap.val()).transaction(
        function(stat) {
          if (stat === null) {
            return stat + 1;
          } else {
            return stat + 1;
          }
        },
        function(error, committed, snapshot) {}
      );
    });
}

customers
  .orderByKey()
  .limitToLast(5)
  .on("value", function(snapshot) {
    $("#lead-table").empty();
    snapshot.forEach(e => {
      $("#lead-table").append(
        "<tr><td>" +
          e.key +
          "</td><td>" +
          e.val().firstname +
          " " +
          e.val().lastname +
          "</td><td>" +
          e.val().businessname +
          "</td></tr>"
      );
    });
  });

customers.on("child_added", function(snapshot) {
  database.ref("leadstats/" + snapshot.val().leadstatus).transaction(
    function(stat) {
      if (stat === null) {
        return stat + 1;
      } else {
        return stat + 1;
      }
    },
    function(error, committed, snapshot) {
      console.log("key of leadstat" + snapshot.key);
      leadstats[snapshot.key] = snapshot.val();
    }
  );

  const markup = `
    <div class="card blue-grey darken-3">
    <div class="card-content blue-grey lighten-5">
      <h4 class="card-title" id="custName">${snapshot.val().businessname}</h4>
      <h6 class="card-title">${snapshot.val().firstname +
        "" +
        snapshot.val().lastname}</h6>
        <ul>
          <li><b>Action:</b> ${snapshot.val().followups.action}</li>
          <li><b>Note:</b> ${snapshot.val().followups.note}</li>
          <br>
          <li><b>DueDate:</b> ${snapshot.val().followups.date}</li>
          <li><b>Work #:</b> ${snapshot.val().workphone}</li>
          <li><b>Address:</b> ${snapshot.val().businessaddress}</li>
        </ul>
    <div class="card-action">
        <button class="btn-small right orange darken-4" id="completed">Complete</button>
    </div>
  </div>
  </div>`;

  $("#calendar").prepend(markup);
});

///////////////////// add event listeners for database references
///////////////////// functions that add records to the database
function addCustomer() {
  customerID.transaction(
    function(customer) {
      //customerID.transaction executes the callback function twice
      //@ first call customer === null
      //@ second call customer === counter/customer.val()
      if (customer === null) {
        return customer + 1;
      } else {
        return customer + 1;
      }
    },
    function(error, committed, snapshot) {
      if (error) {
        console.log("Customer ID unchanged!", error);
      } else if (committed) {
        console.log("Incremented Customer ID.");
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
    }
  );
}

///////////////////// functions that add records to the database
///////////////////// functions that get records from the database
function getCustomerFields(id, objGetter) {}

///////////////////// functions that get records from the database

//create event listener for each lead status
