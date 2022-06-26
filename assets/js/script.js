// Current Day element from html file
var currentDayEl = $("#currentDay");
// Time to store current time <-- playing with options, not fully setup, currently static
var currentHour = moment().format("H");
// Container Element from html file
var containerEl = $("#container");

var jumbotronEl = $(".jumbotron");

// Array containing hours available
var workHoursArray = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17];

var i = 0;

var blockTime = 0;

var tense = "";

// Clock for top of page.  Ran a static moment pull first so it shows up instantly, then ran the setinterval on the time so that after the first second it's repeating the pull every second.  I did this because I didn't like how the setinterval left the clock area blank until the first second had passed.
currentDayEl.text(moment().format("dddd MM/DD/YYYY h:mm:ssa"));
window.setInterval(function () {
    currentDayEl.html(moment().format('dddd MM/DD/YYYY h:mm:ssa'))
}, 1000);

function DaySchedulerInit() {
    console.log("Work Day Scheduler is running!")
    for( i = 0; i < workHoursArray.length; i++) {
        printBlockTime();
        determineTense();
        insertTimeBlock();
    }
}

DaySchedulerInit();

containerEl.on("click", "i, button", function(event) {
    var buttonHour = $(event.target).data("hour");
    localStorage.setItem(("hour-" + buttonHour), $("#" + buttonHour).val());
});

jumbotronEl.on("click", "#clearSchedule", function(event) {
    if(!confirm("Do you want to clear all entries?")) {
        event.preventDefault();
    } else {
        localStorage.clear();
        location.reload();
    }
});

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

function printBlockTime() {
    if(workHoursArray[i] < 12){
        blockTime = (workHoursArray[i] + "AM");
    } else if(workHoursArray[i] === 12) {
        blockTime = "12PM";
    } else {
        blockTime = ((workHoursArray[i] - 12) + "PM")
    }
}

function determineTense() {
    if (workHoursArray[i] < currentHour) {
        tense = "past";
    } else if (workHoursArray[i] == currentHour) {
        tense = "present";
    } else {
        tense = "future";
    }
}
