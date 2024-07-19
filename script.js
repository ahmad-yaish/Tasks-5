document.getElementById('nextToForm').addEventListener('click', function() {
  showFormPage();
});

document.getElementById('userForm').addEventListener('submit', function(event) {
  event.preventDefault();
  const name = document.getElementById('name').value;
  const age = document.getElementById('age').value;
  const occupation = document.getElementById('occupation').value;
  
  console.log(`Name: ${name}, Age: ${age}, Occupation: ${occupation}`);
  alert('User information saved!');
  showRoutinePage();
});

document.getElementById('routineForm').addEventListener('submit', function(event) {
  event.preventDefault();
  const routineName = document.getElementById('routineName').value;
  const routineStart = document.getElementById('routineStart').value;
  const routineEnd = document.getElementById('routineEnd').value;
  
  console.log(`Routine: ${routineName}, Start: ${routineStart}, End: ${routineEnd}`);
  alert('Routine saved!');
});

document.getElementById('addRoutine').addEventListener('click', function() {
  const newRoutine = document.createElement('div');
  newRoutine.classList.add('routine-input');
  newRoutine.innerHTML = `
    <input type="text" placeholder="Routine name" required>
    <div class="time-inputs">
      <input type="time" placeholder="Routine start" required>
      <input type="time" placeholder="Routine end" required>
    </div>
  `;
  document.getElementById('routineInputs').appendChild(newRoutine);
});

document.getElementById('clearForm').addEventListener('click', function() {
  document.getElementById('routineForm').reset();
  document.getElementById('routineInputs').innerHTML = `
    <input type="text" id="routineName" name="routineName" placeholder="Routine name" required>
    <div class="time-inputs">
      <input type="time" id="routineStart" name="routineStart" placeholder="Routine start" required>
      <input type="time" id="routineEnd" name="routineEnd" placeholder="Routine end" required>
    </div>
  `;
});

document.getElementById('nextToTasks').addEventListener('click', function() {
  showTaskPage();
});

document.getElementById('taskForm').addEventListener('submit', function(event) {
  event.preventDefault();
  const taskName = document.getElementById('taskName').value;
  const taskDeadlines = Array.from(document.querySelectorAll('.task-deadline')).map(input => input.value);
  const taskNumber = document.getElementById('taskNumber').value;
  const taskDuration = document.getElementById('taskDuration').value;

  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.push({ name: taskName, deadlines: taskDeadlines, number: taskNumber, duration: taskDuration, progress: 0 });
  localStorage.setItem('tasks', JSON.stringify(tasks));

  alert('Task saved!');
});

document.getElementById('addTask').addEventListener('click', function() {
  const newTask = document.createElement('div');
  newTask.classList.add('task-input');
  newTask.innerHTML = `
    <div class="time-inputs">
      <input type="text" placeholder="Task name" required>
    </div>
    <div class="time-inputs">
      <input type="number" placeholder="Number of tasks" required>
      <input type="text" placeholder="Task duration (minutes)" required>
    </div>
    <div class="date-container">
      <div class="date-input">
        <input type="date" class="task-deadline" placeholder="Task deadline (optional)">
        <button type="button" class="add-date">+</button>
      </div>
    </div>
    <div class="date-explanation">
      <small>(Optional) Choosing specific dates will avoid random task distribution.</small>
    </div>
  `;
  document.getElementById('taskInputs').appendChild(newTask);
  addDateButtonListeners();
});

function addDateButtonListeners() {
  document.querySelectorAll('.add-date').forEach(button => {
    button.addEventListener('click', function() {
      const newDateInput = document.createElement('div');
      newDateInput.classList.add('date-input');
      newDateInput.innerHTML = `
        <input type="date" class="task-deadline" placeholder="Task deadline (optional)">
      `;
      this.parentElement.parentElement.appendChild(newDateInput);
    });
  });
}

document.getElementById('clearTaskForm').addEventListener('click', function() {
  document.getElementById('taskForm').reset();
  document.getElementById('taskInputs').innerHTML = `
    <div class="time-inputs">
      <input type="text" id="taskName" name="taskName" placeholder="Task name" required>
    </div>
    <div class="time-inputs">
      <input type="number" id="taskNumber" name="taskNumber" placeholder="Number of tasks" required>
      <input type="text" id="taskDuration" name="taskDuration" placeholder="Task duration (minutes)" required>
    </div>
    <div id="dateContainer" class="date-container">
      <div class="date-input">
        <input type="date" id="taskDeadline" name="taskDeadline" class="task-deadline" placeholder="Task deadline (optional)">
        <button type="button" class="add-date" id="addDate">+</button>
      </div>
      <div class="date-explanation">
        <small>(Optional) Choosing specific dates will avoid random task distribution.</small>
      </div>
    </div>
  `;
  addDateButtonListeners();
});

document.getElementById('nextToNewCalendar').addEventListener('click', function() {
  showNewCalendarPage();
});

document.getElementById('nextToNewTasks').addEventListener('click', function() {
  showNewTasksPage();
});

document.getElementById('nextToUserInterfaceFromDaily').addEventListener('click', function() {
  showUserInterfacePage();
});

const swiper = new Swiper('.swiper-container', {
  direction: 'horizontal',
  loop: false,
  allowTouchMove: false,
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
});

function showFormPage() {
  swiper.slideNext();
}

function showRoutinePage() {
  swiper.slideNext();
}

function showTaskPage() {
  swiper.slideNext();
}

function showNewCalendarPage() {
  swiper.slideNext();
  updateCalendar();
}

function showNewTasksPage() {
  swiper.slideNext();
}

function showUserInterfacePage() {
  swiper.slideNext();
  document.getElementById('sidebarButton').style.display = 'block';
}

// تفعيل أزرار إضافة التاريخ عند بدء الصفحة
addDateButtonListeners();

function displayCurrentDateTime() {
  const now = new Date();
  const day = now.toLocaleDateString('en-US', { weekday: 'long' });
  const date = now.toLocaleDateString('en-US');
  const year = now.getFullYear();
  const time = now.toLocaleTimeString('en-US');
  const dateTimeString = `${day}, ${date}, ${year}, ${time}`;

  document.getElementById('current-date-time').innerText = dateTimeString;
  setTimeout(displayCurrentDateTime, 1000);
}

// الوظائف الخاصة بلوحة المستخدم
function toggleSidebar() {
  const sidebar = document.getElementById('sidebar');
  if (sidebar.style.right === '0px') {
    sidebar.style.right = '-250px';
  } else {
    sidebar.style.right = '0px';
  }
}

// الشيفرة الخاصة بالصفحة الجديدة
let currentMonth = new Date().getMonth();
let currentYear = new Date().getFullYear();
const monthYearElement = document.getElementById("month-year");
const calendarBody = document.getElementById("calendar-body");

const monthNames = ["January", "February", "March", "April", "May", "June",
                    "July", "August", "September", "October", "November", "December"];

function updateCalendar() {
  calendarBody.innerHTML = "";
  const firstDay = (new Date(currentYear, currentMonth)).getDay();
  const daysInMonth = 32 - new Date(currentYear, currentMonth, 32).getDate();
  monthYearElement.innerText = `${monthNames[currentMonth]} ${currentYear}`;

  let date = 1;
  for (let i = 0; i < 6; i++) {
    let row = document.createElement("tr");

    for (let j = 0; j < 7; j++) {
      let cell = document.createElement("td");
      if (i === 0 && j < firstDay) {
        let cellText = document.createTextNode("");
        cell.appendChild(cellText);
      } else if (date > daysInMonth) {
        break;
      } else {
        let cellText = document.createTextNode(date);
        cell.appendChild(cellText);

        const today = new Date();
        today.setDate(today.getDate() + 1);  // Start from tomorrow
        const startDate = new Date(today);
        startDate.setDate(today.getDate() + 30);

        const cellDate = new Date(currentYear, currentMonth, date);

        if (cellDate >= today && cellDate <= startDate) {
          cell.classList.add("highlighted");
          cell.onclick = function() {
            openModal();
          };
        }

        date++;
      }
      row.appendChild(cell);
    }

    calendarBody.appendChild(row);
  }
}

function prevMonth() {
  currentMonth = (currentMonth === 0) ? 11 : currentMonth - 1;
  currentYear = (currentMonth === 11) ? currentYear - 1 : currentYear;
  updateCalendar();
}

function nextMonth() {
  currentMonth = (currentMonth === 11) ? 0 : currentMonth + 1;
  currentYear = (currentMonth === 0) ? currentYear + 1 : currentYear;
  updateCalendar();
}

function openModal() {
    const tasks = [
        { name: 'Task 1', progress: '75%' },
        { name: 'Task 2', progress: '50%' },
        { name: 'Task 3', progress: '90%' }
    ];

    const taskListModal = document.getElementById('taskListModal');
    taskListModal.innerHTML = ''; // تفريغ القائمة قبل إضافة المهام

    tasks.forEach(task => {
        const taskItem = document.createElement('li');
        taskItem.classList.add('task-item');
        taskItem.innerHTML = `
            <span class="task-name">${task.name}</span>
            <span class="task-progress">${task.progress}</span>
            <input type="checkbox" class="task-complete">
        `;
        taskListModal.appendChild(taskItem);
    });

    document.getElementById("myModal").style.display = "block";
}

document.getElementById('closeModal').addEventListener('click', closeModal);
document.getElementById('closeTasks').addEventListener('click', closeModal);

function closeModal() {
    document.getElementById("myModal").style.display = "none";
}

updateCalendar();
displayCurrentDateTime();