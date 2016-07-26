const pokegoScan = require('pokego-scan');
const defaultCoords = {
    latitude: 40.4164737,
    longitude: -3.7042757
};

/*
// obtain an array of pokemon close to the given coordinates
function pokegoScan(coords, function(err, pokemon) {
    if (err) throw err;
    console.log(pokemon);
});

/* returns:
[ { id: '23578871',
    data: '[]',
    expiration_time: 1469133198,
    pokemonId: '56',
    latitude: 40.41668174482,
    longitude: -3.7048426265191,
    uid: '0d422880aed:23',
    is_alive: true,
    name: 'Mankey',
    map: 'https://pokevision.com/#/@40.41668174482,-3.7048426265191',
    image: 'https://ugc.pokevision.com/images/pokemon/56.png',
    distance: 53,
    distance_str: '53m',
    despawns_in: 603,
    despawns_in_str: '10:03' },
  ... ]


// filter by max distance
pokegoScan(coords, {distance: 100}, function(err, pokemon) {
    if (err) throw err;
    console.log(pokemon);
});

// filter by specific pokemon
pokegoScan(coords, {filter: ["Zubat", "Pidgey"]}, function(err, pokemon) {
    if (err) throw err;
    console.log(pokemon);
});
*/
module.exports = {
	scan(coords) {
		return new Promise( (resolve, reject) => {
			const result = pokegoScan(coords, (err, pokemon) => {
				if (err) throw err;
				if (pokemon)
					resolve(pokemon);
					
				reject('No pokemon found');
			});
		})
	}
};
