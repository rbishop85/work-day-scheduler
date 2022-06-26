// Clock placement element from html file
var currentDayEl = $("#currentDay");
// Container Element from html file
var containerEl = $("#container");
// Header element from html file
var jumbotronEl = $(".jumbotron");
// Info display element from html file
var infoEl = $("#info")

// Current hour for determining whether scheduled items are in the past, present or future
var currentHour = moment().format("H");
// Array containing hours available
var workHoursArray = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17];
// Variable for determining which item in the hours array we're working with
var i = 0;
// The time to be displayed for each schedule hour block
var blockTime = 0;
// Is each block in the past, present or future
var tense = "";

// Clock for top of page.  Ran a static moment pull first so it shows up instantly, then ran the setinterval on the time so that after the first second it's repeating the pull every second.  I did this because I didn't like how the setinterval left the clock area blank until the first second had passed.
currentDayEl.text(moment().format("dddd MM/DD/YYYY h:mm:ssa"));
window.setInterval(function () {
    currentDayEl.html(moment().format('dddd MM/DD/YYYY h:mm:ssa'))
}, 1000);

// Run the function that sets the layout for the page
DaySchedulerInit();

// Function generating the layout for the scheduler page.  Time for block is determined, past present or future is decided, then each time block is printed to the page.
function DaySchedulerInit() {
    console.log("Work Day Scheduler is running!")
    for( i = 0; i < workHoursArray.length; i++) {
        blockTime = moment(workHoursArray[i], "H").format("hA");
        determineTense();
        insertTimeBlock();
    }
}

// Is each block in the past, present or future?
function determineTense() {
    if (workHoursArray[i] < currentHour) {
        tense = "past";
    } else if (workHoursArray[i] == currentHour) {
        tense = "present";
    } else {
        tense = "future";
    }
}

// Generating each timeblock based on currently selected hour, selected tense and pre-existing storage data, then printing it to the page.
function insertTimeBlock() {
    var existingItem = localStorage.getItem("hour-" + workHoursArray[i]);
    if (existingItem === null){
        existingItem = "";
    }
    containerEl.append(`
    <div class="row time-block">
        <div class="hour  col-md-2 d-flex justify-content-center align-items-center">${blockTime}</div>
        <textarea class="col-11 col-md-9 ${tense}" id="${workHoursArray[i]}">${existingItem}</textarea>
        <button data-hour="${workHoursArray[i]}" class="saveBtn col-1 d-flex justify-content-center align-items-center"><i class="fas fa-save" data-hour="${workHoursArray[i]}"></i></button>
    </div>
    `)
}

// Function to clear out status update about saving schedule data.
function textClear (){
    infoEl.text("");
}

// Click event for button that saves each time slot's data, displays temporary notice of schedule being saved.
containerEl.on("click", "i, button", function(event) {
    var buttonHour = $(event.target).data("hour");
    localStorage.setItem(("hour-" + buttonHour), $("#" + buttonHour).val());
    infoEl.text((moment(buttonHour, "H").format("hA")) + " schedule saved to Local Storage.")
    setTimeout(textClear, 1000);
});

// Click event for button to clear entire schedule.
jumbotronEl.on("click", "#clearSchedule", function(event) {
    if(!confirm("Do you want to clear all entries?")) {
        event.preventDefault();
    } else {
        localStorage.clear();
        location.reload();
    }
});