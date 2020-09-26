'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var whitespace = exports.whitespace = ' ';
var link = 'http://';
var linkPlaceholder = '<link-url>';
var bold = '*';
var boldPlaceholder = 'bold text';
var italic = '_';
var italicPlaceholder = 'italic text';

var TEXT_START_INDEX = exports.TEXT_START_INDEX = 0;
var WHITESPACE_LENGTH = 1;
var BOLD_LENGTH = 1;
var BOLD_PLACEHOLDER_LENGTH = 9;
var ITALIC_LENGTH = 1;
var ITALIC_PLACEHOLDER_LENGTH = 11;
var EMOTICON_LENGTH = 3;
var LINK_LENGTH = 7;
var LINK_PLACEHOLDER_LENGTH = 17;

var insertLinkWithSpace = exports.insertLinkWithSpace = function insertLinkWithSpace(currentInput, cursorStart) {
    return {
        text: currentInput.substring(TEXT_START_INDEX, cursorStart).concat(whitespace + link.concat(linkPlaceholder)),
        highlightStart: cursorStart + WHITESPACE_LENGTH + LINK_LENGTH,
        highlightEnd: cursorStart + WHITESPACE_LENGTH + LINK_PLACEHOLDER_LENGTH
    };
};

var insertLinkWithoutSpace = exports.insertLinkWithoutSpace = function insertLinkWithoutSpace(currentInput, cursorStart) {
    return {
        text: currentInput.substring(TEXT_START_INDEX, cursorStart).concat(link.concat(linkPlaceholder)),
        highlightStart: cursorStart + LINK_LENGTH,
        highlightEnd: cursorStart + LINK_PLACEHOLDER_LENGTH
    };
};

var concatLinkWithSpace = exports.concatLinkWithSpace = function concatLinkWithSpace(currentInput, highlightedText, cursorStart, cursorEnd) {
    return {
        text: currentInput.slice(TEXT_START_INDEX, cursorStart).concat(whitespace + link.concat(highlightedText)),
        highlightStart: cursorStart + WHITESPACE_LENGTH + LINK_LENGTH,
        highlightEnd: cursorEnd + WHITESPACE_LENGTH + LINK_LENGTH
    };
};

var concatLinkWithoutSpace = exports.concatLinkWithoutSpace = function concatLinkWithoutSpace(currentInput, highlightedText, cursorStart, cursorEnd) {
    return {
        text: currentInput.slice(TEXT_START_INDEX, cursorStart).concat(link.concat(highlightedText)),
        highlightStart: cursorStart + LINK_LENGTH,
        highlightEnd: cursorEnd + LINK_LENGTH
    };
};

var insertBoldWithSpace = exports.insertBoldWithSpace = function insertBoldWithSpace(currentInput, cursorStart) {
    return {
        text: currentInput.substring(TEXT_START_INDEX, cursorStart).concat(whitespace + bold + boldPlaceholder + bold),
        highlightStart: cursorStart + WHITESPACE_LENGTH + BOLD_LENGTH,
        highlightEnd: cursorStart + WHITESPACE_LENGTH + BOLD_LENGTH + BOLD_PLACEHOLDER_LENGTH
    };
};

var insertBoldWithoutSpace = exports.insertBoldWithoutSpace = function insertBoldWithoutSpace(currentInput, cursorStart) {
    return {
        text: currentInput.substring(TEXT_START_INDEX, cursorStart).concat(bold + boldPlaceholder + bold),
        highlightStart: cursorStart + BOLD_LENGTH,
        highlightEnd: cursorStart + BOLD_LENGTH + BOLD_PLACEHOLDER_LENGTH
    };
};

var concatBoldWithSpace = exports.concatBoldWithSpace = function concatBoldWithSpace(currentInput, highlightedText, cursorStart, cursorEnd) {
    return {
        text: currentInput.slice(TEXT_START_INDEX, cursorStart).concat(whitespace + bold + highlightedText + bold),
        highlightStart: cursorStart + WHITESPACE_LENGTH + BOLD_LENGTH,
        highlightEnd: cursorEnd + WHITESPACE_LENGTH + BOLD_LENGTH
    };
};

var concatBoldWithoutSpace = exports.concatBoldWithoutSpace = function concatBoldWithoutSpace(currentInput, highlightedText, cursorStart, cursorEnd) {
    return {
        text: currentInput.slice(TEXT_START_INDEX, cursorStart).concat(bold + highlightedText + bold),
        highlightStart: cursorStart + BOLD_LENGTH,
        highlightEnd: cursorEnd + BOLD_LENGTH
    };
};

var insertItalicWithSpace = exports.insertItalicWithSpace = function insertItalicWithSpace(currentInput, cursorStart) {
    return {
        text: currentInput.substring(TEXT_START_INDEX, cursorStart).concat(whitespace + italic + italicPlaceholder + italic),
        highlightStart: cursorStart + WHITESPACE_LENGTH + ITALIC_LENGTH,
        highlightEnd: cursorStart + WHITESPACE_LENGTH + ITALIC_LENGTH + ITALIC_PLACEHOLDER_LENGTH
    };
};

var insertItalicWithoutSpace = exports.insertItalicWithoutSpace = function insertItalicWithoutSpace(currentInput, cursorStart) {
    return {
        text: currentInput.substring(TEXT_START_INDEX, cursorStart).concat(italic + italicPlaceholder + italic),
        highlightStart: cursorStart + ITALIC_LENGTH,
        highlightEnd: cursorStart + ITALIC_LENGTH + ITALIC_PLACEHOLDER_LENGTH
    };
};

var concatItalicWithSpace = exports.concatItalicWithSpace = function concatItalicWithSpace(currentInput, highlightedText, cursorStart, cursorEnd) {
    return {
        text: currentInput.slice(TEXT_START_INDEX, cursorStart).concat(whitespace + italic + highlightedText + italic),
        highlightStart: cursorStart + WHITESPACE_LENGTH + ITALIC_LENGTH,
        highlightEnd: cursorEnd + WHITESPACE_LENGTH + ITALIC_LENGTH
    };
};

var concatItalicWithoutSpace = exports.concatItalicWithoutSpace = function concatItalicWithoutSpace(currentInput, highlightedText, cursorStart, cursorEnd) {
    return {
        text: currentInput.slice(TEXT_START_INDEX, cursorStart).concat(italic + highlightedText + italic),
        highlightStart: cursorStart + ITALIC_LENGTH,
        highlightEnd: cursorEnd + ITALIC_LENGTH
    };
};

var insertEmoticonWithSpace = exports.insertEmoticonWithSpace = function insertEmoticonWithSpace(currentInput, cursorStart, emoticon) {
    return {
        text: currentInput.substring(TEXT_START_INDEX, cursorStart).concat(whitespace + emoticon),
        highlightStart: cursorStart + WHITESPACE_LENGTH + EMOTICON_LENGTH,
        highlightEnd: cursorStart + WHITESPACE_LENGTH + EMOTICON_LENGTH
    };
};

var insertEmoticonWithoutSpace = exports.insertEmoticonWithoutSpace = function insertEmoticonWithoutSpace(currentInput, cursorStart, emoticon) {
    return {
        text: currentInput.substring(TEXT_START_INDEX, cursorStart).concat(emoticon),
        highlightStart: cursorStart + EMOTICON_LENGTH,
        highlightEnd: cursorStart + EMOTICON_LENGTH
    };
};