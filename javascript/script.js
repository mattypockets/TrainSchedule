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
        // var firstTime = moment($(".firstTime").val().trim(), "HH:mm").format("X");
        var firstTime = $(".firstTime").val().trim();
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


    // Display info on DOM when a new train is added
    dataRef.ref().on("child_added", function(snapshot){
        
        // Set variables from database values
        var newTrainName = snapshot.val().trainName;
        var newDestination = snapshot.val().destination;
        var newFirstTime = snapshot.val().firstTime;
        var newFrequency = snapshot.val().frequency;
        console.log(newFirstTime);

        // Set current time as a variable
        var currentTime = moment();

        // Push back first train so that it comes before current time
        var firstTimeConverted = moment(newFirstTime, "HH:mm").subtract(1, "years");

        // Calculate time until next train
        var difference = currentTime.diff(moment(firstTimeConverted), "minutes");

        var remainder = difference % newFrequency;

        var minutesAway = newFrequency - remainder;
        
        // Calculate when next train will arrive

        var nextArrival = currentTime.add(minutesAway, "minutes");
        var catchTrain = moment(nextArrival).format("HH:mm");
        


        // Prep info to add to table
        var newRow = $("<tr>").append(
            $("<td>").text(newTrainName),
            $("<td>").text(newDestination),
            $("<td>").text(newFrequency),
            $("<td>").text(catchTrain),
            $("<td>").text(minutesAway)
        )
        
        // Add info to table
        $(".trainTable > tbody").append(newRow);
    })

});