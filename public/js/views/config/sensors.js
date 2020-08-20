(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["js/views/config/sensors"],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/config/SensorMapping.vue?vue&type=script&lang=js&":
/*!**************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/views/config/SensorMapping.vue?vue&type=script&lang=js& ***!
  \**************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../helpers */ "./resources/js/helpers.js");
/* harmony import */ var _components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../components */ "./resources/js/components/index.js");
/* harmony import */ var _components_SensorMapper_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../components/SensorMapper.js */ "./resources/js/components/SensorMapper.js");


function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



var api = {
  mapping: '/api/sensors',
  bldg: '/api/locations',
  floor: '/api/floors'
};
/* harmony default export */ __webpack_exports__["default"] = ({
  title: 'Sensors',
  props: ['bldg_id', 'bldg_name', 'floor_id'],
  components: {
    Loader: _components__WEBPACK_IMPORTED_MODULE_2__["Loader"],
    Modal: _components__WEBPACK_IMPORTED_MODULE_2__["Modal"]
  },
  data: function data() {
    return {
      mapper: null,
      loaded: false,
      bldg: null,
      floors: [],
      floorSel: null,
      //floor: null, 
      sensors: [],
      editMapper: false,
      showEntry: false,
      editMode: false,
      entry: {
        id: null,
        sensor: '',
        name: '',
        pos_x: 0,
        pos_y: 0,
        scale: 0
      },
      state: {
        saving: false,
        removing: false
      }
    };
  },
  computed: {
    baseUrl: function baseUrl() {
      return Object(_helpers__WEBPACK_IMPORTED_MODULE_1__["getBaseUrl"])();
    },
    floor: function floor() {
      var _this = this;

      return this.floorSel ? this.floors.find(function (f) {
        return f.hid === _this.floorSel;
      }) : null;
    },
    building: function building() {
      return this.bldg_name ? this.bldg_name : this.bldg ? this.bldg.name : '';
    }
  },
  methods: {
    getBldg: function getBldg(id) {
      var _this2 = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee() {
        var _yield$axios$get, data;

        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return axios.get(api.bldg, {
                  params: {
                    id: id
                  }
                });

              case 2:
                _yield$axios$get = _context.sent;
                data = _yield$axios$get.data;
                _this2.bldg = data;

              case 5:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }))();
    },
    getFloors: function getFloors(bid, cb) {
      var _this3 = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee2() {
        var _yield$axios$get2, data;

        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return axios.get(api.floor, {
                  params: {
                    bid: bid
                  }
                });

              case 2:
                _yield$axios$get2 = _context2.sent;
                data = _yield$axios$get2.data;
                data.forEach(function (floor) {
                  floor.floor_plan_url = "".concat(_this3.baseUrl, "/plans/").concat(floor.floor_plan);
                });
                _this3.floors = data.sort(function (a, b) {
                  if (a.floor_no > b.floor_no) return 1;
                  if (a.floor_no < b.floor_no) return -1;
                  return 0;
                });

                if (_this3.floor_id) {
                  _this3.floorSel = _this3.floor_id;
                } else if (_this3.floors.length > 0) {
                  _this3.floorSel = _this3.floors[0].hid;
                }

                setTimeout(function () {
                  if (cb) cb();
                }, 0);

              case 8:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }))();
    },
    floorChange: function floorChange() {
      var _this4 = this;

      this.getSensors(this.floorSel, function () {
        // this.setupMapper()
        _this4.mapper.setData(_this4.floor);
      });
    },
    getSensors: function getSensors(fid, cb) {
      var _this5 = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee3() {
        var _yield$axios$get3, data, floor;

        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return axios.get(api.mapping, {
                  params: {
                    fid: fid
                  }
                });

              case 2:
                _yield$axios$get3 = _context3.sent;
                data = _yield$axios$get3.data;
                floor = _this5.floors.find(function (f) {
                  return f.hid === fid;
                });
                floor.sensors = data;
                setTimeout(function () {
                  if (cb) cb();
                }, 0);

              case 7:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }))();
    },
    toggleEditMode: function toggleEditMode(edit) {
      this.editMapper = edit;
      this.mapper.editMode(edit);
    },
    setupMapper: function setupMapper() {
      var _ = this;

      _.mapper = new _components_SensorMapper_js__WEBPACK_IMPORTED_MODULE_3__["default"]('#floor-map', _.floor, {
        addTrigger: function addTrigger(pos) {
          _.triggerAdd(pos.x, pos.y, pos.scale);
        },
        sensorClick: function sensorClick(s) {
          _.triggerEdit(s.hid);
        },
        sensorMoved: function sensorMoved(s) {
          axios.put("".concat(api.mapping, "/coord/").concat(s.hid), {
            pos_x: s.pos_x,
            pos_y: s.pos_y,
            scale: s.scale
          });
        }
      });
    },
    toggleEntry: function toggleEntry(show) {
      var _this6 = this;

      this.showEntry = show;
      if (show) setTimeout(function () {
        _this6.$refs.sensor.focus();
      }, 0);
    },
    toggleSaving: function toggleSaving(saving) {
      this.state.saving = saving;
    },
    triggerAdd: function triggerAdd(x, y, scale) {
      this.entry.id = null;
      this.entry.sensor = '';
      this.entry.pos_x = x;
      this.entry.pos_y = y;
      this.entry.scale = scale;
      this.editMode = false;
      this.toggleEntry(true);
    },
    addSensor: function addSensor() {
      var _this7 = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee4() {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _this7.toggleSaving(true);

                axios.post(api.mapping, {
                  floor: _this7.floor.hid,
                  sensor_id: _this7.entry.sensor,
                  name: _this7.entry.name,
                  pos_x: _this7.entry.pos_x,
                  pos_y: _this7.entry.pos_y,
                  offset_x: _this7.entry.offset_x,
                  offset_y: _this7.entry.offset_y,
                  scale: _this7.entry.scale
                }).then(function (x) {
                  _this7.toggleSaving(false);

                  var res = x.data;

                  if (res.r) {
                    _this7.floor.sensors.push(res.data);

                    _this7.mapper.drawSensors();

                    _this7.toggleEntry(false);
                  }
                });

              case 2:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      }))();
    },
    triggerEdit: function triggerEdit(id) {
      var s = this.floor.sensors.find(function (s) {
        return s.hid === id;
      });
      this.entry.id = id;
      this.entry.sensor = s.sensor_id;
      this.entry.name = s.name;
      this.entry.pos_x = s.pos_x;
      this.entry.pos_y = s.pos_y;
      this.entry.offset_x = s.offset_x;
      this.entry.offset_y = s.offset_y;
      this.entry.scale = s.scale;
      this.editMode = true;
      this.toggleEntry(true);
    },
    upSensor: function upSensor() {
      var _this8 = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee5() {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _this8.toggleSaving(true);

                axios.put("".concat(api.mapping, "/").concat(_this8.entry.id), {
                  sensor_id: _this8.entry.sensor,
                  name: _this8.entry.name
                }).then(function (x) {
                  _this8.toggleSaving(false);

                  var res = x.data;

                  if (res.r) {
                    var s = _this8.floor.sensors.find(function (s) {
                      return s.hid === _this8.entry.id;
                    });

                    s.sensor_id = _this8.entry.sensor;
                    s.name = _this8.entry.name;

                    _this8.mapper.drawSensors();

                    _this8.toggleEntry(false);
                  }
                });

              case 2:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5);
      }))();
    },
    delSensor: function delSensor() {
      var _this9 = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee6() {
        var _id, _idx, _sensor;

        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _id = _this9.entry.id, _idx = _this9.floor.sensors.findIndex(function (s) {
                  return s.hid === _id;
                }), _sensor = _this9.floor.sensors[_idx];

                if (confirm("Remove sensor ".concat(_sensor.sensor_id, "?"))) {
                  _this9.state.removing = true;
                  axios["delete"]("".concat(api.mapping, "/").concat(_id)).then(function (x) {
                    _this9.state.removing = false;
                    var res = x.data;

                    if (res.r) {
                      _this9.floor.sensors.splice(_idx, 1);

                      _this9.mapper.drawSensors();

                      _this9.toggleEntry(false);
                    }
                  });
                }

              case 2:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6);
      }))();
    }
  },
  created: function created() {
    if (!this.bldg_name) this.getBldg(this.bldg_id);
  },
  mounted: function mounted() {
    var _ = this;

    _.getFloors(_.bldg_id, function () {
      _.loaded = true;

      _.getSensors(_.floor.hid, function () {
        _.setupMapper();
      });
    });
  }
});

/***/ }),

/***/ "./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/config/SensorMapping.vue?vue&type=style&index=0&lang=scss&":
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--9-2!./node_modules/sass-loader/dist/cjs.js??ref--9-3!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/views/config/SensorMapping.vue?vue&type=style&index=0&lang=scss& ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "#sensor-mapper {\n  display: flex;\n  margin-top: 24px;\n}\n#sensor-mapper #mapper-options {\n  margin-bottom: 24px;\n}\n#floor-map {\n  overflow: hidden;\n}\n#floor-map svg {\n  pointer-events: initial !important;\n}\n#floor-map svg .sensor {\n  box-shadow: 0 0 0 4px rgba(61, 207, 163, 0.3);\n}", ""]);

// exports


/***/ }),

/***/ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/config/SensorMapping.vue?vue&type=style&index=0&lang=scss&":
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader!./node_modules/css-loader!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--9-2!./node_modules/sass-loader/dist/cjs.js??ref--9-3!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/views/config/SensorMapping.vue?vue&type=style&index=0&lang=scss& ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../../node_modules/css-loader!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/postcss-loader/src??ref--9-2!../../../../node_modules/sass-loader/dist/cjs.js??ref--9-3!../../../../node_modules/vue-loader/lib??vue-loader-options!./SensorMapping.vue?vue&type=style&index=0&lang=scss& */ "./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/config/SensorMapping.vue?vue&type=style&index=0&lang=scss&");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/config/SensorMapping.vue?vue&type=template&id=09a82586&":
/*!******************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/views/config/SensorMapping.vue?vue&type=template&id=09a82586& ***!
  \******************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { staticClass: "content" },
    [
      _c("h1", [
        _vm._v(_vm._s(_vm.building ? _vm.building + " Sensors" : "Sensors"))
      ]),
      _vm._v(" "),
      _c("transition", { attrs: { name: "fade" } }, [
        _vm.loaded
          ? _c("div", { attrs: { id: "sensor-mapper" } }, [
              _c("div", { staticClass: "row" }, [
                _c("div", { staticClass: "col-12 col-md-3" }, [
                  _c(
                    "div",
                    { attrs: { id: "mapper-options" } },
                    [
                      _c("div", { staticClass: "input-field" }, [
                        _c("label", [_vm._v("Floor")]),
                        _vm._v(" "),
                        _c(
                          "select",
                          {
                            directives: [
                              {
                                name: "model",
                                rawName: "v-model",
                                value: _vm.floorSel,
                                expression: "floorSel"
                              }
                            ],
                            on: {
                              change: [
                                function($event) {
                                  var $$selectedVal = Array.prototype.filter
                                    .call($event.target.options, function(o) {
                                      return o.selected
                                    })
                                    .map(function(o) {
                                      var val =
                                        "_value" in o ? o._value : o.value
                                      return val
                                    })
                                  _vm.floorSel = $event.target.multiple
                                    ? $$selectedVal
                                    : $$selectedVal[0]
                                },
                                _vm.floorChange
                              ]
                            }
                          },
                          _vm._l(_vm.floors, function(f) {
                            return _c(
                              "option",
                              { key: f.hid, domProps: { value: f.hid } },
                              [_vm._v(_vm._s(f.ordinal_no) + " Floor")]
                            )
                          }),
                          0
                        )
                      ]),
                      _vm._v(" "),
                      _vm.editMapper
                        ? [
                            _c(
                              "button",
                              {
                                staticClass: "btn btn-primary",
                                on: {
                                  click: function($event) {
                                    return _vm.toggleEditMode(false)
                                  }
                                }
                              },
                              [_vm._v("Close Edit")]
                            )
                          ]
                        : _c(
                            "button",
                            {
                              staticClass: "btn btn-primary",
                              on: {
                                click: function($event) {
                                  return _vm.toggleEditMode(true)
                                }
                              }
                            },
                            [_vm._v("Edit Mode")]
                          )
                    ],
                    2
                  )
                ]),
                _vm._v(" "),
                _c("div", { staticClass: "col" }, [
                  _c("div", { attrs: { id: "floor-map" } })
                ])
              ])
            ])
          : _vm._e()
      ]),
      _vm._v(" "),
      _c(
        "modal",
        {
          attrs: { show: _vm.showEntry },
          on: {
            close: function($event) {
              return _vm.toggleEntry(false)
            }
          },
          scopedSlots: _vm._u([
            {
              key: "header",
              fn: function() {
                return [
                  _c("h2", [
                    _vm._v(_vm._s(_vm.editMode ? "Edit" : "Add") + " Sensor")
                  ])
                ]
              },
              proxy: true
            },
            {
              key: "footer",
              fn: function() {
                return [
                  !_vm.editMode
                    ? _c(
                        "button",
                        {
                          staticClass: "btn btn-primary",
                          attrs: { disabled: _vm.state.saving },
                          on: { click: _vm.addSensor }
                        },
                        [_vm._v(_vm._s(_vm.state.saving ? "Adding..." : "Add"))]
                      )
                    : _vm._e(),
                  _vm._v(" "),
                  _vm.editMode
                    ? [
                        _c(
                          "button",
                          {
                            staticClass: "btn btn-danger btn-link",
                            attrs: { disabled: _vm.state.removing },
                            on: { click: _vm.delSensor }
                          },
                          [
                            _vm._v(
                              _vm._s(
                                _vm.state.removing ? "Removing..." : "Remove"
                              )
                            )
                          ]
                        ),
                        _vm._v(" "),
                        _c(
                          "button",
                          {
                            staticClass: "btn btn-primary",
                            attrs: { disabled: _vm.state.saving },
                            on: { click: _vm.upSensor }
                          },
                          [
                            _vm._v(
                              _vm._s(
                                _vm.state.saving ? "Updating..." : "Update"
                              )
                            )
                          ]
                        )
                      ]
                    : _vm._e()
                ]
              },
              proxy: true
            }
          ])
        },
        [
          _vm._v(" "),
          _c("div", { attrs: { id: "entry-wrapper" } }, [
            _c("div", { staticClass: "input-field" }, [
              _c("label", [_vm._v("Sensor")]),
              _vm._v(" "),
              _c("input", {
                directives: [
                  {
                    name: "model",
                    rawName: "v-model",
                    value: _vm.entry.sensor,
                    expression: "entry.sensor"
                  }
                ],
                ref: "sensor",
                attrs: { type: "text" },
                domProps: { value: _vm.entry.sensor },
                on: {
                  input: function($event) {
                    if ($event.target.composing) {
                      return
                    }
                    _vm.$set(_vm.entry, "sensor", $event.target.value)
                  }
                }
              })
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "input-field" }, [
              _c("label", [_vm._v("Name")]),
              _vm._v(" "),
              _c("input", {
                directives: [
                  {
                    name: "model",
                    rawName: "v-model",
                    value: _vm.entry.name,
                    expression: "entry.name"
                  }
                ],
                attrs: { type: "text", placeholder: "(Optional)" },
                domProps: { value: _vm.entry.name },
                on: {
                  input: function($event) {
                    if ($event.target.composing) {
                      return
                    }
                    _vm.$set(_vm.entry, "name", $event.target.value)
                  }
                }
              })
            ])
          ])
        ]
      ),
      _vm._v(" "),
      _c("loader", { attrs: { show: !_vm.loaded, type: "ripple" } })
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./resources/js/components/SensorMapper.js":
/*!*************************************************!*\
  !*** ./resources/js/components/SensorMapper.js ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var d3__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! d3 */ "./node_modules/d3/index.js");

/**
 * Creates a floor plan sensor mapper
 * @param {String} wrapper Mapper wrapper ID
 * @param {Object} data Floor plan data
 * @param {Object} callbacks Mapper event callbacks
 */

function mapper(wrapper, data, callbacks) {
  var _this2 = this;

  var container = d3__WEBPACK_IMPORTED_MODULE_0__["select"](wrapper);
  var // width = 720, 
  width = container.node().getBoundingClientRect().width - 24,
      height = 487; // height = 600

  var floor = data,
      sensors = floor.sensors || [],
      config = {
    edit: false
  },
      offset = {
    x: 0,
    y: 0,
    scale: 0
  },
      events = callbacks; //{ sensorClick: null }

  var x = d3__WEBPACK_IMPORTED_MODULE_0__["scaleLinear"]().domain([0, 50.0]).range([0, width]),
      y = d3__WEBPACK_IMPORTED_MODULE_0__["scaleLinear"]().domain([0, 33.79]).range([0, height]),
      _ = this;

  container.selectAll('svg').remove(); //clean up

  var svg = container.append('svg').attr('width', width).attr('height', height).style('display', 'block').style('background', '#ffffff');
  var g = svg.selectAll('.map-layer').data([0]).enter().append('g').attr('class', 'map-layer');
  var zoom = d3__WEBPACK_IMPORTED_MODULE_0__["zoom"]().scaleExtent([1, 8]).on('zoom', function () {
    g.__transform = d3__WEBPACK_IMPORTED_MODULE_0__["event"].transform;
    var minXTranslate = (1 - g.__transform.k) * (x.range()[1] - x.range()[0]),
        minYTranslate = (1 - g.__transform.k) * (y.range()[1] - y.range()[0]);
    g.__transform.x = Math.min(x.range()[0], Math.max(g.__transform.x, minXTranslate));
    g.__transform.y = Math.min(y.range()[0], Math.max(g.__transform.y, minYTranslate)); // g.attr('transform', `${g.__transform}`)

    g.selectAll('image').attr('transform', g.__transform);
    g.selectAll('.sensor-layer').attr('transform', g.__transform);
  });
  g.call(zoom);

  this.drawFloorPlan = function () {
    g.selectAll('image').remove();

    if (floor.floor_plan) {
      var imgs = g.selectAll('image').data([0]),
          _height = 33.79,
          _width = 50.0;
      imgs.enter().append('svg:image').attr('xlink:href', floor.floor_plan_url).attr('height', y(0 + _height) - y(0)).attr('width', x(0 + _width) - x(0)).style('cursor', function () {
        return config.edit ? 'crosshair' : 'default';
      }).on('click', function () {
        return config.edit && (floorClick(), d3__WEBPACK_IMPORTED_MODULE_0__["event"].stopPropagation());
      });
      if (g.__transform) g.selectAll('image').attr('transform', g.__transform);
    }
  };

  function getImageDim(src, cb) {
    var img = new Image();
    img.src = src;

    img.onload = function () {
      return cb && cb({
        height: img.height,
        width: img.width
      });
    };
  }

  function calcOffsets(cb) {
    getImageDim(floor.floor_plan_url, function (dim) {
      var diff = {
        h: height - dim.height,
        w: width - dim.width
      },
          scale = diff.h < diff.w ? height / dim.height : width / dim.width,
          imgWidth = dim.width * scale,
          imgHeight = dim.height * scale,
          imgOffsetX = (width - imgWidth) / 2,
          imgOffsetY = (height - imgHeight) / 2;
      offset.x = imgOffsetX < 0 ? 0 : imgOffsetX;
      offset.y = imgOffsetY < 0 ? 0 : imgOffsetY;
      offset.scale = scale;
      if (cb) cb();
    });
  }

  function floorClick() {
    var t = g.__transform,
        evt = d3__WEBPACK_IMPORTED_MODULE_0__["event"],
        _x = t ? (evt.offsetX - t.x) / t.k : evt.offsetX,
        _y = t ? (evt.offsetY - t.y) / t.k : evt.offsetY;

    if (t && t.z === 1 || !t) {
      _x -= offset.x;
      _y -= offset.y;
    }

    return events.addTrigger && events.addTrigger.call(_, {
      x: _x,
      y: _y,
      scale: offset.scale
    });
  }

  this.drawSensors = function () {
    g.selectAll('.sensor-layer').remove(); //clear

    if (sensors.length === 0) return;
    var dragged = false;
    var sg = g.selectAll('.sensor-layer').data([0]).enter().append('g').attr('class', 'sensor-layer');
    if (g.__transform) sg.attr('transform', g.__transform);
    sg.selectAll('.sensor').data(sensors).enter().append('circle').attr('class', 'sensor').attr('r', '5').attr('stroke', 'rgba(61, 207, 163, 0.3)').attr('stroke-width', 5).style('fill', '#3DCFA3').style('cursor', function () {
      return config.edit ? 'move' : 'default';
    }).attr('cx', function (s) {
      var scale = parseFloat(offset.scale.toFixed(12));
      return s.pos_x / s.scale * scale + offset.x;
    }).attr('cy', function (s) {
      var scale = parseFloat(offset.scale.toFixed(12));
      return s.pos_y / s.scale * scale + offset.y;
    }).on('click', function (s) {
      return config.edit && (sensorClick(s), d3__WEBPACK_IMPORTED_MODULE_0__["event"].stopPropagation());
    }).call(d3__WEBPACK_IMPORTED_MODULE_0__["drag"]().on('drag', function (s) {
      if (config.edit) {
        dragged = true;
        d3__WEBPACK_IMPORTED_MODULE_0__["select"](this).attr('cx', s.pos_x = d3__WEBPACK_IMPORTED_MODULE_0__["event"].x).attr('cy', s.pos_y = d3__WEBPACK_IMPORTED_MODULE_0__["event"].y);
      }
    }).on('end', function (s) {
      if (config.edit && dragged) {
        dragged = false;
        s.pos_x -= offset.x;
        s.pos_y -= offset.y;
        s.scale = offset.scale;
        return events.sensorMoved && events.sensorMoved.call(_, s);
      }
    }));
  };

  function sensorClick(s) {
    return events.sensorClick && events.sensorClick.call(_, s);
  }

  this.setData = function (data) {
    floor = data;
    sensors = floor.sensors; // redraw

    g.__transform = null;
    this.redraw(true);
  };

  this.redraw = function (fresh) {
    var _this = this;

    // remove zoom
    if (fresh) {
      g.__transform = null;
      g.call(zoom.transform, d3__WEBPACK_IMPORTED_MODULE_0__["zoomIdentity"]);
    }

    this.drawFloorPlan();
    calcOffsets(function () {
      // render sensors
      _this.drawSensors();
    });
  };

  this.editMode = function (edit) {
    config.edit = edit; // redraw

    this.redraw(false);
  }; // render floor plan


  if (floor) {
    this.drawFloorPlan();
    calcOffsets(function () {
      // render sensors
      _this2.drawSensors();
    });
  }

  return this;
}

/* harmony default export */ __webpack_exports__["default"] = (mapper);

/***/ }),

/***/ "./resources/js/views/config/SensorMapping.vue":
/*!*****************************************************!*\
  !*** ./resources/js/views/config/SensorMapping.vue ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _SensorMapping_vue_vue_type_template_id_09a82586___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./SensorMapping.vue?vue&type=template&id=09a82586& */ "./resources/js/views/config/SensorMapping.vue?vue&type=template&id=09a82586&");
/* harmony import */ var _SensorMapping_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./SensorMapping.vue?vue&type=script&lang=js& */ "./resources/js/views/config/SensorMapping.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _SensorMapping_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./SensorMapping.vue?vue&type=style&index=0&lang=scss& */ "./resources/js/views/config/SensorMapping.vue?vue&type=style&index=0&lang=scss&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _SensorMapping_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _SensorMapping_vue_vue_type_template_id_09a82586___WEBPACK_IMPORTED_MODULE_0__["render"],
  _SensorMapping_vue_vue_type_template_id_09a82586___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/views/config/SensorMapping.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/views/config/SensorMapping.vue?vue&type=script&lang=js&":
/*!******************************************************************************!*\
  !*** ./resources/js/views/config/SensorMapping.vue?vue&type=script&lang=js& ***!
  \******************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SensorMapping_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./SensorMapping.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/config/SensorMapping.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SensorMapping_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/views/config/SensorMapping.vue?vue&type=style&index=0&lang=scss&":
/*!***************************************************************************************!*\
  !*** ./resources/js/views/config/SensorMapping.vue?vue&type=style&index=0&lang=scss& ***!
  \***************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_2_node_modules_sass_loader_dist_cjs_js_ref_9_3_node_modules_vue_loader_lib_index_js_vue_loader_options_SensorMapping_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/style-loader!../../../../node_modules/css-loader!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/postcss-loader/src??ref--9-2!../../../../node_modules/sass-loader/dist/cjs.js??ref--9-3!../../../../node_modules/vue-loader/lib??vue-loader-options!./SensorMapping.vue?vue&type=style&index=0&lang=scss& */ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/config/SensorMapping.vue?vue&type=style&index=0&lang=scss&");
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_2_node_modules_sass_loader_dist_cjs_js_ref_9_3_node_modules_vue_loader_lib_index_js_vue_loader_options_SensorMapping_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_2_node_modules_sass_loader_dist_cjs_js_ref_9_3_node_modules_vue_loader_lib_index_js_vue_loader_options_SensorMapping_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_2_node_modules_sass_loader_dist_cjs_js_ref_9_3_node_modules_vue_loader_lib_index_js_vue_loader_options_SensorMapping_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_2_node_modules_sass_loader_dist_cjs_js_ref_9_3_node_modules_vue_loader_lib_index_js_vue_loader_options_SensorMapping_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_2_node_modules_sass_loader_dist_cjs_js_ref_9_3_node_modules_vue_loader_lib_index_js_vue_loader_options_SensorMapping_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./resources/js/views/config/SensorMapping.vue?vue&type=template&id=09a82586&":
/*!************************************************************************************!*\
  !*** ./resources/js/views/config/SensorMapping.vue?vue&type=template&id=09a82586& ***!
  \************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_SensorMapping_vue_vue_type_template_id_09a82586___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./SensorMapping.vue?vue&type=template&id=09a82586& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/config/SensorMapping.vue?vue&type=template&id=09a82586&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_SensorMapping_vue_vue_type_template_id_09a82586___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_SensorMapping_vue_vue_type_template_id_09a82586___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);