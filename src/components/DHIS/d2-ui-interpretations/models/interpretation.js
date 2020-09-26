'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _pick = require('lodash/fp/pick');

var _pick2 = _interopRequireDefault(_pick);

var _last = require('lodash/fp/last');

var _last2 = _interopRequireDefault(_last);

var _api = require('../api/api');

var _comment = require('./comment');

var _comment2 = _interopRequireDefault(_comment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getInterpretationIdFromResponse(response) {
    var location = response.headers.get('location');

    if (location) {
        return (0, _last2.default)(location.split('/'));
    } else {
        throw new Error("Could not get interpretation ID");
    }
}

var Interpretation = function () {
    function Interpretation(parent, attributes) {
        var _this = this;

        (0, _classCallCheck3.default)(this, Interpretation);

        this._parent = parent;
        (0, _assign2.default)(this, attributes);
        this.comments = (attributes.comments || []).map(function (commentAttrs) {
            return new _comment2.default(_this, commentAttrs);
        });
    }

    (0, _createClass3.default)(Interpretation, [{
        key: 'save',
        value: function () {
            var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(d2) {
                var modelId, modelName, isNewInterpretation, response, interpretationId, sharingUrl, sharingPayload, _sharingPayload, _sharingUrl;

                return _regenerator2.default.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                modelId = this._parent.id;
                                modelName = this._parent.modelDefinition.name;
                                isNewInterpretation = !this.id;

                                if (!isNewInterpretation) {
                                    _context.next = 15;
                                    break;
                                }

                                _context.next = 6;
                                return (0, _api.apiFetchWithResponse)(d2, '/interpretations/' + modelName + '/' + modelId, "POST", this.text);

                            case 6:
                                response = _context.sent;
                                interpretationId = getInterpretationIdFromResponse(response);
                                sharingUrl = '/sharing?type=interpretation&id=' + interpretationId;
                                sharingPayload = this.sharing ? { object: this.sharing } : { object: (0, _pick2.default)(Interpretation.sharingFields, this._parent) };


                                this.sharing = null;
                                this.id = interpretationId;

                                return _context.abrupt('return', (0, _api.apiFetch)(d2, sharingUrl, "PUT", sharingPayload));

                            case 15:
                                _context.next = 17;
                                return (0, _api.apiFetch)(d2, '/interpretations/' + this.id, "PUT", this.text);

                            case 17:
                                if (!this.sharing) {
                                    _context.next = 22;
                                    break;
                                }

                                _sharingPayload = { object: (0, _extends3.default)({}, this.sharing, { id: this.id }) };
                                _sharingUrl = '/sharing?type=interpretation&id=' + this.id;

                                this.sharing = null;

                                return _context.abrupt('return', (0, _api.apiFetch)(d2, _sharingUrl, "PUT", _sharingPayload));

                            case 22:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));

            function save(_x) {
                return _ref.apply(this, arguments);
            }

            return save;
        }()
    }, {
        key: 'delete',
        value: function _delete(d2) {
            return (0, _api.apiFetch)(d2, '/interpretations/' + this.id, "DELETE");
        }
    }, {
        key: 'like',
        value: function like(d2, value) {
            return (0, _api.apiFetch)(d2, '/interpretations/' + this.id + '/like', value ? "POST" : "DELETE");
        }
    }]);
    return Interpretation;
}();

Interpretation.sharingFields = ["publicAccess", "externalAccess", "userGroupAccesses", "userAccesses"];
exports.default = Interpretation;
;