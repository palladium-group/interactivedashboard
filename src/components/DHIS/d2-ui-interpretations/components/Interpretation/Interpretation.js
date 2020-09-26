'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Interpretation = undefined;

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

var _d2I18n = require('@dhis2/d2-i18n');

var _d2I18n2 = _interopRequireDefault(_d2I18n);

var _d2UiSharingDialog = require('@dhis2/d2-ui-sharing-dialog');

var _d2UiSharingDialog2 = _interopRequireDefault(_d2UiSharingDialog);

var _styles = require('@material-ui/core/styles');

var _some = require('lodash/fp/some');

var _some2 = _interopRequireDefault(_some);

var _NewInterpretationField = require('./NewInterpretationField');

var _NewInterpretationField2 = _interopRequireDefault(_NewInterpretationField);

var _WithAvatar = require('../Avatar/WithAvatar');

var _WithAvatar2 = _interopRequireDefault(_WithAvatar);

var _CardHeader = require('../Cards/CardHeader');

var _CardHeader2 = _interopRequireDefault(_CardHeader);

var _CardText = require('../Cards/CardText');

var _CardText2 = _interopRequireDefault(_CardText);

var _CardInfo = require('../Cards/CardInfo');

var _CardInfo2 = _interopRequireDefault(_CardInfo);

var _ActionButtonContainer = require('../Buttons/ActionButtonContainer');

var _ActionButtonContainer2 = _interopRequireDefault(_ActionButtonContainer);

var _CommentsList = require('../Lists/CommentsList');

var _CommentsList2 = _interopRequireDefault(_CommentsList);

var _DeleteDialog = require('../DeleteDialog/DeleteDialog');

var _DeleteDialog2 = _interopRequireDefault(_DeleteDialog);

var _interpretation = require('../../models/interpretation');

var _interpretation2 = _interopRequireDefault(_interpretation);

var _comment = require('../../models/comment');

var _comment2 = _interopRequireDefault(_comment);

var _auth = require('../../authorization/auth');

var _dateformatter = require('../../dateformats/dateformatter');

var _sharing = require('../../sharing/sharing');

var _Interpretation = require('./styles/Interpretation.style');

var _Interpretation2 = _interopRequireDefault(_Interpretation);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Interpretation = exports.Interpretation = function (_React$Component) {
    (0, _inherits3.default)(Interpretation, _React$Component);

    function Interpretation(props) {
        (0, _classCallCheck3.default)(this, Interpretation);

        var _this = (0, _possibleConstructorReturn3.default)(this, (Interpretation.__proto__ || (0, _getPrototypeOf2.default)(Interpretation)).call(this, props));

        _this.onOpenSharingDialog = function (event) {
            event.stopPropagation();
            _this.setState({ sharingDialogIsOpen: true });
        };

        _this.onCloseSharingDialog = function (newSharingInfo) {
            if ((0, _sharing.shouldUpdateSharing)(newSharingInfo, _this.props.interpretation)) {
                var sharingProperties = (0, _assign2.default)({}, _this.props.interpretation, newSharingInfo);
                var updatedInterpretation = new _interpretation2.default(_this.props.model, sharingProperties);
                _this.onSaveInterpretation(updatedInterpretation);
            }
            _this.setState({ sharingDialogIsOpen: false });
        };

        _this.onOpenDeleteDialog = function (event) {
            event.stopPropagation();
            _this.setState({ deleteDialogIsOpen: true });
        };

        _this.onCloseDeleteDialog = function () {
            return _this.setState({ deleteDialogIsOpen: false });
        };

        _this.getOnClickHandlers = function () {
            return [_this.onUnlike, _this.onLike, _this.onView, _this.onExitView, _this.onOpenSharingDialog, _this.onEditInterpretation, _this.onOpenDeleteDialog, _this.onReply];
        };

        _this.getLikedByNames = function () {
            var likedBy = _this.props.interpretation.likedBy || [];
            return likedBy.map(function (user) {
                return user.displayName;
            }).sort();
        };

        _this.getRepliedByNames = function () {
            var repliedBy = _this.props.interpretation.comments || [];
            return repliedBy.map(function (comment) {
                return comment.user.displayName;
            }).sort();
        };

        _this.renderInterpretation = function () {
            var _this$props = _this.props,
                classes = _this$props.classes,
                model = _this$props.model,
                userGroups = _this$props.userGroups,
                extended = _this$props.extended,
                interpretation = _this$props.interpretation;


            if (_this.state.interpretationToEdit) {
                return _react2.default.createElement(_NewInterpretationField2.default, {
                    model: model,
                    type: 'interpretation',
                    interpretation: _this.state.interpretationToEdit,
                    onUpdate: _this.onSaveInterpretation,
                    onClose: _this.onCancelEditInterpretation
                });
            } else {
                var currentUserLikesInterpretation = (0, _some2.default)(function (user) {
                    return user.id === _this.context.d2.currentUser.id;
                }, interpretation.likedBy);

                return _react2.default.createElement(
                    _WithAvatar2.default,
                    {
                        className: extended ? classes.expanded : classes.compact,
                        firstName: interpretation.user.firstName,
                        surname: interpretation.user.surname,
                        onClick: !extended ? _this.onView : null
                    },
                    _react2.default.createElement(_CardHeader2.default, { userName: interpretation.user.displayName }),
                    _react2.default.createElement(_CardText2.default, { extended: extended, text: interpretation.text }),
                );
            }
        };

        _this.renderComments = function () {
            return _this.props.extended && _react2.default.createElement(_CommentsList2.default, {
                interpretation: _this.props.interpretation,
                canReply: (0, _auth.haveWriteAccess)(_this.context.d2, _this.props.userGroups, _this.props.interpretation),
                newComment: _this.state.newComment,
                onChange: _this.notifyChange
            });
        };

        _this.renderSharingDialog = function () {
            return _this.state.sharingDialogIsOpen && _react2.default.createElement(_d2UiSharingDialog2.default, {
                open: true,
                onRequestClose: _this.onCloseSharingDialog,
                d2: _this.context.d2,
                id: _this.props.interpretation.id,
                type: 'interpretation'
            });
        };

        _this.renderDeleteInterpretationDialog = function () {
            return _this.state.deleteDialogIsOpen && _react2.default.createElement(_DeleteDialog2.default, {
                title: _d2I18n2.default.t('Delete interpretation'),
                text: _d2I18n2.default.t('Are you sure you want to delete this interpretation?'),
                onDelete: _this.onDeleteInterpretation,
                onCancel: _this.onCloseDeleteDialog
            });
        };

        _this.notifyChange = _this.notifyChange.bind(_this);
        _this.onSaveInterpretation = _this.onSaveInterpretation.bind(_this);
        _this.onDeleteInterpretation = _this.onDeleteInterpretation.bind(_this);
        _this.onEditInterpretation = _this.onEditInterpretation.bind(_this);
        _this.onCancelEditInterpretation = _this.onCancelEditInterpretation.bind(_this);
        _this.onView = _this.onView.bind(_this);
        _this.onExitView = _this.onExitView.bind(_this);
        _this.onLike = _this.onLike.bind(_this);
        _this.onUnlike = _this.onUnlike.bind(_this);
        _this.onReply = _this.onReply.bind(_this);

        _this.state = {
            interpretationToEdit: null,
            newComment: null,
            sharingDialogIsOpen: false,
            deleteDialogIsOpen: false
        };
        return _this;
    }

    (0, _createClass3.default)(Interpretation, [{
        key: 'notifyChange',
        value: function notifyChange(interpretation) {
            if (this.props.onChange) {
                this.props.onChange(interpretation);
            }
        }
    }, {
        key: 'saveInterpretationLike',
        value: function saveInterpretationLike(interpretation, value) {
            var _this2 = this;

            interpretation.like(this.context.d2, value).then(function () {
                return _this2.notifyChange(interpretation);
            });
        }
    }, {
        key: 'onView',
        value: function onView(event) {
            event.stopPropagation();
            this.props.onSelect(this.props.interpretation.id);
        }
    }, {
        key: 'onExitView',
        value: function onExitView(event) {
            event.stopPropagation();
            this.props.onSelect(null);
        }
    }, {
        key: 'onLike',
        value: function onLike(event) {
            event.stopPropagation();
            this.saveInterpretationLike(this.props.interpretation, true);
        }
    }, {
        key: 'onUnlike',
        value: function onUnlike(event) {
            event.stopPropagation();
            this.saveInterpretationLike(this.props.interpretation, false);
        }
    }, {
        key: 'onReply',
        value: function onReply() {
            var newComment = _comment2.default.getReplyForInterpretation(this.context.d2, this.props.interpretation);
            this.setState({ newComment: newComment });
        }
    }, {
        key: 'onSaveInterpretation',
        value: function onSaveInterpretation(interpretation) {
            var _this3 = this;

            interpretation.save(this.context.d2).then(function () {
                return _this3.notifyChange(_this3.props.interpretation);
            });
            this.onCancelEditInterpretation();
        }
    }, {
        key: 'onDeleteInterpretation',
        value: function onDeleteInterpretation() {
            var _this4 = this;

            this.props.interpretation.delete(this.context.d2).then(function () {
                _this4.props.onSelect(null);
                _this4.notifyChange(null);
            });
        }
    }, {
        key: 'onEditInterpretation',
        value: function onEditInterpretation(event) {
            event.stopPropagation();
            this.setState({ interpretationToEdit: this.props.interpretation });
        }
    }, {
        key: 'onCancelEditInterpretation',
        value: function onCancelEditInterpretation() {
            this.setState({ interpretationToEdit: null });
        }
    }, {
        key: 'render',
        value: function render() {
            var Interpretation = this.renderInterpretation();
            var Comments = this.renderComments();
            var SharingDialog = this.renderSharingDialog();
            var DeleteInterpretationDialog = this.renderDeleteInterpretationDialog();

            return this.props.haveReadAccess ? _react2.default.createElement(
                _react.Fragment,
                null,
                Interpretation
            ) : _react2.default.createElement(
                'div',
                { className: this.props.classes.restricted },
                _d2I18n2.default.t('Access restricted')
            );
        }
    }]);
    return Interpretation;
}(_react2.default.Component);

Interpretation.propTypes = {
    classes: _propTypes2.default.object.isRequired,
    interpretation: _propTypes2.default.object.isRequired,
    onChange: _propTypes2.default.func.isRequired,
    onSelect: _propTypes2.default.func,
    extended: _propTypes2.default.bool.isRequired
};

Interpretation.contextTypes = {
    d2: _propTypes2.default.object.isRequired,
    locale: _propTypes2.default.string
};

exports.default = (0, _styles.withStyles)(_Interpretation2.default)(Interpretation);
