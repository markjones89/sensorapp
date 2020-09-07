(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["js/views/config/mapper~js/views/insights/live-view"],{

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
  var _this2 = this;

  var container = d3__WEBPACK_IMPORTED_MODULE_0__["select"](wrapper),
      rect = container.node().getBoundingClientRect(),
      parentRect = container.node().parentNode.getBoundingClientRect();
  var config_defaults = {
    edit: false
  };
  var maxWidth = rect.width || parentRect.width,
      maxHeight = rect.height || parentRect.height;
  var width = 800,
      height = 487;
  var floor = data,
      sensors = floor.sensors || [],
      areas = floor.areas || [],
      config = Object(_helpers__WEBPACK_IMPORTED_MODULE_1__["extend"])(config_defaults, options),
      //{ edit: false },
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
      drawPoints = []; // events = options.callbacks//{ sensorClick: null }

  var xDMax = 50.0,
      yDMax = 33.79,
      x = d3__WEBPACK_IMPORTED_MODULE_0__["scaleLinear"]().domain([0, xDMax]).range([0, width]),
      y = d3__WEBPACK_IMPORTED_MODULE_0__["scaleLinear"]().domain([0, yDMax]).range([0, height]),
      _ = this;

  var sensorColor = d3__WEBPACK_IMPORTED_MODULE_0__["scaleOrdinal"]().domain([0, 1, 2]).range(['#01FE01', '#FF8600', '#ED0003']),
      sensorStroke = d3__WEBPACK_IMPORTED_MODULE_0__["scaleOrdinal"]().domain([0, 1, 2]).range(['rgba(1,254,1,0.3)', 'rgba(255,134,0,0.3)', 'rgba(237,0,3,0.3)']);
  console.log('colors', sensorColor(0), sensorStroke(0));
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
      return config.events && config.events.sensorAdd && config.events.sensorAdd.call(_, {
        x: _x,
        y: _y,
        scale: offset.scale,
        area: area
      });
    } else if (state.areaMapping) {
      var point = {
        x: t ? (evt.offsetX - t.x) / t.k : evt.offsetX,
        y: t ? (evt.offsetY - t.y) / t.k : evt.offsetY
      },
          drawLayer = areaLayer.select('g.area-draw');
      if (drawLayer.empty()) startAreaDraw(point);else addPoint(drawLayer, point);
    }
  }); // set wrapper to inline-block
  // container.style('display', 'inline-block')

  var mapLayer = svg.selectAll('.map-layer').data([0]).enter().append('g').attr('class', 'map-layer');
  var imgLayer = mapLayer.append('g').attr('class', 'image-layer');
  var areaLayer = mapLayer.append('g').attr('class', 'area-layer');
  var sensorLayer = mapLayer.append('g').attr('class', 'sensor-layer');
  var zoom = d3__WEBPACK_IMPORTED_MODULE_0__["zoom"]().scaleExtent([1, 8]).on('zoom', function () {
    mapLayer.__transform = d3__WEBPACK_IMPORTED_MODULE_0__["event"].transform;
    var minXTranslate = (1 - mapLayer.__transform.k) * (x.range()[1] - x.range()[0]),
        minYTranslate = (1 - mapLayer.__transform.k) * (y.range()[1] - y.range()[0]);
    mapLayer.__transform.x = Math.min(x.range()[0], Math.max(mapLayer.__transform.x, minXTranslate));
    mapLayer.__transform.y = Math.min(y.range()[0], Math.max(mapLayer.__transform.y, minYTranslate)); // mapLayer.attr('transform', mapLayer.__transform)

    imgLayer.attr('transform', mapLayer.__transform);
    sensorLayer.attr('transform', mapLayer.__transform);
    areaLayer.attr('transform', mapLayer.__transform);
  });
  mapLayer.call(zoom).on('mousemove', function () {
    if (!state.drawing) return;
    var drawLayer = areaLayer.select('g.area-draw');
    drawLayer.select('line').remove();

    var lastPoint = drawPoints[drawPoints.length - 1],
        evt = d3__WEBPACK_IMPORTED_MODULE_0__["event"],
        t = mapLayer.__transform,
        _x = t ? (evt.offsetX - t.x) / t.k : evt.offsetX,
        _y = t ? (evt.offsetY - t.y) / t.k : evt.offsetY;

    drawLayer.insert('line', ':nth-child(2)').attr('x1', lastPoint.x).attr('y1', lastPoint.y).attr('x2', _x).attr('y2', _y).attr('stroke', '#53DBF3').attr('stroke-width', 1).style('pointer-events', 'none');
  });
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
    var img = new Image();
    img.src = src;

    img.onload = function () {
      var diff = {
        h: maxHeight - img.height,
        w: maxWidth - img.width
      },
          scale = diff.h < diff.w ? maxHeight / img.height : maxWidth / img.width,
          canvasWidth = Math.min(img.width * scale, img.width),
          canvasHeight = Math.min(img.height * scale, img.height);
      setSize(canvasWidth, canvasHeight);
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
  /**
   * Sets the tooltip position
   * @param {number} x Position on x-axis
   * @param {number} y Position on y-axis
   * @param {string} content Tooltip content
   */


  function setTooltip(x, y, content) {
    if (content) tooltip.html(content);
    tooltip.style('left', "".concat(x, "px")).style('top', "".concat(y, "px"));
  } // function floorClick() {
  //     let t = mapLayer.__transform, evt = d3.event,
  //         _x = t ? (evt.offsetX - t.x) / t.k : evt.offsetX,
  //         _y = t ? (evt.offsetY - t.y) / t.k : evt.offsetY
  //     if ((t && t.z === 1) || !t) {
  //         _x -= offset.x
  //         _y -= offset.y
  //     }
  //     if (state.sensorMapping) {
  //         return events.sensorAdd && events.sensorAdd.call(_, { x: _x, y: _y, scale: offset.scale })
  //     } else if (state.areaMapping) {
  //         let point = {
  //             x: t ? (evt.offsetX - t.x) / t.k : evt.offsetX,
  //             y: t ? (evt.offsetY - t.y) / t.k : evt.offsetY
  //         },
  //             drawLayer = areaLayer.select('g.area-draw')
  //         if (drawLayer.empty()) startAreaDraw(point)
  //         else addPoint(drawLayer, point)
  //     }
  // }

  /* area mapping functions */


  function startAreaDraw(point) {
    state.drawing = true;
    var drawLayer = areaLayer.append('g').attr('class', 'area-draw');
    addPoint(drawLayer, point);
  }

  function addPoint(drawLayer, point) {
    drawPoints.push(point);
    drawLayer.select('polyline').remove(); // draw line

    drawLayer.insert('polyline', ':first-child').data(drawPoints).attr('points', function () {
      return drawPoints.map(function (p) {
        return [p.x, p.y].join(',');
      }).join(' ');
    }).style('fill', 'none').attr('stroke', '#53DBF3');
    drawLayer.append('circle').attr('cx', point.x).attr('cy', point.y).attr('r', 4).attr('fill', '#FFEB3B').attr('stroke', '#53DBF3') // .attr('is-handle', 'true')
    .style('cursor', 'pointer').on('click', function () {
      return endAreaDraw();
    });
  }

  function toPointsDisp(points, scale) {
    return points.map(function (p) {
      var c_scale = parseFloat(offset.scale.toFixed(12)); //current scale

      return [p.x / scale * c_scale + offset.x, p.y / scale * c_scale + offset.y].join(',');
    }).join(' ');
  }

  function toPointsSave(points) {
    return points.map(function (p) {
      return [p.x - offset.x, p.y - offset.y].join(',');
    }).join(' ');
  }

  function toPolyPoints(points) {
    return points.map(function (p) {
      return [p.x, p.y].join(',');
    }).join(' ');
  }

  function addPoly(points, area) {
    var ag = areaLayer.append('g').attr('class', area ? 'area' : 'area unsaved');
    var canEdit = config.edit && state.areaMapping,
        poly = ag.append('polygon') //.data(points)
    .attr('points', area ? toPointsDisp(points, area.scale) : toPolyPoints(points)).style('fill', '#53DBF3').style('opacity', 0.2).style('cursor', function () {
      return canEdit ? 'move' : state.sensorMapping ? 'crosshair' : 'default';
    }).on('click', function (a) {
      return canEdit && (polyClick(area), d3__WEBPACK_IMPORTED_MODULE_0__["event"].stopPropagation());
    }).on('mouseover', function (a) {
      if (state.sensorMapping) return;
      tooltip.transition().duration(200).style('opacity', 0.9);
      setTooltip(d3__WEBPACK_IMPORTED_MODULE_0__["event"].offsetX + tooltipOffsetX, d3__WEBPACK_IMPORTED_MODULE_0__["event"].offsetY - tooltip.node().getBoundingClientRect().height / 2, area.name);
    }).on('mousemove', function () {
      if (state.polyMoved || state.sensorMapping) return;
      setTooltip(d3__WEBPACK_IMPORTED_MODULE_0__["event"].offsetX + tooltipOffsetX, d3__WEBPACK_IMPORTED_MODULE_0__["event"].offsetY - tooltip.node().getBoundingClientRect().height / 2);
    }).on('mouseout', function () {
      tooltip.transition().duration(200).style('opacity', 0);
    }).call(d3__WEBPACK_IMPORTED_MODULE_0__["drag"]().on('drag', polyDrag).on('end', polyDragEnd));

    if (area) {
      ag.data([area]); // poly.append("svg:title")
      //     .text(area.name)
    }

    if (!canEdit) return;
    ag.selectAll('circles').data(points).enter().append('circle').attr('cx', function (d) {
      return area ? d.x / area.scale * parseFloat(offset.scale.toFixed(12)) + offset.x : d.x;
    }).attr('cy', function (d) {
      return area ? d.y / area.scale * parseFloat(offset.scale.toFixed(12)) + offset.y : d.y;
    }).attr('r', 4).attr('fill', '#FFEB3B').attr('stroke', '#53DBF3') // .attr('fill', 'none').attr('stroke', '#8bc34a').attr('stroke-width', 2)
    .style('cursor', 'move').call(d3__WEBPACK_IMPORTED_MODULE_0__["drag"]().on('drag', polyPointDrag).on('end', polyPointDragEnd));
  }

  function polyClick(a) {
    return config.events && config.events.areaClick && config.events.areaClick.call(_, a);
  }

  function polyDrag() {
    if (config.edit && state.areaMapping) {
      var _d3$event = d3__WEBPACK_IMPORTED_MODULE_0__["event"],
          dx = _d3$event.dx,
          dy = _d3$event.dy,
          poly = d3__WEBPACK_IMPORTED_MODULE_0__["select"](this),
          circles = d3__WEBPACK_IMPORTED_MODULE_0__["select"](this.parentNode).selectAll('circle'),
          circle,
          newPoints = [],
          areaData = d3__WEBPACK_IMPORTED_MODULE_0__["select"](this.parentNode).data()[0];
      state.polyMoved = dx !== 0 || dy !== 0;
      circles.each(function (cd) {
        circle = d3__WEBPACK_IMPORTED_MODULE_0__["select"](this);
        cd.x += dx;
        cd.y += dy;
        circle.attr('cx', function (d) {
          return areaData ? cd.x / areaData.scale * parseFloat(offset.scale.toFixed(12)) + offset.x : cd.x;
        }).attr('cy', function (d) {
          return areaData ? cd.y / areaData.scale * parseFloat(offset.scale.toFixed(12)) + offset.y : cd.y;
        });
        newPoints.push({
          x: cd.x,
          y: cd.y
        });
      });
      poly.attr('points', toPointsDisp(newPoints, areaData.scale));
    }
  }

  function polyDragEnd() {
    if (config.edit && state.areaMapping) {
      var areaData = d3__WEBPACK_IMPORTED_MODULE_0__["select"](this.parentNode).data()[0],
          circles = d3__WEBPACK_IMPORTED_MODULE_0__["select"](this.parentNode).selectAll('circle'),
          newPoints = [];
      if (!state.polyMoved) return;
      state.polyMoved = false;
      circles.each(function (cd) {
        return newPoints.push({
          x: cd.x,
          y: cd.y
        });
      });
      var polyPoints = toPolyPoints(newPoints);
      return config.events && config.events.areaPtUpdate && config.events.areaPtUpdate.call(_, areaData === 0 ? null : areaData, polyPoints, offset.scale);
    }
  }

  function polyPointDrag(d) {
    // if (state.drawing) return
    d.dragged = true;
    var evt = d3__WEBPACK_IMPORTED_MODULE_0__["event"],
        dragPoint = d3__WEBPACK_IMPORTED_MODULE_0__["select"](this),
        newPoints = [],
        poly = d3__WEBPACK_IMPORTED_MODULE_0__["select"](this.parentNode).select('polygon'),
        circles = d3__WEBPACK_IMPORTED_MODULE_0__["select"](this.parentNode).selectAll('circle'),
        areaData = d3__WEBPACK_IMPORTED_MODULE_0__["select"](this.parentNode).data()[0];
    dragPoint.attr('cx', evt.x + offset.x).attr('cy', evt.y + offset.y);
    d.x += evt.dx;
    d.y += evt.dy;
    circles.each(function (cd) {
      return newPoints.push({
        x: cd.x,
        y: cd.y
      });
    });
    poly.attr('points', toPointsDisp(newPoints, areaData.scale));
  }

  function polyPointDragEnd(d) {
    if (!d.dragged) return;
    d.dragged = false;
    var newPoints = [],
        // poly = d3.select(this.parentNode).select('polygon'),
    circles = d3__WEBPACK_IMPORTED_MODULE_0__["select"](this.parentNode).selectAll('circle'),
        areaData = d3__WEBPACK_IMPORTED_MODULE_0__["select"](this.parentNode).data()[0];
    circles.each(function (cd) {
      return newPoints.push({
        x: cd.x,
        y: cd.y
      });
    });
    var polyPoints = toPolyPoints(newPoints);
    return config.events && config.events.areaPtUpdate && config.events.areaPtUpdate.call(_, areaData === 0 ? null : areaData, polyPoints, offset.scale);
  }

  function endAreaDraw() {
    areaLayer.select('g.area-draw').remove();
    var polyPoints = toPointsSave(drawPoints, true, offset.scale);
    addPoly(drawPoints);
    drawPoints.splice(0);
    state.drawing = false;
    return config.events && config.events.addArea && config.events.addArea.call(_, polyPoints, offset.scale);
  }
  /* end area mapping functions */

  /* sensor functions */


  function sensorClick(s) {
    return config.events && config.events.sensorClick && config.events.sensorClick.call(_, s);
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
      return config.events && config.events.sensorMoved && config.events.sensorMoved.call(_, s);
    }
  }
  /* end sensor functions */

  /**
   * Renders the floor plan image
   */


  this.drawFloorPlan = function () {
    imgLayer.selectAll('image').remove();
    if (mapLayer.__transform) imgLayer.attr('transform', mapLayer.__transform);

    if (floor.floor_plan) {
      var canClick = config.edit && (state.sensorMapping || state.areaMapping);
      imgLayer.insert('image', ':first-child').attr('xlink:href', floor.floor_plan_url).attr('height', y(0 + yDMax) - y(0)).attr('width', x(0 + xDMax) - x(0)).style('cursor', function () {
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
      return d.hid;
    }).attr('r', '5').attr('stroke-width', 5).attr('stroke', sensorStroke(0)).style('fill', sensorColor(0)).style('cursor', function () {
      return canEdit ? 'move' : 'default';
    }).attr('cx', function (s) {
      var scale = parseFloat(offset.scale.toFixed(12));
      return s.pos_x / s.scale * scale + offset.x;
    }).attr('cy', function (s) {
      var scale = parseFloat(offset.scale.toFixed(12));
      return s.pos_y / s.scale * scale + offset.y;
    }).on('mouseover', function () {
      var s_circle = d3__WEBPACK_IMPORTED_MODULE_0__["select"](this),
          s = sensors.find(function (x) {
        return x.hid === s_circle.attr('data-id');
      });
      tooltip.transition().duration(200).style('opacity', 0.95);
      setTooltip(d3__WEBPACK_IMPORTED_MODULE_0__["event"].offsetX + tooltipOffsetX, d3__WEBPACK_IMPORTED_MODULE_0__["event"].offsetY - tooltip.node().getBoundingClientRect().height / 2, "<div>ID: ".concat(s.sensor_id, "</div><div>Name: ").concat(s.name ? s.name : '(None)', "</div>"));
    }).on('mousemove', function () {
      setTooltip(d3__WEBPACK_IMPORTED_MODULE_0__["event"].offsetX + tooltipOffsetX, d3__WEBPACK_IMPORTED_MODULE_0__["event"].offsetY - tooltip.node().getBoundingClientRect().height / 2);
    }).on('mouseout', function () {
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
   * Renders all area polygons
   */


  this.drawAreas = function () {
    areaLayer.selectAll('g.area').remove(); //clear

    if (mapLayer.__transform) areaLayer.attr('transform', mapLayer.__transform);
    if (areas.length === 0) return;
    areas.forEach(function (a) {
      return addPoly(a.poly_points, a);
    });
  };
  /**
   * Sets the floor data of the mapper
   * @param {Object} data Floor data
   */


  this.setData = function (data) {
    floor = data;
    sensors = floor.sensors;
    areas = floor.areas;
    mapLayer.__transform = null;
    this.redraw(true);
  };
  /**
   * Re-draws the floor map (floor plan, sensors, areas)
   * @param {Boolean} fresh Determines if zoom will be reset
   */


  this.redraw = function (fresh) {
    var _this = this;

    // remove zoom
    if (fresh) {
      mapLayer.__transform = null;
      mapLayer.call(zoom.transform, d3__WEBPACK_IMPORTED_MODULE_0__["zoomIdentity"]);
    }

    this.clearDrawing();
    calcOffsets(function () {
      _this.drawFloorPlan();

      _this.drawAreas();

      _this.drawSensors();
    });
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
    areaLayer.select('g.area-draw').remove();
    areaLayer.select('g.area.unsaved').remove();
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


  if (floor) {
    calcOffsets(function () {
      _this2.drawFloorPlan();

      _this2.drawAreas();

      _this2.drawSensors();
    });
  }

  return this;
}

/* harmony default export */ __webpack_exports__["default"] = (mapper);

/***/ })

}]);