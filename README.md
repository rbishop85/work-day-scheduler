# work-day-scheduler
Basic work day calendar application




Day 2 pre-class notes:
8-5 = business hours stored in 24hr system so numbers keep progressing

3 style sets for past present and future events linked to classes

"text area" form input element for multiple lines of text

when clicking save button there is a notice at top of page saying it was added to schedule
    - data saved to individual local storage keys for each hour of day "hour-9 etc"

All css already written in css file, disect it to try and find planned html layout
  -- You can style your own if you wish

// Declare current time
  // date.now for vanilla javascript
<!-- // query current day element and tie to a declared variable -->
<!-- // query container element and tie to declared variable -->
  // This is where you'll render time blocks
  // add an id to container item to make easier

// Render a block for each hour of the day and append to container
 // for( i = 9; i <= 17; i++>) cycle from 9am to 5pm
  \\ for loop will need to determine if the time is past, present or future
  var template = `
 <div class="row">
 <div>
 ${time}
 </div>
 <div>
 <textarea>${data from local storage}</textarea>
 </div>
 <div>
 <button data-hour="9">save</button>
 </div>
 </div>
  `;
 // data-hour="9" for event.target to pull the data-hour from the button clicked

 for loop should also be reaching into local storage to pull saved data for each hour

 past html here

// save an hour to local storage



