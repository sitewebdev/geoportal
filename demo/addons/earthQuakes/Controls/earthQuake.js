const layerId = "earthQuake"

function init() {
    createForm()
    const vectorLayer = new ol.layer.VectorImage({
        background: '#1a2b39',
        imageRatio: 2,
        source: new ol.source.Vector({
            url: 'https://openlayers.org/data/vector/ecoregions.json',
            format: new ol.format.GeoJSON(),
        }),
        style: {
            'fill-color': ['string', ['get', 'COLOR'], '#eee'],
        },
    });
    mviewer.getMap().l
}

function destroy() {

}

let ctrlEarthQuake = new CustomControl(layerId, init, destroy);

function createForm() {
    const script = document.createElement("script");
    document.body.appendChild(script);
    script.type = "text/javascript";
    script.async = true;
    script.src = "https://cdn.form.io/js/formio.full.min.js";
    script.onload = () => {
        Formio.createForm(document.getElementById('form-earthquake'), {
            components: [
                {
                    "label": "Date Début",
                    "displayInTimezone": "utc",
                    "format": "yyyy-MM-dd",
                    "customClass": "custom-cls-date",
                    "tableView": false,
                    "datePicker": {
                        "disableWeekends": false,
                        "disableWeekdays": false
                    },
                    "enableTime": false,
                    "defaultDate": "moment()",
                    "customOptions": {
                        "mode": "single"
                    },
                    "enableMinDateInput": false,
                    "enableMaxDateInput": false,
                    "key": "startTime",
                    "attributes": {
                        "id": "tes"
                    },
                    "type": "datetime",
                    "input": true,
                    validate: {
                        required: true,
                    },
                    "widget": {
                        "type": "calendar",
                        "displayInTimezone": "utc",
                        "locale": "en",
                        "useLocaleSettings": false,
                        "allowInput": true,
                        "mode": "range",
                        "enableTime": false,
                        "noCalendar": false,
                        "format": "yyyy-MM-dd",
                        "hourIncrement": 1,
                        "minuteIncrement": 1,
                        "time_24hr": false,
                        "minDate": null,
                        "disableWeekends": false,
                        "disableWeekdays": false,
                        "maxDate": null
                    }
                },
                {
                    "label": "Date Fin",
                    "displayInTimezone": "utc",
                    "format": "yyyy-MM-dd",
                    "customClass": "custom-cls-date",
                    "tableView": false,
                    "datePicker": {
                        "disableWeekends": false,
                        "disableWeekdays": false
                    },
                    "enableTime": false,
                    "defaultDate": "moment()",
                    "customOptions": {
                        "mode": "single"
                    },
                    "validate": {
                        required: true,
                        "custom": "valid = moment(input).isSameOrAfter(moment(row.startTime))? true : 'Date fin doit être supérieur ou égale Date de début';"
                    },
                    "enableMinDateInput": false,
                    "enableMaxDateInput": false,
                    "key": "endTime",
                    "attributes": {
                        "id": "tes"
                    },
                    "type": "datetime",
                    "input": true,
                    "widget": {
                        "type": "calendar",
                        "displayInTimezone": "utc",
                        "locale": "en",
                        "useLocaleSettings": false,
                        "allowInput": true,
                        "mode": "range",
                        "enableTime": false,
                        "noCalendar": false,
                        "format": "yyyy-MM-dd",
                        "hourIncrement": 1,
                        "minuteIncrement": 1,
                        "time_24hr": false,
                        "minDate": null,
                        "disableWeekends": false,
                        "disableWeekdays": false,
                        "maxDate": null
                    }
                },
                {

                    type: 'button',
                    action: 'submit',
                    label: 'Filtrer',
                    theme: 'success',
                    leftIcon: "fa fa-filter",
                    disableOnInvalid: true,
                    block: true,
                    id: 'sumbit-form-earthQuake'
                }
            ]
        }).then(function (form) {
            form.submission = {
                data: {
                    startTime: moment().format("YYYY-MM-DD"),
                    endTime: moment().format("YYYY-MM-DD")
                }
            };
            form.on('submit', function (submission) {
                const {startTime, endTime} = submission.data;
                mviewer.getLayer('earthQuake').layer.setSource(null)
                mviewer.getLayer('earthQuake').layer.setSource(new ol.source.Vector({
                    url: `https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=${moment(startTime).format("YYYY-MM-DD")}&endtime=${moment(endTime)
                        .format("YYYY-MM-DD")}&minlatitude=20.977&minlongitude=-18.765&maxlatitude=36.893&maxlongitude=1.011`,
                    format: new ol.format.GeoJSON(),
                }))

            });
        });
    }

}



