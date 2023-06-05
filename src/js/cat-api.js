export {fetchBreeds, fetchCatByBreed};

const options = {
    headers: {
        'x-api-key': 'live_7vlEAibVjYZSQcSDaN3MTS9Yl0jyXHV5GA6XzEG3DiJiS7yuNREKSsRGBFkV2I9z',
    },
  };

function fetchBreeds() {
  
    const url = 'https://api.thecatapi.com/v1/breeds123/?limit=20';
  
    return fetch(url, options)
      .then((response) => {

        if(!response.ok){
        throw new Error(response.status);
      }
      return response.json();

      })
      .catch((err) => {
        console.log(err);
        throw err;
      });
  }

function fetchCatByBreed(breedId) {
    const urlId = `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`;

    return fetch(urlId, options)
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .then((data) => {
      if (data.length > 0) {
        return data[0];
      }
      throw new Error('No cat found');
    })
    .catch((error) => {
      console.error(error);
      throw error;
    });
  }

//   return fetch(urlId, options)
//   .then((response) => {
//     if (!response.ok){
//         throw new Error(response.status);
//     }
//     return response.json();
//   })
//   .catch((err) => {
//     console.log(err);
//     throw err;
//   });