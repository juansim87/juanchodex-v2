//creamos una variable universal que sea un array donde iremos pusheando todas las entradas que cojamos de la api.

let ALL_POKEMONS = [];

//Esta variable sirve para después pintar de manera dinámica las tarjetas de los Pokemon.

const typeColors = {
	fire: "#FF4500",
	grass: "#006400",
	water: "#00FFFF",
	flying: "#F4A460",
	electric: "#FFD700",
	ground: "#8B4513",
	rock: "#C0C0C0",
	fairy: "#FFB6C1",
	bug: "#98FB98",
	poison: "#BA55D3",
	dragon: "#5a8bee",
	psychic: "#FF69B4",
	fighting: "#A52A2A",
	normal: "#FFDAB9",
	ghost: "#800080",
	steel: "#708090",
	ice: "#ADD8E6",
	dark: "#25259e",
	all: "wheat",
};

// Esta variable sirvepara traducir de manera dinámica los tipos de los pokemon al español.

const typeNames = {
	fire: "fuego",
	grass: "planta",
	water: "agua",
	flying: "volador",
	electric: "eléctrico",
	ground: "tierra",
	rock: "roca",
	fairy: "hada",
	bug: "bicho",
	poison: "veneno",
	dragon: "dragón",
	psychic: "psíquico",
	fighting: "lucha",
	normal: "normal",
	ghost: "fantasma",
	steel: "acero",
	ice: "hielo",
	dark: "siniestro",
	all: "todos",
};


const typeBackgrounds = {
	fire: "url('/media/backgrounds/fire.webp')",
	grass: "url('/media/backgrounds/grass.webp')",
	water: "url('/media/backgrounds/water.webp')",
	flying: "url('/media/backgrounds/flying.webp')",
	electric: "url('/media/backgrounds/electric.webp')",
	ground: "url('/media/backgrounds/ground.webp')",
	rock: "url('/media/backgrounds/rock.webp')",
	fairy: "url('/media/backgrounds/fairy.webp')",
	bug: "url('/media/backgrounds/bug.webp')",
	poison: "url('/media/backgrounds/poison.webp')",
	dragon: "url('/media/backgrounds/dragon.webp')",
	psychic: "url('/media/backgrounds/psychic.webp')",
	fighting: "url('/media/backgrounds/fighting.webp')",
	normal: "url('/media/backgrounds/normal.webp')",
	ghost: "url('/media/backgrounds/ghost.webp')",
	steel: "url('/media/backgrounds/steel.webp')",
	ice: "url('/media/backgrounds/ice.webp')",
	dark: "url('/media/backgrounds/dark.webp')",
	all: "url('/media/images/grass-field.png')", // Fondo por defecto
};

// Con esta función pintamos en la web los Pokemon seleccionados. La variable pokemonsToPaint indica cuáles de ellos.

const paintPokemons = (pokemonsToPaint) => {
	//Con esta variable podemos modificar los elementos HTML desde JavaScript
	const pokedex$$ = document.querySelector("#pokedex");
	pokedex$$.innerHTML = "";

	//Aquí rescatamos el valor "tipo" (type) de cada pokemon. Esto nos ayuda primero a poner los tipos en el "front" y después a dar color a la parte "back" de las cartas.

	const renderTypes = (pokemon) => {
		// Si existe un segundo valor en types, la condicional devuelve el valor doble. Si no existe segundo valor, solo se devolverá el valor único.
		if (pokemon.types[1]) {
			return `
      <div class="pkmn__type">${pokemon.types[0].type.name}</div>
      <div class="pkmn__type">${pokemon.types[1].type.name}</div>
      `;
		}
		return `
      <div class="pkmn__type">${pokemon.types[0].type.name}</div>
      `;
	};

	//Iteramos sobre el array guardado en https://pokeapi.co/, siendo el parámetro "pokemon" cada pokemon que querremos pintar. Esto lo determinaremos más adelante con el número
	//de pokemon al que queremos llegar.

	pokemonsToPaint.forEach((pokemon) => {
		//Con esta función se crea de manera dinámica la clase para las tarjetas.

		const pokemonCard$$ = document.createElement("div");

		//Aquí introducimos una clave con valor "flip-card", creando de esta manera una clase dinámica a la que luego añadiremos los modificaciones "front" y "back", de manera que al hacer
		// hover sobre la carta se convierta en "back".

		pokemonCard$$.className = "flip-card";

		//En esta variable introducimos toda la información que queremos mostrar sobre el Pokemon. Estamos metiendo de manera literal la información, además de las url de cada elemento.
		// Usamos el método .padStart() para rellenear los números de cada pokemon con 0 delante.
		const pokemonData = `
  <div class="flip-card-inner">
    <div class="flip-card-front">
      <div class="pkmn__core">
	  <div class="pkmn__image"><img  src="${pokemon.sprites.front_default}" alt="${
			pokemon.name
		}"></div>
        
        <h2 class="pkmn__id">#${pokemon.id.toString().padStart(4, "0")}</h2>
      </div>
      <div class="pkmn__info--front">
        <h2 class="pkmn__name">${pokemon.name}</h2>
		<div class="pkmn__types">
     ${renderTypes(pokemon)}     
	 </div>   
      </div>
    </div>
    <div class="flip-card-back" style="background:${getBGColorStyleByPokemon(
			pokemon
		)}">
		<div class="pkmn__image">
		<img class="pkmn__image" src="${pokemon.sprites.back_default}" alt="${
			pokemon.name
		}">
		</div>
      
      <div class="pkmn__info--back">
        <h2>Stats base</h2>
        <div class="pkmn__statcontainer">
		<div class="pkmn__statcontainer--column">
          <p>ATQ: ${pokemon.stats[1].base_stat}</p>
          <p>DEF: ${pokemon.stats[2].base_stat}</p>
		  <p>HP: ${pokemon.stats[0].base_stat}</p>
		  </div>
		  <div class="pkmn__statcontainer--column"><p>ATS: ${
				pokemon.stats[3].base_stat
			}</p>
          <p>DFS: ${pokemon.stats[4].base_stat}</p>
          <p>VEL: ${pokemon.stats[5].base_stat}</p>
		  </div>
        </div>
      </div>
    </div>
  </div>
`;

		pokemonCard$$.innerHTML = pokemonData;

		pokedex$$.appendChild(pokemonCard$$);
	});

	paintTypeBox();
};

document.getElementById("pokedex").addEventListener("click", (event) => {
	const card = event.target.closest(".flip-card"); // Detecta si se hizo click en una carta
	const flipMode = document.getElementById("flipMode").checked; // Verifica si el checkbox está marcado

	if (card) {
		// ✅ Si el checkbox NO está marcado (modo único activado), cerrar otras cartas
		if (!flipMode) {
			document.querySelectorAll(".flip-card").forEach((c) => {
				if (c !== card) c.classList.remove("flipped");
			});
		}

		// Alternar el estado de la carta seleccionada
		card.classList.toggle("flipped");
	}
});


const paintTypeBox = () => {
	const allTypeBox$$ = document.getElementsByClassName("pkmn__type");
	for (let index = 0; index < allTypeBox$$.length; index++) {
		const typeBox$$ = allTypeBox$$[index];

		typeBox$$.style.backgroundColor = typeColors[typeBox$$.innerHTML];
		typeBox$$.innerHTML = typeNames[typeBox$$.innerHTML];
	}
};

const getBGColorStyleByPokemon = (pokemon) => {
	if (pokemon.types.length === 1) {
		return typeColors[pokemon.types[0].type.name];
	}
	return `linear-gradient(
      135deg,
      ${typeColors[pokemon.types[0].type.name]} 33%,
      ${typeColors[pokemon.types[1].type.name]} 66%,
      ${typeColors[pokemon.types[1].type.name]} 100%
    )`;
};

const catchOnePokemon = async (id) => {
	const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
	const pokemonApi = await fetch(url);
	const pokemon = await pokemonApi.json();

	ALL_POKEMONS.push(pokemon);
};

const catchAllPokemons = async (count) => {
	const promises = [];
	for (let id = 1; id <= count; id++) {
		promises.push(
			fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).then((res) => res.json())
		);
	}
	ALL_POKEMONS = await Promise.all(promises);
	paintPokemons(ALL_POKEMONS);
};

const filterPokemon = (event) => {
	const searchInput = event.target.value.toLowerCase().trim();

	const filtered = ALL_POKEMONS.filter((pokemon) => {
		const pokemonId = pokemon.id === Number(searchInput);
		const pokemonName = pokemon.name.toLowerCase().includes(searchInput);

		return pokemonId || pokemonName;
	});
	paintPokemons(filtered);
};

document.addEventListener("DOMContentLoaded", () => {
	document.body.style.background = "url('/media/images/field-map.webp') repeat";
	document.body.style.backgroundColor = "transparent";
});

const filterPokemonByType = (type) => {
	if (type === "all") {
		// 🌿 Si se selecciona "all", usa el fondo por defecto
		document.getElementById("pokedex").style.backgroundImage = typeBackgrounds["all"];
		return paintPokemons(ALL_POKEMONS);
	}

	// 🎨 Filtrar Pokémon por tipo
	const filteredByType = ALL_POKEMONS.filter((pokemon) => {
		let firstType = false;
		let secondType = false;

		if (pokemon.types[1]) {
			secondType = pokemon.types[1].type.name === type;
		}
		if (pokemon.types[0]) {
			firstType = pokemon.types[0].type.name === type;
		}

		return firstType || secondType;
	});

	paintPokemons(filteredByType);

	// 🔥 Aplicar el fondo de imagen correspondiente al tipo seleccionado
	document.getElementById("pokedex").style.backgroundImage = typeBackgrounds[type] || typeBackgrounds["all"];

	
};

document.getElementById("search__input").addEventListener("input", (event) => {
	filterPokemon(event);
});

document.querySelectorAll(".types__selector").forEach((button) => {
	button.addEventListener("click", (event) => {
		filterPokemonByType(event.currentTarget.classList[1]);
	});
});

// Evento para cargar Pokémon según el selector de generación
document.getElementById("genSelect").addEventListener("change", (event) => {
	const count = event.target.value;

	catchAllPokemons(count);
	document.body.style.background = "url('/media/images/field-map.webp') repeat";
});

// Se carga automáticamente la primera generación al inicio
document.addEventListener("DOMContentLoaded", () => {
	const defaultCount = document.getElementById("genSelect").value;
	catchAllPokemons(defaultCount);
});

catchAllPokemons();
