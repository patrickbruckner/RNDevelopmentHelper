import React from "react";
import { View } from "react-native";
import Text from "./Text";
import { DevHelperButton } from "./Button";
import { DevelopmentHelperPosition } from "../../types";

export const DevHelperInfo = ({
  position,
  onPositionChanged,
}: {
  position: DevelopmentHelperPosition;
  onPositionChanged: (position: DevelopmentHelperPosition) => void;
}) => {
  return (
    <View
      style={{
        padding: 10,
        borderRadius: 10,
        gap: 10,
      }}
    >
      <Text>
        Dieser Bereich ist nur für Entwickler. // This is only for Development
        Purposes.
      </Text>

      <View style={{ flexDirection: "row", gap: 20, alignItems: "center" }}>
        <Text>Position:</Text>
        <DevHelperButton
          onPress={() =>
            onPositionChanged({
              ...position,
              horizontal: position.horizontal === "left" ? "right" : "left",
            })
          }
          icon={position.horizontal === "left" ? "arrow-right" : "arrow-left"}
        />
        <DevHelperButton
          onPress={() =>
            onPositionChanged({
              ...position,
              vertical: position.vertical === "top" ? "bottom" : "top",
            })
          }
          icon={position.vertical === "top" ? "arrow-down" : "arrow-up"}
        />
      </View>
    </View>
  );
};
