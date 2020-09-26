'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Toolbar = undefined;

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

var _FormatBold = require('@material-ui/icons/FormatBold');

var _FormatBold2 = _interopRequireDefault(_FormatBold);

var _FormatItalic = require('@material-ui/icons/FormatItalic');

var _FormatItalic2 = _interopRequireDefault(_FormatItalic);

var _InsertEmoticon = require('@material-ui/icons/InsertEmoticon');

var _InsertEmoticon2 = _interopRequireDefault(_InsertEmoticon);

var _InsertLink = require('@material-ui/icons/InsertLink');

var _InsertLink2 = _interopRequireDefault(_InsertLink);

var _Menu = require('@material-ui/core/Menu');

var _Menu2 = _interopRequireDefault(_Menu);

var _MenuItem = require('@material-ui/core/MenuItem');

var _MenuItem2 = _interopRequireDefault(_MenuItem);

var _styles = require('@material-ui/core/styles');

var _d2UiRichText = require('@dhis2/d2-ui-rich-text');

var _helper = require('../../markdown/helper');

var _Toolbar = require('./styles/Toolbar.style');

var _Toolbar2 = _interopRequireDefault(_Toolbar);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var smileyFace = ':-)';
var sadFace = ':-(';
var thumbsUp = ':+1';
var thumbsDown = ':-1';

var Toolbar = exports.Toolbar = function (_Component) {
    (0, _inherits3.default)(Toolbar, _Component);

    function Toolbar() {
        var _ref;

        var _temp, _this, _ret;

        (0, _classCallCheck3.default)(this, Toolbar);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = Toolbar.__proto__ || (0, _getPrototypeOf2.default)(Toolbar)).call.apply(_ref, [this].concat(args))), _this), _this.state = { displayEmoticons: null }, _this.onDisplayEmoticons = function (event) {
            return _this.setState({ displayEmoticons: event.currentTarget });
        }, _this.onCloseEmoticons = function () {
            return _this.setState({ displayEmoticons: null });
        }, _this.onInsertLink = function () {
            return _this.getMarkdown(_helper.LINK);
        }, _this.onBoldClick = function () {
            return _this.getMarkdown(_helper.BOLD);
        }, _this.onItalicClick = function () {
            return _this.getMarkdown(_helper.ITALIC);
        }, _this.onEmoticonClick = function (type) {
            var currentInput = _this.props.text;
            var cursorStart = _this.props.element.selectionStart;
            var newText = (0, _helper.getEmoticon)(type, currentInput, cursorStart);

            _this.props.onClick(newText.text, newText.highlightStart, newText.highlightEnd);
            _this.onCloseEmoticons();
        }, _this.getMarkdown = function (type) {
            var currentInput = _this.props.text;
            var highlightedText = window.getSelection().toString();
            var cursorStart = _this.props.element.selectionStart;
            var cursorEnd = _this.props.element.selectionEnd;
            var markdown = (0, _helper.getMarkdown)(type, currentInput, highlightedText, cursorStart, cursorEnd);

            _this.props.onClick(markdown.text, markdown.highlightStart, markdown.highlightEnd);
        }, _this.renderEmoticons = function () {
            return _this.state.displayEmoticons && _react2.default.createElement(
                _Menu2.default,
                {
                    anchorEl: _this.state.displayEmoticons,
                    open: Boolean(_this.state.displayEmoticons),
                    onClose: _this.onCloseEmoticons,
                    placement: 'top',
                    disableAutoFocusItem: true,
                    anchorOrigin: { vertical: 'top', horizontal: 'center' },
                    transformOrigin: { vertical: 'bottom', horizontal: 'center' },
                    MenuListProps: { style: _Toolbar2.default.menu }
                },
                _react2.default.createElement(
                    _MenuItem2.default,
                    { onClick: function onClick() {
                            return _this.onEmoticonClick(smileyFace);
                        } },
                    _react2.default.createElement(
                        _d2UiRichText.Parser,
                        { style: _Toolbar2.default.emoticon },
                        smileyFace
                    )
                ),
                _react2.default.createElement(
                    _MenuItem2.default,
                    { onClick: function onClick() {
                            return _this.onEmoticonClick(sadFace);
                        } },
                    _react2.default.createElement(
                        _d2UiRichText.Parser,
                        { style: _Toolbar2.default.emoticon },
                        sadFace
                    )
                ),
                _react2.default.createElement(
                    _MenuItem2.default,
                    { onClick: function onClick() {
                            return _this.onEmoticonClick(thumbsUp);
                        } },
                    _react2.default.createElement(
                        _d2UiRichText.Parser,
                        { style: _Toolbar2.default.emoticon },
                        thumbsUp
                    )
                ),
                _react2.default.createElement(
                    _MenuItem2.default,
                    { onClick: function onClick() {
                            return _this.onEmoticonClick(thumbsDown);
                        } },
                    _react2.default.createElement(
                        _d2UiRichText.Parser,
                        { style: _Toolbar2.default.emoticon },
                        thumbsDown
                    )
                )
            );
        }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
    }

    (0, _createClass3.default)(Toolbar, [{
        key: 'render',
        value: function render() {
            var Emoticons = this.renderEmoticons();

            return _react2.default.createElement(
                'div',
                { className: this.props.classes.toolbarContainer },
                _react2.default.createElement(
                    _IconButton2.default,
                    { onClick: this.onInsertLink },
                    _react2.default.createElement(_InsertLink2.default, null)
                ),
                _react2.default.createElement(
                    _IconButton2.default,
                    { onClick: this.onBoldClick },
                    _react2.default.createElement(_FormatBold2.default, null)
                ),
                _react2.default.createElement(
                    _IconButton2.default,
                    { onClick: this.onItalicClick },
                    _react2.default.createElement(_FormatItalic2.default, null)
                ),
                _react2.default.createElement(
                    _IconButton2.default,
                    { onClick: this.onDisplayEmoticons },
                    _react2.default.createElement(_InsertEmoticon2.default, null)
                ),
                Emoticons
            );
        }
    }]);
    return Toolbar;
}(_react.Component);

;

exports.default = (0, _styles.withStyles)(_Toolbar2.default)(Toolbar);


Toolbar.propTypes = {
    text: _propTypes2.default.string.isRequired,
    onClick: _propTypes2.default.func.isRequired
};