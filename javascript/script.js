$(document).ready(function(){

    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyCq4aaFSqNdgiBvgtkHvWgmCMx-JE9HmKw",
        authDomain: "train-scheduler-bf041.firebaseapp.com",
        databaseURL: "https://train-scheduler-bf041.firebaseio.com",
        projectId: "train-scheduler-bf041",
        storageBucket: "",
        messagingSenderId: "766007837568"
      };
      firebase.initializeApp(config);
    
    var dataRef = firebase.database();

    // Take inputs from form and save them to Firebase
    $(".submit-button").on("click", function(event){
        event.preventDefault();

        // Set variables for each input field
        var trainName = $(".trainName").val().trim();
        var destination = $(".destination").val().trim();
        var firstTime = moment($(".firstTime").val().trim(), "HH:mm").format("X");
        var frequency = $(".frequency").val().trim();

        // Bundle variables into an object
        var newTrain = {
            trainName: trainName,
            destination: destination,
            firstTime: firstTime,
            frequency: frequency
        }

        // Push object to Firebase
        dataRef.ref().push(newTrain);

        // Clear form fields
        $(".trainName").val("")
        $(".destination").val("")
        $(".firstTime").val("")
        $(".frequency").val("")

    })


    // Calculate time until next train

    // Calculate when next train will arrive

    // Display info on DOM
    
});