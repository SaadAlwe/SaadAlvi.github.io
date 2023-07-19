
// get DOM elements
const currentTime = document.getElementById("current-time");
const setAlarmBtn = document.getElementById("set-alarm-btn");
const alarmInput = document.getElementById("alarm-time");
const alarmSound = document.getElementById("alarm-sound");
const alarmImage = document.getElementById("alarm-image");

// function to show current time
function showCurrentTime() {
  const date = new Date();
  const time = date.toLocaleTimeString();
  currentTime.innerText = ` ${time}`;
}

// function to set alarm
function setAlarm() {
  const alarm = alarmInput.value;
  if (!alarm) {
    alert("Please select a valid time");
    return;
  }
  const [hours, minutes] = alarm.split(":");
  const alarmTime = new Date();
  alarmTime.setHours(hours);
  alarmTime.setMinutes(minutes);
  alarmTime.setSeconds(0);
  console.log('Alarm has been set for ;',alarm);
  const now = new Date();
  const timeToAlarm = alarmTime.getTime() - now.getTime();

  if (timeToAlarm < 0) {
    alert("Selected time has already passed. Please select a valid time.");
    return;
  }

  setTimeout(() => {
    alarmSound.play();
    alarmImage.classList.add("shake-image");
    alert("Alarm!");
  }, timeToAlarm);

  const alarmHours = alarmTime.getHours() % 12 || 12;
  const alarmMinutes = alarmTime.getMinutes().toString().padStart(2, "0");
  const amPm = alarmTime.getHours() >= 12 ? "PM" : "AM";
  const message = `Alarm set for ${alarmHours}:${alarmMinutes} ${amPm}`;
  document.getElementById("alarm-message").textContent = message;;
  document.getElementById("alarm-message").textContent = message;
}

// show current time
showCurrentTime();
setInterval(showCurrentTime, 1000); // update time every second

// add event listener to set alarm button
setAlarmBtn.addEventListener("click", setAlarm);

// add event listener to reset image and message when alarm is stopped
alarmSound.addEventListener("ended", () => {
  alarmImage.classList.remove("shake-image");
  alarmMessage.innerText = "";
});