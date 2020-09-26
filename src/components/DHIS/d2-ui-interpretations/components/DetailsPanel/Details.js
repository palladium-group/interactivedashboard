'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Details = undefined;

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

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

var _IconButton = require('@material-ui/core/IconButton');

var _IconButton2 = _interopRequireDefault(_IconButton);

var _Notifications = require('@material-ui/icons/Notifications');

var _Notifications2 = _interopRequireDefault(_Notifications);

var _AddAlert = require('@material-ui/icons/AddAlert');

var _AddAlert2 = _interopRequireDefault(_AddAlert);

var _styles = require('@material-ui/core/styles');

var _d2I18n = require('@dhis2/d2-i18n');

var _d2I18n2 = _interopRequireDefault(_d2I18n);

var _CollapsibleCard = require('../Cards/CollapsibleCard');

var _CollapsibleCard2 = _interopRequireDefault(_CollapsibleCard);

var _Description = require('./Description');

var _Description2 = _interopRequireDefault(_Description);

var _Item = require('./Item');

var _Item2 = _interopRequireDefault(_Item);

var _sharingText = require('../../sharing/sharingText');

var _helpers = require('../../api/helpers');

var _dateformatter = require('../../dateformats/dateformatter');

var _modelNametranslator = require('../../translations/modelNametranslator');

var _Details = require('./styles/Details.style');

var _Details2 = _interopRequireDefault(_Details);

var _redirect = require('../../api/redirect');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Details = exports.Details = function (_React$Component) {
    (0, _inherits3.default)(Details, _React$Component);

    function Details() {
        var _ref,
            _this2 = this;

        var _temp, _this, _ret;

        (0, _classCallCheck3.default)(this, Details);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = Details.__proto__ || (0, _getPrototypeOf2.default)(Details)).call.apply(_ref, [this].concat(args))), _this), _this.state = { isExpanded: true, showCompleteDescription: false }, _this.toggleDetailsExpand = function () {
            _this.setState({ isExpanded: !_this.state.isExpanded });
        }, _this.toggleDescription = function () {
            return _this.setState({ showCompleteDescription: !_this.state.showCompleteDescription });
        }, _this.toggleSubscription = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
            var _this$props, model, onChange;

            return _regenerator2.default.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            var _this$props = _this.props, model = _this$props.model, onChange = _this$props.onChange;
                            return _context.abrupt('return', (0, _helpers.setSubscription)(_this.context.d2, model, !model.subscribed).then(onChange));

                        case 2:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, _callee, _this2);
        })), _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
    }

    (0, _createClass3.default)(Details, [{
        key: 'renderSubscriptionButton',
        value: function renderSubscriptionButton() {
            var tOpts = { object: (0, _modelNametranslator.translateModelName)(this.props.model.modelName) };

            var _ref3 = this.props.model.subscribed ? [_Notifications2.default, _d2I18n2.default.t('Unsubscribe from this {{object}} and stop receiving notifications', tOpts)] : [_AddAlert2.default, _d2I18n2.default.t('Subscribe to this {{object}} and start receiving notifications', tOpts)],
                _ref4 = (0, _slicedToArray3.default)(_ref3, 2),
                SubscriberIcon = _ref4[0],
                subscriptionTooltip = _ref4[1];

            return _react2.default.createElement(
                _IconButton2.default,
                {
                    style: _Details2.default.subscriberIcon,
                    title: subscriptionTooltip,
                    onClick: this.toggleSubscription
                },
                _react2.default.createElement(SubscriberIcon, null)
            );
        }
    }, {
        key: 'render',
        value: function render() {
            var _props = this.props,
                model = _props.model,
                classes = _props.classes;

           // var owner = model.user ? model.user.displayName : '-';
            var owner = "MOPH";
            var SubscriptionButton = this.renderSubscriptionButton();

            return _react2.default.createElement(
                _CollapsibleCard2.default,
                { title: _redirect.itemTypeMap[this.props.type.toUpperCase()].detailsTitle },
                _react2.default.createElement(
                    'div',
                    { className: classes.detailsCardList },
                    _react2.default.createElement(_Item2.default, { text: _react2.default.createElement(_Description2.default, {
                            displayDescription: model.displayDescription,
                            isToggled: this.state.showCompleteDescription,
                            onToggleDescription: this.toggleDescription
                        })
                    }),
                    _react2.default.createElement(_Item2.default, {
                        label: _d2I18n2.default.t('Created'),
                        text: (0, _dateformatter.formatDate)(model.created, this.context.locale)
                    }),
                    _react2.default.createElement(_Item2.default, {
                        label: _d2I18n2.default.t('Last updated'),
                        text: (0, _dateformatter.formatDate)(model.lastUpdated, this.context.locale)
                    }),
                    _react2.default.createElement(_Item2.default, { label: _d2I18n2.default.t('Views'), text: model.favoriteViews })
                )
            );
        }
    }]);
    return Details;
}(_react2.default.Component);

;

Details.contextTypes = {
    d2: _propTypes2.default.object.isRequired,
    locale: _propTypes2.default.string.isRequired,
    appName: _propTypes2.default.string.isRequired
};

Details.propTypes = {
    model: _propTypes2.default.object.isRequired,
    onChange: _propTypes2.default.func.isRequired
};

exports.default = (0, _styles.withStyles)(_Details2.default)(Details);
