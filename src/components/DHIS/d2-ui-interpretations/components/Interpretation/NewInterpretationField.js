'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.NewInterpretationField = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

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

var _styles = require('@material-ui/core/styles');

var _d2UiMentionsWrapper = require('@dhis2/d2-ui-mentions-wrapper');

var _d2UiMentionsWrapper2 = _interopRequireDefault(_d2UiMentionsWrapper);

var _d2UiSharingDialog = require('@dhis2/d2-ui-sharing-dialog');

var _d2UiSharingDialog2 = _interopRequireDefault(_d2UiSharingDialog);

var _d2UiRichText = require('@dhis2/d2-ui-rich-text');

var _d2I18n = require('@dhis2/d2-i18n');

var _d2I18n2 = _interopRequireDefault(_d2I18n);

var _WithAvatar = require('../Avatar/WithAvatar');

var _WithAvatar2 = _interopRequireDefault(_WithAvatar);

var _Toolbar = require('../Toolbar/Toolbar');

var _Toolbar2 = _interopRequireDefault(_Toolbar);

var _SharingInfo = require('../SharingInfo/SharingInfo');

var _SharingInfo2 = _interopRequireDefault(_SharingInfo);

var _interpretation = require('../../models/interpretation');

var _interpretation2 = _interopRequireDefault(_interpretation);

var _ClickAwayListener = require('@material-ui/core/ClickAwayListener');

var _ClickAwayListener2 = _interopRequireDefault(_ClickAwayListener);

var _sharing = require('../../sharing/sharing');

var _NewInterpretationField = require('./styles/NewInterpretationField.style');

var _NewInterpretationField2 = _interopRequireDefault(_NewInterpretationField);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var NewInterpretationField = exports.NewInterpretationField = function (_Component) {
    (0, _inherits3.default)(NewInterpretationField, _Component);

    function NewInterpretationField(props) {
        (0, _classCallCheck3.default)(this, NewInterpretationField);

        var _this = (0, _possibleConstructorReturn3.default)(this, (NewInterpretationField.__proto__ || (0, _getPrototypeOf2.default)(NewInterpretationField)).call(this, props));

        _this.updateSharingProps = function () {
            _this.props.interpretation ? _this.setState({ sharingProps: (0, _sharing.getSharing)(_this.props.interpretation.user, _this.props.interpretation, _this.props.model) }) : _this.setState({ sharingProps: (0, _sharing.setInitialSharing)(_this.context.d2.currentUser, _this.props.model) });
        };

        _this.onInputChange = function (event) {
            if (event.target) {
                _this.setState({ text: event.target.value });
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
            return _this.setState({ text: '' }, function () {
                return _this.textarea.current.focus();
            });
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
            return _this.postInterpretation().then(function (savedInterpretation) {
                _this.props.onSave(savedInterpretation);
                _this.setState({ text: '' }, _this.onBlur);
            });
        };

        _this.onUpdate = function () {
            _this.props.interpretation.text = _this.state.text;
            _this.props.interpretation.sharing = _this.state.sharingProps.object;

            _this.props.onUpdate(_this.props.interpretation);
        };

        _this.onOpenSharingDialog = function () {
            return _this.setState({ sharingDialogisOpen: true });
        };

        _this.onCloseSharingDialog = function (sharingProps) {
            var newSharingProps = (0, _assign2.default)({}, _this.state.sharingProps, { object: sharingProps });

            sharingProps ? _this.setState({ sharingDialogisOpen: false, sharingProps: newSharingProps }) : _this.setState({ sharingDialosIsOpen: false });
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
                            onClick: _this.props.interpretation ? _this.onUpdate : _this.onPost
                        },
                        _d2I18n2.default.t('Save interpretation')
                    ),
                    _react2.default.createElement(
                        _Button2.default,
                        {
                            className: _this.props.classes.cancelButton,
                            variant: 'outlined',
                            onClick: _this.props.onClose || _this.onClearInput
                        },
                        _d2I18n2.default.t('Cancel')
                    )
                );
            } else if (_this.props.interpretation) {
                return _react2.default.createElement(
                    _Button2.default,
                    {
                        className: _this.props.classes.cancelButton,
                        variant: 'outlined',
                        onClick: _this.props.onClose
                    },
                    _d2I18n2.default.t('Cancel')
                );
            }
        };

        _this.renderToolbar = function () {
            return (_this.state.text.length || _this.state.showToolbar) && _react2.default.createElement(_Toolbar2.default, { text: _this.state.text, onClick: _this.onToolbarClick, element: document.getElementById(_this.id) });
        };

        _this.renderSharingInfo = function () {
            return !!_this.state.text && _react2.default.createElement(_SharingInfo2.default, { interpretation: _this.state.sharingProps.object, onClick: _this.onOpenSharingDialog });
        };

        _this.renderSharingDialog = function () {
            return _this.state.sharingDialogisOpen && _react2.default.createElement(_d2UiSharingDialog2.default, {
                open: _this.state.sharingDialogisOpen,
                type: _this.props.type,
                d2: _this.context.d2,
                id: _this.props.interpretation ? _this.props.interpretation.id : _this.props.model.id,
                doNotPost: !_this.props.interpretation ? true : false,
                sharedObject: !_this.props.interpretation ? _this.state.sharingProps : null,
                onConfirm: _this.onCloseSharingDialog,
                onRequestClose: _this.onCloseSharingDialog
            });
        };

        _this.textarea = _react2.default.createRef();
        _this.id = Math.random().toString(36);
        _this.state = {
            text: _this.props.interpretation ? _this.props.interpretation.text : '',
            showToolbar: false,
            sharingDialogisOpen: false,
            sharingProps: {}
        };
        return _this;
    }

    (0, _createClass3.default)(NewInterpretationField, [{
        key: 'componentDidUpdate',
        value: function componentDidUpdate() {
            if (!this.props.interpretation && this.state.sharingProps.object && this.props.model.id !== this.state.sharingProps.object.modelId) {
                this.updateSharingProps();
            }
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.updateSharingProps();
        }
    }, {
        key: 'postInterpretation',
        value: function () {
            var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
                var newInterpretation;
                return _regenerator2.default.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                newInterpretation = new _interpretation2.default(this.props.model, {});

                                newInterpretation.text = this.state.text;
                                newInterpretation.sharing = this.state.sharingProps.object;

                                return _context.abrupt('return', newInterpretation.save(this.context.d2));

                            case 4:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));

            function postInterpretation() {
                return _ref.apply(this, arguments);
            }

            return postInterpretation;
        }()
    }, {
        key: 'render',
        value: function render() {
            var ActionButtons = this.renderActionButtons();
            var Toolbar = this.renderToolbar();
            var Sharing = this.renderSharingInfo();
            var SharingDialog = this.renderSharingDialog();

            return ""
        }
    }]);
    return NewInterpretationField;
}(_react.Component);

;

NewInterpretationField.contextTypes = {
    d2: _propTypes2.default.object.isRequired
};

NewInterpretationField.propTypes = {
    classes: _propTypes2.default.object.isRequired,
    model: _propTypes2.default.object.isRequired,
    interpretation: _propTypes2.default.object,
    onSave: _propTypes2.default.func,
    onUpdate: _propTypes2.default.func,
    onClose: _propTypes2.default.func
};

exports.default = (0, _styles.withStyles)(_NewInterpretationField2.default)(NewInterpretationField);
