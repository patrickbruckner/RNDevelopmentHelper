import React from "react";
import { Text } from "react-native";
import type { TextProps as NativeTextProps } from "react-native";
import { devHelperBlack } from "../../config";

type TextProps = NativeTextProps & {
  small?: boolean;
  bold?: boolean;
  children?: string;
  color?: string;
};

export const DevHelperText = ({ small, bold, color, children }: TextProps) => {
  return (
    <Text
      style={{
        fontSize: small ? 12 : 16,
        fontWeight: bold ? "bold" : "normal",
        color: color || devHelperBlack,
      }}
    >
      {children}
    </Text>
  );
};

export default DevHelperText;
