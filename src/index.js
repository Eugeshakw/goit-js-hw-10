import {fetchBreeds, fetchCatByBreed} from './js/cat-api';
import SlimSelect from 'slim-select'
import 'slim-select/dist/slimselect.css';
import Notiflix, { Report } from 'notiflix';
let isFirstLoad = true;
import './sass/index.scss';


let selectData = []
console.log(selectData);

const select = new SlimSelect({
  select: '.breed-select',

  // option 

  data: selectData,

  })


const refs = {
    selectEl: document.querySelector('.breed-select'),
    loaderEl: document.querySelector('.loader'),
    error: document.querySelector('.error'),
    catInfo: document.querySelector('.cat-info'),
    
}


refs.loaderEl.style.display = 'none';
refs.loaderEl.textContent = '';
refs.error.style.display = 'none';

const errMessage = refs.error.textContent;



function showError() {
    Notiflix.Notify.failure(`${errMessage}`);
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
      selectData.push({text: cat.name, value: cat.id});
        const optionEl = document.createElement('option');
        optionEl.value = cat.id;
        optionEl.textContent = cat.name;
        // select.setData(selectData);
        // refs.selectEl.append(optionEl); 
    });
    select.setData(selectData);
};



function selectOn() {
  
  if (isFirstLoad){
    isFirstLoad = false;
    return
  }
    const breedId = this.value;
    refs.catInfo.innerHTML = ''
    showLoader();
    fetchCatByBreed(breedId)
      .then((cat) => {
        hideLoader();
        renderCatInfo(cat);
      })
      .catch((error) => {
        showError()
        hideLoader();
        refs.catInfo.innerHTML = ''
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
          <p><strong>Description:</strong>
          ${description}
          </p>
          <p><strong>Temperament:</strong>${temperament}</p>
        </div>
      </div>`

    catInfoDiv.innerHTML = catInfoTemplate;
  }



  