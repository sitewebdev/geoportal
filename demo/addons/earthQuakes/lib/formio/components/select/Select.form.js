"use strict";

require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;
require("core-js/modules/es.array.concat.js");
var _ListComponent = _interopRequireDefault(require("../_classes/list/ListComponent.form"));
var _SelectEdit = _interopRequireDefault(require("./editForm/Select.edit.data"));
var _SelectEdit2 = _interopRequireDefault(require("./editForm/Select.edit.display"));
var _SelectEdit3 = _interopRequireDefault(require("./editForm/Select.edit.validation"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _default() {
  for (var _len = arguments.length, extend = new Array(_len), _key = 0; _key < _len; _key++) {
    extend[_key] = arguments[_key];
  }
  return _ListComponent["default"].apply(void 0, [[{
    key: 'display',
    components: _SelectEdit2["default"]
  }, {
    key: 'data',
    components: _SelectEdit["default"]
  }, {
    key: 'validation',
    components: _SelectEdit3["default"]
  }]].concat(extend));
}