## road-trip
### Code Badges
[![Build Status](https://travis-ci.org/kadowki/road-trip.svg)](https://travis-ci.org/kadowki/road-trip)
[![Coverage Status](https://coveralls.io/repos/kadowki/road-trip/badge.png)](https://coveralls.io/r/kadowki/road-trip)

### About
A road trip planner built on NodeJS, MongoDB, jQuery and Google Maps API.

### Models
```
Trip
prop-_id   
prop-name         
prop-cash       
prop-origin       
prop-destination  
prop-mpg 
prop-begin
prop-end
prop-photo
prop-distance
prop-gasPerGallon 
prop-gallons  
prop-tripCost
prop-delta
prop-stops
prop-events
prop-photos
.classmethod-all
.classmethod-create
.classmethod-findById
.classmethod-findStops
.instancemethod-movefile
```

```
Stop
prop-_id
prop-_tripID
prop-name
prop-lat
prop-lng
prop-events
prop-photos

.classmethod-find
.classmethod-findById
.classmethod-insert
.instance-eventsAndPhotos

```

### Features
- Google Maps API
- jQuery
- NodeJS
- MongoDB
- Jade

### Running Tests
```bash
$ npm install
$ npm test
```

### Contributors
- [David D. Boling](https://github.com/kadowki)

### License
[MIT](LICENSE)

