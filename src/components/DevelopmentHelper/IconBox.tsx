import React from "react";
import { View } from "react-native";
import { IconBoxProps } from "../../types";
import FontAwesome from "@expo/vector-icons/FontAwesome5";

export const IconBox = ({
  icon,
  size = "medium",
  rounded = "medium",
  bgColor,
  iconColor,
  alignment = "center",
}: IconBoxProps) => {
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

  return (
    <View
      style={{
        borderRadius: roundedMap[rounded],
        height: sizeMap[size],
        width: sizeMap[size],
        backgroundColor: bgColor,
        alignItems: "center",
        justifyContent: "center",
        alignSelf: alignment,
      }}
    >
      <FontAwesome name={icon} size={sizeMap[size] * 0.5} color={iconColor} />
    </View>
  );
};

export default IconBox;
