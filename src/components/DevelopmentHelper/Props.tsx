import React from "react";
import { View } from "react-native";
import { DevHelperProp } from "./Prop";
import { DevelopmentHelperProperties } from "../../types";

export const DevHelperProps = ({
  properties,
  pins,
  onPinChange,
}: {
  properties: DevelopmentHelperProperties;
  pins: string[];
  onPinChange: (pin: string) => void;
}) => {
  function isPinned(name: string) {
    return pins.includes(name);
  }

  return (
    <View style={{ gap: 4 }}>
      {Object.entries(properties).map(([name, value]) => (
        <DevHelperProp
          key={name}
          name={name}
          value={value}
          isPinned={isPinned(name)}
          onTogglePin={(pin) => onPinChange(pin)}
        />
      ))}
    </View>
  );
};
