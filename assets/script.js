$(document).ready(function () {

    // Selector to display today's date
    const currentDateEl = $("header #currentDay");
    const hourDivEl = $("div.hour-div");
    const eventDivEl = $("div.event-div");
    const saveDivEl = $("div.save-div");

    // set today's date
    const today = moment(); // when testing, change this to different hours - .subtract(4, "hours"); - after testing, remove the subtract

    // declare object to store calendar events
    let calEvents = {};

    // render the calendar on the page
    function renderCalendar(date, calEvents) {
        date = moment(date).hour(9);
        const calendar = $("div.container");
        // loop to make blocks for hours 9 to 5
        for (let i = 1; i < 10; i++) {
            const row = $("<div>").addClass("row");
            let classOfHour = "";

            // set colors for time blocks
            if (today.isBefore(date, "hour")) {
                classOfHour = "future"
            } else if (today.isAfter(date, "hour")) {
                classOfHour = "past"
            } else {
                classOfHour = "present"
            }

            calendar.append(row);
            // hour column
            row.append($("<div>").addClass("col-2 hour").text(date.format("h A")))
            // event description column
            let timeBlock = date.format("hA"); // keys for data in calEvents object to populate textarea
            row.append($("<textarea>").addClass(`col-8 ${classOfHour}`).text(calEvents[timeBlock]));
            // save button column
            row.append($("<button>").addClass("col-2 saveBtn").html("<i class='fas fa-save'></i>").attr("id", date.format("hA")));

            // increment hour before creating next row
            date.add(1, "hour");
        }
    }


    // initialize calendar
    function initCalendar() {
        currentDateEl.text(today.format('LL'));
        renderCalendar(today, calEvents);
    }

    // loads events from local storage
    function loadCal() {
        const storedCal = JSON.parse(localStorage.getItem("calEvents"));
        if (storedCal) {
            calEvents = storedCal;
        }
    }


    // load calendar events from local storage and render the calendar for today
    loadCal();
    initCalendar();


    // store calendar events in local storage
    function storeCal() {
        localStorage.setItem("calEvents", JSON.stringify(calEvents));
    };



    // save calendar event
    $("button.saveBtn").on("click", function (event) {
        let calDesc = event.currentTarget.parentElement.children[1].value;
        calEvents[event.currentTarget.id] = calDesc;
        storeCal();
    })



});