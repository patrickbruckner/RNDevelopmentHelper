import React from "react";
import { View } from "react-native";
import Text from "./Text";
import { DevHelperProp } from "./Prop";
import { DevHelperButton } from "./Button";
export const DevHelperPins = ({ pins, properties, onPinChange, onResetPins, }) => {
    const pinValue = (pin) => {
        const pinParts = pin.split(".");
        let runningValue = properties;
        for (let i = 0; i < pinParts.length; i++) {
            const p = pinParts[i];
            // console.log("p", p);
            if (p.length === 0) {
                continue;
            }
            if (runningValue[p] === undefined) {
                return `${p} is undefined`;
            }
            runningValue = runningValue[p];
        }
        return runningValue;
    };
    return (React.createElement(View, null,
        React.createElement(Text, null, "Pins:"),
        React.createElement(DevHelperButton, { onPress: () => onResetPins(), title: "Reset Pins" }),
        React.createElement(View, { style: {
                gap: 10,
            } },
            pins.map((pin) => (React.createElement(DevHelperProp, { key: pin, name: pin, value: pinValue(pin), onTogglePin: (p) => onPinChange(p) }))),
            pins.length === 0 && React.createElement(Text, null, "No Pins"))));
};
