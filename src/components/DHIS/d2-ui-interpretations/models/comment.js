'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _api = require('../api/api');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Comment = function () {
    function Comment(interpretation, attributes) {
        (0, _classCallCheck3.default)(this, Comment);

        this._interpretation = interpretation;
        (0, _assign2.default)(this, attributes);
    }

    (0, _createClass3.default)(Comment, [{
        key: 'save',
        value: function () {
            var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(d2) {
                var interpretation, _ref2, _ref3, method, url;

                return _regenerator2.default.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                interpretation = this._interpretation;
                                var _ref2 = this.id ? ['PUT', '/interpretations/' + interpretation.id + '/comments/' + this.id] : ['POST', '/interpretations/' + interpretation.id + '/comments'], _ref3 = (0, _slicedToArray3.default)(_ref2, 2), method = _ref3[0], url = _ref3[1];
                                _context.next = 4;
                                return (0, _api.apiFetch)(d2, url, method, this.text);

                            case 4:
                                return _context.abrupt('return', _context.sent);

                            case 5:
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
        value: function () {
            var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(d2) {
                var interpretation, url;
                return _regenerator2.default.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                interpretation = this._interpretation;
                                url = '/interpretations/' + interpretation.id + '/comments/' + this.id;
                                _context2.next = 4;
                                return (0, _api.apiFetch)(d2, url, "DELETE");

                            case 4:
                                return _context2.abrupt('return', _context2.sent);

                            case 5:
                            case 'end':
                                return _context2.stop();
                        }
                    }
                }, _callee2, this);
            }));

            function _delete(_x2) {
                return _ref4.apply(this, arguments);
            }

            return _delete;
        }()
    }, {
        key: 'getReply',
        value: function getReply(d2) {
            var text = Comment.getReplyText(d2, this.user);
            return new Comment(this._interpretation, { text: text });
        }
    }], [{
        key: 'getReplyText',
        value: function getReplyText(d2, user) {
            var currentUsername = d2.currentUser.username;
            return user && user.userCredentials && user.userCredentials.username !== currentUsername ? "@" + user.userCredentials.username + " " : "";
        }
    }, {
        key: 'getReplyForInterpretation',
        value: function getReplyForInterpretation(d2, interpretation) {
            var text = Comment.getReplyText(d2, interpretation.user);
            return new Comment(interpretation, { text: text });
        }
    }]);
    return Comment;
}();

exports.default = Comment;
;
