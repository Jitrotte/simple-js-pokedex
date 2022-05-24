let pokemonRepository = (function () {
  let pokemonList = [];

  let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=35";
  // let modalContainer = document.querySelector("#modal-container");

  function add(pokemon) {
    pokemonList.push(pokemon);
  }

  function getAll() {
    return pokemonList;
  }

  function addListItem(pokemon) {
    let pokemonList = document.querySelector(".pokemon-list");
    let listpokemon = document.createElement("li");
    listpokemon.classList.add("group-pokemon-list");
    let button = document.createElement("button");
    button.innerText = pokemon.name;
    button.classList.add("button-class");
    button.setAttribute("data-toggle", "modal");
    button.setAttribute("data-target", "#pokemonModal");
    listpokemon.appendChild(button);
    pokemonList.appendChild(listpokemon);
    addEvent(button, pokemon);
  }

  addEvent = (button, pokemon) =>
    button.addEventListener("click", function () {
      showDetails(pokemon);
    });

  function loadList() {
    return fetch(apiUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (json) {
        json.results.forEach(function (item) {
          let pokemon = {
            name: item.name.toUpperCase(),
            detailsUrl: item.url,
          };
          add(pokemon);
        });
      })
      .catch(function (e) {
        console.error(e);
      });
  }

  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url)
      .then(function (response) {
        return response.json();
      })
      .then(function (details) {
        item.imageUrl = details.sprites.front_default;
        item.height = details.height;
        let types = [];
        details.types.forEach((item) => types.push(item.type.name));
        item.types = types;
      })
      .catch(function (e) {
        console.error(e);
      });
  }

  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
      showModal(pokemon);
    });
  }

  function showModal(pokemon) {
    let modalBody = $(".modal-body");
    let modalTitle = $(".modal-title");

    // creating an x button that closes the modal window when clicked
    // let closeButtonElement = document.createElement("button");
    // closeButtonElement.classList.add("modal-close");
    // closeButtonElement.innerText = "x";
    // closeButtonElement.addEventListener("click", hideModal);

    modalTitle.empty();
    modalBody.empty();

    let nameElement = document.createElement("h3");
    nameElement.innerText = pokemon.name;

    let heightElement = document.createElement("p");
    heightElement.innerText = "Height: " + pokemon.height;

    let typeElement = document.createElement("p");
    typeElement.innerText = "Types: " + pokemon.types;

    // creating an img tag that pulls front image of pokemon from api
    let imageElement = document.createElement("img");
    imageElement.classList.add("modal-img");
    imageElement.src = pokemon.imageUrl;

    // appending everything in the modal
    // modal.appendChild(closeButtonElement);
    modalTitle.append(nameElement);
    modalBody.append(heightElement);
    modalBody.append(typeElement);
    modalBody.append(imageElement);
  }

  // appending modal to the modal container
  // modalContainer.appendChild(modal);

  // makes the modal appear
  // modalContainer.classList.add("is-visible");

  // makes the modal dissapear
  // function hideModal() {
  //   modalContainer.classList.remove("is-visible");
  // }

  // listens for a keydown - specifically the 'escape' key then calls the hideModal function
  //   window.addEventListener("keydown", (e) => {
  //     if (
  //       e.key === "Escape" &&
  //       modalContainer.classList.contains("is-visible")
  //     ) {
  //       hideModal();
  //     }
  //   });

  //   // listens for a click outside the modal window.
  //   modalContainer.addEventListener("click", (e) => {
  //     let target = e.target;
  //     if (target === modalContainer) {
  //       hideModal();
  //     }
  //   });
  // }

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    showDetails: showDetails,
    addEvent: addEvent,
    loadList: loadList,
    loadDetails: loadDetails,
  };
})();

pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
