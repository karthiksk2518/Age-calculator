const ageCalculate = () => {
    const inputDateValue = document.getElementById("date-input").value;

    if (!inputDateValue) {
        alert("Please select a date");
        displayResult("0", "0", "0");
        return;
    }

    const today = new Date();
    const inputDate = new Date(inputDateValue);

    const birthDetails = {
        date: inputDate.getDate(),
        month: inputDate.getMonth() + 1,
        year: inputDate.getFullYear(),
    };

    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth() + 1;
    const currentDate = today.getDate();

    if (today.getTime() < inputDate.getTime()) {
        alert("Enter Valid Date");
        displayResult("0", "0", "0");
        return;
    }

    const { years, months, days } = calculateAge(
        birthDetails,
        currentYear,
        currentMonth,
        currentDate
    );

    displayResult(days, months, years);
};

const calculateAge = (birthDetails, currentYear, currentMonth, currentDate) => {
    let years = currentYear - birthDetails.year;
    let months = currentMonth - birthDetails.month;
    let days = currentDate - birthDetails.date;

    if(days < 0) {
        const lastMonth = currentMonth === 1 ? 12 : currentMonth - 1;
        const daysInLastMonth = getDaysInMonth(lastMonth, currentYear);
        days = daysInLastMonth -  (birthDetails.date - currentDate);
        months--;
    }

    if(months < 0) {
        years--;
        months += 12;
    }

    return {years, months, days};
};

const getDaysInMonth = (month, year) => {
    const isLeapYear = year % 4 === 0 && (year % 100 != 0 || year % 400 === 0);
    const daysInMonth = [
        31,
        isLeapYear ? 29 : 28,
        31,
        30,
        31,
        30,
        31,
        31,
        30,
        31,
        30,
        31
    ];
    return daysInMonth[month - 1];
};

const displayResult = (bDate, bMonth, bYear) => {
    document.getElementById("years").textContent = bYear;
    document.getElementById("months").textContent = bMonth;
    document.getElementById("days").textContent = bDate;
};

document.getElementById("btn").addEventListener("click", ageCalculate);