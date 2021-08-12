(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["js/views/config/mapper~js/views/insights/comfort-map~js/views/insights/heat-map~js/views/insights/live-view"],{

/***/ "./resources/js/components/FloorMapper.js":
/*!************************************************!*\
  !*** ./resources/js/components/FloorMapper.js ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var d3__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! d3 */ "./node_modules/d3/index.js");
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../helpers */ "./resources/js/helpers.js");


/**
 * Creates a floor plan mapper (areas and sensors)
 * @param {String} wrapper Mapper wrapper ID
 * @param {Object} data Floor plan data
 * @param {Object} options Mapper configurations & callback functions
 */

function mapper(wrapper, data, options) {
  var _this3 = this;

  var container = d3__WEBPACK_IMPORTED_MODULE_0__["select"](wrapper); //, parentRect = container.node().parentNode.getBoundingClientRect()

  var config_defaults = {
    edit: false,
    heatmap: false,
    comfortmap: false
  };

  var maxWidth = function maxWidth() {
    return container.node().parentNode.getBoundingClientRect().width || 800;
  },
      maxHeight = function maxHeight() {
    return container.node().parentNode.getBoundingClientRect().height || 400;
  };

  var width = maxWidth(),
      height = maxHeight();
  var _floor = data,
      sensors = _floor.sensors || [],
      config = Object(_helpers__WEBPACK_IMPORTED_MODULE_1__["extend"])(config_defaults, options),
      events = config.events,
      offset = {
    x: 0,
    y: 0,
    scale: 0
  },
      tooltipOffsetX = 15,
      state = {
    sensorMapping: false,
    showSensors: false,
    areaMapping: false,
    showAreas: false,
    drawing: false,
    polyMoved: false
  },
      drawPoints = [],
      size = 5;

  var sensorSize = function sensorSize() {
    if (config.heatmap) return size * 3;
    if (config.comfortmap) return size * 7;
    return size;
  };

  var blurSize = function blurSize() {
    return config.heatmap ? 7 : 15;
  };

  var xDMax = 50.0,
      yDMax = 33.79,
      x = d3__WEBPACK_IMPORTED_MODULE_0__["scaleLinear"]().domain([0, xDMax]).range([0, width]),
      y = d3__WEBPACK_IMPORTED_MODULE_0__["scaleLinear"]().domain([0, yDMax]).range([0, height]),
      _ = this;

  var sensorColor = d3__WEBPACK_IMPORTED_MODULE_0__["scaleOrdinal"]().domain([0, 1, 2]).range(['#01FE01', '#FF8600', '#ED0003']),
      sensorStroke = d3__WEBPACK_IMPORTED_MODULE_0__["scaleOrdinal"]().domain([0, 1, 2]).range(['rgba(1,254,1,0.3)', 'rgba(255,134,0,0.3)', 'rgba(237,0,3,0.3)']);
  container.selectAll('svg').remove(); //clean up

  container.selectAll('.tooltip').remove();
  var tooltip = container.append('div').attr('class', 'tooltip');
  var svg = container.append('svg').attr('width', width).attr('height', height).style('display', 'block').style('background', '#ffffff').on('click', function () {
    if (!config.edit) return;
    var evt = d3__WEBPACK_IMPORTED_MODULE_0__["event"],
        elem = document.elementFromPoint(evt.x, evt.y);
    if (elem.tagName === 'svg') return;

    var t = mapLayer.__transform,
        _x = t ? (evt.offsetX - t.x) / t.k : evt.offsetX,
        _y = t ? (evt.offsetY - t.y) / t.k : evt.offsetY;

    if (t && t.z === 1 || !t) {
      _x -= offset.x;
      _y -= offset.y;
    }

    if (state.sensorMapping) {
      var area = elem.tagName === 'polygon' ? d3__WEBPACK_IMPORTED_MODULE_0__["select"](elem.parentNode).data()[0] : null;
      return events && events.sensorAdd && events.sensorAdd.call(_, {
        x: _x,
        y: _y,
        scale: offset.scale,
        area: area
      });
    }
  });

  if (config.events) {
    svg.style('pointer-events', 'all');
  } // set wrapper to inline-block


  if (config.heatmap || config.comfortmap) {
    svg.append("defs").append("filter").attr("id", "blur").attr('x', '-50%').attr('y', '-50%').attr('width', '200%').attr('height', '200%').append("feGaussianBlur").attr("stdDeviation", blurSize());
  }

  var mapLayer = svg.selectAll('.map-layer').data([0]).enter().append('g').attr('class', 'map-layer');
  var imgLayer = mapLayer.append('g').attr('class', 'image-layer');
  var sensorLayer = mapLayer.append('g').attr('class', 'sensor-layer');
  var zoom = d3__WEBPACK_IMPORTED_MODULE_0__["zoom"]().scaleExtent([1, 8]).on('zoom', function () {
    mapLayer.__transform = d3__WEBPACK_IMPORTED_MODULE_0__["event"].transform;
    var minXTranslate = (1 - mapLayer.__transform.k) * (x.range()[1] - x.range()[0]),
        minYTranslate = (1 - mapLayer.__transform.k) * (y.range()[1] - y.range()[0]);
    mapLayer.__transform.x = Math.min(x.range()[0], Math.max(mapLayer.__transform.x, minXTranslate));
    mapLayer.__transform.y = Math.min(y.range()[0], Math.max(mapLayer.__transform.y, minYTranslate)); // mapLayer.attr('transform', mapLayer.__transform)

    imgLayer.attr('transform', mapLayer.__transform);
    sensorLayer.attr('transform', mapLayer.__transform);
  });
  mapLayer.call(zoom);
  /**
   * Sets the size of the canvas
   * @param {number} w Canvas width
   * @param {number} h Canvas height
   */

  function setSize(w, h) {
    width = w;
    height = h;
    x = d3__WEBPACK_IMPORTED_MODULE_0__["scaleLinear"]().domain([0, xDMax]).range([0, w]);
    y = d3__WEBPACK_IMPORTED_MODULE_0__["scaleLinear"]().domain([0, yDMax]).range([0, h]);
    svg.attr('width', w).attr('height', h);
  }
  /**
   * Gets the floor plan dimension, and adjusts the canvas size to fit
   * @param {string} src Image url
   * @param {Function} cb Callback function
   */


  function getImageDim(src, cb) {
    var _this = this;

    var img = new Image();
    if (events && events.imgLoad) events.imgLoad.call(this, src);
    img.src = src;

    img.onload = function () {
      var //diff = { h: maxHeight() - img.height, w: maxWidth() - img.width },
      // isNegative = diff.h < 0 && diff.w < 0,
      // scale = (!isNegative && diff.h < diff.w) || (isNegative && diff.h > diff.w) ? (maxHeight() / img.height) : (maxWidth() / img.width),
      // scale = (diff.h < diff.w) ? (maxHeight() / img.height) : (maxWidth() / img.width),
      max_height = maxHeight(),
          max_width = maxWidth(),
          scale = img.height > max_height ? max_height / img.height : max_width / img.width,
          canvasWidth = Math.min(Math.min(img.width * scale, img.width), max_width),
          canvasHeight = Math.min(Math.min(img.height * scale, img.height), max_height); // console.log('getImageDim', img.width, img.height, scale, canvasWidth, canvasHeight, max_width, max_height)

      setSize(canvasWidth, canvasHeight);
      if (events && events.imgLoaded) events.imgLoaded.call(_this, img);
      return cb && cb({
        height: img.height,
        width: img.width
      });
    };
  }
  /**
   * Calculates the floor plan size offset to the canvas
   * @param {Function} cb Callback function
   */


  function calcOffsets(cb) {
    getImageDim(_floor.floor_plan_url, function (dim) {
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
  /**
   * Sets the tooltip position
   * @param {number} x Position on x-axis
   * @param {number} y Position on y-axis
   * @param {string} content Tooltip content
   */


  function setTooltip(x, y, content) {
    if (content) tooltip.html(content);
    tooltip.style('left', "".concat(x, "px")).style('top', "".concat(y, "px"));
  }
  /* sensor functions */


  function sensorClick(s) {
    return events && events.sensorClick && events.sensorClick.call(_, s);
  }

  function sensorDrag(s) {
    if (config.edit && state.sensorMapping) {
      s.dragged = true;
      d3__WEBPACK_IMPORTED_MODULE_0__["select"](this).attr('cx', s.pos_x = d3__WEBPACK_IMPORTED_MODULE_0__["event"].x).attr('cy', s.pos_y = d3__WEBPACK_IMPORTED_MODULE_0__["event"].y);
    }
  }

  function sensorDragEnd(s) {
    if (config.edit && state.sensorMapping && s.dragged) {
      s.dragged = false;
      s.pos_x -= offset.x;
      s.pos_y -= offset.y;
      s.scale = offset.scale;
      return events && events.sensorMoved && events.sensorMoved.call(_, s);
    }
  }
  /* end sensor functions */

  /**
   * Renders the floor plan image
   */


  this.drawFloorPlan = function () {
    imgLayer.selectAll('image').remove();
    if (mapLayer.__transform) imgLayer.attr('transform', mapLayer.__transform);

    if (_floor.floor_plan) {
      var canClick = config.edit && (state.sensorMapping || state.areaMapping);
      imgLayer.insert('image', ':first-child').attr('xlink:href', _floor.floor_plan_url).attr('height', y(0 + yDMax) - y(0)).attr('width', x(0 + xDMax) - x(0)).style('cursor', function () {
        return canClick ? 'crosshair' : 'default';
      }); // .on('click', () => canClick && (floorClick(), d3.event.stopPropagation()))
    }
  };
  /**
   * Renders all sensor dots
   */


  this.drawSensors = function () {
    sensorLayer.selectAll('.sensor').remove(); //clear

    if (mapLayer.__transform) sensorLayer.attr('transform', mapLayer.__transform);
    if (sensors.length === 0) return;
    var canEdit = config.edit && state.sensorMapping;
    sensorLayer.selectAll('.sensor').data(sensors).enter().append('circle').attr('class', 'sensor').attr('data-id', function (d) {
      return d.id;
    }).attr('r', sensorSize()).attr('stroke-width', config.heatmap || config.comfortmap ? null : 5).attr('stroke', config.heatmap || config.comfortmap ? null : sensorStroke(0)).style('fill', sensorColor(0)).attr("filter", config.heatmap || config.comfortmap ? "url(#blur)" : null).style('cursor', function () {
      return canEdit ? 'move' : 'default';
    }).attr('cx', function (s) {
      var scale = parseFloat(offset.scale.toFixed(12));
      return s.pos_x / s.scale * scale + offset.x;
    }).attr('cy', function (s) {
      var scale = parseFloat(offset.scale.toFixed(12));
      return s.pos_y / s.scale * scale + offset.y;
    }).on('mouseover', function () {
      if (config.comfortmap) return;
      var s_circle = d3__WEBPACK_IMPORTED_MODULE_0__["select"](this),
          s = sensors.find(function (x) {
        return x.id === s_circle.attr('data-id');
      });
      tooltip.transition().duration(200).style('opacity', 0.95);
      setTooltip(d3__WEBPACK_IMPORTED_MODULE_0__["event"].offsetX + tooltipOffsetX, d3__WEBPACK_IMPORTED_MODULE_0__["event"].offsetY - tooltip.node().getBoundingClientRect().height / 2, "<div>ID: ".concat(s.sensor_id, "</div><div>Name: ").concat(s.name ? s.name : '(None)', "</div>"));
    }).on('mousemove', function () {
      if (config.comfortmap) return;
      setTooltip(d3__WEBPACK_IMPORTED_MODULE_0__["event"].offsetX + tooltipOffsetX, d3__WEBPACK_IMPORTED_MODULE_0__["event"].offsetY - tooltip.node().getBoundingClientRect().height / 2);
    }).on('mouseout', function () {
      if (config.comfortmap) return;
      tooltip.transition().duration(200).style('opacity', 0);
    }).on('click', function (s) {
      return canEdit && (sensorClick(s), d3__WEBPACK_IMPORTED_MODULE_0__["event"].stopPropagation());
    }).call(d3__WEBPACK_IMPORTED_MODULE_0__["drag"]().on('drag', sensorDrag).on('end', sensorDragEnd));
  };
  /**
   * Sets the sensor color by status
   * @param {string} id Sensor id
   * @param {string} status Sensor status
   */


  this.setSensorColor = function (id, status) {
    var range = status === 'occupied' ? 1 : 0;
    sensorLayer.select(".sensor[data-id=\"".concat(id, "\"]")).style('fill', sensorColor(range)).attr('stroke', sensorStroke(range));
  };
  /**
   * Sets the floor data of the mapper
   * @param {Object} data Floor data
   */


  this.setData = function (data) {
    _floor = data;
    sensors = _floor.sensors;
    mapLayer.__transform = null;
    this.redraw(true);
  };
  /**
   * Re-draws the floor map (floor plan, sensors, areas)
   * @param {Boolean} fresh Determines if zoom will be reset
   */


  this.redraw = function (fresh) {
    var _this2 = this;

    if (!_floor.floor_plan) {
      imgLayer.selectAll('image').remove();
      sensorLayer.selectAll('.sensor').remove();
      return;
    } // remove zoom


    if (fresh) {
      mapLayer.__transform = null;
      mapLayer.call(zoom.transform, d3__WEBPACK_IMPORTED_MODULE_0__["zoomIdentity"]);
      calcOffsets(function () {
        _this2.drawFloorPlan();

        _this2.drawSensors();
      });
    } else {
      this.drawFloorPlan();
      this.drawSensors();
    }

    this.clearDrawing();
  };
  /**
   * Sets the editing state
   * @param {Boolean} edit Determines if editing is enabled
   */


  this.editMode = function (edit) {
    config.edit = edit;
    this.redraw(false);
  };
  /**
   * Sets the area mapping state (enabled/disabled)
   * @param {Boolean} enable Determines if area mapping is enabled
   */


  this.setAreaMapping = function (enable) {
    if (enable) state.sensorMapping = false;
    state.areaMapping = enable;
    this.redraw(false);
  };
  /**
   * Clears the unsaved area drawn
   */


  this.clearDrawing = function () {
    state.drawing = false;
    drawPoints.splice(0);
  };
  /**
   * Sets the sensor mapping state (enabled/disabled)
   * @param {Boolean} enable Determines if sensor mapping is enabled
   */


  this.setSensorMapping = function (enable) {
    if (enable) state.areaMapping = false;
    state.sensorMapping = enable;
    this.redraw(false);
  }; // render floor plan


  if (_floor && _floor.floor_plan) {
    calcOffsets(function () {
      _this3.drawFloorPlan();

      _this3.drawSensors();
    });
  }

  return this;
}

/* harmony default export */ __webpack_exports__["default"] = (mapper);

/***/ })

}]);