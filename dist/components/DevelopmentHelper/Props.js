import React from "react";
import { View } from "react-native";
import { DevHelperProp } from "./Prop";
export const DevHelperProps = ({ properties, pins, onPinChange, }) => {
    function isPinned(name) {
        return pins.includes(name);
    }
    return (React.createElement(View, { style: { gap: 4 } }, Object.entries(properties).map(([name, value]) => (React.createElement(DevHelperProp, { key: name, name: name, value: value, isPinned: isPinned(name), onTogglePin: (pin) => onPinChange(pin) })))));
};
