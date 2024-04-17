var startTime="2023-01-01",endTime=moment().format("YYYY-MM-DD");
const layer = new ol.layer.VectorImage({
    source: new ol.source.Vector({
        url: `https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=${startTime}&endtime=${endTime}&minlatitude=20.977&minlongitude=-18.765&maxlatitude=36.893&maxlongitude=1.011`,
        format: new ol.format.GeoJSON(),
    }),
    style: setStyle
});
const legend=  {
    items: [
        {
            label: "Secousse",
            geometry: "Point",
            styles: [
                new ol.style.Style({
                    image: new ol.style.Circle({
                        stroke: new ol.style.Stroke({
                            color: 'rgba(255, 204, 0, 0.2)',
                            width: 1.5,
                        }),
                        fill: new ol.style.Fill({
                            color: 'rgba(255, 153, 0, 0.4)',
                        }),
                        radius: 6
                    })
                })
            ],
        },

    ],
};
function setStyle(feature) {
    var mag = feature.getProperties()['mag']
    return new ol.style.Style({
        image: new ol.style.Circle({
            stroke: new ol.style.Stroke({
                color: 'rgba(255, 204, 0, 0.2)',
                width: 1.5,
            }),
            fill: new ol.style.Fill({
                color: 'rgba(255, 153, 0, 0.4)',
            }),
            radius: mag*2
        })
    })
}

new CustomLayer('earthQuake', layer,legend);

