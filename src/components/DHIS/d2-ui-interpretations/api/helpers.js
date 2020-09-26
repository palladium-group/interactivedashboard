'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.setSubscription = exports.getFavoriteWithInterpretations = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _interpretation = require('../models/interpretation');

var _interpretation2 = _interopRequireDefault(_interpretation);

var _api = require('./api');

var _redirect = require('./redirect');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var interpretationsFields = ['id', 'user[id,firstName,surname,displayName,userCredentials[username]]', 'created', 'lastUpdated', 'likes', 'likedBy[id,displayName]', 'text', 'publicAccess', 'externalAccess', 'userAccesses', 'userGroupAccesses', 'comments[id,text,created,lastUpdated,user[id,firstName,surname,displayName,userCredentials[username]]]'];

var favoriteFields = ['id', 'name', 'href', 'subscribed', 'user[id,firstName,surname,displayName]', 'displayName', 'description', 'displayDescription', 'created', 'lastUpdated', 'access', 'publicAccess', 'externalAccess', 'userAccesses', 'userGroupAccesses', 'interpretations[' + interpretationsFields.join(',') + ']'];

var getFavoriteWithInterpretations = exports.getFavoriteWithInterpretations = function getFavoriteWithInterpretations(d2, type, id) {
    var propName = _redirect.itemTypeMap[type.toUpperCase()].propName;
    var modelClass = d2.models[propName];
    var api = d2.Api.getApi();
    var model$ = modelClass.get(id, { fields: favoriteFields.join(',') });
    var views$ = api.get('dataStatistics/favorites/' + id).then(function (json) {
        return json.views;
    });

    return _promise2.default.all([model$, views$]).then(function (_ref) {
        var _ref2 = (0, _slicedToArray3.default)(_ref, 2),
            model = _ref2[0],
            views = _ref2[1];

        var modelInterpretations = model.interpretations.map(function (attrs) {
            return new _interpretation2.default(model, attrs);
        });

        return (0, _assign2.default)(model, {
            interpretations: modelInterpretations,
            favoriteViews: views,
            modelName: type
        });
    });
};

var setSubscription = exports.setSubscription = function () {
    var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(d2, model, newSubscriptionValue) {
        var path, method;
        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        if (!(!model || !model.href)) {
                            _context.next = 4;
                            break;
                        }

                        return _context.abrupt('return', _promise2.default.reject(new Error('Attribute href not found in model')));

                    case 4:
                        path = model.href + '/subscriber';
                        method = newSubscriptionValue ? "POST" : "DELETE";
                        _context.next = 8;
                        return (0, _api.apiFetch)(d2, path, method);

                    case 8:
                        return _context.abrupt('return', _context.sent);

                    case 9:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, undefined);
    }));

    return function setSubscription(_x, _x2, _x3) {
        return _ref3.apply(this, arguments);
    };
}();