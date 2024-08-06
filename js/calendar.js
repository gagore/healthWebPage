let currentYear;
let currentMonth;
let holidays = [];

document.addEventListener('DOMContentLoaded', function() {
    fetch('/db/holidays.json')
        .then(response => response.json())
        .then(data => {
            holidays = data.holidays;
            const today = new Date();
            currentYear = today.getFullYear();
            currentMonth = today.getMonth();
            updateCalendar();
        });

    document.getElementById('prevMonth').addEventListener('click', function() {
        changeMonth(-1);
    });

    document.getElementById('nextMonth').addEventListener('click', function() {
        changeMonth(1);
    });
});

function updateCalendar() {
    const firstDay = new Date(currentYear, currentMonth, 1);
    const lastDay = new Date(currentYear, currentMonth + 1, 0);

    document.getElementById('monthYear').textContent = `${currentYear}년 ${currentMonth + 1}월`;
    const calendar = document.getElementById('calendar');
    let html = '<thead class="table-dark"><tr><th>Sun</th><th>Mon</th><th>Tue</th><th>Wed</th><th>Thu</th><th>Fri</th><th>Sat</th></tr></thead><tbody>';

    for (let d = 0; d < firstDay.getDay(); d++) {
        html += '<td></td>'; // 첫 주 시작 전 빈 칸
    }

    for (let d = 1; d <= lastDay.getDate(); d++) {
        const date = new Date(currentYear, currentMonth, d);
        const day = date.getDay();
        const dateString = formatDateString(currentYear, currentMonth, d);
        const isHoliday = holidays.includes(dateString);
        let className = isHoliday ? 'text-bg-success' : (day === 0 || day === 6 ? 'text-bg-danger' : '');

        html += `<td class="${className}">${d}</td>`;
        if (day === 6) {
            html += '</tr><tr>';
        }
    }

    html += '</tbody>';
    calendar.innerHTML = html;
}

function changeMonth(step) {
    currentMonth += step;
    if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
    } else if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
    }
    updateCalendar();
}

function formatDateString(year, month, day) {
    return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
}
