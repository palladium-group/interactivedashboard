'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.ActionButton = undefined;

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

var _Popper = require('@material-ui/core/Popper');

var _Popper2 = _interopRequireDefault(_Popper);

var _Paper = require('@material-ui/core/Paper');

var _Paper2 = _interopRequireDefault(_Paper);

var _styles = require('@material-ui/core/styles');

var _Icons = require('./Icons');

var _Icons2 = _interopRequireDefault(_Icons);

var _ActionButton = require('./styles/ActionButton.style');

var _ActionButton2 = _interopRequireDefault(_ActionButton);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TOOLTIP_ENTER_DELAY = 200;

var ActionButton = exports.ActionButton = function (_Component) {
	(0, _inherits3.default)(ActionButton, _Component);

	function ActionButton(props) {
		(0, _classCallCheck3.default)(this, ActionButton);

		var _this = (0, _possibleConstructorReturn3.default)(this, (ActionButton.__proto__ || (0, _getPrototypeOf2.default)(ActionButton)).call(this, props));

		_this.showTooltip = function () {
			if (_this.timeout === null) {
				_this.timeout = setTimeout(function () {
					return _this.setState({ tooltipIsOpen: true });
				}, TOOLTIP_ENTER_DELAY);
			}
		};

		_this.hideTooltip = function () {
			if (typeof _this.timeout === 'number') {
				clearTimeout(_this.timeout);
				_this.timeout = null;
				_this.setState({ tooltipIsOpen: false });
			}
		};

		_this.renderTooltip = function () {
			return _react2.default.createElement(
				_Popper2.default,
				{
					anchorEl: document.getElementById(_this.id),
					open: _this.state.tooltipIsOpen,
					placement: 'top',
					style: _ActionButton2.default.popper
				},
				_react2.default.createElement(
					_Paper2.default,
					{ className: _this.props.classes.tooltip },
					_this.props.tooltip || _Icons2.default[_this.props.iconType].tooltip
				)
			);
		};

		_this.id = Math.random().toString(36);
		_this.timeout = null;
		_this.state = { tooltipIsOpen: false };
		return _this;
	}

	(0, _createClass3.default)(ActionButton, [{
		key: 'componentWillUnmount',
		value: function componentWillUnmount() {
			clearTimeout(this.timeout);
		}
	}, {
		key: 'render',
		value: function render() {
			var Icon = _Icons2.default[this.props.iconType].icon;
			var Tooltip = this.renderTooltip();

			return _react2.default.createElement(
				'div',
				{
					id: this.id,
					className: this.props.classes.iconContainer,
					onMouseEnter: this.showTooltip,
					onMouseLeave: this.hideTooltip,
					onClick: this.props.onClick
				},
				Icon,
				Tooltip
			);
		}
	}]);
	return ActionButton;
}(_react.Component);

;

ActionButton.defaultProps = {
	onClick: function onClick() {
		return null;
	}
};

ActionButton.propTypes = {
	classes: _propTypes2.default.object.isRequired,
	iconType: _propTypes2.default.string.isRequired,
	onClick: _propTypes2.default.func.isRequired
};

exports.default = (0, _styles.withStyles)(_ActionButton2.default)(ActionButton);