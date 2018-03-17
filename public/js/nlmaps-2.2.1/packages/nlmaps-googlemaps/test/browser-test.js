import geoLocator from '../../nlmaps-geolocator/build/nlmaps-geolocator.es.js';

let    map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: 52, lng: 5},
      zoom: 8
    });
    let ElaMap = bgLayer(map);


    let mapTypeIds = ['Brt Achtergrondkaart', 'roadmap']
    map.mapTypes.set('Brt Achtergrondkaart', ElaMap);
    map.setOptions({
      mapTypeControl: true,
      mapTypeControlOptions: {
        mapTypeIds: mapTypeIds
      }

    });
    map.setMapTypeId('Brt Achtergrondkaart');
    let geolocator = geoLocator();
    let control = geoLocatorControl(geolocator, map);
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(control);






