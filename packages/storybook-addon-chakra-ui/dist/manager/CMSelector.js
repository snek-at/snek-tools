"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
// OutlineSelector.js
const icons_1 = require("@chakra-ui/icons");
const addons_1 = __importDefault(require("@storybook/addons"));
const api_1 = require("@storybook/api");
const components_1 = require("@storybook/components");
const core_events_1 = require("@storybook/core-events");
const react_1 = require("react");
const CMSelector = () => {
    const [globals, updateGlobals] = api_1.useGlobals();
    const isDarkmode = globals['isDarkmode'] || false;
    console.log('selector', globals['isDarkmode'], isDarkmode);
    // Function that will update the global value and trigger a UI refresh.
    const refreshAndUpdateGlobal = () => {
        // Updates Storybook global value
        updateGlobals({
            ['isDarkmode']: !isDarkmode
        }),
            // Invokes Storybook's addon API method (with the FORCE_RE_RENDER) event to trigger a UI refresh
            addons_1.default.getChannel().emit(core_events_1.FORCE_RE_RENDER);
    };
    const toggleDarkmode = react_1.useCallback(() => refreshAndUpdateGlobal(), [
        isDarkmode
    ]);
    return (jsx_runtime_1.jsx(components_1.IconButton, Object.assign({ title: "Apply colormode to the preview2", onClick: toggleDarkmode }, { children: isDarkmode ? jsx_runtime_1.jsx(icons_1.SunIcon, {}, void 0) : jsx_runtime_1.jsx(icons_1.MoonIcon, {}, void 0) }), "colormode"));
};
exports.default = CMSelector;
//# sourceMappingURL=CMSelector.js.map