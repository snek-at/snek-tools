"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const addons_1 = require("@storybook/addons");
const constants_1 = require("./constants");
const manager_1 = require("./manager");
addons_1.addons.register(constants_1.ADDON_ID, api => {
    addons_1.addons.add(constants_1.ADDON_ID, {
        title: 'Colormode',
        type: addons_1.types.TOOLEXTRA,
        match: ({ viewMode }) => !!(viewMode && viewMode.match(/^(story|docs)$/)),
        render: () => jsx_runtime_1.jsx(manager_1.CMSelector, {}, void 0),
        paramKey: constants_1.PARAM_KEY
    });
});
//# sourceMappingURL=register.js.map