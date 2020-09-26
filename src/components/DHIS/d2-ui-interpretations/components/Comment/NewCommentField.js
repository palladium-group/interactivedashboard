'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.NewCommentField = undefined;

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

var _Button = require('@material-ui/core/Button');

var _Button2 = _interopRequireDefault(_Button);

var _ClickAwayListener = require('@material-ui/core/ClickAwayListener');

var _ClickAwayListener2 = _interopRequireDefault(_ClickAwayListener);

var _styles = require('@material-ui/core/styles');

var _d2UiRichText = require('@dhis2/d2-ui-rich-text');

var _d2UiMentionsWrapper = require('@dhis2/d2-ui-mentions-wrapper');

var _d2UiMentionsWrapper2 = _interopRequireDefault(_d2UiMentionsWrapper);

var _d2I18n = require('@dhis2/d2-i18n');

var _d2I18n2 = _interopRequireDefault(_d2I18n);

var _WithAvatar = require('../Avatar/WithAvatar');

var _WithAvatar2 = _interopRequireDefault(_WithAvatar);

var _Toolbar = require('../Toolbar/Toolbar');

var _Toolbar2 = _interopRequireDefault(_Toolbar);

var _NewCommentField = require('./styles/NewCommentField.style');

var _NewCommentField2 = _interopRequireDefault(_NewCommentField);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var NewCommentField = exports.NewCommentField = function (_React$Component) {
    (0, _inherits3.default)(NewCommentField, _React$Component);

    function NewCommentField(props) {
        (0, _classCallCheck3.default)(this, NewCommentField);

        var _this = (0, _possibleConstructorReturn3.default)(this, (NewCommentField.__proto__ || (0, _getPrototypeOf2.default)(NewCommentField)).call(this, props));

        _this.onInputChange = function (event) {
            if (event.target) {
                _this.setState({ text: event.target.value }, _this.onFocus);
            }
        };

        _this.onUserSelect = function (newValue) {
            _this.setState({ text: newValue });
        };

        _this.setNativeInputVal = function (val, caretPos) {
            var node = _this.textarea.current;
            node.value = val;
            node.setSelectionRange(caretPos, caretPos);
        };

        _this.onKeyDown = function (event) {
            (0, _d2UiRichText.convertCtrlKey)(event, _this.setNativeInputVal);
            _this.setState({ text: _this.textarea.current.value });
        };

        _this.onClearInput = function () {
            return _this.setState({ text: '' }, _this.onBlur);
        };

        _this.onFocus = function () {
            return _this.setState({ showToolbar: true });
        };

        _this.onBlur = function () {
            return !_this.state.text.length && _this.setState({ showToolbar: false });
        };

        _this.onToolbarClick = function (text, highlightStart, highlightEnd) {
            return _this.setState({ text: text }, function () {
                return _this.focus(highlightStart, highlightEnd);
            });
        };

        _this.onPost = function () {
            var newText = _this.state.text;

            if (newText && newText.trim()) {
                var newComment = _this.props.comment;
                newComment.text = newText;

                _this.props.onPost(newComment);
                _this.setState({ text: '' }, _this.onBlur);
            }
        };

        _this.focus = function (highlightStart, highlightEnd) {
            _this.textarea.current.focus();
            _this.textarea.current.setSelectionRange(highlightStart, highlightEnd);
        };

        _this.renderActionButtons = function () {
            if (_this.state.text.length) {
                return _react2.default.createElement(
                    _react.Fragment,
                    null,
                    _react2.default.createElement(
                        _Button2.default,
                        {
                            className: _this.props.classes.saveButton,
                            color: 'primary',
                            variant: 'contained',
                            onClick: _this.onPost
                        },
                        _d2I18n2.default.t('Save reply')
                    ),
                    _react2.default.createElement(
                        _Button2.default,
                        {
                            className: _this.props.classes.cancelButton,
                            variant: 'outlined',
                            onClick: _this.props.onCancel || _this.onClearInput
                        },
                        _d2I18n2.default.t('Cancel')
                    )
                );
            } else if (_this.props.comment && _this.props.comment.id) {
                return _react2.default.createElement(
                    _Button2.default,
                    {
                        className: _this.props.classes.cancelButton,
                        variant: 'outlined',
                        onClick: _this.props.onCancel
                    },
                    _d2I18n2.default.t('Cancel')
                );
            }
        };

        _this.renderToolbar = function () {
            return (_this.state.text.length || _this.state.showToolbar) && _react2.default.createElement(_Toolbar2.default, { text: _this.state.text, onClick: _this.onToolbarClick, element: document.getElementById(_this.id) });
        };

        _this.textarea = _react2.default.createRef();
        _this.id = Math.random().toString(36);
        _this.state = {
            text: _this.props.comment ? _this.props.comment.text : '',
            sharingDialogIsOpen: false,
            showToolbar: false
        };
        return _this;
    }

    (0, _createClass3.default)(NewCommentField, [{
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(newProps) {
            var _this2 = this;

            if (this.props.comment !== newProps.comment) {
                this.setState({ text: newProps.comment.text }, function () {
                    return _this2.textarea.current.focus();
                });
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var ActionButtons = this.renderActionButtons();
            var Toolbar = this.renderToolbar();

            return _react2.default.createElement(
                _WithAvatar2.default,
                { className: this.props.classes.newReply, firstName: this.context.d2.currentUser.firstName, surname: this.context.d2.currentUser.surname },
                _react2.default.createElement(
                    _d2UiMentionsWrapper2.default,
                    { d2: this.context.d2, onUserSelect: this.onUserSelect },
                    _react2.default.createElement(
                        _d2UiRichText.Editor,
                        { onEdit: this.onInputChange },
                        _react2.default.createElement(
                            _ClickAwayListener2.default,
                            { mouseEvent: 'onClick', onClickAway: this.onBlur },
                            _react2.default.createElement(
                                'div',
                                { onClick: this.onFocus, className: this.props.classes.inputField, onFocus: this.onFocus },
                                Toolbar,
                                _react2.default.createElement('textarea', {
                                    className: this.props.classes.commentArea,
                                    id: this.id,
                                    ref: this.textarea,
                                    placeholder: _d2I18n2.default.t('Write a reply'),
                                    value: this.state.text,
                                    rows: this.state.showToolbar ? 4 : 2,
                                    autoFocus: true,
                                    onChange: this.onInputChange,
                                    onKeyDown: this.onKeyDown
                                })
                            )
                        )
                    )
                ),
                ActionButtons
            );
        }
    }]);
    return NewCommentField;
}(_react2.default.Component);

;

NewCommentField.contextTypes = {
    d2: _propTypes2.default.object
};

NewCommentField.propTypes = {
    classes: _propTypes2.default.object.isRequired,
    comment: _propTypes2.default.object,
    onPost: _propTypes2.default.func.isRequired,
    onCancel: _propTypes2.default.func
};

exports.default = (0, _styles.withStyles)(_NewCommentField2.default)(NewCommentField);