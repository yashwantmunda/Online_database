var earthquake_data = []
var GenralFeature = [];
var Lat, Lon;
var point;
$(document).ready(function(){
  if(earthquake_data.length==0){
    $.get(' https://geodata-server.herokuapp.com/api/isc-data',function (data,stauts) {
      if(earthquake_data.length==0){
        earthquake_data.push(JSON.parse(data));
        console.log(earthquake_data);
      }
      console.log(earthquake_data[0].data);
      var j,l=earthquake_data[0].data.length;
        for(j=0;j<2000-1;j++){
            
             point = new ol.geom.Point([earthquake_data[0].data[j].Lon,earthquake_data[0].data[j].Lat]);

             GenralFeature.push(new ol.Feature(point))
        }
        console.log(ol);
        console.log(GenralFeature);
        ol.proj.useGeographic();
        var place = [78, 27];      
        var point = new ol.geom.Point(place);
        var map = new ol.Map({
          target: 'map',
          view: new ol.View({
            center: place,
            zoom: 5,
          }),
          layers: [
            new ol.layer.Tile({
              source: new ol.source.OSM(),
            }),
            new ol.layer.Vector({
              source: new ol.source.Vector({
                features: GenralFeature,
              }),
              style: new ol.style.Style({
                image: new ol.style.Circle({
                  radius: 5,
                  fill: new ol.style.Fill({color: 'rgba(154, 18, 179, 1)'}),
                  stroke: new ol.style.Stroke({color: 'rgba(0,0,0,1)'})
                }),
              }),
            }) ],
        });

        var element = document.getElementById('popup');

        var popup = new ol.Overlay({
          element: element,
          positioning: 'bottom-center',
          stopEvent: false,
          offset: [0, -10],
        });
        map.addOverlay(popup);

        function formatCoordinate(coordinate) {
          console.log(coordinate);
          return ("\n    <table>\n      <tbody>\n        <tr><th>lon</th><td>" + ( Number(coordinate[0]).toFixed(2)) + "</td></tr>\n        <tr><th>lat</th><td>" + (Number(coordinate[1]).toFixed(2)) + "</td></tr>\n      </tbody>\n    </table>");
        }

        // var info = document.getElementById('info');
        // map.on('moveend', function () {
        //   var view = map.getView();
        //   var center = view.getCenter();
        //   info.innerHTML = formatCoordinate(center);
        // });

        map.on('click', function (event) {
          console.log("event",event);
          var f = map.getFeaturesAtPixel(event.pixel);
          console.log("f",f);
          var feature = map.getFeaturesAtPixel(event.pixel)[0];
          console.log(feature);
          if (feature) {
            var coordinate = feature.getGeometry().getCoordinates();
            popup.setPosition(coordinate);
            $(element).popover({
              container: element.parentElement,
              html: true,
              sanitize: false,
              content: formatCoordinate(coordinate),
              placement: 'top',
            });
            $(element).popover('show');
          } else {
            $(element).popover('dispose');
          }
        });

        map.on('pointermove', function (event) {
          if (map.hasFeatureAtPixel(event.pixel)) {
            map.getViewport().style.cursor = 'pointer';
          } else {
            map.getViewport().style.cursor = 'inherit';
          }
        });
          })    
          }
        });


// var map = new ol.Map({
//     target: 'map',
//     layers: [
//       new ol.layer.Tile({
//         source: new ol.source.OSM()
//       })
//     ],
//     view: new ol.View({
//       center: ol.proj.fromLonLat([-110, -5.36]),
//       zoom: 2
//     })
//   });


//   var london = new ol.Feature({
//     geometry: new ol.geom.Point(ol.proj.fromLonLat([-0.12755, 51.507222])),
//   });
//   london.setStyle(
//     new ol.style.Style({
//       image: new ol.style.Icon({
//         color: 'rgba(255, 0, 0, .5)',
//         crossOrigin: 'anonymous',
//         src: 'https://play-lh.googleusercontent.com/tN7pGT9BgM15-NL16AKZmV0-GEn7uL8IAtyANUF0CQzSYpMTJum0j8UHUZ3b003Os79E',
//         scale: 0.2,
//       }),
//     })
//   );
//   var vectorSource = new ol.source.Vector({
//     features: [london],
//   });
//   var vectorLayer = new ol.layer.Vector({
//     source: vectorSource,
//   });
  
// new ol.Map({
//   layers: [vectorLayer],
//   target: document.getElementById('map'),
//   view: new ol.View({
//     center: ol.proj.fromLonLat([2.896372, 44.6024]),
//     zoom: 3,
//   }),
// });