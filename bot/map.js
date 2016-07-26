const GoogleMapsAPI = require('googlemaps');
const publicConfig = {
  key: process.env.GMAPS_TOKEN,
  stagger_time:       1000, // for elevationPath
  encode_polylines:   false,
  secure:             true
};
const gmAPI = new GoogleMapsAPI(publicConfig);
//TODO: Change params on user request
const params = {
  center: '444 W Main St Lock Haven PA',
  zoom: 15,
  size: '300x300',
  maptype: 'roadmap',
  markers: [
    {
      location: '300 W Main St Lock Haven, PA',
      label   : 'A',
      color   : 'green',
      shadow  : true
    },
    {
      location: '444 W Main St Lock Haven, PA',
      icon: 'http://chart.apis.google.com/chart?chst=d_map_pin_icon&chld=cafe%7C996600'
    }
  ],
  style: [
    {
      feature: 'road',
      element: 'all',
      rules: {
        hue: '0x00ff00'
      }
    }
  ]
};

module.exports = {
	getMap(location, markers) {
		//TODO: Change params on user request ^
		console.log('Map at: ', location);
		console.log('Markers: ', markers);
		return new Promise( (resolve, reject) => {
			gmAPI.staticMap(params, (err, binaryImage) => {
				if (err) throw err;
				if (binaryImage)
					resolve(binaryImage);
				reject('No map found');
			});
		});
	}
}
