'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Link = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Link = require('./styles/Link.style');

var _Link2 = _interopRequireDefault(_Link);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Link = function Link(_ref) {
    var label = _ref.label,
        value = _ref.value,
        _onClick = _ref.onClick,
        otherProps = (0, _objectWithoutProperties3.default)(_ref, ['label', 'value', 'onClick']);
    return _react2.default.createElement(
        'a',
        (0, _extends3.default)({
            style: _Link2.default.interpretationLink,
            onClick: function onClick() {
                return _onClick(value);
            }
        }, otherProps),
        label
    );
};

exports.Link = Link;
Link.propTypes = {
    label: _propTypes2.default.string.isRequired,
    value: _propTypes2.default.string,
    onClick: _propTypes2.default.func.isRequired,
    otherProps: _propTypes2.default.object
};

exports.default = Link;