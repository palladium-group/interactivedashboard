'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.SharingInfo = undefined;

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

var _Share = require('@material-ui/icons/Share');

var _Share2 = _interopRequireDefault(_Share);

var _styles = require('@material-ui/core/styles');

var _d2I18n = require('@dhis2/d2-i18n');

var _d2I18n2 = _interopRequireDefault(_d2I18n);

var _Link = require('../Link/Link');

var _Link2 = _interopRequireDefault(_Link);

var _SharingInfo = require('./styles/SharingInfo.style');

var _SharingInfo2 = _interopRequireDefault(_SharingInfo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SharingInfo = exports.SharingInfo = function (_Component) {
    (0, _inherits3.default)(SharingInfo, _Component);

    function SharingInfo() {
        var _ref;

        var _temp, _this, _ret;

        (0, _classCallCheck3.default)(this, SharingInfo);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = SharingInfo.__proto__ || (0, _getPrototypeOf2.default)(SharingInfo)).call.apply(_ref, [this].concat(args))), _this), _this.getUsers = function () {
            return (_this.props.interpretation.userAccesses || []).map(function (item) {
                return item.displayName;
            });
        }, _this.getGroups = function () {
            return (_this.props.interpretation.userGroupAccesses || []).map(function (item) {
                return item.displayName;
            });
        }, _this.checkExternalAccess = function () {
            return _this.props.interpretation.externalAccess ? _d2I18n2.default.t('external access') : '';
        }, _this.checkPublicAccess = function () {
            return _this.props.interpretation.publicAccess === 'rw------' || _this.props.interpretation.publicAccess === 'r-------';
        }, _this.concatSharingInfo = function () {
            var displayNames = _this.getUsers().concat(_this.getGroups()).join(', ');

            if (_this.props.interpretation.externalAccess) {
                displayNames = displayNames.concat(_d2I18n2.default.t('external access'));
            };

            if (_this.checkPublicAccess()) {
                displayNames = displayNames.concat(displayNames.length ? _d2I18n2.default.t(', public access') : _d2I18n2.default.t('public access'));
            };

            if (displayNames.length) {
                displayNames = displayNames.replace(/, ([^,]*)$/, ' and $1').concat('. ');
            } else {
                displayNames = _d2I18n2.default.t('None. ');
            }

            return displayNames;
        }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
    }

    (0, _createClass3.default)(SharingInfo, [{
        key: 'render',
        value: function render() {
            var Info = this.concatSharingInfo();

            return _react2.default.createElement(
                'div',
                { className: this.props.classes.sharingContainer },
                _react2.default.createElement(_Share2.default, { className: this.props.classes.sharingIcon }),
                _react2.default.createElement(
                    'span',
                    { className: this.props.classes.label },
                    _d2I18n2.default.t('Shared with: '),
                    Info,
                    _react2.default.createElement(_Link2.default, {
                        onClick: this.props.onClick,
                        label: _d2I18n2.default.t('Manage sharing')
                    })
                )
            );
        }
    }]);
    return SharingInfo;
}(_react.Component);

;

exports.default = (0, _styles.withStyles)(_SharingInfo2.default)(SharingInfo);


SharingInfo.defaultProps = {
    interpretation: {
        userAccesses: [],
        userGroupAccesses: [],
        externalAccess: false,
        publicAccess: 'rw------'
    }
};

SharingInfo.propTypes = {
    interpretation: _propTypes2.default.object
};