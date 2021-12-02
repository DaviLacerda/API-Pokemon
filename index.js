const search_name = document.getElementById('pkm-search');
const pkm_container = document.getElementById('pkm-container')
const pkm_name = document.getElementById('name');
const pkm_abilities = document.getElementById('abilities')
const pkm_order = document.getElementById('order')
const pkm_image = document.getElementById('image')

search_name.addEventListener('change', () => {
    getContent(search_name.value.toLowerCase());
})

function getPokemon(name) {
    return axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
}

function getContent(param) {
    if(param === ''){
        pkm_container.style.display = 'none'
        pkm_name.innerHTML = ''
        pkm_abilities.innerHTML = ''
        pkm_order.innerHTML = ''
        pkm_image.style.display = 'none'
    }
    else{
        Promise.all([getPokemon(param)])
        .then( (results) => {
                pkm_container.style.display = 'flex'
                
                pkm_name.innerHTML = `${firstLetterUpperCase(results[0].data.name)}`;

                pkm_abilities.innerHTML = `Abilities: ${firstLetterUpperCase(results[0].data.abilities[0].ability.name)} and ${firstLetterUpperCase(results[0].data.abilities[1].ability.name)}`

                pkm_order.innerHTML = `Nº ${results[0].data.id}`

                pkm_image.style.display = 'block'

                pkm_image.src = results[0].data.sprites.front_default;
            });
    }
}

function firstLetterUpperCase(param) {
    let upper = param.charAt(0).toUpperCase();
    let world = param.slice(1);

    return (upper + world);
}