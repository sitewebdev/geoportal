"use strict";

require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _default = {
  _id: '62d5264f8673caaf3e7afc14',
  title: 'dateTime2',
  name: 'dateTime2',
  path: 'datetime2',
  type: 'form',
  display: 'form',
  tags: [],
  owner: '6137352490eb201aaff6e79f',
  components: [{
    label: 'Date / Time',
    tableView: true,
    datePicker: {
      disableWeekends: false,
      disableWeekdays: false
    },
    enableMinDateInput: false,
    enableMaxDateInput: false,
    key: 'dateTime',
    type: 'datetime',
    input: true,
    widget: {
      type: 'calendar',
      displayInTimezone: 'viewer',
      locale: 'en',
      useLocaleSettings: false,
      allowInput: true,
      mode: 'single',
      enableTime: true,
      noCalendar: false,
      format: 'yyyy-MM-dd hh:mm a',
      hourIncrement: 1,
      minuteIncrement: 1,
      'time_24hr': false,
      minDate: null,
      disableWeekends: false,
      disableWeekdays: false,
      maxDate: null
    }
  }, {
    label: 'Text Field',
    widget: {
      type: 'calendar',
      altInput: true,
      allowInput: true,
      clickOpens: true,
      enableDate: true,
      enableTime: true,
      mode: 'single',
      noCalendar: false,
      format: 'yyyy-MM-dd hh:mm a',
      dateFormat: 'yyyy-MM-ddTHH:mm:ssZ',
      useLocaleSettings: false,
      hourIncrement: 1,
      minuteIncrement: 5,
      'time_24hr': false,
      saveAs: 'text',
      displayInTimezone: 'viewer',
      locale: 'en'
    },
    tableView: true,
    key: 'textField',
    type: 'textfield',
    input: true
  }, {
    type: 'button',
    label: 'Submit',
    key: 'submit',
    disableOnInvalid: true,
    input: true,
    tableView: false
  }],
  settings: {},
  properties: {},
  project: '61555aa912cab1f874bb17fc',
  controller: '',
  revisions: '',
  submissionRevisions: '',
  '_vid': 0,
  created: '2022-07-18T09:22:23.287Z',
  modified: '2022-11-14T13:40:52.276Z',
  machineName: 'tmcogwpnxqfxgxy:dateTime2'
};
exports["default"] = _default;