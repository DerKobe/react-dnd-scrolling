"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createHorizontalStrength = createHorizontalStrength;
exports.createVerticalStrength = createVerticalStrength;
exports["default"] = createScrollingComponent;
exports.defaultVerticalStrength = exports.defaultHorizontalStrength = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactDnd = require("react-dnd");

var _reactDom = require("react-dom");

var _lodash = _interopRequireDefault(require("lodash.throttle"));

var _raf = _interopRequireDefault(require("raf"));

var _reactDisplayName = _interopRequireDefault(require("react-display-name"));

var _hoistNonReactStatics = _interopRequireDefault(require("hoist-non-react-statics"));

var _util = require("./util");

var _excluded = ["strengthMultiplier", "verticalStrength", "horizontalStrength", "onScrollChange"];

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var DEFAULT_BUFFER = 150;

function createHorizontalStrength(_buffer) {
  return function defaultHorizontalStrength(_ref, point) {
    var x = _ref.x,
        w = _ref.w,
        y = _ref.y,
        h = _ref.h;
    var buffer = Math.min(w / 2, _buffer);
    var inRange = point.x >= x && point.x <= x + w;
    var inBox = inRange && point.y >= y && point.y <= y + h;

    if (inBox) {
      if (point.x < x + buffer) {
        return (point.x - x - buffer) / buffer;
      } else if (point.x > x + w - buffer) {
        return -(x + w - point.x - buffer) / buffer;
      }
    }

    return 0;
  };
}

function createVerticalStrength(_buffer) {
  return function defaultVerticalStrength(_ref2, point) {
    var y = _ref2.y,
        h = _ref2.h,
        x = _ref2.x,
        w = _ref2.w;
    var buffer = Math.min(h / 2, _buffer);
    var inRange = point.y >= y && point.y <= y + h;
    var inBox = inRange && point.x >= x && point.x <= x + w;

    if (inBox) {
      if (point.y < y + buffer) {
        return (point.y - y - buffer) / buffer;
      } else if (point.y > y + h - buffer) {
        return -(y + h - point.y - buffer) / buffer;
      }
    }

    return 0;
  };
}

var defaultHorizontalStrength = createHorizontalStrength(DEFAULT_BUFFER);
exports.defaultHorizontalStrength = defaultHorizontalStrength;
var defaultVerticalStrength = createVerticalStrength(DEFAULT_BUFFER);
exports.defaultVerticalStrength = defaultVerticalStrength;

function createScrollingComponent(WrappedComponent) {
  var ScrollingComponent = /*#__PURE__*/function (_Component) {
    _inherits(ScrollingComponent, _Component);

    var _super = _createSuper(ScrollingComponent);

    function ScrollingComponent(props, ctx) {
      var _this;

      _classCallCheck(this, ScrollingComponent);

      _this = _super.call(this, props, ctx);

      _defineProperty(_assertThisInitialized(_this), "handleEvent", function (evt) {
        if (_this.dragging && !_this.attached) {
          _this.attach();

          _this.updateScrolling(evt);
        }
      });

      _defineProperty(_assertThisInitialized(_this), "updateScrolling", (0, _lodash["default"])(function (evt) {
        var _this$container$getBo = _this.container.getBoundingClientRect(),
            x = _this$container$getBo.left,
            y = _this$container$getBo.top,
            w = _this$container$getBo.width,
            h = _this$container$getBo.height;

        var box = {
          x: x,
          y: y,
          w: w,
          h: h
        };
        var coords = (0, _util.getCoords)(evt); // calculate strength

        _this.scaleX = _this.props.horizontalStrength(box, coords);
        _this.scaleY = _this.props.verticalStrength(box, coords); // start scrolling if we need to

        if (!_this.frame && (_this.scaleX || _this.scaleY)) {
          _this.startScrolling();
        }
      }, 100, {
        trailing: false
      }));

      _this.scaleX = 0;
      _this.scaleY = 0;
      _this.frame = null;
      _this.attached = false;
      _this.dragging = false;
      return _this;
    }

    _createClass(ScrollingComponent, [{
      key: "componentDidMount",
      value: function componentDidMount() {
        var _this2 = this;

        this.container = (0, _reactDom.findDOMNode)(this.wrappedInstance);
        this.container.addEventListener('dragover', this.handleEvent); // touchmove events don't seem to work across siblings, so we unfortunately
        // have to attach the listeners to the body

        window.document.body.addEventListener('touchmove', this.handleEvent);
        this.clearMonitorSubscription = this.context.dragDropManager.getMonitor().subscribeToStateChange(function () {
          return _this2.handleMonitorChange();
        });
      }
    }, {
      key: "componentWillUnmount",
      value: function componentWillUnmount() {
        this.container.removeEventListener('dragover', this.handleEvent);
        window.document.body.removeEventListener('touchmove', this.handleEvent);
        this.clearMonitorSubscription();
        this.stopScrolling();
      }
    }, {
      key: "handleMonitorChange",
      value: function handleMonitorChange() {
        var isDragging = this.context.dragDropManager.getMonitor().isDragging();

        if (!this.dragging && isDragging) {
          this.dragging = true;
        } else if (this.dragging && !isDragging) {
          this.dragging = false;
          this.stopScrolling();
        }
      }
    }, {
      key: "attach",
      value: function attach() {
        this.attached = true;
        window.document.body.addEventListener('dragover', this.updateScrolling);
        window.document.body.addEventListener('touchmove', this.updateScrolling);
      }
    }, {
      key: "detach",
      value: function detach() {
        this.attached = false;
        window.document.body.removeEventListener('dragover', this.updateScrolling);
        window.document.body.removeEventListener('touchmove', this.updateScrolling);
      } // Update scaleX and scaleY every 100ms or so
      // and start scrolling if necessary

    }, {
      key: "startScrolling",
      value: function startScrolling() {
        var _this3 = this;

        var i = 0;

        var tick = function tick() {
          var scaleX = _this3.scaleX,
              scaleY = _this3.scaleY,
              container = _this3.container;
          var _this3$props = _this3.props,
              strengthMultiplier = _this3$props.strengthMultiplier,
              onScrollChange = _this3$props.onScrollChange; // stop scrolling if there's nothing to do

          if (strengthMultiplier === 0 || scaleX + scaleY === 0) {
            _this3.stopScrolling();

            return;
          } // there's a bug in safari where it seems like we can't get
          // mousemove events from a container that also emits a scroll
          // event that same frame. So we double the strengthMultiplier and only adjust
          // the scroll position at 30fps


          if (i++ % 2) {
            var scrollLeft = container.scrollLeft,
                scrollTop = container.scrollTop,
                scrollWidth = container.scrollWidth,
                scrollHeight = container.scrollHeight,
                clientWidth = container.clientWidth,
                clientHeight = container.clientHeight;
            var newLeft = scaleX ? container.scrollLeft = (0, _util.intBetween)(0, scrollWidth - clientWidth, scrollLeft + scaleX * strengthMultiplier) : scrollLeft;
            var newTop = scaleY ? container.scrollTop = (0, _util.intBetween)(0, scrollHeight - clientHeight, scrollTop + scaleY * strengthMultiplier) : scrollTop;
            onScrollChange(newLeft, newTop);
          }

          _this3.frame = (0, _raf["default"])(tick);
        };

        tick();
      }
    }, {
      key: "stopScrolling",
      value: function stopScrolling() {
        this.detach();
        this.scaleX = 0;
        this.scaleY = 0;

        if (this.frame) {
          _raf["default"].cancel(this.frame);

          this.frame = null;
        }
      }
    }, {
      key: "render",
      value: function render() {
        var _this4 = this;

        var _this$props = this.props,
            strengthMultiplier = _this$props.strengthMultiplier,
            verticalStrength = _this$props.verticalStrength,
            horizontalStrength = _this$props.horizontalStrength,
            onScrollChange = _this$props.onScrollChange,
            props = _objectWithoutProperties(_this$props, _excluded);

        return /*#__PURE__*/_react["default"].createElement(WrappedComponent, _extends({
          ref: function ref(_ref3) {
            if (_this4.props.ref) {
              _this4.props.ref(_ref3);
            }

            _this4.wrappedInstance = _ref3;
          }
        }, props));
      }
    }]);

    return ScrollingComponent;
  }(_react.Component);

  _defineProperty(ScrollingComponent, "displayName", "Scrolling(".concat((0, _reactDisplayName["default"])(WrappedComponent), ")"));

  _defineProperty(ScrollingComponent, "propTypes", {
    onScrollChange: _propTypes["default"].func,
    verticalStrength: _propTypes["default"].func,
    horizontalStrength: _propTypes["default"].func,
    strengthMultiplier: _propTypes["default"].number,
    ref: _propTypes["default"].func
  });

  _defineProperty(ScrollingComponent, "defaultProps", {
    onScrollChange: _util.noop,
    verticalStrength: defaultVerticalStrength,
    horizontalStrength: defaultHorizontalStrength,
    strengthMultiplier: 30
  });

  _defineProperty(ScrollingComponent, "contextType", _reactDnd.DndContext);

  return (0, _hoistNonReactStatics["default"])(ScrollingComponent, WrappedComponent);
}