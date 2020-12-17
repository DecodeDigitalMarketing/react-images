import React, { Component, cloneElement, Children } from 'react';
import { findDOMNode, createPortal } from 'react-dom';
import glam from 'glam';
import rafScheduler from 'raf-schd';
import { ViewPager, Frame, Track, View as View$2 } from 'react-view-pager';
import ParseHtml from 'html-react-parser';
import { FocusOn } from 'react-focus-on';
import Fullscreen from 'react-full-screen';
import focusStore from 'a11y-focus-store';
import { Transition, TransitionGroup } from 'react-transition-group';

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

var defineProperty = function (obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
};

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};

var objectWithoutProperties = function (obj, keys) {
  var target = {};

  for (var i in obj) {
    if (keys.indexOf(i) >= 0) continue;
    if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
    target[i] = obj[i];
  }

  return target;
};

var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

function calculateProgress(_ref) {
  var currentTime = _ref.currentTime,
      duration = _ref.duration;

  return 100 / duration * currentTime;
}

var View = function (_Component) {
  inherits(View, _Component);

  function View() {
    var _ref3;

    var _temp, _this, _ret;

    classCallCheck(this, View);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = possibleConstructorReturn(this, (_ref3 = View.__proto__ || Object.getPrototypeOf(View)).call.apply(_ref3, [this].concat(args))), _this), _this.state = { paused: true, progress: 0 }, _this.handlePlay = function () {
      _this.setState({ paused: false });
    }, _this.handleTimeUpdate = rafScheduler(function () {
      var progress = calculateProgress({
        currentTime: _this.video.currentTime,
        duration: _this.video.duration
      });

      _this.setState({ progress: progress });
    }), _this.handlePause = function () {
      _this.setState({ paused: true });
    }, _this.getVideo = function (ref) {
      _this.video = ref;
    }, _temp), possibleConstructorReturn(_this, _ret);
  }

  createClass(View, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          data = _props.data,
          interactionIsIdle = _props.interactionIsIdle;
      var progress = this.state.progress;

      return glam(
        'div',
        {
          css: {
            backgroundColor: 'black',
            lineHeight: 0,
            marginLeft: 'auto',
            marginRight: 'auto',
            maxWidth: '100%',
            position: 'relative',
            textAlign: 'center'
          }
        },
        glam('iframe', { width: '560', height: '315', src: data.videoSrc, frameBorder: '0', allow: 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture', allowFullScreen: true })
      );
    }
  }]);
  return View;
}(Component);

var Base = function Base(_ref) {
  var css = _ref.css,
      innerRef = _ref.innerRef,
      Tag = _ref.tag,
      props = objectWithoutProperties(_ref, ['css', 'innerRef', 'tag']);
  return glam(Tag, _extends({
    ref: innerRef,
    css: _extends({
      boxSizing: 'border-box'
    }, css)
  }, props));
};
var Button = function Button(props) {
  return glam(Base, _extends({ tag: 'button' }, props));
};
var Div = function Div(props) {
  return glam(Base, _extends({ tag: 'div' }, props));
};
var Img = function Img(props) {
  return glam(Base, _extends({ tag: 'img' }, props));
};
var Nav = function Nav(props) {
  return glam(Base, _extends({ tag: 'nav' }, props));
};
var Span = function Span(props) {
  return glam(Base, _extends({ tag: 'span' }, props));
};

// ==============================
// Class Name Prefixer
// ==============================

var CLASS_PREFIX = 'react-images';

/**
 String representation of component state for styling with class names.

 Expects an array of strings OR a string/object pair:
 - className(['comp', 'comp-arg', 'comp-arg-2'])
   @returns 'react-images__comp react-images__comp-arg react-images__comp-arg-2'
 - className('comp', { some: true, state: false })
   @returns 'react-images__comp react-images__comp--some'
*/
function className(name, state) {
  var arr = Array.isArray(name) ? name : [name];

  // loop through state object, remove falsey values and combine with name
  if (state && typeof name === 'string') {
    for (var _key in state) {
      if (state.hasOwnProperty(_key) && state[_key]) {
        arr.push(name + '--' + _key);
      }
    }
  }

  // prefix everything and return a string
  return arr.map(function (cn) {
    return CLASS_PREFIX + '__' + cn;
  }).join(' ');
}

// ==============================
// Touch Capability Detector
// ==============================

function isTouch() {
  try {
    document.createEvent('TouchEvent');
    return true;
  } catch (e) {
    return false;
  }
}

var containerCSS = function containerCSS(_ref) {
  var isFullscreen = _ref.isFullscreen;
  return {
    backgroundColor: isFullscreen ? 'black' : null,
    display: 'flex ',
    flexDirection: 'column',
    height: '100%'
  };
};

var Container = function Container(props) {
  var children = props.children,
      getStyles = props.getStyles,
      isFullscreen = props.isFullscreen,
      isModal = props.isModal,
      innerProps = props.innerProps;

  return glam(
    Div,
    _extends({
      css: getStyles('container', props),
      className: className('container', { isFullscreen: isFullscreen, isModal: isModal })
    }, innerProps),
    children
  );
};

var smallDevice = '@media (max-width: 769px)';

/**
 * Used to get the HTML class to select specific components.
 * We call `className()` in utils with each of these to get the full className,
 * with prefixes.
 */
var componentBaseClassNames = {
  Header: 'header',
  Footer: 'footer',
  View: 'view',
  Track: 'track',
  Positioner: 'positioner'
};

var footerCSS = function footerCSS(_ref) {
  var isModal = _ref.isModal,
      interactionIsIdle = _ref.interactionIsIdle;
  return defineProperty({
    alignItems: 'top',
    bottom: isModal ? 0 : null,
    color: isModal ? 'rgba(255, 255, 255, 0.9)' : '#666',
    display: 'flex ',
    flex: '0 0 auto',
    fontSize: 13,
    justifyContent: 'space-between',
    left: isModal ? 0 : null,
    opacity: interactionIsIdle && isModal ? 0 : 1,
    padding: isModal ? '30px 20px 20px' : '10px 0',
    position: isModal ? 'absolute' : null,
    right: isModal ? 0 : null,
    transform: isModal ? 'translateY(' + (interactionIsIdle ? 10 : 0) + 'px)' : null,
    transition: 'opacity 300ms, transform 300ms',
    zIndex: isModal ? 1 : null,

    '& *:focus': {
      outline: '1.5px solid orange'
    }

  }, smallDevice, {
    padding: isModal ? '20px 15px 15px' : '5px 0'
  });
};

var footerBaseClassName = componentBaseClassNames.Footer;

var Footer = function Footer(props) {
  var components = props.components,
      getStyles = props.getStyles,
      innerProps = props.innerProps,
      isFullscreen = props.isFullscreen,
      isModal = props.isModal;


  var style = isModal ? { background: 'linear-gradient(rgba(0,0,0,0), rgba(0,0,0,0.33))' } : null;

  var state = { isFullscreen: isFullscreen, isModal: isModal };
  var cn = {
    container: className(footerBaseClassName, state),
    caption: className('footer__caption', state),
    count: className('footer__count', state)
  };
  var css = {
    container: getStyles(footerBaseClassName, props),
    caption: getStyles('footerCaption', props),
    count: getStyles('footerCount', props)
  };
  var Caption = components.Caption,
      Count = components.Count;


  return glam(
    Div,
    _extends({
      css: css.container,
      className: cn.container
      // TODO glam prefixer fails on gradients
      // https://github.com/threepointone/glam/issues/35
      , style: style
    }, innerProps),
    glam(Caption, props),
    glam(FooterSocial, props)
  );
};

// ==============================
// Inner Elements
// ==============================

var footerCaptionCSS = function footerCaptionCSS() {
  return {};
};

var FooterCaption = function FooterCaption(props) {
  var currentView = props.currentView,
      getStyles = props.getStyles,
      isFullscreen = props.isFullscreen,
      isModal = props.isModal;
  var caption = currentView.caption;

  var state = { isFullscreen: isFullscreen, isModal: isModal };

  return glam(
    Span,
    {
      css: getStyles('footerCaption', props),
      className: className('footer__caption', state)
    },
    typeof caption === 'string' ? ParseHtml('<span>' + caption + '</span>') : caption
  );
};

var FooterSocial = function FooterSocial(props) {
  var currentView = props.currentView;
  var social = currentView.social;


  return glam(
    Span,
    { className: 'social-links' },
    glam(
      'a',
      {
        href: social.fb,
        target: '_blank',
        rel: 'noreferrer'
      },
      glam(
        'svg',
        { height: '50px', viewBox: '0 0 24 24', width: '24' },
        glam('path', {
          d: 'm22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z',
          fill: '#fff'
        })
      )
    ),
    glam(
      'a',
      {
        href: social.ig,
        target: '_blank',
        rel: 'noreferrer'
      },
      glam(
        'svg',
        { height: '50px', viewBox: '0 0 24 24', width: '24' },
        glam('path', {
          d: 'm12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948s.014 3.668.072 4.948c.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072s3.668-.014 4.948-.072c4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948s-.014-3.667-.072-4.947c-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z',
          fill: '#fff'
        })
      )
    ),
    glam(
      'a',
      {
        href: social.tw,
        target: '_blank',
        rel: 'noreferrer'
      },
      glam(
        'svg',
        { height: '50px', viewBox: '0 0 24 24', width: '24' },
        glam('path', {
          d: 'm24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z',
          fill: '#fff'
        })
      )
    )
  );
};

var footerCountCSS = function footerCountCSS() {
  return { flexShrink: 0, marginLeft: '1em' };
};

var FooterCount = function FooterCount(props) {
  var currentIndex = props.currentIndex,
      getStyles = props.getStyles,
      isFullscreen = props.isFullscreen,
      isModal = props.isModal,
      views = props.views;

  var state = { isFullscreen: isFullscreen, isModal: isModal };
  var activeView = currentIndex + 1;
  var totalViews = views.length;

  if (!activeView || !totalViews) return null;

  return glam(
    Span,
    {
      css: getStyles('footerCount', props),
      className: className('footer__count', state)
    },
    activeView,
    ' of ',
    totalViews
  );
};

var Svg = function Svg(_ref) {
  var size = _ref.size,
      props = objectWithoutProperties(_ref, ['size']);
  return glam('svg', _extends({
    role: 'presentation',
    viewBox: '0 0 24 24',
    css: {
      display: 'inline-block',
      fill: 'currentColor',
      height: size,
      stroke: 'currentColor',
      strokeWidth: 0,
      width: size
    }
  }, props));
};

var ChevronLeft = function ChevronLeft(_ref2) {
  var _ref2$size = _ref2.size,
      size = _ref2$size === undefined ? 32 : _ref2$size,
      props = objectWithoutProperties(_ref2, ['size']);
  return glam(
    Svg,
    _extends({ size: size }, props),
    glam('path', { d: 'M15.422 16.078l-1.406 1.406-6-6 6-6 1.406 1.406-4.594 4.594z' })
  );
};
var ChevronRight = function ChevronRight(_ref3) {
  var _ref3$size = _ref3.size,
      size = _ref3$size === undefined ? 32 : _ref3$size,
      props = objectWithoutProperties(_ref3, ['size']);
  return glam(
    Svg,
    _extends({ size: size }, props),
    glam('path', { d: 'M9.984 6l6 6-6 6-1.406-1.406 4.594-4.594-4.594-4.594z' })
  );
};
var Close = function Close(_ref4) {
  var _ref4$size = _ref4.size,
      size = _ref4$size === undefined ? 32 : _ref4$size,
      props = objectWithoutProperties(_ref4, ['size']);
  return glam(
    Svg,
    _extends({ size: size }, props),
    glam('path', { d: 'M18.984 6.422l-5.578 5.578 5.578 5.578-1.406 1.406-5.578-5.578-5.578 5.578-1.406-1.406 5.578-5.578-5.578-5.578 1.406-1.406 5.578 5.578 5.578-5.578z' })
  );
};
var FullscreenEnter = function FullscreenEnter(_ref5) {
  var _ref5$size = _ref5.size,
      size = _ref5$size === undefined ? 32 : _ref5$size,
      props = objectWithoutProperties(_ref5, ['size']);
  return glam(
    Svg,
    _extends({ size: size }, props),
    glam('path', { d: 'M14.016 5.016h4.969v4.969h-1.969v-3h-3v-1.969zM17.016 17.016v-3h1.969v4.969h-4.969v-1.969h3zM5.016 9.984v-4.969h4.969v1.969h-3v3h-1.969zM6.984 14.016v3h3v1.969h-4.969v-4.969h1.969z' })
  );
};
var FullscreenExit = function FullscreenExit(_ref6) {
  var _ref6$size = _ref6.size,
      size = _ref6$size === undefined ? 32 : _ref6$size,
      props = objectWithoutProperties(_ref6, ['size']);
  return glam(
    Svg,
    _extends({ size: size }, props),
    glam('path', { d: 'M15.984 8.016h3v1.969h-4.969v-4.969h1.969v3zM14.016 18.984v-4.969h4.969v1.969h-3v3h-1.969zM8.016 8.016v-3h1.969v4.969h-4.969v-1.969h3zM5.016 15.984v-1.969h4.969v4.969h-1.969v-3h-3z' })
  );
};

var headerCSS = function headerCSS(_ref) {
  var interactionIsIdle = _ref.interactionIsIdle;
  return {
    alignItems: 'center',
    display: 'flex ',
    flex: '0 0 auto',
    justifyContent: 'space-between',
    opacity: interactionIsIdle ? 0 : 1,
    padding: 10,
    paddingBottom: 20,
    position: 'absolute',
    transform: 'translateY(' + (interactionIsIdle ? -10 : 0) + 'px)',
    transition: 'opacity 300ms, transform 300ms',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
    '& *:focus': {
      outline: '1.5px solid orange'
    }
  };
};

var headerBaseClassName = componentBaseClassNames.Header;

var Header = function Header(props) {
  var components = props.components,
      getStyles = props.getStyles,
      getCloseLabel = props.getCloseLabel,
      getFullscreenLabel = props.getFullscreenLabel,
      innerProps = props.innerProps,
      isModal = props.isModal,
      modalProps = props.modalProps;


  if (!isModal) return null;

  var allowFullscreen = modalProps.allowFullscreen,
      isFullscreen = modalProps.isFullscreen,
      onClose = modalProps.onClose,
      toggleFullscreen = modalProps.toggleFullscreen;

  var FsIcon = isFullscreen ? FullscreenExit : FullscreenEnter;
  var FooterCount = components.FooterCount,
      CloseButton = components.CloseButton,
      FullscreenButton = components.FullscreenButton;

  var state = { isFullscreen: isFullscreen, isModal: isModal };

  return glam(
    Div,
    _extends({
      css: getStyles(headerBaseClassName, props),
      className: className(headerBaseClassName, state)
      // TODO glam prefixer fails on gradients
      // https://github.com/threepointone/glam/issues/35
      , style: {
        background: 'linear-gradient(rgba(0,0,0,0.33), rgba(0,0,0,0))'
      }
    }, innerProps),
    glam(
      'span',
      null,
      glam(FooterCount, props)
    ),
    glam(
      'span',
      null,
      allowFullscreen ? glam(
        FullscreenButton,
        {
          getStyles: getStyles,
          innerProps: {
            onClick: toggleFullscreen,
            title: getFullscreenLabel(state)
          }
        },
        glam(FsIcon, { size: 32 })
      ) : null,
      glam(
        CloseButton,
        {
          getStyles: getStyles,
          innerProps: {
            onClick: onClose,
            title: getCloseLabel(state)
          }
        },
        glam(Close, { size: 32 })
      )
    )
  );
};

// ==============================
// Header Buttons
// ==============================

var headerButtonCSS = function headerButtonCSS() {
  return {
    alignItems: 'center',
    background: 0,
    border: 0,
    color: 'rgba(255, 255, 255, 0.75)',
    cursor: 'pointer',
    display: 'inline-flex ',
    height: 44,
    justifyContent: 'center',
    outline: 0,
    padding: 0,
    position: 'relative',
    width: 44,

    '&:hover': {
      color: 'white'
    }
  };
};

var headerFullscreenCSS = headerButtonCSS;
var HeaderFullscreen = function HeaderFullscreen(props) {
  var children = props.children,
      getStyles = props.getStyles,
      innerProps = props.innerProps;


  return glam(
    Button,
    _extends({
      css: getStyles('headerFullscreen', props),
      className: className(['header_button', 'header_button--fullscreen']),
      type: 'button'
    }, innerProps),
    children
  );
};

var headerCloseCSS = headerButtonCSS;
var HeaderClose = function HeaderClose(props) {
  var children = props.children,
      getStyles = props.getStyles,
      innerProps = props.innerProps;


  return glam(
    Button,
    _extends({
      css: getStyles('headerClose', props),
      className: className(['header_button', 'header_button--close']),
      type: 'button'
    }, innerProps),
    children
  );
};

// ==============================
// Navigation
// ==============================

var navigationCSS = function navigationCSS(_ref) {
  var interactionIsIdle = _ref.interactionIsIdle;
  return {
    display: 'flex ',
    alignItems: 'center',
    justifyContent: 'space-between',
    opacity: interactionIsIdle ? 0 : 1,
    transition: 'opacity 300ms',
    '& *:focus': {
      outline: '1.5px solid orange'
    }
  };
};

var Navigation = function Navigation(props) {
  var children = props.children,
      getStyles = props.getStyles,
      isFullscreen = props.isFullscreen,
      isModal = props.isModal,
      showNavigationOnTouchDevice = props.showNavigationOnTouchDevice;

  return !isTouch() || isTouch() && showNavigationOnTouchDevice ? glam(
    Nav,
    {
      css: getStyles('navigation', props),
      className: className('navigation', { isFullscreen: isFullscreen, isModal: isModal })
    },
    children
  ) : null;
};

// ==============================
// Nav Item
// ==============================

var BUTTON_SIZE = 50;

var navigationItemCSS = function navigationItemCSS(_ref2) {
  var _ref3;

  var align = _ref2.align;
  return _ref3 = {
    alignItems: 'center',
    background: 'rgba(255, 255, 255, 0.2)',
    border: 0,
    borderRadius: '50%',
    color: 'white',
    cursor: 'pointer',
    display: 'flex ',
    fontSize: 'inherit',
    height: BUTTON_SIZE,
    justifyContent: 'center',
    marginTop: -(BUTTON_SIZE / 2),
    outline: 0,
    position: 'absolute',
    top: '50%',
    transition: 'background-color 200ms',
    width: BUTTON_SIZE
  }, defineProperty(_ref3, align, 20), defineProperty(_ref3, '&:hover', {
    background: 'rgba(255, 255, 255, 0.3)'
  }), defineProperty(_ref3, '&:active', {
    background: 'rgba(255, 255, 255, 0.2)'
  }), _ref3;
};

var navigationPrevCSS = navigationItemCSS;
var NavigationPrev = function NavigationPrev(props) {
  var _props$children = props.children,
      children = _props$children === undefined ? glam(ChevronLeft, { size: 48 }) : _props$children,
      getStyles = props.getStyles,
      innerProps = props.innerProps;


  return glam(
    Button,
    _extends({
      type: 'button',
      css: getStyles('navigationPrev', props)
    }, innerProps),
    children
  );
};

var navigationNextCSS = navigationItemCSS;
var NavigationNext = function NavigationNext(props) {
  var _props$children2 = props.children,
      children = _props$children2 === undefined ? glam(ChevronRight, { size: 48 }) : _props$children2,
      getStyles = props.getStyles,
      innerProps = props.innerProps;


  return glam(
    Button,
    _extends({
      type: 'button',
      css: getStyles('navigationNext', props)
    }, innerProps),
    children
  );
};

// ==============================
// Blanket
// ==============================

var blanketCSS = function blanketCSS(_ref) {
  var isFullscreen = _ref.isFullscreen;
  return {
    backgroundColor: isFullscreen ? 'black' : 'rgba(0, 0, 0, 0.8)',
    bottom: 0,
    left: 0,
    position: 'fixed',
    right: 0,
    top: 0,
    zIndex: 1199
  };
};

var Blanket = function Blanket(props) {
  var getStyles = props.getStyles,
      innerProps = props.innerProps,
      isFullscreen = props.isFullscreen;

  return glam(Div, _extends({
    css: getStyles('blanket', props),
    className: className('blanket', { isFullscreen: isFullscreen })
  }, innerProps));
};

// ==============================
// Positioner
// ==============================

var positionerCSS = function positionerCSS() {
  return {
    alignItems: 'center',
    bottom: 0,
    display: 'flex ',
    justifyContent: 'center',
    left: 0,
    position: 'fixed',
    right: 0,
    top: 0,
    zIndex: 1200
  };
};

var Positioner = function Positioner(props) {
  var children = props.children,
      getStyles = props.getStyles,
      innerProps = props.innerProps,
      isFullscreen = props.isFullscreen;

  return glam(
    Div,
    _extends({
      css: getStyles(componentBaseClassNames.Positioner, props),
      className: className(componentBaseClassNames.Positioner, { isFullscreen: isFullscreen })
    }, innerProps),
    children
  );
};

// ==============================
// Dialog
// ==============================

var dialogCSS = function dialogCSS() {
  return {
    width: '100%'
  };
};

var Dialog = function Dialog(props) {
  var children = props.children,
      getStyles = props.getStyles,
      innerProps = props.innerProps,
      isFullscreen = props.isFullscreen,
      removeFocusOn = props.removeFocusOn;


  return removeFocusOn ? glam(
    Div,
    _extends({
      css: getStyles('dialog', props),
      className: className('dialog', { isFullscreen: isFullscreen })
    }, innerProps),
    children
  ) : glam(
    FocusOn,
    null,
    glam(
      Div,
      _extends({
        css: getStyles('dialog', props),
        className: className('dialog', { isFullscreen: isFullscreen })
      }, innerProps),
      children
    )
  );
};

function getSource(_ref) {
  var data = _ref.data,
      isFullscreen = _ref.isFullscreen;
  var _data$source = data.source,
      source = _data$source === undefined ? data.src : _data$source;

  if (typeof source === 'string') return source;

  return isFullscreen ? source.fullscreen : source.regular;
}

var viewCSS = function viewCSS() {
  return {
    lineHeight: 0,
    position: 'relative',
    textAlign: 'center'
  };
};

var viewBaseClassName = componentBaseClassNames.View;

var View$1 = function View(props) {
  var data = props.data,
      formatters = props.formatters,
      getStyles = props.getStyles,
      index = props.index,
      isFullscreen = props.isFullscreen,
      isModal = props.isModal;

  var innerProps = {
    alt: formatters.getAltText({ data: data, index: index }),
    src: getSource({ data: data, isFullscreen: isFullscreen })
  };

  return glam(
    Div,
    {
      css: getStyles(viewBaseClassName, props),
      className: className(viewBaseClassName, { isFullscreen: isFullscreen, isModal: isModal })
    },
    glam(Img, _extends({}, innerProps, {
      className: className('view-image', { isFullscreen: isFullscreen, isModal: isModal }),
      css: {
        height: 'auto',
        maxHeight: '100%',
        maxWidth: '100%',
        userSelect: 'none'
      }
    }))
  );
};

var carouselComponents = {
  Container: Container,
  Footer: Footer,
  FooterCaption: FooterCaption,
  FooterCount: FooterCount,
  FooterSocial: FooterSocial,
  Header: Header,
  HeaderClose: HeaderClose,
  HeaderFullscreen: HeaderFullscreen,
  Navigation: Navigation,
  NavigationPrev: NavigationPrev,
  NavigationNext: NavigationNext,
  View: View$1
};

var defaultCarouselComponents = function defaultCarouselComponents(providedComponents) {
  return _extends({}, carouselComponents, providedComponents);
};

// ==============================
// Modal
// ==============================

var modalComponents = {
  Blanket: Blanket,
  Positioner: Positioner,
  Dialog: Dialog
};

var defaultModalComponents = function defaultModalComponents(providedComponents) {
  return _extends({}, modalComponents, providedComponents);
};

var defaultCarouselStyles = {
  container: containerCSS,
  footer: footerCSS,
  footerCaption: footerCaptionCSS,
  footerCount: footerCountCSS,
  header: headerCSS,
  headerClose: headerCloseCSS,
  headerFullscreen: headerFullscreenCSS,
  navigation: navigationCSS,
  navigationPrev: navigationPrevCSS,
  navigationNext: navigationNextCSS,
  view: viewCSS
};
var defaultModalStyles = {
  blanket: blanketCSS,
  dialog: dialogCSS,
  positioner: positionerCSS
};

var easing = 'cubic-bezier(0.23, 1, 0.32, 1)'; // easeOutQuint
var verticalOffset = 40;

// ==============================
// Fade
// ==============================

var Fade = function Fade(_ref) {
  var Tag = _ref.component,
      onEntered = _ref.onEntered,
      onExited = _ref.onExited,
      inProp = _ref.in,
      originalProps = _ref.innerProps,
      props = objectWithoutProperties(_ref, ['component', 'onEntered', 'onExited', 'in', 'innerProps']);

  var enter = 300;
  var exit = 500;
  var fadeStyle = {
    transition: 'opacity 200ms',
    opacity: 0
  };
  var fadeTransition = {
    entering: { opacity: 0 },
    entered: { opacity: 1 },
    exiting: { opacity: 0, transitionDuration: exit + 'ms' }
  };

  return React.createElement(
    Transition,
    {
      appear: true,
      mountOnEnter: true,
      unmountOnExit: true,
      onEntered: onEntered,
      onExited: onExited,
      key: 'fade',
      'in': inProp,
      timeout: { enter: enter, exit: exit }
    },
    function (status) {
      var innerProps = _extends({}, originalProps, {
        style: _extends({}, fadeStyle, fadeTransition[status])
      });

      if (status === 'exited') return null;

      return React.createElement(Tag, _extends({ innerProps: innerProps }, props));
    }
  );
};
var SlideUp = function SlideUp(_ref2) {
  var Tag = _ref2.component,
      onEntered = _ref2.onEntered,
      onExited = _ref2.onExited,
      inProp = _ref2.in,
      originalProps = _ref2.innerProps,
      props = objectWithoutProperties(_ref2, ['component', 'onEntered', 'onExited', 'in', 'innerProps']);

  var enter = 300;
  var exit = 500;
  var restingTransform = 'translate3d(0, 0, 0)';
  var slideStyle = {
    transition: 'transform ' + enter + 'ms ' + easing + ', opacity ' + enter + 'ms ' + easing,
    transform: restingTransform
  };
  var slideTransition = {
    entering: {
      opacity: 0,
      transform: 'translate3d(0, ' + verticalOffset + 'px, 0) scale(0.9)'
    },
    entered: {
      opacity: 1,
      transform: restingTransform
    },
    exiting: {
      opacity: 0,
      transform: 'translate3d(0, ' + verticalOffset + 'px, 0) scale(0.9)',
      transition: 'transform ' + exit + 'ms ' + easing + ', opacity ' + exit + 'ms ' + easing
    }
  };

  return React.createElement(
    Transition,
    {
      appear: true,
      'in': inProp,
      mountOnEnter: true,
      onEntered: onEntered,
      onExited: onExited,
      timeout: { enter: enter, exit: exit },
      unmountOnExit: true
    },
    function (status) {
      if (status === 'exited') return null;

      var innerProps = _extends({}, originalProps, {
        style: _extends({}, slideStyle, slideTransition[status])
      });

      return React.createElement(Tag, _extends({ innerProps: innerProps }, props));
    }
  );
};

var defaultProps = {
  allowFullscreen: !isTouch(),
  closeOnBackdropClick: true,
  closeOnEsc: true,
  preventScroll: true,
  styles: {}
};

/** Classes that when clicked on, close the backdrop */
var backdropClassNames = new Set([componentBaseClassNames.View, componentBaseClassNames.Header, componentBaseClassNames.Footer, componentBaseClassNames.Track, componentBaseClassNames.Positioner].map(className));

var Modal = function (_Component) {
  inherits(Modal, _Component);

  // TODO
  function Modal(props) {
    classCallCheck(this, Modal);

    var _this = possibleConstructorReturn(this, (Modal.__proto__ || Object.getPrototypeOf(Modal)).call(this, props));

    _initialiseProps.call(_this);

    _this.cacheComponents(props.components);

    _this.state = { isFullscreen: false, isClosing: false };
    return _this;
  }

  createClass(Modal, [{
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps) {
      if (prevProps.components !== this.props.components) {
        this.cacheComponents(prevProps.components);
      }
    }

    // emulate `componentDidMount` & `componentWillUnmount`
    // called on complete of enter & exit transitions respectively

  }, {
    key: 'getCommonProps',
    value: function getCommonProps() {
      var isFullscreen = this.state.isFullscreen;


      return {
        getStyles: this.getStyles,
        isFullscreen: isFullscreen,
        modalProps: this.props
      };
    }
  }, {
    key: 'render',
    value: function render() {
      var _components = this.components,
          Blanket = _components.Blanket,
          Positioner = _components.Positioner,
          Dialog = _components.Dialog;
      var _props = this.props,
          allowFullscreen = _props.allowFullscreen,
          children = _props.children;
      var isFullscreen = this.state.isFullscreen;

      var commonProps = this.commonProps = this.getCommonProps();

      // $FlowFixMe
      var transitionIn = this.props.in;

      // forward props to modal for use in internal components
      var modalProps = {
        allowFullscreen: allowFullscreen,
        isFullscreen: isFullscreen,
        onClose: this.handleClose,
        preventScroll: this.preventScroll,
        toggleFullscreen: this.toggleFullscreen
      };

      // augment user carousel with modal props
      // $FlowFixMe
      var carouselComponent = cloneElement(children, {
        isModal: true,
        modalProps: modalProps
      });

      return glam(
        Fullscreen,
        { enabled: isFullscreen, onChange: this.handleFullscreenChange },
        glam(Fade, _extends({}, commonProps, { component: Blanket, 'in': transitionIn })),
        glam(
          SlideUp,
          _extends({}, commonProps, {
            component: Positioner,
            'in': transitionIn,
            innerProps: {
              onClick: this.state.isClosing ? null : this.handleBackdropClick
            },
            onEntered: this.modalDidMount,
            onExited: this.modalWillUnmount
          }),
          glam(
            Dialog,
            _extends({ removeFocusOn: this.state.isClosing }, commonProps),
            carouselComponent
          )
        )
      );
    }
  }]);
  return Modal;
}(Component);

Modal.defaultProps = defaultProps;

var _initialiseProps = function _initialiseProps() {
  var _this2 = this;

  this.modalDidMount = function () {
    document.addEventListener('keyup', _this2.handleKeyUp);
    focusStore.storeFocus();
  };

  this.modalWillUnmount = function () {
    document.removeEventListener('keyup', _this2.handleKeyUp);
    focusStore.restoreFocus();
    _this2.setState({ isClosing: false });
  };

  this.cacheComponents = function (comps) {
    _this2.components = defaultModalComponents(comps);
  };

  this.handleFullscreenChange = function (isFullscreen) {
    _this2.setState({ isFullscreen: isFullscreen });
  };

  this.handleKeyUp = function (event) {
    var _props2 = _this2.props,
        allowFullscreen = _props2.allowFullscreen,
        closeOnEsc = _props2.closeOnEsc;
    var isFullscreen = _this2.state.isFullscreen;

    var allowClose = event.key === 'Escape' && closeOnEsc && !isFullscreen;

    // toggle fullscreen
    if (allowFullscreen && event.key === 'f') {
      _this2.toggleFullscreen();
    }

    // close on escape when not fullscreen
    if (allowClose) _this2.handleClose(event);
  };

  this.handleBackdropClick = function (event) {
    var hasBackdropClassName = false;
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = event.target.classList[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var targetClass = _step.value;

        if (backdropClassNames.has(targetClass)) {
          hasBackdropClassName = true;
        }
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    if (!hasBackdropClassName || !_this2.props.closeOnBackdropClick) {
      return;
    }

    _this2.handleClose(event);
  };

  this.toggleFullscreen = function () {
    _this2.setState(function (state) {
      return { isFullscreen: !state.isFullscreen };
    });
  };

  this.handleClose = function (event) {
    var onClose = _this2.props.onClose;
    var isFullscreen = _this2.state.isFullscreen;


    _this2.setState({ isClosing: true });

    // force exit fullscreen mode on close
    if (isFullscreen) {
      _this2.toggleFullscreen();
    }

    // call the consumer's onClose func
    onClose(event);
  };

  this.getStyles = function (key, props) {
    var base = defaultModalStyles[key](props);
    base.boxSizing = 'border-box';
    var custom = _this2.props.styles[key];
    return custom ? custom(base, props) : base;
  };
};

// ==============================
// Navigation
// ==============================

/* ARIA label for the next button */


// NOTE: props aren't used by default for some getters but consumers may need
// them, this needs to be reflected in the flow type.

/* eslint-disable no-unused-vars */

function getNextLabel(_ref) {
  var currentIndex = _ref.currentIndex,
      views = _ref.views;

  return 'Show slide ' + (currentIndex + 2) + ' of ' + views.length;
}

/* ARIA label for the previous button */
function getPrevLabel(_ref2) {
  var currentIndex = _ref2.currentIndex,
      views = _ref2.views;

  return 'Show slide ' + currentIndex + ' of ' + views.length;
}

/* HTML title for the next button */
function getNextTitle(props) {
  return 'Next (right arrow)';
}

/* HTML title for the previous button */
function getPrevTitle(props) {
  return 'Previous (left arrow)';
}

// ==============================
// Header
// ==============================

/* ARIA label for the close button */
function getCloseLabel(props) {
  return 'Close (esc)';
}
/* ARIA label for the fullscreen button */
function getFullscreenLabel(_ref3) {
  var isFullscreen = _ref3.isFullscreen;

  return isFullscreen ? 'Exit fullscreen (f)' : 'Enter fullscreen (f)';
}

// ==============================
// View
// ==============================

/* alt text for each image in the carousel */
function getAltText(_ref4) {
  var data = _ref4.data,
      index = _ref4.index;

  if (data.alt) {
    if (typeof data.alt !== 'string') {
      console.error('Image ' + (index + 1) + ' had a non-string alt property, which will probably render incorrectly.\nInstead of a plain string it was ', data.alt);
    }

    return data.alt;
  }

  if (data.caption) {
    if (typeof data.caption !== 'string') {
      console.warn('Image ' + (index + 1) + ' has a non-string caption, but no alt\xA0value provided. This will probably make the alt prop unintelligible for screen readers. Is this intentional?');
    }

    return data.caption;
  }

  return 'Image ' + (index + 1);
}

// ==============================
// Exports
// ==============================

var formatters = {
  getAltText: getAltText,
  getNextLabel: getNextLabel,
  getPrevLabel: getPrevLabel,
  getNextTitle: getNextTitle,
  getPrevTitle: getPrevTitle,
  getCloseLabel: getCloseLabel,
  getFullscreenLabel: getFullscreenLabel
};

var viewPagerStyles = {
  flex: '1 1 auto',
  position: 'relative'
};
var frameStyles = { outline: 0 };

var defaultProps$1 = {
  currentIndex: 0,
  formatters: formatters,
  hideControlsWhenIdle: 3000,
  showNavigationOnTouchDevice: false,
  styles: {},
  trackProps: {
    instant: !isTouch(),
    swipe: 'touch'
  }
};

var trackBaseClassName = componentBaseClassNames.Track;

var Carousel = function (_Component) {
  inherits(Carousel, _Component);

  function Carousel(props) {
    classCallCheck(this, Carousel);

    var _this = possibleConstructorReturn(this, (Carousel.__proto__ || Object.getPrototypeOf(Carousel)).call(this, props));

    _initialiseProps$1.call(_this);

    _this.cacheComponents(props.components);

    _this.state = {
      currentIndex: props.currentIndex,
      interactionIsIdle: isTouch()
    };
    return _this;
  } // TODO


  createClass(Carousel, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _props = this.props,
          hideControlsWhenIdle = _props.hideControlsWhenIdle,
          modalProps = _props.modalProps;

      var isModal = Boolean(modalProps);

      this.mounted = true;

      if (hideControlsWhenIdle && this.container) {
        this.container.addEventListener('mousedown', this.handleMouseActivity);
        this.container.addEventListener('mousemove', this.handleMouseActivity);
        this.container.addEventListener('touchmove', this.handleMouseActivity);
      }
      if (isModal) {
        this.focusViewFrame();
      }
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps) {
      if (prevProps.components !== this.props.components) {
        this.cacheComponents(prevProps.components);
      }

      if (this.props.currentIndex !== prevProps.currentIndex) {
        this.setState({ currentIndex: this.props.currentIndex });
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.mounted = false;

      if (this.props.hideControlsWhenIdle && this.container) {
        this.container.removeEventListener('mousedown', this.handleMouseActivity);
        this.container.removeEventListener('mousemove', this.handleMouseActivity);
        this.container.removeEventListener('touchmove', this.handleMouseActivity);
        this.handleMouseActivity.cancel();
      }
    }

    // ==============================
    // Refs
    // ==============================

    // ==============================
    // Utilities
    // ==============================

    // combine defaultProps with consumer props to maintain expected behaviour

    // combine defaultProps with consumer props to maintain expected behaviour


    // ==============================
    // Handlers
    // ==============================

    // ==============================
    // Renderers
    // ==============================

  }, {
    key: 'getCommonProps',
    value: function getCommonProps() {
      var _props2 = this.props,
          frameProps = _props2.frameProps,
          trackProps = _props2.trackProps,
          modalProps = _props2.modalProps,
          views = _props2.views,
          showNavigationOnTouchDevice = _props2.showNavigationOnTouchDevice;

      var isModal = Boolean(modalProps);
      var isFullscreen = Boolean(modalProps && modalProps.isFullscreen);
      var _state = this.state,
          currentIndex = _state.currentIndex,
          interactionIsIdle = _state.interactionIsIdle;

      var currentView = this.getViewData();

      return {
        carouselProps: this.props,
        currentIndex: currentIndex,
        currentView: currentView,
        formatters: this.props.formatters,
        frameProps: frameProps,
        getStyles: this.getStyles,
        showNavigationOnTouchDevice: showNavigationOnTouchDevice,
        isFullscreen: isFullscreen,
        isModal: isModal,
        modalProps: modalProps,
        interactionIsIdle: interactionIsIdle,
        trackProps: trackProps,
        views: views
      };
    }
  }, {
    key: 'render',
    value: function render() {
      var _components = this.components,
          Container = _components.Container,
          View$1 = _components.View;
      var currentIndex = this.state.currentIndex;
      var _props3 = this.props,
          frameProps = _props3.frameProps,
          views = _props3.views;

      var commonProps = this.commonProps = this.getCommonProps();

      return glam(
        Container,
        _extends({}, commonProps, { innerProps: { innerRef: this.getContainer } }),
        this.renderHeader(),
        glam(
          ViewPager,
          {
            tag: 'main',
            style: viewPagerStyles,
            className: className('pager')
          },
          glam(
            Frame,
            _extends({}, frameProps, {
              ref: this.getFrame,
              className: className('frame'),
              style: frameStyles,
              tabIndex: '-1'
            }),
            glam(
              Track,
              _extends({}, this.getTrackProps(this.props), {
                style: { display: 'flex', alignItems: 'center' },
                currentView: currentIndex,
                className: className(trackBaseClassName),
                onViewChange: this.handleViewChange,
                ref: this.getTrack
              }),
              views && views.map(function (data, index) {
                return glam(
                  View$2,
                  { className: className('view-wrapper'), key: index },
                  data.type === "image" ? glam(View$1, _extends({}, commonProps, { data: data, index: index })) : glam(View, _extends({}, commonProps, { data: data, index: index }))
                );
              })
            )
          ),
          this.renderNavigation()
        ),
        this.renderFooter()
      );
    }
  }]);
  return Carousel;
}(Component);

Carousel.defaultProps = defaultProps$1;

var _initialiseProps$1 = function _initialiseProps() {
  var _this2 = this;

  this.mounted = false;

  this.cacheComponents = function (comps) {
    _this2.components = defaultCarouselComponents(comps);
  };

  this.getContainer = function (ref) {
    _this2.container = ref;
  };

  this.getFooter = function (ref) {
    _this2.footer = ref;
  };

  this.getFrame = function (ref) {
    _this2.frame = findDOMNode(ref);
  };

  this.getHeader = function (ref) {
    _this2.header = ref;
  };

  this.getTrack = function (ref) {
    _this2.track = ref;
  };

  this.hasPreviousView = function () {
    var trackProps = _this2.props.trackProps;
    var currentIndex = _this2.state.currentIndex;


    return trackProps.infinite || currentIndex !== 0;
  };

  this.hasNextView = function () {
    var _props4 = _this2.props,
        trackProps = _props4.trackProps,
        views = _props4.views;
    var currentIndex = _this2.state.currentIndex;


    return trackProps.infinite || currentIndex !== views.length - 1;
  };

  this.getStyles = function (key, props) {
    var base = defaultCarouselStyles[key](props);
    base.boxSizing = 'border-box';
    var custom = _this2.props.styles[key];
    return custom ? custom(base, props) : base;
  };

  this.getTrackProps = function (props) {
    return _extends({}, defaultProps$1.trackProps, props.trackProps);
  };

  this.getFormatters = function () {
    return _extends({}, defaultProps$1.formatters, _this2.props.formatters);
  };

  this.getViewData = function () {
    var views = _this2.props.views;
    var currentIndex = _this2.state.currentIndex;


    return views[currentIndex];
  };

  this.focusViewFrame = function () {
    if (_this2.frame && document.activeElement !== _this2.frame) {
      _this2.frame.focus();
    }
  };

  this.prev = function (event) {
    event.stopPropagation();
    _this2.track.prev();
    _this2.focusViewFrame();
  };

  this.next = function (event) {
    event.stopPropagation();
    _this2.track.next();
    _this2.focusViewFrame();
  };

  this.handleMouseActivity = rafScheduler(function () {
    clearTimeout(_this2.timer);

    if (_this2.state.interactionIsIdle) {
      _this2.setState({ interactionIsIdle: false });
    }

    _this2.timer = setTimeout(function () {
      if (_this2.mounted) {
        _this2.setState({ interactionIsIdle: true });
      }
    }, _this2.props.hideControlsWhenIdle);
  });

  this.handleViewChange = function (indicies) {
    var trackProps = _this2.props.trackProps;

    // simplify by enforcing number

    var currentIndex = indicies[0];

    _this2.setState({ currentIndex: currentIndex });

    // call the consumer's onViewChange fn
    if (trackProps && trackProps.onViewChange) {
      trackProps.onViewChange(currentIndex);
    }
  };

  this.renderNavigation = function () {
    var _getFormatters = _this2.getFormatters(),
        getNextLabel = _getFormatters.getNextLabel,
        getPrevLabel = _getFormatters.getPrevLabel,
        getNextTitle = _getFormatters.getNextTitle,
        getPrevTitle = _getFormatters.getPrevTitle;

    var _components2 = _this2.components,
        Navigation = _components2.Navigation,
        NavigationPrev = _components2.NavigationPrev,
        NavigationNext = _components2.NavigationNext;
    var commonProps = _this2.commonProps;


    var showPrev = _this2.hasPreviousView();
    var showNext = _this2.hasNextView();
    var showNav = (showPrev || showNext) && Navigation;

    return showNav ? glam(
      Navigation,
      commonProps,
      showPrev && glam(NavigationPrev, _extends({}, commonProps, {
        align: 'left',
        innerProps: {
          'aria-label': getPrevLabel(commonProps),
          onClick: _this2.prev,
          title: getPrevTitle(commonProps)
        }
      })),
      showNext && glam(NavigationNext, _extends({}, commonProps, {
        align: 'right',
        innerProps: {
          'aria-label': getNextLabel(commonProps),
          onClick: _this2.next,
          title: getNextTitle(commonProps)
        }
      }))
    ) : null;
  };

  this.renderFooter = function () {
    var _components3 = _this2.components,
        Footer = _components3.Footer,
        FooterCaption = _components3.FooterCaption,
        FooterCount = _components3.FooterCount;
    var commonProps = _this2.commonProps;


    return Footer ? glam(Footer, _extends({}, commonProps, {
      components: {
        Caption: FooterCaption
      },
      innerProps: { innerRef: _this2.getFooter }
    })) : null;
  };

  this.renderHeader = function () {
    var _components4 = _this2.components,
        Header = _components4.Header,
        HeaderClose = _components4.HeaderClose,
        HeaderFullscreen = _components4.HeaderFullscreen,
        FooterCount = _components4.FooterCount;

    var _getFormatters2 = _this2.getFormatters(),
        getCloseLabel = _getFormatters2.getCloseLabel,
        getFullscreenLabel = _getFormatters2.getFullscreenLabel;

    var commonProps = _this2.commonProps;


    return Header ? glam(Header, _extends({}, commonProps, {
      getCloseLabel: getCloseLabel,
      getFullscreenLabel: getFullscreenLabel,
      components: {
        CloseButton: HeaderClose,
        FullscreenButton: HeaderFullscreen,
        FooterCount: FooterCount
      },
      data: _this2.getViewData(),
      innerProps: { innerRef: _this2.getHeader }
    })) : null;
  };
};

var FirstChild = function FirstChild(_ref) {
  var children = _ref.children;
  return Children.toArray(children)[0] || null;
};

var ModalGateway = function (_Component) {
  inherits(ModalGateway, _Component);

  function ModalGateway() {
    classCallCheck(this, ModalGateway);
    return possibleConstructorReturn(this, (ModalGateway.__proto__ || Object.getPrototypeOf(ModalGateway)).apply(this, arguments));
  }

  createClass(ModalGateway, [{
    key: 'render',
    value: function render() {
      if (typeof window === 'undefined') return null;
      var _props = this.props,
          target = _props.target,
          children = _props.children;

      return createPortal(React.createElement(TransitionGroup, { component: FirstChild, children: children }), target);
    }
  }]);
  return ModalGateway;
}(Component);

ModalGateway.defaultProps = {
  target: typeof window !== 'undefined' ? document.body : null
};

export default Carousel;
export { Modal, ModalGateway, carouselComponents, modalComponents };
