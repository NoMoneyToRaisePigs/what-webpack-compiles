"use strict";
(self["webpackChunk_federation_share_"] = self["webpackChunk_federation_share_"] || []).push([["src_router_index_js"],{

/***/ "./src/router/index.js":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("webpack/sharing/consume/default/vue/vue");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var vue_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/vue-router/vue-router");
/* harmony import */ var vue_router__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(vue_router__WEBPACK_IMPORTED_MODULE_1__);



vue__WEBPACK_IMPORTED_MODULE_0___default().use((vue_router__WEBPACK_IMPORTED_MODULE_1___default()))

const routes = [
  {
    path: '/',
    component: () => __webpack_require__.e(/* import() */ "webpack_container_remote_shell_views_profile").then(__webpack_require__.t.bind(__webpack_require__, "webpack/container/remote/shell/views/profile", 23))
  },
  {
    path: '/user',
    component: () => __webpack_require__.e(/* import() */ "webpack_container_remote_shell_views_user").then(__webpack_require__.t.bind(__webpack_require__, "webpack/container/remote/shell/views/user", 23))
  },
  {
    path: '/profile',
    component: () => __webpack_require__.e(/* import() */ "webpack_container_remote_shell_views_profile").then(__webpack_require__.t.bind(__webpack_require__, "webpack/container/remote/shell/views/profile", 23))
  }
] 

const router = new (vue_router__WEBPACK_IMPORTED_MODULE_1___default())({
  routes
})

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (router);


/***/ })

}]);