import { fetchCountries } from './fetchCountries';
import debounce from 'lodash.debounce';
import './css/styles.css';
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;

const input = document.querySelector('#search-box');

const countryList = document.querySelector('.country-list');

const countryInfo = document.querySelector('.country-info');

const onInput = event => {
  if (event.target.value.trim() === '') {
    countryList.innerHTML = '';
    countryInfo.innerHTML = '';
    return;
  } else {
    countryList.innerHTML = '';
    countryInfo.innerHTML = '';

    const nameCountry = event.target.value;

    fetchCountries(nameCountry.trim())
      .then(data => {
        if (data.length <= 10) {
          const htmlString = data
            .map(
              obj => `<li class="country-item">
        <img src="${obj.flags.svg}" class ="flags-country">
        <p class="country-name">${obj.name.official}</p>
      </li>`
            )
            .join('');

          if (data.length >= 2) {
            countryList.innerHTML = htmlString;
          }

          if (data.length === 1) {
            countryList.innerHTML = htmlString;
            countryInfo.innerHTML = `<p class="text-info"><span class ="info-title">Capital:</span>${
              data[0].capital
            }</p>
        <p class="text-info"><span class ="info-title">Population:</span>${
          data[0].population
        }</p>
        <p class="text-info"><span class ="info-title">Languages:</span>${Object.values(
          data[0].languages
        )}</p>`;
          }
        } else {
          Notiflix.Notify.info(
            'Too many matches found. Please enter a more specific name.'
          );
        }
      })
      .catch(err => {
        console.log(err);
        Notiflix.Notify.failure('Oops, there is no country with that name');
      });

    console.log(nameCountry);
  }
};

input.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));
