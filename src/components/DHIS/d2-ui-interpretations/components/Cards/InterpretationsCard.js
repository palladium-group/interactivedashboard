"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.InterpretationsCard = undefined;

var _getPrototypeOf = require("babel-runtime/core-js/object/get-prototype-of");

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require("babel-runtime/helpers/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Button = require("@material-ui/core/Button");

var _Button2 = _interopRequireDefault(_Button);

var _ChevronLeft = require("@material-ui/icons/ChevronLeft");

var _ChevronLeft2 = _interopRequireDefault(_ChevronLeft);

var _styles = require("@material-ui/core/styles");

var _d2I18n = require("@dhis2/d2-i18n");

var _d2I18n2 = _interopRequireDefault(_d2I18n);

var _orderBy = require("lodash/fp/orderBy");

var _orderBy2 = _interopRequireDefault(_orderBy);

var _CollapsibleCard = require("./CollapsibleCard");

var _CollapsibleCard2 = _interopRequireDefault(_CollapsibleCard);

var _Interpretation = require("../Interpretation/Interpretation");

var _Interpretation2 = _interopRequireDefault(_Interpretation);

var _InterpretationsList = require("../Lists/InterpretationsList");

var _InterpretationsList2 = _interopRequireDefault(_InterpretationsList);

var _NewInterpretationField = require("../Interpretation/NewInterpretationField");

var _NewInterpretationField2 = _interopRequireDefault(_NewInterpretationField);

var _InterpretationsCard = require("./styles/InterpretationsCard.style");

var _InterpretationsCard2 = _interopRequireDefault(_InterpretationsCard);

var _auth = require("../../authorization/auth");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var InterpretationsCard = exports.InterpretationsCard = function (_React$Component) {
    (0, _inherits3.default)(InterpretationsCard, _React$Component);

    function InterpretationsCard(props) {
        (0, _classCallCheck3.default)(this, InterpretationsCard);

        var _this = (0, _possibleConstructorReturn3.default)(this, (InterpretationsCard.__proto__ || (0, _getPrototypeOf2.default)(InterpretationsCard)).call(this, props));

        _this.renderBackButton = function () {
            return _this.state.currentInterpretationId && _react2.default.createElement(
                _Button2.default,
                {
                    className: _this.props.classes.backButton,
                    variant: "outlined",
                    size: "medium",
                    onClick: function onClick() {
                        return _this.setCurrentInterpretation(null);
                    }
                },
                _react2.default.createElement(_ChevronLeft2.default, null),
                _d2I18n2.default.t('Back to all interpretations')
            );
        };

        _this.renderCardContent = function () {
            var currentInterpretation = _this.getCurrentInterpretation();
            var sortedInterpretations = (0, _orderBy2.default)(["created"], ["desc"], _this.props.model.interpretations);

            return currentInterpretation ? _react2.default.createElement(_Interpretation2.default, {
                model: _this.props.model,
                userGroups: _this.props.userGroups,
                interpretation: currentInterpretation,
                onChange: _this.notifyChange,
                haveReadAccess: (0, _auth.haveReadAccess)(_this.context.d2, _this.props.userGroups, currentInterpretation),
                onSelect: _this.setCurrentInterpretation,
                extended: true
            }) : _react2.default.createElement(_InterpretationsList2.default, {
                model: _this.props.model,
                userGroups: _this.props.userGroups,
                d2: _this.context.d2,
                interpretations: sortedInterpretations,
                onChange: _this.notifyChange,
                onSelect: _this.setCurrentInterpretation,
                isExpanded: _this.state.listIsExpanded,
                toggleShowAllInterpretations: _this.toggleShowAllInterpretations
            });
        };

        _this.renderInputField = function () {
            return !_this.state.currentInterpretationId && (0, _auth.haveReadAccess)(_this.context.d2, _this.props.userGroups, _this.props.model) && _react2.default.createElement(_NewInterpretationField2.default, {
                model: _this.props.model,
                onSave: _this.notifyChange,
                type: _this.props.type
            });
        };

        _this.notifyChange = _this.notifyChange.bind(_this);
        _this.isControlledComponent = !!props.onCurrentInterpretationChange;
        _this.toggleShowAllInterpretations = _this.toggleShowAllInterpretations.bind(_this);
        _this.setCurrentInterpretation = _this.setCurrentInterpretation.bind(_this);

        _this.state = {
            currentInterpretationId: props.currentInterpretationId,
            listIsExpanded: !(props.model.interpretations.length > _InterpretationsList.interpretationsToShowOnInit)
        };
        return _this;
    }

    (0, _createClass3.default)(InterpretationsCard, [{
        key: "componentDidMount",
        value: function componentDidMount() {
            var currentInterpretation = this.getCurrentInterpretation();
            if (currentInterpretation && this.props.onCurrentInterpretationChange) {
                this.props.onCurrentInterpretationChange(currentInterpretation);
            }
        }
    }, {
        key: "componentWillReceiveProps",
        value: function componentWillReceiveProps(nextProps) {
            if (this.isControlledComponent) {
                this.setState({
                    currentInterpretationId: nextProps.currentInterpretationId
                });
            }
        }
    }, {
        key: "notifyChange",
        value: function notifyChange() {
            this.props.onChange();
        }
    }, {
        key: "toggleShowAllInterpretations",
        value: function toggleShowAllInterpretations() {
            this.setState({ listIsExpanded: !this.state.listIsExpanded });
        }
    }, {
        key: "setCurrentInterpretation",
        value: function setCurrentInterpretation(interpretationId) {
            var _props = this.props,
                model = _props.model,
                onCurrentInterpretationChange = _props.onCurrentInterpretationChange;


            if (this.isControlledComponent) {
                var currentInterpretation = interpretationId ? model.interpretations.find(function (item) {
                    return item.id === interpretationId;
                }) : null;
                onCurrentInterpretationChange(currentInterpretation);
            } else {
                this.setState({ currentInterpretationId: interpretationId });
            }
        }
    }, {
        key: "getCurrentInterpretation",
        value: function getCurrentInterpretation() {
            var model = this.props.model;
            var currentInterpretationId = this.state.currentInterpretationId;


            return model && model.interpretations && currentInterpretationId ? model.interpretations.find(function (interpretation) {
                return interpretation.id === currentInterpretationId;
            }) : null;
        }
    }, {
        key: "render",
        value: function render() {
            var BackButton = this.renderBackButton();
            var Interpretations = this.renderCardContent();
            var InputField = this.renderInputField();

            return _react2.default.createElement(
                _CollapsibleCard2.default,
                { title: _d2I18n2.default.t("Interpretations") },
                BackButton,
                Interpretations,
                InputField
            );
        }
    }]);
    return InterpretationsCard;
}(_react2.default.Component);

InterpretationsCard.propTypes = {
    classes: _propTypes2.default.object.isRequired,
    model: _propTypes2.default.object.isRequired,
    currentInterpretationId: _propTypes2.default.string,
    onChange: _propTypes2.default.func.isRequired,
    onCurrentInterpretationChange: _propTypes2.default.func
};

InterpretationsCard.contextTypes = {
    d2: _propTypes2.default.object.isRequired
};

exports.default = (0, _styles.withStyles)(_InterpretationsCard2.default)(InterpretationsCard);