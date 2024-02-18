const pokemonsList = document.getElementById("pokemonList");
const loadMoreButton = document.getElementById("loadMoreButton");

const limit = 5;
const offset = 0;

const maxRecords = 151;

function loadPokemonsItems(offset, limit) {
  pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
    const newHtml = pokemons
      .map((pokemon) => {
        let paddingNumber = String(pokemon.number);
        paddingNumber = paddingNumber.padStart(3, "0");
        return `
        <li class="pokemon ${pokemon.type}">
          <span class="number">#${paddingNumber}</span>
          <span class="name">${pokemon.name}</span>
    
          <div class="detail">
              <ol class="types">
               ${pokemon.types
                 .map((type) => `<li class="type ${type}">${type}</li>`)
                 .join("")}
              </ol>
    
              <img src="${pokemon.photo}" alt="${pokemon.name}">
          </div>
    
        </li>
      `;
      })
      .join("");
    pokemonsList.innerHTML += newHtml;
  });
}

loadPokemonsItems(offset, limit);

loadMoreButton.addEventListener("click", (offset, limit) => {
  offset += limit;

  const qtyRecordNextPage = offset + limit;

  if (qtyRecordNextPage >= maxRecords) {
    const newLimit = maxRecords - offset;

    loadPokemonsItems(offset, newLimit);
    loadMoreButton.parentElement.removeChild(loadMoreButton);
  } else {
    loadPokemonsItems(offset, limit);
  }
});
