import React from "react";
import { StyleProp, ViewStyle } from "react-native";

export type ContentMode = "pins" | "info" | "properties" | "actions" | "children";

/* ComponentProps */
export type DevelopmentHelperProperties = {
  [key: string]: any;
};

export type DevelopmentHelperProps = {
  style?: StyleProp<ViewStyle>;
  children?: React.ReactNode | React.ReactNode[];
  show?: boolean;
  properties?: DevelopmentHelperProperties;
  actions?: {
    [key: string]: () => void;
  };
};

export type DevelopmentHelperPosition = {
  vertical: "top" | "bottom";
  horizontal: "left" | "right";
};

export type IconBoxProps = {
  icon: string;
  size?: "small" | "medium" | "large";
  bgColor?: string;
  iconColor?: string;
  rounded?: "small" | "medium" | "large";
  alignment?: "center" | "flex-start" | "flex-end";
};