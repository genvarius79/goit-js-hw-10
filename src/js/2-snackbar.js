import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import okIcon from '../img/ok.svg';
import errorIcon from '../img/error.svg';

const form = document.querySelector('.form');
const radioButton = form.state;
form.addEventListener('submit', event => {
  event.preventDefault();
  const delay = form.delay.value;
  // Create promise

  const makePromise = (shouldResolve, delay) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (shouldResolve) {
          resolve(
            iziToast.error({
              iconUrl: okIcon,
              iconColor: 'color: #fff',
              title: 'OK',
              titleColor: '#fff',
              titleSize: '16px',
              titleLineHeight: '1.5',
              messageLineHeight: '1.5',
              message: `Fulfilled promise in ${delay} ms`,
              messageColor: '#fff',
              messageSize: '16px',
              position: 'topRight',
              theme: 'dark',
              backgroundColor: '#59a10d',
            })
          );
        } else {
          reject(
            iziToast.error({
              iconUrl: errorIcon,
              iconColor: 'color: #fff',
              title: 'error',
              titleColor: '#fff',
              titleSize: '16px',
              titleLineHeight: '1.5',
              messageLineHeight: '1.5',
              message: `Rejected promise in ${delay} ms`,
              messageColor: '#fff',
              messageSize: '16px',
              position: 'topRight',
              theme: 'dark',
              backgroundColor: '#ef4040',
            })
          );
        }
      }, delay);
    });
  };

  // Registering promise callbacks
  makePromise(radioButton[0].checked, delay)
    .then(value => value)
    .catch(error => error);
});
