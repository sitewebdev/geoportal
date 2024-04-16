const layerId = "earthQuake";

function init() {

}

function destroy() {}



var earthQuakeControl = new CustomControl(layerId, init, destroy);
earthQuakeControl.createForm = function ()
{
  Formio.createForm(document.getElementById("form-earthquake"), {
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
}



