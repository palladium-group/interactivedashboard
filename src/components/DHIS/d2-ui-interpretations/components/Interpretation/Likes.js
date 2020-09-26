'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Likes = undefined;

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

var _d2I18n = require('@dhis2/d2-i18n');

var _d2I18n2 = _interopRequireDefault(_d2I18n);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Popper = require('@material-ui/core/Popper');

var _Popper2 = _interopRequireDefault(_Popper);

var _Paper = require('@material-ui/core/Paper');

var _Paper2 = _interopRequireDefault(_Paper);

var _styles = require('@material-ui/core/styles');

var _TextSeparator = require('../TextSeparator/TextSeparator');

var _TextSeparator2 = _interopRequireDefault(_TextSeparator);

var _LikesAndReplies = require('./styles/LikesAndReplies.style');

var _LikesAndReplies2 = _interopRequireDefault(_LikesAndReplies);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TOOLTIP_ENTER_DELAY = 200;

var Likes = exports.Likes = function (_Component) {
    (0, _inherits3.default)(Likes, _Component);

    function Likes(props) {
        (0, _classCallCheck3.default)(this, Likes);

        var _this = (0, _possibleConstructorReturn3.default)(this, (Likes.__proto__ || (0, _getPrototypeOf2.default)(Likes)).call(this, props));

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
                    style: _LikesAndReplies2.default.popper
                },
                _react2.default.createElement(
                    _Paper2.default,
                    { className: _this.props.classes.tooltip },
                    _react2.default.createElement(
                        'ul',
                        { className: _this.props.classes.tooltipList },
                        _this.props.likedBy.map(function (userName, key) {
                            return _react2.default.createElement(
                                'li',
                                { key: key },
                                ' ',
                                userName,
                                ' '
                            );
                        })
                    )
                )
            );
        };

        _this.id = Math.random().toString(36);
        _this.timeout = null;
        _this.state = { tooltipIsOpen: false };
        return _this;
    }

    (0, _createClass3.default)(Likes, [{
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            clearTimeout(this.id);
        }
    }, {
        key: 'render',
        value: function render() {
            var likedBy = this.props.likedBy;

            var Tooltip = this.state.tooltipIsOpen && this.renderTooltip();

            return !!likedBy.length && _react2.default.createElement(
                _react.Fragment,
                null,
                _react2.default.createElement(_TextSeparator2.default, null),
                _react2.default.createElement(
                    'span',
                    {
                        id: this.id,
                        onMouseEnter: this.showTooltip,
                        onMouseLeave: this.hideTooltip
                    },
                    Tooltip,
                    likedBy.length,
                    ' ',
                    likedBy.length > 1 ? _d2I18n2.default.t('likes') : _d2I18n2.default.t('like')
                )
            );
        }
    }]);
    return Likes;
}(_react.Component);

;

Likes.propTypes = {
    classes: _propTypes2.default.object.isRequired,
    likedBy: _propTypes2.default.array.isRequired
};

exports.default = (0, _styles.withStyles)(_LikesAndReplies2.default)(Likes);