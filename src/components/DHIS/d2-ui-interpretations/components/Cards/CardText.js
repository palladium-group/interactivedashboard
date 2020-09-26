'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.CardText = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _styles = require('@material-ui/core/styles');

var _d2UiRichText = require('@dhis2/d2-ui-rich-text');

var _CardText = require('./styles/CardText.style');

var _CardText2 = _interopRequireDefault(_CardText);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CardText = exports.CardText = function CardText(_ref) {
    var classes = _ref.classes,
        extended = _ref.extended,
        text = _ref.text;
    return _react2.default.createElement(
        'div',
        {
            className: extended ? classes.interpretationText : classes.interpretationTextLimited
        },
        _react2.default.createElement(
            _d2UiRichText.Parser,
            { style: _CardText2.default.parser },
            text
        )
    );
};

CardText.defaultProps = {
    extended: true
};
CardText.propTypes = {
    classes: _propTypes2.default.object.isRequired,
    extended: _propTypes2.default.bool.isRequired,
    text: _propTypes2.default.string.isRequired
};

exports.default = (0, _styles.withStyles)(_CardText2.default)(CardText);