(function () {
  const form = document.querySelector('#search-form');
  const searchField = document.querySelector('#search-keyword');
  let searchedForText;
  const responseContainer = document.querySelector('#response-container');

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    responseContainer.innerHTML = '';
    searchedForText = searchField.value;
  });

  function addImage(images) {
    const firstImage = images.results[0];

    responseContainer.insertAdjacentHTML('afterbegin', `<figure>
          <img src="${firstImage.urls.small}" alt="${searchedForText}">
          <figcaption>${searchedForText} by ${firstImage.user.name}</figcaption>
      </figure>`
    );
  }

  fetch(`https://api.unsplash.com/search/photos?page=1&query=${searchedForText}`, {
    headers: {
      Authorization: 'Client-ID p-FbSJsypSK68k-hWmmqFgMp1bf4-JighCPpZEV0MUY'
    }
  }).then(response => response.json())
    .then(addImage)
    .catch(e => requestError(e, 'image'));

  function requestError(e, part) {
    console.log(e);
    responseContainer.insertAdjacentHTML('beforeend', `<p class="network-warning">Oh no! There was an error making a request for the ${part}.</p>`);
  }

})();

