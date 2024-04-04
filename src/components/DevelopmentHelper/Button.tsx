import React from "react";
import { TouchableOpacity } from "react-native";
import { devHelperBlue, devHelperWhite } from "../../config";
import Text from "./Text";
import FontAwesome from "@expo/vector-icons/FontAwesome5";

export const DevHelperButton = ({
  onPress,
  title,
  icon,
}: {
  onPress: () => void;
  title?: string;
  icon?: string;
}) => {
  return (
    <TouchableOpacity
      style={{
        backgroundColor: devHelperBlue,
        padding: 10,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
      }}
      onPress={onPress}
    >
      {title && (
        <Text bold color="white">
          {title}
        </Text>
      )}
      {icon && <FontAwesome name={icon} size={16} color={devHelperWhite} />}
    </TouchableOpacity>
  );
};
