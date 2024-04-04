import React from "react";
import { View } from "react-native";
import Text from "./Text";
import { DevHelperProp } from "./Prop";
import { DevHelperButton } from "./Button";

export const DevHelperPins = ({
  pins,
  properties,
  onPinChange,
  onResetPins,
}: {
  pins: string[];
  properties: { [key: string]: any };
  onPinChange: (pin: string) => void;
  onResetPins: () => void;
}) => {
  const pinValue = (pin: string) => {
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

  return (
    <View>
      <Text>Pins:</Text>

      <DevHelperButton onPress={() => onResetPins()} title="Reset Pins" />

      <View
        style={{
          gap: 10,
        }}
      >
        {pins.map((pin) => (
          <DevHelperProp
            key={pin}
            name={pin}
            value={pinValue(pin)}
            onTogglePin={(p) => onPinChange(p)}
          />
        ))}

        {pins.length === 0 && <Text>No Pins</Text>}
      </View>
    </View>
  );
};
