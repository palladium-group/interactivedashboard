'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.InterpretationsComponent = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _from = require('babel-runtime/core-js/array/from');

var _from2 = _interopRequireDefault(_from);

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

var _CircularProgress = require('@material-ui/core/CircularProgress');

var _CircularProgress2 = _interopRequireDefault(_CircularProgress);

var _styles = require('@material-ui/core/styles');

var _isEqual = require('lodash/fp/isEqual');

var _isEqual2 = _interopRequireDefault(_isEqual);

var _pick = require('lodash/fp/pick');

var _pick2 = _interopRequireDefault(_pick);

var _helpers = require('../../api/helpers');

var _Details = require('../DetailsPanel/Details');

var _Details2 = _interopRequireDefault(_Details);

var _InterpretationsCard = require('../Cards/InterpretationsCard');

var _InterpretationsCard2 = _interopRequireDefault(_InterpretationsCard);

var _locales = require('../../locales');

var _locales2 = _interopRequireDefault(_locales);

var _InterpretationsComponent = require('./styles/InterpretationsComponent.style');

var _InterpretationsComponent2 = _interopRequireDefault(_InterpretationsComponent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function configI18n(d2) {
    var locale = d2.currentUser.userSettings.settings.keyUiLocale;
    _locales2.default.changeLanguage(locale);
};

var InterpretationsComponent = exports.InterpretationsComponent = function (_React$Component) {
    (0, _inherits3.default)(InterpretationsComponent, _React$Component);

    function InterpretationsComponent(props) {
        (0, _classCallCheck3.default)(this, InterpretationsComponent);

        var _this = (0, _possibleConstructorReturn3.default)(this, (InterpretationsComponent.__proto__ || (0, _getPrototypeOf2.default)(InterpretationsComponent)).call(this, props));

        _this.state = { model: null, userGroups: [] };

        _this.onChange = _this.onChange.bind(_this);
        return _this;
    }

    (0, _createClass3.default)(InterpretationsComponent, [{
        key: 'getChildContext',
        value: function getChildContext() {
            return {
                d2: this.props.d2,
                locale: this.props.d2.currentUser.userSettings.settings.keyUiLocale || 'en',
                appName: this.props.appName || '',
                item: this.props.item || {}
            };
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            configI18n(this.props.d2);
            this.loadModel(this.props);
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            var fields = ['type', 'id', 'lastUpdated'];
            var modelFieldsChanged = !(0, _isEqual2.default)((0, _pick2.default)(fields, this.props), (0, _pick2.default)(fields, nextProps));

            if (modelFieldsChanged) {
                this.loadModel(nextProps);
            }
        }
    }, {
        key: 'loadModel',
        value: function () {
            var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(props) {
                var _this2 = this;

                var users;
                return _regenerator2.default.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _context.next = 2;
                                return props.d2.currentUser.getUserGroups();

                            case 2:
                                users = _context.sent;
                                return _context.abrupt('return', (0, _helpers.getFavoriteWithInterpretations)(props.d2, props.type, props.id).then(function (model) {
                                    _this2.setState({ model: model, userGroups: (0, _from2.default)(users.keys()) });
                                    return model;
                                }));

                            case 4:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));

            function loadModel(_x) {
                return _ref.apply(this, arguments);
            }

            return loadModel;
        }()
    }, {
        key: 'onChange',
        value: function () {
            var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
                var _this3 = this;

                return _regenerator2.default.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                return _context2.abrupt('return', this.loadModel(this.props).then(function (newModel) {
                                    return _this3.props.onChange && _this3.props.onChange(newModel);
                                }));

                            case 1:
                            case 'end':
                                return _context2.stop();
                        }
                    }
                }, _callee2, this);
            }));

            function onChange() {
                return _ref2.apply(this, arguments);
            }

            return onChange;
        }()
    }, {
        key: 'render',
        value: function render() {
            var _props = this.props,
                classes = _props.classes,
                currentInterpretationId = _props.currentInterpretationId,
                onCurrentInterpretationChange = _props.onCurrentInterpretationChange;
            var _state = this.state,
                model = _state.model,
                userGroups = _state.userGroups;


            if (!model) {
                return _react2.default.createElement(_CircularProgress2.default, null);
            }

            return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(
                    'div',
                    { className: classes.interpretationsContainer },
                    _react2.default.createElement(_Details2.default, {
                        model: model,
                        onChange: this.onChange,
                        type: this.props.type
                    }),
                    _react2.default.createElement(_InterpretationsCard2.default, {
                        model: model,
                        userGroups: userGroups,
                        onChange: this.onChange,
                        currentInterpretationId: currentInterpretationId,
                        onCurrentInterpretationChange: onCurrentInterpretationChange,
                        type: this.props.type
                    })
                )
            );
        }
    }]);
    return InterpretationsComponent;
}(_react2.default.Component);

;

InterpretationsComponent.propTypes = {
    classes: _propTypes2.default.object.isRequired,
    d2: _propTypes2.default.object.isRequired,
    type: _propTypes2.default.string.isRequired,
    id: _propTypes2.default.string.isRequired,
    lastUpdated: _propTypes2.default.string,
    currentInterpretationId: _propTypes2.default.string,
    onChange: _propTypes2.default.func,
    onCurrentInterpretationChange: _propTypes2.default.func
};

InterpretationsComponent.childContextTypes = {
    d2: _propTypes2.default.object,
    locale: _propTypes2.default.string,
    appName: _propTypes2.default.string,
    item: _propTypes2.default.object
};

exports.default = (0, _styles.withStyles)(_InterpretationsComponent2.default)(InterpretationsComponent);
