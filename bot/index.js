const TGBot = require('node-telegram-bot-api');
const fs = require('fs');

const token = process.env.POKEBROBOT_TOKEN;
const pokescan = require('./pokescan');
const map = require('./map');

var bot;
//TODO: Fix production enviroment with webhooks :D
if (process.env.NODE_ENV === 'production') {
	bot = new TGBot(token);
	bot.setWebHook('https://bot.kanttiinit.fi/' + token);
} else {
	bot = new TGBot(token, {
		polling: true
	});
}

function requestLocation(msg) {
	bot.sendMessage(msg.chat.id, 'Can I use your location?', {
		'reply_markup':{
			'keyboard':[[{
				'text':'Sure, use my location!',
				'request_location':true
			}], [{
				'text':"No, don't use my location.",
				'hide_keyboard':true
			}]],
			'resize_keyboard':true,
			'one_time_keyboard':true,
			'selective':true
		}
	});
}

bot.on('location', msg => {
	bot.sendMessage(msg.chat.id, 'Scanning...');
	const {latitude, longitude} = msg.location;
	pokescan.scan(msg.location)
	.then( result => {
		const pokemons = result.map( item => item['name'] + ' #' + item['pokemonId'] + ' (' + item['distance'] + 'm)');
		const markers = result.map ( item => {
			return {
				latitude:item['latitude'],
				longitude:item['longitude'],
				image:item['image']
			}
		});
		bot.sendMessage(msg.chat.id, pokemons.join('\n'));
		map.getMap(msg.location, markers)
		.then( map => {
			//TODO: fix sendPhoto "too big"-RIP
			//bot.sendPhoto(msg.chat.id, map);
		})
	});
});

module.exports = bot;
