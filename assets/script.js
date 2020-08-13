$(document).ready(function () {

    // Selector to display today's date
    const currentDateEl = $("header #currentDay");

    // declare object to store calendar events
    let calEvents = {};

    // track when calendar was last rendered
    let hourRendered = moment();

    // render the calendar on the page
    function renderCalendar(today, calEvents) {

        let rowHr = moment(today).hour(9); // start building rows at 9 AM
        const calendar = $("div.container"); // select the calendar div
        calendar.empty(); // clear previously rendered time blocks from the calendar div

        // loop to make rows for hours 9 to 5
        for (let i = 1; i < 10; i++) {

            const row = $("<div>").addClass("row"); // start building the row for each hour block

            // set colors for time blocks for past, present and future
            let classOfHour = "";
            if (today.isBefore(rowHr, "hour")) {
                classOfHour = "future"
            } else if (today.isAfter(rowHr, "hour")) {
                classOfHour = "past"
            } else {
                classOfHour = "present"
            };

            calendar.append(row);
            // add hour column to row
            row.append($("<div>").addClass("col-2 hour").text(rowHr.format("h A")));
            // add event description column to row
            let timeBlock = rowHr.format("hA"); // keys for data in calEvents object to populate textarea
            row.append($("<textarea>").addClass(`col-8 ${classOfHour}`).text(calEvents[timeBlock]));
            // add save button column to row
            row.append($("<button>").addClass("col-2 saveBtn").html("<i class='fas fa-save'></i>").attr("aria-label", "Save").attr("id", rowHr.format("hA")));

            // increment hour before creating next row
            rowHr.add(1, "hour");

            // set calendar render time
            hourRendered = moment();
        };
    };


    // initialize calendar
    function initCalendar() {
        const today = moment(); // set today's date
        currentDateEl.text(today.format('LL'));
        renderCalendar(today, calEvents);
    };

    // loads events from local storage
    function loadCal() {
        const storedCal = JSON.parse(localStorage.getItem("calEvents"));
        if (storedCal) {
            calEvents = storedCal;
        };
    };

    // When the page loads:
    loadCal(); // load calendar events from local storage
    initCalendar(); // set the current date and render the calendar
    hourTracker(); // start tracking the hour block


    // checks current time every minute to see if color blocks for past present future need to change
    function hourTracker() {
        const checkHourInterval = setInterval(function () {
            if (moment().isAfter(hourRendered, "minute")) {
                initCalendar(); // if it's the next hour, re-render the calendar to change the colors
            }
        }, 60000);
    };


    // store calendar events in local storage
    function storeCal() {
        localStorage.setItem("calEvents", JSON.stringify(calEvents));
    };


    // clear the calendar of all events
    function clearCalendar() {
        calEvents = {};
        storeCal();
        initCalendar();
    };

    // Clear calendar click handler
    $("button#clear-cal").on("click", clearCalendar);


    // Save button click handler - save calendar event 
    $(document).on("click", "button.saveBtn", function (event) {
        let calDesc = event.currentTarget.parentElement.children[1].value; // store contents of that row's textarea
        calEvents[event.currentTarget.id] = calDesc; // add calendar event text to the calEvents object with the time as the key
        storeCal(); // store the calEvents in local storage
    });

});