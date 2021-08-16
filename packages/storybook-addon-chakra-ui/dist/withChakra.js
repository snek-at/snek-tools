"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.withChakra = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("@chakra-ui/react");
const theme = react_1.extendTheme({});
const ChakraColorModeToggle = ({ colorMode }) => {
    const { setColorMode } = react_1.useColorMode();
    setColorMode(colorMode);
    return null;
};
function withChakra(Story, context) {
    const chakraParameters = context.parameters.chakra;
    const isDarkmode = context.globals.isDarkmode;
    return (jsx_runtime_1.jsxs(react_1.ChakraProvider, Object.assign({ theme: theme }, chakraParameters, { children: [jsx_runtime_1.jsx(ChakraColorModeToggle, { colorMode: isDarkmode ? 'dark' : 'light' }, void 0), jsx_runtime_1.jsx(Story, Object.assign({}, context), void 0)] }), void 0));
}
exports.withChakra = withChakra;
//# sourceMappingURL=withChakra.js.map