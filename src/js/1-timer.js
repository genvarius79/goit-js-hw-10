import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import errorIcon from '../img/error.svg';
const btnStart = document.querySelector('button');
const selector = document.querySelector('#datetime-picker');
const value = document.querySelectorAll('.value');
let userSelectedDate;
btnStart.disabled = true;
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (Date.parse(selectedDates[0]) < Date.parse(new Date())) {
      iziToast.error({
        iconUrl: errorIcon,
        iconColor: 'color: #fff',
        title: 'error',
        titleColor: '#fff',
        titleSize: '16px',
        titleLineHeight: '1.5',
        messageLineHeight: '1.5',
        message: 'Please choose a date in the future',
        messageColor: '#fff',
        messageSize: '16px',
        position: 'topRight',
        theme: 'dark',
        backgroundColor: '#B51B1B',
      });
      btnStart.disabled = true;
    } else {
      userSelectedDate = selectedDates[0];
      btnStart.disabled = false;
    }
  },
};

flatpickr(selector, options);

function addLeadingZero(value) {
  return value.padStart(2, '0');
}

btnStart.addEventListener('click', () => {
  selector.disabled = true;
  btnStart.disabled = true;
  function timer() {
    const time = Date.parse(userSelectedDate) - Date.parse(new Date());
    const days = convertMs(time).days;
    const hours = convertMs(time).hours;
    const minutes = convertMs(time).minutes;
    const seconds = convertMs(time).seconds;
    if (time <= 0) {
      clearInterval(intervalId);
      selector.disabled = false;
    }
    value[0].textContent = addLeadingZero(days.toString());
    value[1].textContent = addLeadingZero(hours.toString());
    value[2].textContent = addLeadingZero(minutes.toString());
    value[3].textContent = addLeadingZero(seconds.toString());
  }
  const intervalId = setInterval(timer, 1000);
});

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
