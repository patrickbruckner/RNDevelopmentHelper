import React from "react";
import { View } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome5";
export const IconBox = ({ icon, size = "medium", rounded = "medium", bgColor, iconColor, alignment = "center", }) => {
    const sizeMap = {
        small: 24,
        medium: 36,
        large: 48,
    };
    const roundedMap = {
        small: 8,
        medium: 12,
        large: 18,
        full: 100,
    };
    return (React.createElement(View, { style: {
            borderRadius: roundedMap[rounded],
            height: sizeMap[size],
            width: sizeMap[size],
            backgroundColor: bgColor,
            alignItems: "center",
            justifyContent: "center",
            alignSelf: alignment,
        } },
        React.createElement(FontAwesome, { name: icon, size: sizeMap[size] * 0.5, color: iconColor })));
};
export default IconBox;
