import React, { useMemo, useState } from "react";
import { TouchableOpacity, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import FontAwesome from "@expo/vector-icons/FontAwesome5";
import { IconBox } from "./IconBox";
import { DevHelperInfo } from "./Info";
import { DevHelperPins } from "./Pins";
import { DevHelperProps } from "./Props";
import Text from "./Text";
import { devHelperBlack, devHelperBlue, devHelperWhite } from "../../config";
const DevelopmentHelper = ({ children, style = {}, properties = {}, actions = {}, }) => {
    const [isVisible, setIsVisible] = React.useState(false);
    const [contentMode, setContentMode] = React.useState(properties ? "properties" : "children");
    const [pins, setPins] = useState([]);
    function togglePin(pin) {
        if (pins.includes(pin)) {
            setPins(pins.filter((p) => p !== pin));
        }
        else {
            setPins([...pins, pin]);
        }
    }
    const [position, setPosition] = useState({
        vertical: "top",
        horizontal: "left",
    });
    // if (!__DEV__ || APP_CONFIG.IS_DEBUG === false || !show) {
    //   return null;
    // }
    return (React.createElement(View, { style: {
            position: "absolute",
            left: position.horizontal === "left" ? 0 : undefined,
            right: position.horizontal === "right" ? 0 : undefined,
            top: position.vertical === "top" ? 0 : undefined,
            bottom: position.vertical === "bottom" ? 0 : undefined,
            flex: 1,
            backgroundColor: "white",
            borderRadius: 12,
            borderColor: devHelperBlue,
            borderWidth: 1,
            padding: isVisible ? 10 : 0,
            margin: isVisible ? 0 : 10,
            width: isVisible ? "100%" : undefined,
            shadowColor: "black",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.5,
            shadowRadius: 3.84,
            elevation: 2500,
            gap: 5,
            zIndex: 1000,
        } },
        React.createElement(View, { style: {
                flexDirection: position.horizontal === "left" ? "row" : "row-reverse",
                gap: 10,
            } },
            React.createElement(DevHelperTrigger, { onPress: () => setIsVisible((v) => !v) }),
            isVisible && (React.createElement(DevHelperTabNavigation, { contentMode: contentMode, switchMode: (m) => setContentMode(m), hasActions: Object.keys(actions).length > 0, hasChildren: !!children }))),
        isVisible && (React.createElement(ScrollView, { style: {
                flex: 1,
                maxHeight: 400,
                maxWidth: 350,
            } },
            React.createElement(View, { style: {
                    gap: 10,
                } },
                contentMode === "info" && (React.createElement(DevHelperInfo, { position: position, onPositionChanged: setPosition })),
                contentMode === "pins" && (React.createElement(DevHelperPins, { pins: pins, properties: properties, onPinChange: (p) => togglePin(p), onResetPins: () => setPins([]) })),
                contentMode === "properties" && (React.createElement(DevHelperProps, { pins: pins, properties: properties, onPinChange: (p) => togglePin(p) })),
                contentMode === "actions" &&
                    Object.entries(actions).map(([name, fName]) => (React.createElement(TouchableOpacity, { key: name, onPress: () => fName() },
                        React.createElement(Text, null, name))))),
            contentMode === "children" && (React.createElement(View, { style: [
                    style,
                    {
                        gap: 16,
                    },
                ] },
                React.createElement(Text, { small: true }, "This section is deprecated pease use properties and actions."),
                children && children))))));
};
const DevHelperTabNavigation = ({ contentMode, switchMode, hasActions, hasChildren, }) => {
    return (React.createElement(View, { style: {
            flexDirection: "row",
            gap: 5,
            flex: 1,
            borderBottomWidth: 1,
            borderBottomColor: devHelperBlue,
        } },
        React.createElement(DevHelperContentModeTrigger, { type: "Pins", isActive: contentMode === "pins", onPress: () => switchMode("pins") }),
        React.createElement(DevHelperContentModeTrigger, { type: "Properties", isActive: contentMode === "properties", onPress: () => switchMode("properties") }),
        hasActions && (React.createElement(DevHelperContentModeTrigger, { type: "Actions", isActive: contentMode === "actions", onPress: () => switchMode("actions") })),
        React.createElement(DevHelperContentModeTrigger, { type: "Info", isActive: contentMode === "info", onPress: () => switchMode("info") }),
        hasChildren && (React.createElement(DevHelperContentModeTrigger, { type: "Children", isActive: contentMode === "children", onPress: () => switchMode("children") }))));
};
const DevHelperTrigger = ({ onPress }) => {
    return (React.createElement(TouchableOpacity, { style: [
            {
                borderRadius: 10,
            },
        ], onPress: onPress },
        React.createElement(IconBox, { icon: "codepen", iconColor: devHelperBlack, size: "medium" })));
};
const DevHelperContentModeTrigger = ({ type, isActive = false, onPress, }) => {
    const iconName = useMemo(() => {
        if (type === "Pins") {
            return "map-pin";
        }
        if (type === "Info") {
            return "info";
        }
        if (type === "Properties") {
            return "code";
        }
        if (type === "Actions") {
            return "cogs";
        }
        if (type === "Children") {
            return "child";
        }
        return "";
    }, [type]);
    const Icon = ({ isActive }) => {
        return (React.createElement(FontAwesome, { name: iconName, size: 16, color: isActive ? devHelperWhite : devHelperBlack }));
    };
    return (React.createElement(TouchableOpacity, { style: {
            backgroundColor: isActive ? devHelperBlue : devHelperWhite,
            paddingHorizontal: 15,
            borderTopRightRadius: 10,
            borderTopLeftRadius: 10,
            justifyContent: "center",
            alignItems: "center",
        }, onPress: onPress },
        React.createElement(Icon, { isActive: isActive })));
};
export default DevelopmentHelper;
