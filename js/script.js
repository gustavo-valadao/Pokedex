//Link do tutorial Youtube
//https://www.youtube.com/watch?v=SjtdH3dWLa8

const pokemonName = document.querySelector('.pokemon__name');
const pokemonNumber = document.querySelector('.pokemon__number');
const pokemonImage = document.querySelector('.pokemon__image');

const form = document.querySelector('.form')
const input = document.querySelector('.input__search')

const buttonPrev = document.querySelector('.btn-prev')
const buttonNext = document.querySelector('.btn-next')

let searchPokemon = 1





const fetchPokemon = async (pokemon) => {

    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

    if (APIResponse.status == 200) {
        const data = await APIResponse.json()   
        return data;
    }


}

const renderPokemon = async (pokemon) => {

    pokemonName.innerHTML = 'Loading...';
    pokemonNumber.innerHTML = '';

    const data = await fetchPokemon(pokemon)

    if (data) {
        
        pokemonName.innerHTML = data.name;
        pokemonNumber.innerHTML = data.id;
        pokemonImage.style.display = 'block'
        pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
    

        // Ajustes para manter o tamanho proporcional do 
        // Cálculo da altura proporcional
        const rawHeight = data.height; 
        const maxHeightPercent = 18; // máximo 
        const minHeightPercent = 5; // mínimo
        const baseHeightPercent = rawHeight * 1; // Fator de proporção, pode ser ajustado.

        // Limita o valor entre mínimo e máximo
        const finalHeight = Math.max(minHeightPercent, Math.min(baseHeightPercent, maxHeightPercent));

        // Aplica no estilo
        pokemonImage.style.height = `${finalHeight}%`;


        input.value = ''; 

        searchPokemon = data.id;

    } else {
        pokemonName.innerHTML = 'Not Found  :c';
        pokemonNumber.innerHTML = '';
        pokemonImage.style.display = 'none'
    }

}


form.addEventListener('submit', (event) => {
    
    event.preventDefault();
    renderPokemon(input.value.toLowerCase());

})

buttonNext.addEventListener('click', () => {

    searchPokemon += 1;
    renderPokemon(searchPokemon)
    

})

buttonPrev.addEventListener('click', () => {

    if (searchPokemon > 1) {
        searchPokemon -= 1;
        renderPokemon(searchPokemon)
    }
    

})


renderPokemon(searchPokemon)
