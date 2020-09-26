'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.CardHeader = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _styles = require('@material-ui/core/styles');

var _CardHeader = require('./styles/CardHeader.style');

var _CardHeader2 = _interopRequireDefault(_CardHeader);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CardHeader = exports.CardHeader = function CardHeader(_ref) {
    var classes = _ref.classes,
        userName = _ref.userName;
    return _react2.default.createElement(
        'div',
        { className: classes.interpretationName },
        _react2.default.createElement(
            'span',
            { className: classes.userLink },
            userName
        )
    );
};

CardHeader.propTypes = {
    classes: _propTypes2.default.object.isRequired,
    userName: _propTypes2.default.string.isRequired
};

exports.default = (0, _styles.withStyles)(_CardHeader2.default)(CardHeader);