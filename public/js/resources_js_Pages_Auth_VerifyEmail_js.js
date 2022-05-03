"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_Pages_Auth_VerifyEmail_js"],{

/***/ "./resources/js/Components/Button.js":
/*!*******************************************!*\
  !*** ./resources/js/Components/Button.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Button)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");


function Button(_ref) {
  var _ref$type = _ref.type,
      type = _ref$type === void 0 ? 'submit' : _ref$type,
      _ref$className = _ref.className,
      className = _ref$className === void 0 ? '' : _ref$className,
      processing = _ref.processing,
      children = _ref.children;
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("button", {
    type: type,
    className: "inline-flex items-center px-4 py-2 bg-gray-900 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest active:bg-gray-900 transition ease-in-out duration-150 ".concat(processing && 'opacity-25', " ") + className,
    disabled: processing,
    children: children
  });
}

/***/ }),

/***/ "./resources/js/Layouts/Guest.js":
/*!***************************************!*\
  !*** ./resources/js/Layouts/Guest.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Guest)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var _inertiajs_inertia_react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @inertiajs/inertia-react */ "./node_modules/@inertiajs/inertia-react/dist/index.js");
/* harmony import */ var _assets_css_guest_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../assets/css/guest.css */ "./resources/js/assets/css/guest.css");
/* harmony import */ var _assets_images_logo_svg__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/assets/images/logo.svg */ "./resources/js/assets/images/logo.svg");
/* harmony import */ var _assets_images_logo_dark_svg__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/assets/images/logo-dark.svg */ "./resources/js/assets/images/logo-dark.svg");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");







function Guest(_ref) {
  var children = _ref.children;
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div", {
    className: "min-h-screen flex flex-col justify-center items-center pt-6 sm:pt-0 bg-gray-100",
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div", {
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(_inertiajs_inertia_react__WEBPACK_IMPORTED_MODULE_1__.Link, {
        href: "/",
        className: "logo logo-dark",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("span", {
          className: "logo-sm",
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("img", {
            src: _assets_images_logo_svg__WEBPACK_IMPORTED_MODULE_3__["default"],
            alt: "",
            height: "37"
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("span", {
          className: "logo-lg",
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("img", {
            src: _assets_images_logo_dark_svg__WEBPACK_IMPORTED_MODULE_4__["default"],
            alt: "",
            height: "30"
          })
        })]
      })
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div", {
      className: "w-full sm:max-w-md mt-6 px-6 py-4 bg-white shadow-md overflow-hidden sm:rounded-lg",
      children: children
    })]
  });
}

/***/ }),

/***/ "./resources/js/Pages/Auth/VerifyEmail.js":
/*!************************************************!*\
  !*** ./resources/js/Pages/Auth/VerifyEmail.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ VerifyEmail)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var _Components_Button__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/Components/Button */ "./resources/js/Components/Button.js");
/* harmony import */ var _Layouts_Guest__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/Layouts/Guest */ "./resources/js/Layouts/Guest.js");
/* harmony import */ var _inertiajs_inertia_react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @inertiajs/inertia-react */ "./node_modules/@inertiajs/inertia-react/dist/index.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");






function VerifyEmail(_ref) {
  var status = _ref.status;

  var _useForm = (0,_inertiajs_inertia_react__WEBPACK_IMPORTED_MODULE_3__.useForm)(),
      post = _useForm.post,
      processing = _useForm.processing;

  var submit = function submit(e) {
    e.preventDefault();
    post(route('verification.send'));
  };

  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_Layouts_Guest__WEBPACK_IMPORTED_MODULE_2__["default"], {
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_inertiajs_inertia_react__WEBPACK_IMPORTED_MODULE_3__.Head, {
      title: "Email Verification"
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div", {
      className: "mb-4 text-sm text-gray-600",
      children: "Thanks for signing up! Before getting started, could you verify your email address by clicking on the link we just emailed to you? If you didn't receive the email, we will gladly send you another."
    }), status === 'verification-link-sent' && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div", {
      className: "mb-4 font-medium text-sm text-green-600",
      children: "A new verification link has been sent to the email address you provided during registration."
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("form", {
      onSubmit: submit,
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
        className: "mt-4 flex items-center justify-between",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_Components_Button__WEBPACK_IMPORTED_MODULE_1__["default"], {
          processing: processing,
          children: "Resend Verification Email"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_inertiajs_inertia_react__WEBPACK_IMPORTED_MODULE_3__.Link, {
          href: route('logout'),
          method: "post",
          as: "button",
          className: "underline text-sm text-gray-600 hover:text-gray-900",
          children: "Log Out"
        })]
      })
    })]
  });
}

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[6].oneOf[1].use[1]!./node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[6].oneOf[1].use[2]!./resources/js/assets/css/guest.css":
/*!*****************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[6].oneOf[1].use[1]!./node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[6].oneOf[1].use[2]!./resources/js/assets/css/guest.css ***!
  \*****************************************************************************************************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
// Imports

var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(function(i){return i[1]});
// Module
___CSS_LOADER_EXPORT___.push([module.id, "/*@import 'tailwindcss/base';\n@import 'tailwindcss/components';\n@import 'tailwindcss/utilities';*/\n\n/*! normalize.css v8.0.1 | MIT License | github.com/necolas/normalize.css */\nhtml {line-height: 1.15;-webkit-text-size-adjust: 100%}\nbody {margin: 0}\na {background-color: transparent}\n[hidden] {display: none}\nhtml {font-family: system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial, Noto Sans, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji;line-height: 1.5}\n*, :after, :before {box-sizing: border-box;border: 0 solid #e2e8f0}\na {color: inherit;text-decoration: inherit}\nsvg, video {display: block;vertical-align: middle}\nvideo {max-width: 100%;height: auto}\n.bg-white {--bg-opacity: 1;background-color: #fff;background-color: rgba(255, 255, 255, var(--bg-opacity))}\n.bg-gray-100 {--bg-opacity: 1;background-color: #f7fafc;background-color: rgba(247, 250, 252, var(--bg-opacity))}\n.border-gray-200 {--border-opacity: 1;border-color: #edf2f7;border-color: rgba(237, 242, 247, var(--border-opacity))}\n.border-t {border-top-width: 1px}\n.flex {display: flex}\n.grid {display: grid}\n.hidden {display: none}\n.items-center {align-items: center}\n.justify-center {justify-content: center}\n.font-semibold {font-weight: 600}\n.h-5 {height: 1.25rem}\n.h-8 {height: 2rem}\n.h-16 {height: 4rem}\n.text-sm {font-size: .875rem}\n.text-lg {font-size: 1.125rem}\n.leading-7 {line-height: 1.75rem}\n.mx-auto {margin-left: auto;margin-right: auto}\n.ml-1 {margin-left: .25rem}\n.mt-2 {margin-top: .5rem}\n.mr-2 {margin-right: .5rem}\n.ml-2 {margin-left: .5rem}\n.mt-4 {margin-top: 1rem}\n.ml-4 {margin-left: 1rem}\n.mt-8 {margin-top: 2rem}\n.ml-12 {margin-left: 3rem}\n.-mt-px {margin-top: -1px}\n.max-w-6xl {max-width: 72rem}\n.min-h-screen {min-height: 100vh}\n.overflow-hidden {overflow: hidden}\n.p-6 {padding: 1.5rem}\n.py-4 {padding-top: 1rem;padding-bottom: 1rem}\n.px-6 {padding-left: 1.5rem;padding-right: 1.5rem}\n.pt-8 {padding-top: 2rem}\n.fixed {position: fixed}\n.relative {position: relative}\n.top-0 {top: 0}\n.right-0 {right: 0}\n.shadow {box-shadow: 0 1px 3px 0 rgba(0, 0, 0, .1), 0 1px 2px 0 rgba(0, 0, 0, .06)}\n.text-center {text-align: center}\n.text-gray-200 {--text-opacity: 1;color: #edf2f7;color: rgba(237, 242, 247, var(--text-opacity))}\n.text-gray-300 {--text-opacity: 1;color: #e2e8f0;color: rgba(226, 232, 240, var(--text-opacity))}\n.text-gray-400 {--text-opacity: 1;color: #cbd5e0;color: rgba(203, 213, 224, var(--text-opacity))}\n.text-gray-500 {--text-opacity: 1;color: #a0aec0;color: rgba(160, 174, 192, var(--text-opacity))}\n.text-gray-600 {--text-opacity: 1;color: #718096;color: rgba(113, 128, 150, var(--text-opacity))}\n.text-gray-700 {--text-opacity: 1;color: #4a5568;color: rgba(74, 85, 104, var(--text-opacity))}\n.text-gray-900 {--text-opacity: 1;color: #1a202c;color: rgba(26, 32, 44, var(--text-opacity))}\n.underline {text-decoration: underline}\n.antialiased {-webkit-font-smoothing: antialiased;-moz-osx-font-smoothing: grayscale}\n.w-5 {width: 1.25rem}\n.w-8 {width: 2rem}\n.w-auto {width: auto}\n.grid-cols-1 {grid-template-columns:repeat(1, minmax(0, 1fr))}\n@media (min-width: 640px) {\n    .sm\\:rounded-lg {border-radius: .5rem}\n\n    .sm\\:block {display: block}\n\n    .sm\\:items-center {align-items: center}\n\n    .sm\\:justify-start {justify-content: flex-start}\n\n    .sm\\:justify-between {justify-content: space-between}\n\n    .sm\\:h-20 {height: 5rem}\n\n    .sm\\:ml-0 {margin-left: 0}\n\n    .sm\\:px-6 {padding-left: 1.5rem;padding-right: 1.5rem}\n\n    .sm\\:pt-0 {padding-top: 0}\n\n    .sm\\:text-left {text-align: left}\n\n    .sm\\:text-right {text-align: right}\n}\n@media (min-width: 768px) {\n    .md\\:border-t-0 {border-top-width: 0}\n\n    .md\\:border-l {border-left-width: 1px}\n\n    .md\\:grid-cols-2 {grid-template-columns:repeat(2, minmax(0, 1fr))}\n}\n@media (min-width: 1024px) {\n    .lg\\:px-8 {padding-left: 2rem;padding-right: 2rem}\n}\n@media (prefers-color-scheme: dark) {\n    .dark\\:bg-gray-800 {--bg-opacity: 1;background-color: #2d3748;background-color: rgba(45, 55, 72, var(--bg-opacity))}\n\n    .dark\\:bg-gray-900 {--bg-opacity: 1;background-color: #1a202c;background-color: rgba(26, 32, 44, var(--bg-opacity))}\n\n    .dark\\:border-gray-700 {--border-opacity: 1;border-color: #4a5568;border-color: rgba(74, 85, 104, var(--border-opacity))}\n\n    .dark\\:text-white {--text-opacity: 1;color: #fff;color: rgba(255, 255, 255, var(--text-opacity))}\n\n    .dark\\:text-gray-400 {--text-opacity: 1;color: #cbd5e0;color: rgba(203, 213, 224, var(--text-opacity))}\n\n    .dark\\:text-gray-500 {--tw-text-opacity: 1;color: #6b7280;color: rgba(107, 114, 128, var(--tw-text-opacity))}\n}\n\n\n\n.rounded-md {\n    border-radius: 0.375rem;\n}\n.border-gray-300 {\n    --tw-border-opacity: 1;\n    border-color: rgb(209 213 219 / var(--tw-border-opacity));\n}\n.focus\\:border-indigo-300:focus {\n    --tw-border-opacity: 1;\n    border-color: rgb(165 180 252 / var(--tw-border-opacity));\n}\n.focus\\:ring-indigo-200:focus {\n    --tw-ring-opacity: 1;\n    --tw-ring-color: rgb(199 210 254 / var(--tw-ring-opacity));\n}\n.focus\\:ring-opacity-50:focus {\n    --tw-ring-opacity: 0.5;\n}\n.focus\\:ring-indigo-200:focus {\n    --tw-ring-opacity: 1;\n    --tw-ring-color: rgb(199 210 254 / var(--tw-ring-opacity));\n}\n.mt-6 {\n    margin-top: 1.5rem;\n}\n\n.font-medium {\n    font-weight: 500;\n}\n.text-green-600 {\n    --tw-text-opacity: 1;\n    color: rgb(22 163 74 / var(--tw-text-opacity));\n}\n.text-red-600 {\n    --tw-text-opacity: 1;\n    color: rgb(220 38 38 / var(--tw-text-opacity));\n}\n.items-start {\n    align-items: flex-start;\n}\n.sm\\:max-w-md {\n    max-width: 28rem;\n}\n.flex-col {\n    flex-direction: column;\n}\n.pt-6 {\n    padding-top: 1.5rem;\n}\n.fill-current {\n    fill: currentColor;\n}\n.w-20 {\n    width: 5rem;\n}\n.w-full {\n    width: 100%;\n}\n.h-20 {\n    height: 5rem;\n}\n[hidden] {\n    display: none;\n}\ninput::-moz-placeholder, textarea::-moz-placeholder {\n    color: #6b7280;\n    opacity: 1;\n}\ninput:-ms-input-placeholder, textarea:-ms-input-placeholder {\n    color: #6b7280;\n    opacity: 1;\n}\ninput::placeholder, textarea::placeholder {\n    color: #6b7280;\n    opacity: 1;\n}\n::-webkit-datetime-edit-fields-wrapper {\n    padding: 0;\n}\n::-webkit-date-and-time-value {\n    min-height: 1.5em;\n}\nselect {\n    background-image: url('data:image/svg+xml,%3csvg xmlns=\\'http://www.w3.org/2000/svg\\' fill=\\'none\\' viewBox=\\'0 0 20 20\\'%3e%3cpath stroke=\\'%236b7280\\' stroke-linecap=\\'round\\' stroke-linejoin=\\'round\\' stroke-width=\\'1.5\\' d=\\'M6 8l4 4 4-4\\'/%3e%3c/svg%3e');\n    background-position: right 0.5rem center;\n    background-repeat: no-repeat;\n    background-size: 1.5em 1.5em;\n    padding-right: 2.5rem;\n    -webkit-print-color-adjust: exact;\n    color-adjust: exact;\n}\n", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./resources/js/assets/images/logo-dark.svg":
/*!**************************************************!*\
  !*** ./resources/js/assets/images/logo-dark.svg ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("/images/logo-dark.svg?3e31c2905e5274980169f0ba13a2d964");

/***/ }),

/***/ "./resources/js/assets/images/logo.svg":
/*!*********************************************!*\
  !*** ./resources/js/assets/images/logo.svg ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("/images/logo.svg?85a24c25facc03383bb95618dc21a90b");

/***/ }),

/***/ "./resources/js/assets/css/guest.css":
/*!*******************************************!*\
  !*** ./resources/js/assets/css/guest.css ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_6_oneOf_1_use_1_node_modules_postcss_loader_dist_cjs_js_ruleSet_1_rules_6_oneOf_1_use_2_guest_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../../../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[6].oneOf[1].use[1]!../../../../node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[6].oneOf[1].use[2]!./guest.css */ "./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[6].oneOf[1].use[1]!./node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[6].oneOf[1].use[2]!./resources/js/assets/css/guest.css");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_6_oneOf_1_use_1_node_modules_postcss_loader_dist_cjs_js_ruleSet_1_rules_6_oneOf_1_use_2_guest_css__WEBPACK_IMPORTED_MODULE_1__["default"], options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_6_oneOf_1_use_1_node_modules_postcss_loader_dist_cjs_js_ruleSet_1_rules_6_oneOf_1_use_2_guest_css__WEBPACK_IMPORTED_MODULE_1__["default"].locals || {});

/***/ })

}]);