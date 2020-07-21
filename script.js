$(document).ready(function () {

    // DOM selectors

    const currentDateEl = $("header #currentDay");

    const today = moment().subtract(3, "hours"); // when testing, change this to different hours - after testing, remove the subtract

    let calEvents = {};
    // let calEvents = {
    //     "9AM": "Sleep In",
    //     "10AM": "",
    //     "11AM": "Program Coordinators Meeting",
    //     "12PM": "Lunch",
    //     "1PM": "Coding",
    //     "2PM": "Pick up kids",
    //     "3PM": "",
    //     "4PM": "",
    //     "5PM": ""
    // }

    console.log(calEvents[9])

    // initialize calendar
    function initCalendar() {
        currentDateEl.text(today.format('LL'));
        renderCalendar(today, calEvents);
    }
    loadCal();

    initCalendar();

    // build page

    function renderCalendar(date, calEvents) {

        date = moment(date).hour(9);
        const calendar = $("div.container");
        // loop to make blocks for hours 9 to 5
        for (let i = 1; i < 10; i++) {
            const row = $("<div>").addClass("row").attr("id", date.format("hA"));
            let classOfHour = "";
            // console.log(date.isBefore(today, "hour"))
            // console.log(date.isSame(today, "hour"))
            // console.log(date.isAfter(today, "hour"))
            // console.log("date hour:" + date.hour())
            // console.log("today hour:" + today.hour())
            if (today.isBefore(date, "hour")) {
                classOfHour = "past"
            } else if (today.isAfter(date, "hour")) {
                classOfHour = "future"
            } else {
                classOfHour = "present"
            }
            console.log(classOfHour)
            calendar.append(row);

            row.append($("<div>").addClass("col-sm-2 hour").text(date.format("h A")))
            // create description div and color for past, present, or future hour
            let timeBlock = date.format("hA");
            console.log(timeBlock);

            row.append($("<textarea>").addClass(`col-sm-8 ${classOfHour}`).text(calEvents[timeBlock]));

            row.append($("<button>").addClass("col-sm-2 saveBtn").text("Save"));
            date.add(1, "hour");
        }
    }



    function storeCal() {
        localStorage.setItem("calEvents", JSON.stringify(calEvents));
    };

    function loadCal() {
        const storedCal = JSON.parse(localStorage.getItem("calEvents"));
        if (storedCal) {
            calEvents = storedCal;
        }
    }

    // save calendar event
    $("button.saveBtn").on("click", function (event) {
        console.log(event.target.parentElement.id);
        let calDesc = event.target.parentElement.children[1].value;
        console.log(calDesc);
        calEvents[event.target.parentElement.id] = calDesc;
        console.log(calEvents);
        storeCal();
    })




    // trying stuff out

    console.log(today.format("h A"))
    console.log(today.hour(9).format("h A"));
    console.log(today.add(1, "hour").format("h A"))








});