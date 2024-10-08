"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  __DEV__: () => __DEV__,
  __TEST__: () => __TEST__,
  arrayToObject: () => arrayToObject,
  callAll: () => callAll,
  callAllHandlers: () => callAllHandlers,
  capitalize: () => capitalize,
  clamp: () => clamp,
  clampPercentage: () => clampPercentage,
  cleanObject: () => cleanObject,
  cleanObjectKeys: () => cleanObjectKeys,
  clsx: () => clsx,
  compact: () => compact,
  copyObject: () => copyObject,
  dataAttr: () => dataAttr,
  extractProperty: () => extractProperty,
  getGregorianYearOffset: () => getGregorianYearOffset,
  getKeyValue: () => getKeyValue,
  getMargin: () => getMargin,
  getProp: () => getProp,
  getUniqueID: () => getUniqueID,
  isArray: () => isArray,
  isEmpty: () => isEmpty,
  isEmptyArray: () => isEmptyArray,
  isEmptyObject: () => isEmptyObject,
  isFunction: () => isFunction,
  isNumeric: () => isNumeric,
  isObject: () => isObject,
  objectToDeps: () => objectToDeps,
  omitObject: () => omitObject,
  range: () => range,
  removeEvents: () => removeEvents,
  renameProp: () => renameProp,
  safeAriaLabel: () => safeAriaLabel,
  safeText: () => safeText,
  warn: () => warn
});
module.exports = __toCommonJS(src_exports);

// src/assertion.ts
var __DEV__ = process.env.NODE_ENV !== "production";
var __TEST__ = process.env.NODE_ENV === "test";
function isArray(value) {
  return Array.isArray(value);
}
function isEmptyArray(value) {
  return isArray(value) && value.length === 0;
}
function isObject(value) {
  const type = typeof value;
  return value != null && (type === "object" || type === "function") && !isArray(value);
}
function isEmptyObject(value) {
  return isObject(value) && Object.keys(value).length === 0;
}
function isEmpty(value) {
  if (isArray(value))
    return isEmptyArray(value);
  if (isObject(value))
    return isEmptyObject(value);
  if (value == null || value === "")
    return true;
  return false;
}
function isFunction(value) {
  return typeof value === "function";
}
var dataAttr = (condition) => condition ? "true" : void 0;
var isNumeric = (value) => value != null && parseInt(value.toString(), 10) > 0;

// src/clsx.ts
function toVal(mix) {
  var k, y, str = "";
  if (typeof mix === "string" || typeof mix === "number") {
    str += mix;
  } else if (typeof mix === "object") {
    if (Array.isArray(mix)) {
      for (k = 0; k < mix.length; k++) {
        if (mix[k]) {
          if (y = toVal(mix[k])) {
            str && (str += " ");
            str += y;
          }
        }
      }
    } else {
      for (k in mix) {
        if (mix[k]) {
          str && (str += " ");
          str += k;
        }
      }
    }
  }
  return str;
}
function clsx(...args) {
  var i = 0, tmp, x, str = "";
  while (i < args.length) {
    if (tmp = args[i++]) {
      if (x = toVal(tmp)) {
        str && (str += " ");
        str += x;
      }
    }
  }
  return str;
}

// src/object.ts
var renameProp = (oldProp, newProp, { [oldProp]: old, ...others }) => ({
  [newProp]: old,
  ...others
});
var copyObject = (obj) => {
  if (!isObject(obj))
    return obj;
  if (obj instanceof Array)
    return [...obj];
  return { ...obj };
};
var omitObject = (obj, omitKeys) => {
  if (!isObject(obj))
    return obj;
  if (obj instanceof Array)
    return [...obj];
  const newObj = { ...obj };
  omitKeys.forEach((key) => newObj[key] && delete newObj[key]);
  return newObj;
};
var cleanObject = (obj) => {
  if (!isObject(obj))
    return obj;
  if (obj instanceof Array)
    return [...obj];
  const newObj = { ...obj };
  Object.keys(newObj).forEach((key) => {
    if (newObj[key] === void 0 || newObj[key] === null) {
      delete newObj[key];
    }
  });
  return newObj;
};
var cleanObjectKeys = (obj, keys = []) => {
  if (!isObject(obj))
    return obj;
  if (obj instanceof Array)
    return [...obj];
  const newObj = { ...obj };
  keys.forEach((key) => {
    if (newObj[key]) {
      delete newObj[key];
    }
  });
  return newObj;
};
var getKeyValue = (obj, key) => {
  if (!isObject(obj))
    return obj;
  if (obj instanceof Array)
    return [...obj];
  return obj[key];
};
var getProp = (obj, path, fallback, index) => {
  const key = typeof path === "string" ? path.split(".") : [path];
  for (index = 0; index < key.length; index += 1) {
    if (!obj)
      break;
    obj = obj[key[index]];
  }
  return obj === void 0 ? fallback : obj;
};
var arrayToObject = (arr) => {
  if (!arr.length || !Array.isArray(arr))
    return {};
  return arr.reduce((acc, item) => {
    return { ...acc, ...item };
  }, {});
};
function compact(object) {
  const clone = Object.assign({}, object);
  for (let key in clone) {
    if (clone[key] === void 0)
      delete clone[key];
  }
  return clone;
}

// src/text.ts
var safeText = (text) => {
  if ((text == null ? void 0 : text.length) <= 4)
    return text;
  return text == null ? void 0 : text.slice(0, 3);
};
var safeAriaLabel = (...texts) => {
  let ariaLabel = " ";
  for (const text of texts) {
    if (typeof text === "string" && text.length > 0) {
      ariaLabel = text;
      break;
    }
  }
  return ariaLabel;
};

// src/dimensions.ts
var getMargin = (num) => {
  return `calc(${num * 15.25}pt + 1px * ${num - 1})`;
};

// src/functions.ts
var capitalize = (text) => {
  return text.charAt(0).toUpperCase() + text.slice(1);
};
function callAllHandlers(...fns) {
  return function func(event) {
    fns.some((fn) => {
      fn == null ? void 0 : fn(event);
      return event == null ? void 0 : event.defaultPrevented;
    });
  };
}
function callAll(...fns) {
  return function mergedFn(arg) {
    fns.forEach((fn) => {
      fn == null ? void 0 : fn(arg);
    });
  };
}
function extractProperty(key, defaultValue, ...objs) {
  let result = defaultValue;
  for (const obj of objs) {
    if (obj && key in obj && !!obj[key]) {
      result = obj[key];
    }
  }
  return result;
}
function getUniqueID(prefix) {
  return `${prefix}-${Math.floor(Math.random() * 1e6)}`;
}
function removeEvents(input) {
  for (const key in input) {
    if (key.startsWith("on")) {
      delete input[key];
    }
  }
  return input;
}
function objectToDeps(obj) {
  if (!obj || typeof obj !== "object") {
    return "";
  }
  try {
    return JSON.stringify(obj);
  } catch (e) {
    return "";
  }
}

// src/numbers.ts
function range(start, end) {
  const length = end - start + 1;
  return Array.from({ length }, (_, index) => index + start);
}
function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}
function clampPercentage(value, max = 100) {
  return Math.min(Math.max(value, 0), max);
}

// src/console.ts
var warningStack = {};
function warn(message, component, ...args) {
  var _a;
  const tag = component ? ` [${component}]` : " ";
  const log = `[Next UI]${tag}: ${message}`;
  if (typeof console === "undefined")
    return;
  if (warningStack[log])
    return;
  warningStack[log] = true;
  if (((_a = process == null ? void 0 : process.env) == null ? void 0 : _a.NODE_ENV) !== "production") {
    return console.warn(log, args);
  }
}

// src/dates.ts
function getGregorianYearOffset(identifier) {
  switch (identifier) {
    case "buddhist":
      return 543;
    case "ethiopic":
    case "ethioaa":
      return -8;
    case "coptic":
      return -284;
    case "hebrew":
      return 3760;
    case "indian":
      return -78;
    case "islamic-civil":
    case "islamic-tbla":
    case "islamic-umalqura":
      return -579;
    case "persian":
      return 622;
    case "roc":
    case "japanese":
    case "gregory":
    default:
      return 0;
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  __DEV__,
  __TEST__,
  arrayToObject,
  callAll,
  callAllHandlers,
  capitalize,
  clamp,
  clampPercentage,
  cleanObject,
  cleanObjectKeys,
  clsx,
  compact,
  copyObject,
  dataAttr,
  extractProperty,
  getGregorianYearOffset,
  getKeyValue,
  getMargin,
  getProp,
  getUniqueID,
  isArray,
  isEmpty,
  isEmptyArray,
  isEmptyObject,
  isFunction,
  isNumeric,
  isObject,
  objectToDeps,
  omitObject,
  range,
  removeEvents,
  renameProp,
  safeAriaLabel,
  safeText,
  warn
});
