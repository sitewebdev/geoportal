const editionBar = (function () {
  //  Vector layer
  var vector = new ol.layer.Vector({ source: new ol.source.Vector() });
  // The map
  var map = mviewer.getMap();
  map.addLayer(vector);

  // Add the editbar
  var select = new ol.interaction.Select({ title: "Sélection" });
  select.set("title", "Sélection");
  // Add a tooltip
  var tooltip, edit, note;
  addEvent = () => {
    removeControl();
    map.addControl(edit);
    $(".ol-bar-cusom-edit").append(`
            <div class="ol-toggle ol-button ol-unselectable ol-control" id="list-events"  style="pointer-events: auto;">
                <button type="button" title="Afficher la liste" id="btn-show-events" onclick="editionBar.showEvents()" name="Offset"  data-original-title="Offset"><i class="fa fa-list"></i></button>
            </div> 
             <div class="ol-toggle ol-button ol-unselectable ol-control" id="close-edition"  style="pointer-events: auto;">
                <button type="button" title="Fermer l'édition" onclick="editionBar.removeControl()" id="btn-close-edition" name="Offset"  data-original-title="Offset"><i class="glyphicon glyphicon-remove"></i></button>
            </div>
        `);
  };
  showEvents = () => {
    $("#modal-edition").modal("show");

    // Formio.createForm(document.getElementById('formio'), {
    //     components: [
    //         {
    //             type: 'textfield',
    //             key: 'firstName',
    //             label: 'First Name',
    //             placeholder: 'Enter your first name.',
    //             input: true,
    //             tooltip: 'Enter your <strong>First Name</strong>',
    //             description: 'Enter your <strong>First Name</strong>'
    //         },
    //         {
    //             label: 'Birthdate',
    //             key: 'birthdate',
    //             type: 'datetime',
    //             input: true,
    //             format: 'yyyy-MM-dd hh:mm a',
    //             enableDate: true,
    //             enableTime: false,
    //             defaultDate: '',
    //             datepickerMode: 'day',
    //         },
    //         {
    //             type: 'button',
    //             action: 'submit',
    //             label: 'Submit',
    //             theme: 'primary'
    //         }
    //     ]
    // },{}).then(function(form) {
    //     $('#my-modal').modal('show')
    //     form.on('submit', function(submission) {
    //         console.log(submission);
    //     });
    // });
  };
  showModalEdition = (event) => {
    $("#modal-add-feature").modal("show");
    let coordinates = event.feature
      .getGeometry()
      .transform("EPSG:3857", "EPSG:4326").flatCoordinates;
    Formio.createForm(document.getElementById("form-edition"), {
      components: [
        {
          label: "Columns",
          columns: [
            {
              components: [
                {
                  type: "textfield",
                  key: "denomination",
                  label: "Libellé",
                  placeholder: "Taper libellé",
                  input: true,
                  tooltip: "Taper <strong>libellé</strong>",
                  description: "",
                  validate: {
                    required: true,
                  },
                },
              ],
              width: 12,
              offset: 0,
              push: 0,
              pull: 0,
              size: "md",
              currentWidth: 12,
            },
            {
              components: [
                {
                  type: "textfield",
                  key: "latitude",
                  label: "Lattitude (N)",
                  input: true,
                  tooltip: "<strong>Latittude</strong>",
                  description: "",
                  validate: {
                    required: true,
                  },
                  disabled: true,
                },
              ],
              width: 6,
              offset: 0,
              push: 0,
              pull: 0,
              size: "xs",
              currentWidth: 6,
            },
            {
              components: [
                {
                  type: "textfield",
                  key: "longitude",
                  label: "Longitude (O)",
                  input: false,
                  tooltip: " <strong>Longitude</strong>",
                  description: "",
                  validate: {
                    required: true,
                  },
                  disabled: true,
                },
              ],
              width: 6,
              offset: 0,
              push: 0,
              pull: 0,
              size: "xs",
              currentWidth: 6,
            },
          ],
          key: "columns1",
          type: "columns",
          input: false,
          tableView: false,
        },
        {
          type: "button",
          action: "submit",
          label: "Submit",
          theme: "success",
          leftIcon: "fa fa-save",
          disableOnInvalid: true,
          block: true,
        },
      ],
    }).then(function (form) {
      form.submission = {
        data: {
          denomination: "test",
          latitude: coordinates[1],
          longitude: coordinates[0],
        },
      };
      form.on("submit", function (submission) {
        console.log(submission.data);
        $("#modal-add-feature").modal("hide");
      });
    });
  };
  removeControl = () => {
    $(".ol-bar-cusom-edit").empty();
    map.removeControl(edit);
  };
  return {
    showEvents: showEvents,
    addEvent: addEvent,
    removeControl: removeControl,
    init: function () {
      Formio.icons = "fontawesome";

      tooltip = new ol.Overlay.Tooltip();
      note = new ol.control.Notification({
        className: "ol-notification-succes",
      });
      edit = new ol.control.EditBar({
        interactions: {
          // Use our own interaction > set the title inside
          Select: select,
          // Define button title
          DrawLine: "Ligne",
          // Drawregular with label
          DrawRegular: {
            title: "Forme régullière",
            ptsLabel: "pts",
            circleLabel: "cercle",
          },
        },
        className: "ol-bar-cusom-edit",
        source: vector.getSource(),
      });
      map.addOverlay(tooltip);
      map.addControl(note);
      edit.getInteraction("Select").on("select", function (e) {
        // debugger;
        if (this.getFeatures().getLength()) {
          tooltip.setInfo("Drag points on features to edit...");
        } else tooltip.setInfo();
        // alert('info')
        tooltip.setInfo();
        console.log(tooltip);
      });
      edit.getInteraction("Select").on("change:active", function (e) {
        // alert('info')
      });
      edit.getInteraction("ModifySelect").on("modifystart", function (e) {
        if (e.features.length === 1) tooltip.setFeature(e.features[0]);
      });
      edit.getInteraction("ModifySelect").on("modifyend", function (e) {
        tooltip.setFeature();
      });
      edit.getInteraction("DrawPoint").on("change:active", function (e) {});
      edit.getInteraction("DrawPoint").on("drawend", function (e) {
        showModalEdition(e);
      });
      edit.getInteraction("DrawLine").on(["change:active", "drawend"], function (e) {});
      edit.getInteraction("DrawLine").on("drawstart", function (e) {
        tooltip.setFeature(e.feature);
        tooltip.setInfo("Click to continue drawing line...");
      });
      edit.getInteraction("DrawPolygon").on("drawstart", function (e) {
        tooltip.setFeature(e.feature);
        tooltip.setInfo("Click to continue drawing shape...");
      });
      edit
        .getInteraction("DrawPolygon")
        .on(["change:active", "drawend"], function (e) {});
      edit.getInteraction("DrawHole").on("drawstart", function (e) {
        tooltip.setFeature(e.feature);
        tooltip.setInfo("Click to continue drawing hole...");
      });
      edit.getInteraction("DrawHole").on(["change:active", "drawend"], function (e) {});
      edit.getInteraction("DrawRegular").on("drawstart", function (e) {
        tooltip.setFeature(e.feature);
        tooltip.setInfo("Move and click map to finish drawing...");
      });
      edit
        .getInteraction("DrawRegular")
        .on(["change:active", "drawend"], function (e) {});

      // let table = new DataTable('#example');
      edit.on("info", function (e) {
        console.log(tooltip);
        note.show(
          '<i class="fa fa-info-circle"></i> ' +
            e.features.getLength() +
            " feature(s) selected",
          30000
        );
      });
    },
  };
})();

new CustomComponent("editionBar", editionBar.init);
