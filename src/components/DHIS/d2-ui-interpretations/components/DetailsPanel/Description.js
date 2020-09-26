'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Description = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _d2I18n = require('@dhis2/d2-i18n');

var _d2I18n2 = _interopRequireDefault(_d2I18n);

var _d2UiRichText = require('@dhis2/d2-ui-rich-text');

var _Link = require('../Link/Link');

var _Link2 = _interopRequireDefault(_Link);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var descriptionMaxLength = 250;

var Description = exports.Description = function Description(_ref) {
    var displayDescription = _ref.displayDescription,
        isToggled = _ref.isToggled,
        onToggleDescription = _ref.onToggleDescription;

    var description = void 0;

    if (!displayDescription) {
        description = _d2I18n2.default.t('_No description_');
    } else if (displayDescription.length < descriptionMaxLength || isToggled) {
        description = displayDescription;
    } else {
        description = displayDescription.substring(0, descriptionMaxLength) + ' ... ';
    }

    return _react2.default.createElement(
        _react.Fragment,
        null,
        _react2.default.createElement(
            _d2UiRichText.Parser,
            null,
            description
        ),
        displayDescription.length > descriptionMaxLength && _react2.default.createElement(_Link2.default, {
            onClick: onToggleDescription,
            label: '[' + _d2I18n2.default.t('Show ') + ' ' + (isToggled ? _d2I18n2.default.t('less') : _d2I18n2.default.t('more')) + ']'
        })
    );
};

exports.default = Description;


Description.defaultProps = {
    displayDescription: ''
};

Description.propTypes = {
    displayDescription: _propTypes2.default.string,
    isToggled: _propTypes2.default.bool.isRequired,
    onToggleDescription: _propTypes2.default.func.isRequired
};