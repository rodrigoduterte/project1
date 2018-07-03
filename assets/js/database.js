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
var latestcounter;
var counter = database.ref('counter/');
var customers = database.ref('customers/');



customers.on('child_added',function(s){
  
});


// $(#buttonID).on('click',function(){
//     
// });
// addCustomer();
// 
function addCustomer (customID) {
  counter.transaction(function(counter){
    customers.child(counter + 1).set({
      "firstname": $('#inputID1').val(),
      "lastname": $('#inputID2').val(),
      "businessname": $('#inputID3').val(),
      "businessaddress": $('#inputID4').val(),
      "businessphone": $('#inputID5').val(),
      "mobilephone": $('#inputID6').val(),
    });
    return counter + 1;
  });
  
}


function updateCounter () {
  counter.transaction(function(counter){
    window.latestcounter = counter + 1;
    return counter + 1;
  });
}
