const utils = {
  _ownKeys: function(object, enumerableOnly) {
    var keys = Object.keys(object);

    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);

      if (enumerableOnly) symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });

      keys.push.apply(keys, symbols);
    }
    return keys;
  },
  _objectSpread: function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i] != null ? arguments[i] : {};

      if (i % 2) {
        utils._ownKeys(Object(source), true).forEach(function (key) {
          utils._defineProperty(target, key, source[key]);
        });
      } else if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
      } else {
        utils._ownKeys(Object(source)).forEach(function (key) {
          Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
      }
    }
    return target;
  },
  _defineProperty: function(obj, key, value) {
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
  },
  debounce: function (func, wait, immediate) {
    var timeout;

    return function () {
      var context = this,
          args = arguments;
      var later = function () {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      var callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  },
  getRandomIntInclusive: function (min, max, dec) {
    min = Math.ceil(min);
    max = Math.floor(max);

    if (!dec) return Math.floor(Math.random() * (max - min + 1)) + min;
    else return Math.random() * 1;
  },
  shuffleArray: function(array) {
    var result = [].concat(array);

    for (var i = result.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = result[i];
      result[i] = result[j];
      result[j] = temp;
    }

    return result;
  },
  dateFormat: function(convertTime, locale) {
    locale = locale || 'Asia/Seoul';
    return moment(convertTime).tz(locale).format();
  },
  isToday: function (time1, time2) {
    return time1.split(' ')[0] === time2.split(' ')[0];
  },
  convertTime: function(convertTime, format) {
    var time = new Date(convertTime);
    var year = time.getFullYear();
    var month = time.getMonth() + 1;
    var date = time.getDate();
    var hours = time.getHours();
    var minutes = time.getMinutes();

    if (date <= 9) date = '0' + date;
    if (month <= 9) month = '0' + month;
    if (hours <= 9) hours = '0' + hours;
    if (minutes <= 9) minutes = '0' + minutes;

    switch(format) {
      case 'HM' :
        return hours + ' : ' + minutes;
      case 'YMD' :
        return year +'-'+ month +'-'+ date;
      case 'YMDH' :
        return year +'-'+ month +'-'+ date +' '+ hours +':00:00';
      case 'YMDHM' :
        return year +'-'+ month +'-'+ date +' '+ hours +':'+ minutes +':00';
      case 'STANDARD' :
        return year +'.'+ month +'.'+ date +' '+ hours +':' + minutes +' 기준' ;
    }
  },
  varOperator: function(operator, param1, param2) {
    switch(operator) {
      case 'prev':
        return param1 - param2;
      case 'next':
        return param1 + param2;
    }
  },
  RGBAToRGB: function(rgba) {
    rgba = rgba.substr(5).split(')')[0].split(',');

    var r = Math.round(((1 - rgba[3]) * 255) + (rgba[3] * rgba[0]));
    var g = Math.round(((1 - rgba[3]) * 255) + (rgba[3] * rgba[1]));
    var b = Math.round(((1 - rgba[3]) * 255) + (rgba[3] * rgba[2]));

    return 'rgb('+ r +','+g+','+b+')';
  },
  withCommas: function(v) {
    return v.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  },
  CopyUrlToClipboard: function(target) {
    var shareLinkUrl = document.querySelector(target);
    var isIOS = navigator.userAgent.match(/i(Phone|Pod)/i) !== null ? true : false;
    var textArea;

    function createTextArea(text) {
      textArea = document.createElement('textArea');
      textArea.readOnly = true;
      textArea.contentEditable = true;
      textArea.value = text;
      document.body.appendChild(textArea);
    }

    function selectText() {
      var range, selection;

      if (isIOS) {
        range = document.createRange();
        range.selectNodeContents(textArea);
        selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);
        textArea.setSelectionRange(0, 9999);
      } else {
        textArea.select();
      }
    }

    function copyTo() {
      document.execCommand('copy');
      document.body.removeChild(textArea);
    }

    function copyAlert() {
      var alertEl = document.createElement('div');
      alertEl.setAttribute('class', 'share-alert');

      var alertInner = document.createElement('div');
      alertInner.setAttribute('class', 'inner');

      var alertText = document.createElement('p')
      alertText.textContent = '링크를 클립보드에 복사하였습니다.';

      var alertClose = document.createElement('button');
      alertClose.setAttribute('type', 'button');
      alertClose.textContent = '닫기';

      var alertDimm = document.createElement('div');
      alertDimm.setAttribute('class', 'dimm');

      alertInner.appendChild(alertText);
      alertInner.appendChild(alertClose);

      alertEl.appendChild(alertDimm);
      alertEl.appendChild(alertInner);

      document.body.appendChild(alertEl);

      alertClose.addEventListener('click', function() {
        document.body.removeChild(alertEl);
      });
    }

    createTextArea(shareLinkUrl.value);
    selectText();
    copyTo();
    copyAlert();
  }
}

/**
 * Return a descriptor removing the value and returning a getter
 * The getter will return a .bind version of the function
 * and memoize the result against a symbol on the instance
 */

export function boundMethod(target, key, descriptor) {
  let fn = descriptor.value;

  if (typeof fn !== 'function') {
    throw new TypeError(`@boundMethod decorator can only be applied to methods not: ${typeof fn}`);
  }

  // In IE11 calling Object.defineProperty has a side-effect of evaluating the
  // getter for the property which is being replaced. This causes infinite
  // recursion and an "Out of stack space" error.
  let definingProperty = false;

  return {
    configurable: true,
    get() {
      // eslint-disable-next-line no-prototype-builtins
      if (definingProperty || this === target.prototype || this.hasOwnProperty(key) ||
          typeof fn !== 'function') {
        return fn;
      }
      const boundFn = fn.bind(this);
      definingProperty = true;
      Object.defineProperty(this, key, {
        configurable: true,
        get() {
          return boundFn;
        },
        set(value) {
          fn = value;
          delete this[key];
        }
      });

      definingProperty = false;

      return boundFn;
    },

    set(value) {
      fn = value;
    }
  };
}



/**
 * Use boundMethod to bind all methods on the target.prototype
 */

export function boundClass(target) {
  // (Using reflect to get all keys including symbols)
  let keys;
  // Use Reflect if exists

  if (typeof Reflect !== 'undefined' && typeof Reflect.ownKeys === 'function') {
    keys = Reflect.ownKeys(target.prototype);
  } else {
    keys = Object.getOwnPropertyNames(target.prototype);
    // Use symbols if support is provided
    if (typeof Object.getOwnPropertySymbols === 'function') {
      keys = keys.concat(Object.getOwnPropertySymbols(target.prototype));
    }
  }

  keys.forEach(key => {
    // Ignore special case target method
    if (key === 'constructor') {
      return;
    }

    const descriptor = Object.getOwnPropertyDescriptor(target.prototype, key);
    // Only methods need binding
    if (typeof descriptor.value === 'function') {
      Object.defineProperty(target.prototype, key, boundMethod(target, key, descriptor));
    }
  });

  return target;
}

function autobind(...args) {
  if (args.length === 1) {
    return boundClass(...args);
  }
  return boundMethod(...args);
}

// 웹팩 빌드시 euc-kr(news서버가 euc-kr)로 변환 후 빌드시
const krStr = {
  0: decodeURI('%EA%B8%B0%EC%A4%80'),// 기준
  // svg 타이틀 > 한눈에보는 오늘
  1: decodeURI('%ED%95%9C%EB%88%88%EC%97%90 %EB%B3%B4%EB%8A%94 %EC%98%A4%EB%8A%98'),
  // svg desc > 현재시간 실시간 이슈를 키워드 형태로 제공
  2: decodeURI('%ED%98%84%EC%9E%AC%EC%8B%9C%EA%B0%84 %EC%8B%A4%EC%8B%9C%EA%B0%84 %EC%9D%B4%EC%8A%88%EB%A5%BC %ED%82%A4%EC%9B%8C%EB%93%9C %ED%98%95%ED%83%9C%EB%A1%9C %EC%A0%9C%EA%B3%B5'),
  3: decodeURI('%EC%88%9C%EC%9C%84 %ED%82%A4%EC%9B%8C%EB%93%9C'),  // n 순위 키워드
  4: decodeURI('%EB%B9%84%EC%8A%B7%ED%95%9C %EA%B8%B0%EC%82%AC'),  // 비슷한 기사
  5: decodeURI('%EA%B0%9C'), // 개
  6: decodeURI('%EB%8D%94 %EB%B3%B4%EA%B8%B0%0D%0A'), // 더 보기
  // 링크를 클립보드에 복사하였습니다.
  7: decodeURI('%EB%A7%81%ED%81%AC%EB%A5%BC %ED%81%B4%EB%A6%BD%EB%B3%B4%EB%93%9C%EC%97%90 %EB%B3%B5%EC%82%AC%ED%95%98%EC%98%80%EC%8A%B5%EB%8B%88%EB%8B%A4.'),
  // 일시적인 오류가 발생하여
  8: decodeURI('%EC%9D%BC%EC%8B%9C%EC%A0%81%EC%9D%B8 %EC%98%A4%EB%A5%98%EA%B0%80 %EB%B0%9C%EC%83%9D%ED%95%98%EC%97%AC'),
  // 페이지를 표시할 수 없습니다.
  9: decodeURI('%ED%8E%98%EC%9D%B4%EC%A7%80%EB%A5%BC %ED%91%9C%EC%8B%9C%ED%95%A0 %EC%88%98 %EC%97%86%EC%8A%B5%EB%8B%88%EB%8B%A4.'),
  // 잠시 후 다시 이용해주세요.
  10: decodeURI('%EC%9E%A0%EC%8B%9C %ED%9B%84 %EB%8B%A4%EC%8B%9C %EC%9D%B4%EC%9A%A9%ED%95%B4%EC%A3%BC%EC%84%B8%EC%9A%94.'),
  // 다시시도
  11: decodeURI('%EB%8B%A4%EC%8B%9C%EC%8B%9C%EB%8F%84'),
  // 시간 전
  12: decodeURI('1%EC%8B%9C%EA%B0%84'),
  // 공유하기
  13: decodeURI('%EA%B3%B5%EC%9C%A0%ED%95%98%EA%B8%B0'),
}


const getURIparams = (v, type) => {
  if(typeof v === 'string' && v.length > 0) {
    // # 표시는 현재는 개발 되지 않으나 변화율에 대응하기 위해 미리 설정해둠
    const data = {
      MM: '', // #프로그래스 시간 설정
      index: '', // 버블 랭킹(배경 색상 설정)
      keyword_dtm: '',
      keyword_sq: '',
      target: '', // 어디서 넘어온건지
      v: '', // 세션체크 플래그
      keyword_idx: '' // #몇번째 카드를 처음으로 보여줄것인지
    };
    v.substring(1).split(type).forEach(v => {
      const [key, value] = v.split('=');
      data[key] = value;
      delete data['#'];
      delete data['?'];
    });

    return data;
  } else {
    return undefined
  }
};

const UA = (() => {
  // Opera 8.0+
  let isOpera = (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
  // Firefox 1.0+
  let isFirefox = typeof InstallTrigger !== 'undefined';
  // Safari 3.0+ "[object HTMLElementConstructor]"
  let isSafari = /constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || (typeof safari !== 'undefined' && safari.pushNotification));
  // Internet Explorer 6-11
  let isIE = /*@cc_on!@*/false || !!document.documentMode;
  // Edge 20+
  let isEdge = !isIE && !!window.StyleMedia;
  // Chrome 1 - 79
  let isChrome = !!window.chrome && (!!window.chrome.webstore || !!window.chrome.runtime);
  // Edge (based on chromium) detection
  let isEdgeChromium = isChrome && (navigator.userAgent.indexOf("Edg") != -1);
  // Blink engine detection
  let isBlink = (isChrome || isOpera) && !!window.CSS;
  let isPC = window.navigator.userAgent.indexOf('Win') > 0 || window.navigator.userAgent.indexOf('Macintosh') > 0;
  return {
    isOpera,
    isFirefox,
    isSafari,
    isIE,
    isEdge,
    isChrome,
    isEdgeChromium,
    isBlink,
    isPC
  }
})();




/*
** IE11 polyfill
**/
// object.assign
if (typeof Object.assign != 'function') {
  // Must be writable: true, enumerable: false, configurable: true
  Object.defineProperty(Object, "assign", {
    value: function assign(target, varArgs) { // .length of function is 2
      'use strict';
      if (target == null) { // TypeError if undefined or null
        throw new TypeError('Cannot convert undefined or null to object');
      }

      var to = Object(target);

      for (var index = 1; index < arguments.length; index++) {
        var nextSource = arguments[index];

        if (nextSource != null) { // Skip over if undefined or null
          for (var nextKey in nextSource) {
            // Avoid bugs when hasOwnProperty is shadowed
            if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
              to[nextKey] = nextSource[nextKey];
            }
          }
        }
      }
      return to;
    },
    writable: true,
    configurable: true
  });
}
// forEach
if (window.NodeList && !NodeList.prototype.forEach) {
  NodeList.prototype.forEach = function (callback, thisArg) {
    thisArg = thisArg || window;
    for (var i = 0; i < this.length; i++) {
      callback.call(thisArg, this[i], i, this);
    }
  };
}
// closest
if (!Element.prototype.matches) {
  Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
}
if (!Element.prototype.closest) {
  Element.prototype.closest = function(s) {
    var el = this;

    do {
      if (el.matches(s)) return el;
      el = el.parentElement || el.parentNode;
    } while (el !== null && el.nodeType === 1);
    return null;
  };
}

const replaceHistory = () => {
  let hash = window.location.hash;
  if(hash.length === 0) {
    hash = `#time=${new Date().valueOf()}`
  } else if(hash.indexOf('time=') < 0) {
    hash = `${hash}#time=${new Date().valueOf()}`
  } else {
    const oldHash = window.location.hash.split('time=')[1];
    hash = hash.replace(`time=${oldHash}`,`time=${new Date().valueOf()}`)
  }
  history.replaceState(history.state, '', hash);
}


let CARD_LINK = '//m.news.nate.com';
let MAIN_LINK = '//m.nate.com';

// DEV
if (process.env.NODE_ENV === 'development') {
  CARD_LINK = '//test-m.news.nate.com';
  MAIN_LINK = '//ndev.nate.com';
}


export {
  utils,
  krStr,
  autobind,
  getURIparams,
  UA,
  replaceHistory,
  MAIN_LINK,
  CARD_LINK
}