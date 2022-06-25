// Current Day element from html file
var currentDayEl = $("#currentDay");
// Time to store current time <-- playing with options, not fully setup, currently static
var currentTime = 10;
// Container Element from html file
var containerEl = $("#container");
// Array containing hours available
var workHoursArray = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17];

var i = 0;

var blockTime = 0;

var tense = "";

function DaySchedulerInit() {
    console.log("Work Day Scheduler is running!")
    for( i = 0; i < workHoursArray.length; i++) {
        printBlockTime();
        determineTense();
        insertTimeBlock();
    }
}

DaySchedulerInit();

containerEl.on("click", function(event) {
    if (event.target.matches("i")) {
        console.log("Content Saved!");
        var tempButtonHour = event.target.getAttribute("data-hour");
        console.log(tempButtonHour + "-hour");
        var tempTextBox = document.getElementById(tempButtonHour);
        var tempTextBoxValue = $(tempTextBox).val();
        console.log(tempTextBoxValue);
    }
});

function insertTimeBlock() {
    containerEl.append(`
    <div class="row time-block">
        <div class="hour  col-md-2 d-flex justify-content-center align-items-center">${blockTime}</div>
        <textarea class="col-11 col-md-9 ${tense}" id="${workHoursArray[i]}"></textarea>
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
    if (workHoursArray[i] < currentTime) {
        tense = "past";
    } else if (workHoursArray[i] === currentTime) {
        tense = "present";
    } else {
        tense = "future";
    }
}
