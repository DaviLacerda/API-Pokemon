const search_name = document.getElementById('pkm-search');
const pkm_container = document.getElementById('pkm-container')

const pkm_name = document.getElementById('name');
const pkm_abilities = document.getElementById('abilities')
const pkm_order = document.getElementById('order')
const pkm_image = document.getElementById('image')
const pkm_type = document.getElementById('type')

const load_spinner = document.getElementById('spinner')


search_name.addEventListener('change', () => {
    load_spinner.style.display = 'block'
    getContent(search_name.value.toLowerCase());
})

function getPokemon(name) {
    return axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
}

async function getContent(param) {
    if(param === ''){
        pkm_container.style.display = 'none'
        load_spinner.style.display = 'none'
        removeAllChildNodes(pkm_type);
    }
    else{
        try {
            const pokemon = await getPokemon(param);
        
            load_spinner.style.display = 'none'
            pkm_container.style.display = 'flex'
                    
            pkm_name.innerHTML = `${firstLetterUpperCase(pokemon.data.name)}`;

            removeAllChildNodes(pkm_abilities);
            getAbilities(pokemon.data.abilities)

            pkm_order.innerHTML = `Nº ${pokemon.data.id}`

            removeAllChildNodes(pkm_type);
            createTypeBtn(getType(pokemon.data.types));

            pkm_image.style.display = 'block'

            pkm_image.src = pokemon.data.sprites.front_default;
        } catch (error) {
            alert('Not found this pokemon!')
            load_spinner.style.display = 'none'
        }
    }
}

function firstLetterUpperCase(param) {
    let upper = param.charAt(0).toUpperCase();
    let world = param.slice(1);

    return (upper + world);
}

function getAbilities(param) {
    let abilities = ''
    let i;
    for(i = 0; i < param.length; i++){
        if(i === 0){
            abilities += `${firstLetterUpperCase(param[i].ability.name)}`;
        }
        else{
            abilities += ` and ${firstLetterUpperCase(param[i].ability.name)}`
        }
    }

    if(i === 1){
        pkm_abilities.innerHTML = `Ability : ${abilities}`;
    }
    else{
        pkm_abilities.innerHTML = `Abilities : ${abilities}`;
    }
}

function getType(array) {
    let size = array.length;
    let result = [];
    for(let i = 0; i < size; i++){
        result.push(array[i]);
    }
    return result;
}

function createTypeBtn(array) {
    for(let i = 0; i < array.length; i++){
        let btn = document.createElement('button');
        btn.innerHTML = array[i].type.name;
        addColorType(btn, btn.textContent);
        pkm_type.appendChild(btn);
    }
}

function addColorType(btn, param) {
    if(param === 'normal'){
        btn.style.backgroundColor = '#A4ACAF'
    }
    else if(param === 'fighting'){
        btn.style.backgroundColor = '#D56723'
    }
    else if(param === 'flying'){
        btn.style.background = 'linear-gradient(180deg, #3dc7ef 50%, #bdb9b8 50%)'
    }
    else if(param === 'poison'){
        btn.style.backgroundColor = '#B97FC9'
    }
    else if(param === 'ground'){
        btn.style.background = 'linear-gradient( 180deg, #f7de3f 50%, #ab9842 50%)'
    }
    else if(param === 'rock'){
        btn.style.backgroundColor = '#A38C21'
    }
    else if(param === 'bug'){
        btn.style.backgroundColor = '#729F3F'
    }
    else if(param === 'ghost'){
        btn.style.backgroundColor = '#7B62A3'
    }
    else if(param === 'steel'){
        btn.style.backgroundColor = '#9EB7B8'
    }
    else if(param === 'fire'){
        btn.style.backgroundColor = '#FD7D24'
    }
    else if(param === 'water'){
        btn.style.backgroundColor = '#4592C4'
    }
    else if(param === 'grass'){
        btn.style.backgroundColor = '#9BCC50'
    }
    else if(param === 'eletric'){
        btn.style.backgroundColor = '#EED535'
    }
    else if(param === 'psychic'){
        btn.style.backgroundColor = '#F366B9'
    }
    else if(param === 'ice'){
        btn.style.backgroundColor = '#51C4E7'
    }
    else if(param === 'dragon'){
        btn.style.background = 'linear-gradient(180deg, #53a4cf 50%, #f16e57 50%)'
    }
    else if(param === 'dark'){
        btn.style.backgroundColor = '#707070'
    }
    else {
        btn.style.backgroundColor = '#FDB9E8'
    }
}

function removeAllChildNodes(parent) {
    while (parent.lastChild) {
        parent.removeChild(parent.lastChild);
    }
}