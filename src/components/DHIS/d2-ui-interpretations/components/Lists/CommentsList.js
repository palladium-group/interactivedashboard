'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.CommentsList = undefined;

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

var _styles = require('@material-ui/core/styles');

var _d2I18n = require('@dhis2/d2-i18n');

var _d2I18n2 = _interopRequireDefault(_d2I18n);

var _orderBy = require('lodash/fp/orderBy');

var _orderBy2 = _interopRequireDefault(_orderBy);

var _NewCommentField = require('../Comment/NewCommentField');

var _NewCommentField2 = _interopRequireDefault(_NewCommentField);

var _Comment = require('../Comment/Comment');

var _Comment2 = _interopRequireDefault(_Comment);

var _Link = require('../Link/Link');

var _Link2 = _interopRequireDefault(_Link);

var _comment = require('../../models/comment');

var _comment2 = _interopRequireDefault(_comment);

var _auth = require('../../authorization/auth');

var _CommentsList = require('./styles/CommentsList.style');

var _CommentsList2 = _interopRequireDefault(_CommentsList);

var _DeleteDialog = require('../DeleteDialog/DeleteDialog');

var _DeleteDialog2 = _interopRequireDefault(_DeleteDialog);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var commentsToShowOnInit = 5;

var CommentsList = exports.CommentsList = function (_React$Component) {
    (0, _inherits3.default)(CommentsList, _React$Component);

    function CommentsList(props) {
        (0, _classCallCheck3.default)(this, CommentsList);

        var _this = (0, _possibleConstructorReturn3.default)(this, (CommentsList.__proto__ || (0, _getPrototypeOf2.default)(CommentsList)).call(this, props));

        _this.onShowMoreComments = function () {
            return _this.setState({ listIsExpanded: true });
        };

        _this.onHideOldComments = function () {
            return _this.setState({ listIsExpanded: false });
        };

        _this.onEdit = function (comment) {
            return _this.setState({ commentToEdit: comment });
        };

        _this.onCancelEdit = function () {
            return _this.setState({ commentToEdit: null });
        };

        _this.onCancelNewComment = function () {
            _this.setState({ newComment: null });
            _this.props.onCancel();
        };

        _this.onOpenDeleteDialog = function (comment) {
            return _this.setState({ deleteDialogIsOpen: true, commentToDelete: comment });
        };

        _this.onCloseDeleteDialog = function () {
            return _this.setState({ deleteDialogIsOpen: false, commentToDelete: null });
        };

        _this.getComments = function () {
            var sortedComments = (0, _orderBy2.default)(["created"], ["asc"], _this.props.interpretation.comments);

            return !_this.state.listIsExpanded ? sortedComments.slice(-commentsToShowOnInit) : sortedComments;
        };

        _this.renderViewMoreLink = function () {
            return _this.props.interpretation.comments.length > commentsToShowOnInit && _react2.default.createElement(_Link2.default, {
                label: _this.state.listIsExpanded ? _d2I18n2.default.t('Hide old replies') : _d2I18n2.default.t('View more replies'),
                onClick: _this.state.listIsExpanded ? _this.onHideOldComments : _this.onShowMoreComments
            });
        };

        _this.renderComments = function () {
            return _this.getComments().map(function (comment) {
                return _this.state.commentToEdit && _this.state.commentToEdit.id === comment.id ? _react2.default.createElement(_NewCommentField2.default, {
                    key: comment.id,
                    comment: comment,
                    onPost: _this.onUpdate,
                    onCancel: _this.onCancelEdit
                }) : _react2.default.createElement(_Comment2.default, {
                    key: comment.id,
                    comment: comment,
                    canReply: _this.props.canReply,
                    isOwner: (0, _auth.userCanManage)(_this.context.d2, comment),
                    locale: _this.context.locale,
                    onEdit: _this.onEdit,
                    onReply: _this.onReply,
                    onDelete: _this.onOpenDeleteDialog
                });
            });
        };

        _this.renderInputField = function () {
            return _this.props.canReply && _react2.default.createElement(_NewCommentField2.default, {
                comment: _this.state.newComment,
                onPost: _this.onSave
            });
        };

        _this.onSave = _this.onSave.bind(_this);
        _this.onDeleteComment = _this.onDeleteComment.bind(_this);
        _this.onUpdate = _this.onUpdate.bind(_this);
        _this.onReply = _this.onReply.bind(_this);

        _this.state = {
            listIsExpanded: !(_this.props.interpretation.comments.length > commentsToShowOnInit),
            commentToEdit: null,
            newComment: props.newComment,
            deleteDialogIsOpen: false,
            commentToDelete: null
        };
        return _this;
    }

    (0, _createClass3.default)(CommentsList, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var newComment = _comment2.default.getReplyForInterpretation(this.context.d2, this.props.interpretation);
            this.setState({ newComment: newComment, showToolbar: true });
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate(prevProps) {
            if (this.props.newComment !== prevProps.newComment) {
                this.setState({ newComment: this.props.newComment });
            }
        }
    }, {
        key: 'onSave',
        value: function onSave(comment) {
            var _this2 = this;

            comment.save(this.context.d2).then(function () {
                return _this2.props.onChange(_this2.props.interpretation);
            });
        }
    }, {
        key: 'onDeleteComment',
        value: function onDeleteComment() {
            var _this3 = this;

            this.state.commentToDelete.delete(this.context.d2).then(function () {
                return _this3.props.onChange(_this3.props.interpretation);
            });
            this.onCloseDeleteDialog();
        }
    }, {
        key: 'onUpdate',
        value: function onUpdate(comment) {
            this.onSave(comment);
            this.setState({ commentToEdit: null });
        }
    }, {
        key: 'onReply',
        value: function onReply(comment) {
            var newComment = comment.getReply(this.context.d2);
            this.setState({ commentToEdit: null, newComment: newComment });
        }
    }, {
        key: 'render',
        value: function render() {
            var ViewMoreReplies = this.renderViewMoreLink();
            var Comments = this.renderComments();
            var InputField = this.renderInputField();

            return _react2.default.createElement(
                'div',
                { className: this.props.classes.commentSection },
                ViewMoreReplies,
                Comments,
                InputField,
                this.state.deleteDialogIsOpen && _react2.default.createElement(_DeleteDialog2.default, {
                    title: _d2I18n2.default.t('Delete comment'),
                    text: _d2I18n2.default.t('Are you sure you want to delete this comment?'),
                    onDelete: this.onDeleteComment,
                    onCancel: this.onCloseDeleteDialog
                })
            );
        }
    }]);
    return CommentsList;
}(_react2.default.Component);

CommentsList.contextTypes = {
    locale: _propTypes2.default.string,
    d2: _propTypes2.default.object.isRequired
};
CommentsList.propTypes = {
    classes: _propTypes2.default.object.isRequired,
    interpretation: _propTypes2.default.object.isRequired,
    newComment: _propTypes2.default.object,
    onChange: _propTypes2.default.func
};
;

exports.default = (0, _styles.withStyles)(_CommentsList2.default)(CommentsList);