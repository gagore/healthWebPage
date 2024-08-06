// map.js
var HOME_PATH = window.HOME_PATH || '.';

var cityhall = new naver.maps.LatLng(36.8323282, 127.1803750),
    map = new naver.maps.Map('map', {
        center: cityhall.destinationPoint(0, 100),
        zoom: 17
    }),
    marker = new naver.maps.Marker({
        map: map,
        position: cityhall
    });

var contentString = [
    '<div class="iw_inner">',
    '   <h3>헬스장</h3>',
    '   <p>상명대학교 k동<br/>',
    '       0층<br />',

    '   </p>',
    '</div>'
].join('');

var infowindow = new naver.maps.InfoWindow({
    content: contentString
});

naver.maps.Event.addListener(marker, "click", function(e) {
    if (infowindow.getMap()) {
        infowindow.close();
    } else {
        infowindow.open(map, marker);
    }
    
    
});

infowindow.open(map, marker);
