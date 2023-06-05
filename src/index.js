import {fetchBreeds, fetchCatByBreed} from './js/cat-api';
import SlimSelect from 'slim-select'
import 'slim-select/dist/slimselect.css';
import Notiflix, { Report } from 'notiflix';

import './sass/index.scss';
new SlimSelect({
    select: '.breed-select'
  })

const refs = {
    selectEl: document.querySelector('.breed-select'),
    loaderEl: document.querySelector('.loader'),
    error: document.querySelector('.error'),
    catInfo: document.querySelector('.cat-info')
}

refs.loaderEl.style.display = 'none'
refs.loaderEl.textContent = '';
refs.error.style.display = 'none';



function showError() {
    Notiflix.Notify.failure('Oops! Sth went wrong!');
}



function showLoader() {
    refs.loaderEl.style.display = 'block';
  }

  function hideLoader() {
    refs.loaderEl.style.display = 'none';
  }



refs.selectEl.addEventListener('change', selectOn);

showLoader();

fetchBreeds()
    .then((cats) => {
        hideLoader();
        addListOfCatsToSelect(cats);
    })
    .catch((error) => {
        showError()
        
        
    });

function addListOfCatsToSelect(cats){
    
    cats.forEach((cat) => {
        const optionEl = document.createElement('option');
        optionEl.value = cat.id;
        optionEl.textContent = cat.name;
        refs.selectEl.append(optionEl); 
    });
    
};

function selectOn() {
    const breedId = this.value;

    showLoader();
    fetchCatByBreed(breedId)
      .then((cat) => {
        hideLoader();
        renderCatInfo(cat);
      })
      .catch((error) => {
        showError()
        
        
      });
  }
  
  function renderCatInfo(cat) {
    const catInfoDiv = refs.catInfo;
  
    
    const name = cat.breeds[0].name || '';
    const description = cat.breeds[0].description || '';
    const temperament = cat.breeds[0].temperament || '';
    const imageUrl = cat.url || '';
  
    
    const catInfoTemplate = 
    `<div class="container">
    <div class="right-section">
      <figure class="img-wrapper">
        <img id="image-id" src="${imageUrl}" alt="${name}" />
      </figure>
    </div>
    <div class="left-section">
      <div class="text-section">
        <h2>${name}</h2>
        <div>
          <p>
          ${description}
          </p>
        </div>
      </div>`
    
    // `
    //   <h2>${name}</h2>
    //   <p>${description}</p>
    //   <p>Temperament: ${temperament}</p>
    //   <img src="${imageUrl}" alt="${name}" width="400">
    // `;
  
    
    catInfoDiv.innerHTML = catInfoTemplate;
  }



// function selectOn() {
//     const breedId = this.value;
//     fetchCatByBreed(breedId)
//         .then((cat) => {
//             console.log('Cat:', cat);
//         })
//         .catch((error) => {
//             console.error('Error:', error);
//         });
// };