"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DISPLAY_ASSET_ERROR = exports.FILE_AVAILABILITY_UPDATE = exports.FILE_REQUESTED = exports.CHANNEL_CLAIMS_UPDATE_SUCCESS = exports.CHANNEL_CLAIMS_UPDATE_ASYNC = exports.CHANNEL_ADD = exports.ASSET_ADD = exports.REQUEST_LIST_ADD = exports.CHANNEL_REQUEST_NEW = exports.ASSET_REQUEST_NEW = exports.REQUEST_UPDATE = exports.REQUEST_ERROR = exports.HANDLE_SHOW_URI = void 0;
// request actions
var HANDLE_SHOW_URI = 'HANDLE_SHOW_URI';
exports.HANDLE_SHOW_URI = HANDLE_SHOW_URI;
var REQUEST_ERROR = 'REQUEST_ERROR';
exports.REQUEST_ERROR = REQUEST_ERROR;
var REQUEST_UPDATE = 'REQUEST_UPDATE';
exports.REQUEST_UPDATE = REQUEST_UPDATE;
var ASSET_REQUEST_NEW = 'ASSET_REQUEST_NEW';
exports.ASSET_REQUEST_NEW = ASSET_REQUEST_NEW;
var CHANNEL_REQUEST_NEW = 'CHANNEL_REQUEST_NEW';
exports.CHANNEL_REQUEST_NEW = CHANNEL_REQUEST_NEW;
var REQUEST_LIST_ADD = 'REQUEST_LIST_ADD'; // asset actions

exports.REQUEST_LIST_ADD = REQUEST_LIST_ADD;
var ASSET_ADD = "ASSET_ADD"; // channel actions

exports.ASSET_ADD = ASSET_ADD;
var CHANNEL_ADD = 'CHANNEL_ADD';
exports.CHANNEL_ADD = CHANNEL_ADD;
var CHANNEL_CLAIMS_UPDATE_ASYNC = 'CHANNEL_CLAIMS_UPDATE_ASYNC';
exports.CHANNEL_CLAIMS_UPDATE_ASYNC = CHANNEL_CLAIMS_UPDATE_ASYNC;
var CHANNEL_CLAIMS_UPDATE_SUCCESS = 'CHANNEL_CLAIMS_UPDATE_SUCCESS'; // asset/file display actions

exports.CHANNEL_CLAIMS_UPDATE_SUCCESS = CHANNEL_CLAIMS_UPDATE_SUCCESS;
var FILE_REQUESTED = 'FILE_REQUESTED';
exports.FILE_REQUESTED = FILE_REQUESTED;
var FILE_AVAILABILITY_UPDATE = 'FILE_AVAILABILITY_UPDATE';
exports.FILE_AVAILABILITY_UPDATE = FILE_AVAILABILITY_UPDATE;
var DISPLAY_ASSET_ERROR = 'DISPLAY_ASSET_ERROR';
exports.DISPLAY_ASSET_ERROR = DISPLAY_ASSET_ERROR;