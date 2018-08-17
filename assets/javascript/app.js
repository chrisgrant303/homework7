//App Initialization
var config = {
    apiKey: "AIzaSyBFkXz__ztJC7ulA2K6n9xsllG_mjZB_-A",
    authDomain: "homework7-90cf8.firebaseapp.com",
    databaseURL: "https://homework7-90cf8.firebaseio.com",
    projectId: "homework7-90cf8",
    storageBucket: "homework7-90cf8.appspot.com",
    messagingSenderId: "419441052697"
};
firebase.initializeApp(config);

var database = firebase.database();

database.ref().on("value", function (snapshot) {
    console.log(snapshot.val());
});

// 2. Button for adding Trains
$("#add-train-btn").on("click", function (event) {
    event.preventDefault();
    // Grabs user input
    var trainName = $("#train-name-input").val().trim();
    var trainDestination = $("#destination-input").val().trim();
    var trainFirstTrain = moment($("#firstTrain-input").val(), "HH:mm").subtract(10, "years").format("X");;
    console.log(trainFirstTrain);
    var trainFrequency = $("#frequency-input").val().trim();
    var newTrain = {
        name: trainName,
        destination: trainDestination,
        first_train: trainFirstTrain,
        frequency: trainFrequency
    };

    // Uploads employee data to the database
    database.ref().push(newTrain);

    // Logs everything to console
    console.log(trainName.name);
    console.log(trainDestination.destination);
    console.log(trainFirstTrain.first_train);
    console.log(trainFrequency.frequency);



    alert("Train successfully added");

    // Clears all of the text-boxes
    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#firstTrain-input").val("");
    $("#frequency-input").val("");
});

// 3. Create Firebase event for adding train to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function (childSnapshot) {
    console.log(childSnapshot.val());

    // Store everything into a variable.
    var trainName = childSnapshot.val().name;
    var trainDestination = childSnapshot.val().destination;
    var trainFirstTrain = childSnapshot.val().first_train;
    var trainFrequency = childSnapshot.val().frequency;
    var diffTime = moment().diff(moment.unix(trainFirstTrain), "minutes");
    var timeRemainder = moment().diff(moment.unix(trainFirstTrain), "minutes") % trainFrequency;
    var minutes = trainFrequency - timeRemainder;
    var trainNextArrival = moment().add(minutes, "m").format("hh:mm A");

    // Train Info
    console.log(trainName);
    console.log(trainDestination);
    console.log(trainFirstTrain);
    console.log(trainFrequency);
    console.log(trainNextArrival);

    // CALCULATIONS GO HERE 

    // Creating HTML Data
    // Create the new row
    var newRow = $("<tr>").append(
        $("<td>").text(trainName),
        $("<td>").text(trainDestination),
        $("<td>").text(trainFrequency),
        $("<td>").text(trainNextArrival),
        $("<td>").text(minutes)
    );

    $("#train-table > tbody").append(newRow);
});