$(document).ready(function () {

    // DOM selectors

    const currentDateEl = $("header #currentDay");

    const today = moment().subtract(7, "hours"); // when testing, change this to different hours - after testing, remove the subtract

    // initialize calendar
    function initCalendar() {
        currentDateEl.text(today.format('LL'));
        renderCalendar(today);
    }


    initCalendar();

    // build page

    function renderCalendar(date) {
        date = moment(date).hour(9);
        const calendar = $("div.container");
        // loop to make blocks for hours 9 to 5
        for (let i = 1; i < 10; i++) {
            const row = $("<div>").addClass("row");
            let classOfHour = "";
            console.log(date.isBefore(today, "hour"))
            console.log(date.isSame(today, "hour"))
            console.log(date.isAfter(today, "hour"))
            console.log("date hour:" + date.hour())
            console.log("today hour:" + today.hour())
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
            row.append($("<div>").addClass(`col-sm-8 ${classOfHour}`).text("Sleep in"));
            // to do: put a textarea in here too
            row.append($("<button>").addClass("col-sm-2 saveBtn").text("Save"));
            date.add(1, "hour");
        }


    }





    // trying stuff out

    console.log(today.format("h A"))
    console.log(today.hour(9).format("h A"));
    console.log(today.add(1, "hour").format("h A"))








});