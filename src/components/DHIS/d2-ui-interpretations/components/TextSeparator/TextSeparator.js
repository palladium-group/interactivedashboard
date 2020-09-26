'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.TextSeparator = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _styles = require('@material-ui/core/styles');

var _TextSeparator = require('./styles/TextSeparator.style');

var _TextSeparator2 = _interopRequireDefault(_TextSeparator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TextSeparator = exports.TextSeparator = function TextSeparator(_ref) {
    var classes = _ref.classes,
        _ref$labelText = _ref.labelText,
        labelText = _ref$labelText === undefined ? "·" : _ref$labelText;
    return _react2.default.createElement(
        'label',
        { className: classes.linkArea },
        labelText
    );
};

TextSeparator.propTypes = {
    classes: _propTypes2.default.object.isRequired
};

exports.default = (0, _styles.withStyles)(_TextSeparator2.default)(TextSeparator);