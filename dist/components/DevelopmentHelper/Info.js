import React from "react";
import { View } from "react-native";
import Text from "./Text";
import { DevHelperButton } from "./Button";
export const DevHelperInfo = ({ position, onPositionChanged, }) => {
    return (React.createElement(View, { style: {
            padding: 10,
            borderRadius: 10,
            gap: 10,
        } },
        React.createElement(Text, null, "Dieser Bereich ist nur f\u00FCr Entwickler. // This is only for Development Purposes."),
        React.createElement(View, { style: { flexDirection: "row", gap: 20, alignItems: "center" } },
            React.createElement(Text, null, "Position:"),
            React.createElement(DevHelperButton, { onPress: () => onPositionChanged({
                    ...position,
                    horizontal: position.horizontal === "left" ? "right" : "left",
                }), icon: position.horizontal === "left" ? "arrow-right" : "arrow-left" }),
            React.createElement(DevHelperButton, { onPress: () => onPositionChanged({
                    ...position,
                    vertical: position.vertical === "top" ? "bottom" : "top",
                }), icon: position.vertical === "top" ? "arrow-down" : "arrow-up" }))));
};
