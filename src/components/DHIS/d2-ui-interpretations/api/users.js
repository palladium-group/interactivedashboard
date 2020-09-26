'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getMentions = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var getMentions = exports.getMentions = function () {
    var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(d2) {
        var allUsersResponse, interpretationsResponse, commentsResponse, allUsers, allUsersByUsername, interpretationMentions, commentMentions, sortByFrequency, mostMentionedUsernames, mostMentionedUsers, allUsersFiltered;
        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _context.next = 2;
                        return (0, _api.apiFetch)(d2, "/users", "GET", {
                            fields: "id,displayName,userCredentials[username]",
                            order: "displayName:asc",
                            paging: false
                        });

                    case 2:
                        allUsersResponse = _context.sent;
                        _context.next = 5;
                        return (0, _api.apiFetch)(d2, "/interpretations", "GET", {
                            fields: "id,mentions",
                            filter: ['user.id:eq:' + d2.currentUser.id, "mentions:!null"],
                            paging: false
                        });

                    case 5:
                        interpretationsResponse = _context.sent;
                        _context.next = 8;
                        return (0, _api.apiFetch)(d2, "/interpretations", "GET", {
                            fields: "id,comments[mentions]",
                            filter: ['comments.user.id:eq:' + d2.currentUser.id, "comments.mentions.username:!null"],
                            paging: false
                        });

                    case 8:
                        commentsResponse = _context.sent;
                        allUsers = allUsersResponse.users.map(function (user) {
                            return {
                                id: user.id,
                                displayName: user.displayName,
                                username: user.userCredentials.username
                            };
                        });
                        allUsersByUsername = (0, _keyBy2.default)("username", allUsers);
                        interpretationMentions = (0, _flatMap2.default)(function (interpretation) {
                            return (0, _map2.default)("username", interpretation.mentions);
                        }, interpretationsResponse.interpretations);
                        commentMentions = (0, _flatMap2.default)(function (interpretation) {
                            return (0, _map2.default)("username", (0, _flatMap2.default)("mentions", interpretation.comments));
                        }, commentsResponse.interpretations);
                        sortByFrequency = (0, _flow2.default)((0, _groupBy2.default)(function (value) {
                            return value;
                        }), _toPairs2.default, (0, _map2.default)(function (_ref2) {
                            var _ref3 = (0, _slicedToArray3.default)(_ref2, 2),
                                value = _ref3[0],
                                group = _ref3[1];

                            return { value: value, count: group.length };
                        }), (0, _orderBy2.default)(["count", "value"], ["desc", "asc"]), (0, _map2.default)("value"));
                        mostMentionedUsernames = (0, _flow2.default)((0, _concat2.default)(commentMentions), (0, _without2.default)([d2.currentUser.username]), sortByFrequency)(interpretationMentions);
                        mostMentionedUsers = (0, _compact2.default)((0, _at2.default)(mostMentionedUsernames, allUsersByUsername));
                        allUsersFiltered = (0, _differenceBy2.default)("id", allUsers, mostMentionedUsers).filter(function (user) {
                            return d2.currentUser.id !== user.id;
                        });
                        return _context.abrupt('return', { allUsers: allUsersFiltered, mostMentionedUsers: mostMentionedUsers });

                    case 18:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, this);
    }));

    return function getMentions(_x) {
        return _ref.apply(this, arguments);
    };
}();

var _api = require('./api');

var _keyBy = require('lodash/fp/keyBy');

var _keyBy2 = _interopRequireDefault(_keyBy);

var _map = require('lodash/fp/map');

var _map2 = _interopRequireDefault(_map);

var _flatMap = require('lodash/fp/flatMap');

var _flatMap2 = _interopRequireDefault(_flatMap);

var _flow = require('lodash/fp/flow');

var _flow2 = _interopRequireDefault(_flow);

var _groupBy = require('lodash/fp/groupBy');

var _groupBy2 = _interopRequireDefault(_groupBy);

var _without = require('lodash/fp/without');

var _without2 = _interopRequireDefault(_without);

var _concat = require('lodash/fp/concat');

var _concat2 = _interopRequireDefault(_concat);

var _orderBy = require('lodash/fp/orderBy');

var _orderBy2 = _interopRequireDefault(_orderBy);

var _toPairs = require('lodash/fp/toPairs');

var _toPairs2 = _interopRequireDefault(_toPairs);

var _at = require('lodash/fp/at');

var _at2 = _interopRequireDefault(_at);

var _differenceBy = require('lodash/fp/differenceBy');

var _differenceBy2 = _interopRequireDefault(_differenceBy);

var _compact = require('lodash/fp/compact');

var _compact2 = _interopRequireDefault(_compact);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

;