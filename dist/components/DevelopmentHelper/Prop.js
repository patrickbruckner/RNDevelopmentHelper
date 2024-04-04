import React, { useMemo } from "react";
import { devHelperBlack, devHelperBlue, devHelperGray, devHelperGreen, devHelperRed, devHelperWhite, devHelperYellow, } from "../../config";
import { Pressable, View } from "react-native";
import Text from "./Text";
import FontAwesome from "@expo/vector-icons/FontAwesome5";
export const DevHelperProp = ({ name, value, key, prefix = "", isPinned = false, onTogglePin, }) => {
    const isHorizontal = useMemo(() => {
        if (typeof value === "string" ||
            typeof value === "number" ||
            typeof value === "boolean" ||
            value === null ||
            value === undefined ||
            (Array.isArray(value) && value.length === 0)) {
            return true;
        }
        return false;
    }, [value]);
    const pinName = prefix ? `${prefix}.${name}` : name;
    const [contentVisible, setContentVisible] = React.useState(isHorizontal);
    return (React.createElement(View, { key: key, style: {
            borderLeftWidth: 2,
            borderColor: devHelperBlue,
            paddingVertical: 4,
            paddingLeft: 4,
            gap: isHorizontal ? 4 : 10,
        } },
        React.createElement(DevHelperPropLine, { value: value, name: name, isPinned: isPinned, onTogglePin: () => onTogglePin(pinName), toggleContentVisible: () => setContentVisible((v) => !v) }),
        contentVisible && (React.createElement(View, { style: {
                paddingLeft: 4,
                gap: 4,
            } },
            React.createElement(DevHelperValue, { value: value, prefix: pinName, onTogglePin: onTogglePin })))));
};
const DevHelperPropLine = ({ name, value, isPinned = false, onTogglePin, toggleContentVisible, }) => {
    return (React.createElement(Pressable, { onPress: () => toggleContentVisible(), style: {
            flexGrow: 1,
            flexShrink: 1,
            alignItems: "center",
            flexDirection: "row",
            justifyContent: "space-between",
        } },
        React.createElement(View, { style: {
                maxWidth: "60%",
                flexDirection: "row",
                gap: 8,
                alignItems: "center",
            } },
            React.createElement(Pressable, { onPress: () => onTogglePin() },
                React.createElement(FontAwesome, { name: isPinned ? "map-pin" : "map-pin", size: 16, color: isPinned ? devHelperGreen : devHelperBlack })),
            React.createElement(Text, null, name)),
        React.createElement(DevHelperTag, { value: value })));
};
const DevHelperTag = ({ value }) => {
    const tagBackground = useMemo(() => {
        if (typeof value === "boolean") {
            return value ? devHelperGreen : devHelperRed;
        }
        if (value === null) {
            return devHelperYellow;
        }
        if (value === undefined) {
            return devHelperGray;
        }
        return devHelperBlue;
    }, [value]);
    const tagColor = useMemo(() => {
        if (value === null) {
            return devHelperBlack;
        }
        return devHelperWhite;
    }, [value]);
    const tagValue = useMemo(() => {
        if (typeof value === "string") {
            return `string | ${value?.length}`;
        }
        if (typeof value === "number") {
            return "number";
        }
        if (typeof value === "boolean") {
            return value ? "true" : "false";
        }
        if (value === null) {
            return "null";
        }
        if (value === undefined) {
            return "undefined";
        }
        if (Array.isArray(value)) {
            return `array | ${value.length}`;
        }
        if (value instanceof Date && !isNaN(value)) {
            return "date";
        }
        if (typeof value === "object") {
            return `object | ${Object.entries(value)?.length}`;
        }
        return "unknown";
    }, [value]);
    return (React.createElement(View, { style: {
            backgroundColor: tagBackground,
            paddingHorizontal: 10,
            paddingVertical: 3,
            borderRadius: 10,
        } },
        React.createElement(Text, { small: true, bold: true, color: tagColor }, tagValue)));
};
const DevHelperTextValue = ({ value }) => {
    return (React.createElement(View, { style: {
            backgroundColor: devHelperWhite,
            paddingVertical: 3,
            paddingHorizontal: 10,
            borderRadius: 5,
        } },
        React.createElement(Text, null, value)));
};
const DevHelperValue = ({ prefix, value, onTogglePin, }) => {
    if (value === undefined) {
        return React.createElement(React.Fragment, null);
        // return <DevHelperTextValue value="Value is undefined" />;
    }
    if (value === null) {
        return React.createElement(React.Fragment, null);
        // return <DevHelperTextValue value="Value is null" />;
    }
    if (typeof value === "number") {
        return React.createElement(DevHelperTextValue, { value: value.toFixed(2) });
    }
    if (typeof value === "string") {
        return React.createElement(DevHelperTextValue, { value: value });
    }
    if (typeof value === "boolean") {
        return React.createElement(React.Fragment, null);
        // return <DevHelperTextValue value={value.toString()} />;
    }
    if (Array.isArray(value) && value.length === 0) {
        return React.createElement(React.Fragment, null);
        // return <DevHelperTextValue value="Array is empty" />;
    }
    if (Array.isArray(value) && value.length > 0) {
        return (React.createElement(View, null, value.map((item, index) => (React.createElement(DevHelperProp, { key: index, name: index.toFixed(), value: item, prefix: prefix, onTogglePin: (p) => onTogglePin(p) })))));
    }
    // if (Object.entries(value).length === 0) {
    //   return <DevHelperTextValue value="Object is empty" />;
    // }
    if (typeof value === "object" && Object.entries(value).length > 0) {
        return (React.createElement(View, null, Object.entries(value).map(([key, val]) => (React.createElement(DevHelperProp, { key: key, name: key, value: val, prefix: prefix, onTogglePin: (p) => onTogglePin(p) })))));
    }
    if (value instanceof Date && !isNaN(value)) {
        return React.createElement(DevHelperTextValue, { value: value.toISOString() });
    }
    return (React.createElement(DevHelperTextValue, { value: `NO VALUE FOR: ${JSON.stringify(value)}` }));
};
