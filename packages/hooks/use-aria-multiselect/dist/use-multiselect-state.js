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

// src/use-multiselect-state.ts
var use_multiselect_state_exports = {};
__export(use_multiselect_state_exports, {
  useMultiSelectState: () => useMultiSelectState
});
module.exports = __toCommonJS(use_multiselect_state_exports);
var import_menu = require("@react-stately/menu");
var import_form = require("@react-stately/form");
var import_react2 = require("react");

// src/use-multiselect-list-state.ts
var import_list = require("@react-stately/list");
var import_react = require("react");
function useMultiSelectListState(props) {
  const {
    collection,
    disabledKeys,
    selectionManager,
    selectionManager: { setSelectedKeys, selectedKeys, selectionMode }
  } = (0, import_list.useListState)(props);
  const missingKeys = (0, import_react.useMemo)(() => {
    if (!props.isLoading && selectedKeys.size !== 0) {
      return Array.from(selectedKeys).filter(Boolean).filter((key) => !collection.getItem(key));
    }
    return [];
  }, [selectedKeys, collection]);
  const selectedItems = selectedKeys.size !== 0 ? Array.from(selectedKeys).map((key) => {
    return collection.getItem(key);
  }).filter(Boolean) : null;
  if (missingKeys.length) {
    console.warn(
      `Select: Keys "${missingKeys.join(
        ", "
      )}" passed to "selectedKeys" are not present in the collection.`
    );
  }
  return {
    collection,
    disabledKeys,
    selectionManager,
    selectionMode,
    selectedKeys,
    setSelectedKeys: setSelectedKeys.bind(selectionManager),
    selectedItems
  };
}

// src/use-multiselect-state.ts
function useMultiSelectState(props) {
  const [isFocused, setFocused] = (0, import_react2.useState)(false);
  const [focusStrategy, setFocusStrategy] = (0, import_react2.useState)(null);
  const triggerState = (0, import_menu.useMenuTriggerState)(props);
  const listState = useMultiSelectListState({
    ...props,
    onSelectionChange: (keys) => {
      if (props.onSelectionChange != null) {
        if (keys === "all") {
          props.onSelectionChange(new Set(listState.collection.getKeys()));
        } else {
          props.onSelectionChange(keys);
        }
      }
      if (props.selectionMode === "single") {
        triggerState.close();
      }
    }
  });
  const validationState = (0, import_form.useFormValidationState)({
    ...props,
    validationBehavior: "native",
    value: listState.selectedKeys
  });
  return {
    ...validationState,
    ...listState,
    ...triggerState,
    focusStrategy,
    close() {
      triggerState.close();
    },
    open(focusStrategy2 = null) {
      if (listState.collection.size !== 0) {
        setFocusStrategy(focusStrategy2);
        triggerState.open();
      }
    },
    toggle(focusStrategy2 = null) {
      if (listState.collection.size !== 0) {
        setFocusStrategy(focusStrategy2);
        triggerState.toggle();
        validationState.commitValidation();
      }
    },
    isFocused,
    setFocused
  };
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  useMultiSelectState
});
