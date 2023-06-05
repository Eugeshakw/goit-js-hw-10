

const refs = {
    selectEl: document.querySelector('.breed-select'),
    loaderEl: document.querySelector('.loader'),
    error: document.querySelector('.error'),
    catInfo: document.querySelector('.cat-info')
}

console.log(refs.selectEl, refs.loaderEl, refs.error, refs.catInfo)








function fetchBreeds() {
    
    const options = {
    headers: {
        authorization: 'live_7vlEAibVjYZSQcSDaN3MTS9Yl0jyXHV5GA6XzEG3DiJiS7yuNREKSsRGBFkV2I9z'
    }
}

const url = 'https://api.thecatapi.com/v1/breeds/?limit=20'

return fetch(url, options)
    .then(response => response.json())
    
    .catch(err => console.log(err))

}

fetchBreeds().then(breeds => {
    breeds.forEach(breed => {
        const options = document.createElement('option')
        options.value = breed.id;
        options.textContent = breed.name;
        refs.selectEl.append(options);
        
    })
})