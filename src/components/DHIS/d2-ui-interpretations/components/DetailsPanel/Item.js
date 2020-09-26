'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Item = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _styles = require('@material-ui/core/styles');

var _Details = require('./styles/Details.style');

var _Details2 = _interopRequireDefault(_Details);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Item = exports.Item = function Item(_ref) {
    var classes = _ref.classes,
        label = _ref.label,
        text = _ref.text;
    return _react2.default.createElement(
        'div',
        { className: classes.detailsCardItem },
        label && _react2.default.createElement(
            'label',
            { className: classes.item },
            label,
            ':'
        ),
        text
    );
};

Item.propTypes = {
    classes: _propTypes2.default.object.isRequired,
    label: _propTypes2.default.string,
    text: _propTypes2.default.oneOfType([_propTypes2.default.node, _propTypes2.default.string])
};

exports.default = (0, _styles.withStyles)(_Details2.default)(Item);