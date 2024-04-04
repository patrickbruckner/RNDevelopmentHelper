import React, { useMemo } from "react";
import {
  devHelperBlack,
  devHelperBlue,
  devHelperGray,
  devHelperGreen,
  devHelperRed,
  devHelperWhite,
  devHelperYellow,
} from "../../config";
import { Pressable, View } from "react-native";
import Text from "./Text";
import FontAwesome from "@expo/vector-icons/FontAwesome5";

export const DevHelperProp = ({
  name,
  value,
  key,
  prefix = "",
  isPinned = false,
  onTogglePin,
}: {
  key: string | number;
  name: string;
  value: any;
  prefix?: string;
  isPinned?: boolean;
  onTogglePin: (pin: string) => void;
}) => {
  const isHorizontal = useMemo(() => {
    if (
      typeof value === "string" ||
      typeof value === "number" ||
      typeof value === "boolean" ||
      value === null ||
      value === undefined ||
      (Array.isArray(value) && value.length === 0)
    ) {
      return true;
    }
    return false;
  }, [value]);

  const pinName = prefix ? `${prefix}.${name}` : name;

  const [contentVisible, setContentVisible] = React.useState(isHorizontal);

  return (
    <View
      key={key}
      style={{
        borderLeftWidth: 2,
        borderColor: devHelperBlue,
        paddingVertical: 4,
        paddingLeft: 4,
        gap: isHorizontal ? 4 : 10,
      }}
    >
      <DevHelperPropLine
        value={value}
        name={name}
        isPinned={isPinned}
        onTogglePin={() => onTogglePin(pinName)}
        toggleContentVisible={() => setContentVisible((v) => !v)}
      />

      {contentVisible && (
        <View
          style={{
            paddingLeft: 4,
            gap: 4,
          }}
        >
          <DevHelperValue
            value={value}
            prefix={pinName}
            onTogglePin={onTogglePin}
          />
        </View>
      )}
    </View>
  );
};

const DevHelperPropLine = ({
  name,
  value,
  isPinned = false,
  onTogglePin,
  toggleContentVisible,
}: {
  name: string;
  value: any;
  isPinned?: boolean;
  onTogglePin: () => void;
  toggleContentVisible: () => void;
}) => {
  return (
    <Pressable
      onPress={() => toggleContentVisible()}
      style={{
        flexGrow: 1,
        flexShrink: 1,
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >
      <View
        style={{
          maxWidth: "60%",
          flexDirection: "row",
          gap: 8,
          alignItems: "center",
        }}
      >
        <Pressable onPress={() => onTogglePin()}>
          <FontAwesome
            name={isPinned ? "map-pin" : "map-pin"}
            size={16}
            color={isPinned ? devHelperGreen : devHelperBlack}
          />
        </Pressable>

        <Text>{name}</Text>
      </View>

      <DevHelperTag value={value} />
    </Pressable>
  );
};

const DevHelperTag = ({ value }: { value: any }) => {
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

    if (value instanceof Date && !isNaN(value as any)) {
      return "date";
    }

    if (typeof value === "object") {
      return `object | ${Object.entries(value)?.length}`;
    }

    return "unknown";
  }, [value]);

  return (
    <View
      style={{
        backgroundColor: tagBackground,
        paddingHorizontal: 10,
        paddingVertical: 3,
        borderRadius: 10,
      }}
    >
      <Text small bold color={tagColor}>
        {tagValue}
      </Text>
    </View>
  );
};

const DevHelperTextValue = ({ value }: { value: string }) => {
  return (
    <View
      style={{
        backgroundColor: devHelperWhite,
        paddingVertical: 3,
        paddingHorizontal: 10,
        borderRadius: 5,
      }}
    >
      <Text>{value}</Text>
    </View>
  );
};

const DevHelperValue = ({
  prefix,
  value,
  onTogglePin,
}: {
  prefix: string;
  value: any;
  onTogglePin: (pin: string) => void;
}) => {
  if (value === undefined) {
    return <></>;
    // return <DevHelperTextValue value="Value is undefined" />;
  }

  if (value === null) {
    return <></>;
    // return <DevHelperTextValue value="Value is null" />;
  }

  if (typeof value === "number") {
    return <DevHelperTextValue value={value.toFixed(2)} />;
  }

  if (typeof value === "string") {
    return <DevHelperTextValue value={value} />;
  }

  if (typeof value === "boolean") {
    return <></>;
    // return <DevHelperTextValue value={value.toString()} />;
  }

  if (Array.isArray(value) && value.length === 0) {
    return <></>;
    // return <DevHelperTextValue value="Array is empty" />;
  }

  if (Array.isArray(value) && value.length > 0) {
    return (
      <View>
        {value.map((item, index) => (
          <DevHelperProp
            key={index}
            name={index.toFixed()}
            value={item}
            prefix={prefix}
            onTogglePin={(p) => onTogglePin(p)}
          />
        ))}
      </View>
    );
  }

  // if (Object.entries(value).length === 0) {
  //   return <DevHelperTextValue value="Object is empty" />;
  // }

  if (typeof value === "object" && Object.entries(value).length > 0) {
    return (
      <View>
        {Object.entries(value).map(([key, val]) => (
          <DevHelperProp
            key={key}
            name={key}
            value={val}
            prefix={prefix}
            onTogglePin={(p) => onTogglePin(p)}
          />
        ))}
      </View>
    );
  }

  if (value instanceof Date && !isNaN(value as any)) {
    return <DevHelperTextValue value={value.toISOString()} />;
  }

  return (
    <DevHelperTextValue value={`NO VALUE FOR: ${JSON.stringify(value)}`} />
  );
};
