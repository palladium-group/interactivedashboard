'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.concatHelper = exports.insertHelper = exports.getEmoticon = exports.getMarkdown = exports.WITHOUT_SPACE = exports.WITH_SPACE = exports.EMOTICON = exports.ITALIC = exports.BOLD = exports.LINK = undefined;

var _markdownHandler = require('./markdownHandler');

var _formats = require('./formats');

var LINK = exports.LINK = 'LINK';
var BOLD = exports.BOLD = 'BOLD';
var ITALIC = exports.ITALIC = 'ITALIC';
var EMOTICON = exports.EMOTICON = 'EMOTICON';

var WITH_SPACE = exports.WITH_SPACE = true;
var WITHOUT_SPACE = exports.WITHOUT_SPACE = false;

var getMarkdown = exports.getMarkdown = function getMarkdown(TYPE, currentInput, highlightedText, cursorStart, cursorEnd) {
    return currentInput.length ? (0, _markdownHandler.markdownHandler)(TYPE, currentInput, highlightedText, cursorStart, cursorEnd) : insertHelper(TYPE, WITHOUT_SPACE, currentInput, cursorStart);
};

var getEmoticon = exports.getEmoticon = function getEmoticon(emoticon, currentInput, cursorStart) {
    return currentInput.length ? (0, _markdownHandler.insertMarkdown)(EMOTICON, currentInput, cursorStart, emoticon) : insertHelper(EMOTICON, WITHOUT_SPACE, currentInput, cursorStart, emoticon);
};

var insertHelper = exports.insertHelper = function insertHelper(TYPE, WITH_SPACE, currentInput, cursorStart) {
    var emoticon = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;

    switch (TYPE) {
        case LINK:
            return WITH_SPACE ? (0, _formats.insertLinkWithSpace)(currentInput, cursorStart) : (0, _formats.insertLinkWithoutSpace)(currentInput, cursorStart);
        case BOLD:
            return WITH_SPACE ? (0, _formats.insertBoldWithSpace)(currentInput, cursorStart) : (0, _formats.insertBoldWithoutSpace)(currentInput, cursorStart);
        case ITALIC:
            return WITH_SPACE ? (0, _formats.insertItalicWithSpace)(currentInput, cursorStart) : (0, _formats.insertItalicWithoutSpace)(currentInput, cursorStart);
        case EMOTICON:
            return WITH_SPACE ? (0, _formats.insertEmoticonWithSpace)(currentInput, cursorStart, emoticon) : (0, _formats.insertEmoticonWithoutSpace)(currentInput, cursorStart, emoticon);
        default:
            return {};
    };
};

var concatHelper = exports.concatHelper = function concatHelper(TYPE, WITH_SPACE, currentInput, highlightedText, cursorStart, cursorEnd) {
    switch (TYPE) {
        case LINK:
            return WITH_SPACE ? (0, _formats.concatLinkWithSpace)(currentInput, highlightedText, cursorStart, cursorEnd) : (0, _formats.concatLinkWithoutSpace)(currentInput, highlightedText, cursorStart, cursorEnd);
        case BOLD:
            return WITH_SPACE ? (0, _formats.concatBoldWithSpace)(currentInput, highlightedText, cursorStart, cursorEnd) : (0, _formats.concatBoldWithoutSpace)(currentInput, highlightedText, cursorStart, cursorEnd);
        case ITALIC:
            return WITH_SPACE ? (0, _formats.concatItalicWithSpace)(currentInput, highlightedText, cursorStart, cursorEnd) : (0, _formats.concatItalicWithoutSpace)(currentInput, highlightedText, cursorStart, cursorEnd);
        default:
            return {};
    };
};