import React from "react";
import { Text } from "react-native";
import { devHelperBlack } from "../../config";
export const DevHelperText = ({ small, bold, color, children }) => {
    return (React.createElement(Text, { style: {
            fontSize: small ? 12 : 16,
            fontWeight: bold ? "bold" : "normal",
            color: color || devHelperBlack,
        } }, children));
};
export default DevHelperText;
