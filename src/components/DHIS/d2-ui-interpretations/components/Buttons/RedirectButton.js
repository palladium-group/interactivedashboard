'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.RedirectButton = undefined;

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _d2I18n = require('@dhis2/d2-i18n');

var _d2I18n2 = _interopRequireDefault(_d2I18n);

var _styles = require('@material-ui/core/styles');

var _ActionButton = require('./ActionButton');

var _ActionButton2 = _interopRequireDefault(_ActionButton);

var _redirect = require('../../api/redirect');

var _ActionButton3 = require('./styles/ActionButton.style');

var _ActionButton4 = _interopRequireDefault(_ActionButton3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var RedirectButton = exports.RedirectButton = function (_Component) {
    (0, _inherits3.default)(RedirectButton, _Component);

    function RedirectButton() {
        (0, _classCallCheck3.default)(this, RedirectButton);
        return (0, _possibleConstructorReturn3.default)(this, (RedirectButton.__proto__ || (0, _getPrototypeOf2.default)(RedirectButton)).apply(this, arguments));
    }

    (0, _createClass3.default)(RedirectButton, [{
        key: 'render',
        value: function render() {
            return this.context.appName === 'dashboard' ? _react2.default.createElement(
                'a',
                {
                    href: (0, _redirect.getLink)(this.context.item, this.context.d2, this.props.interpretationId),
                    className: this.props.classes.iconContainer,
                    title: _d2I18n2.default.t('View in ' + _redirect.itemTypeMap[this.context.item.type].appName + ' app')
                },
                _react2.default.createElement(_ActionButton2.default, {
                    iconType: 'openApp',
                    tooltip: _d2I18n2.default.t('View in ' + _redirect.itemTypeMap[this.context.item.type].appName + ' app')
                })
            ) : null;
        }
    }]);
    return RedirectButton;
}(_react.Component);

;

RedirectButton.propTypes = {
    classes: _propTypes2.default.object.isRequired,
    interpretationId: _propTypes2.default.string.isRequired
};

RedirectButton.contextTypes = {
    item: _propTypes2.default.object,
    d2: _propTypes2.default.object,
    appName: _propTypes2.default.string
};

exports.default = (0, _styles.withStyles)(_ActionButton4.default)(RedirectButton);