import React, { useMemo, useState } from "react";
import { TouchableOpacity, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import FontAwesome from "@expo/vector-icons/FontAwesome5";
import { IconBox } from "./IconBox";
import { DevHelperInfo } from "./Info";
import { DevHelperPins } from "./Pins";
import { DevHelperProps } from "./Props";
import Text from "./Text";
import {
  ContentMode,
  DevelopmentHelperPosition,
  DevelopmentHelperProps,
} from "../../types";
import { devHelperBlack, devHelperBlue, devHelperWhite } from "../../config";

const DevelopmentHelper = ({
  children,
  style = {},
  properties = {},
  actions = {},
}: DevelopmentHelperProps) => {
  const [isVisible, setIsVisible] = React.useState(false);
  const [contentMode, setContentMode] = React.useState<ContentMode>(
    properties ? "properties" : "children"
  );

  const [pins, setPins] = useState<string[]>([]);

  function togglePin(pin: string) {
    if (pins.includes(pin)) {
      setPins(pins.filter((p) => p !== pin));
    } else {
      setPins([...pins, pin]);
    }
  }

  const [position, setPosition] = useState<DevelopmentHelperPosition>({
    vertical: "top",
    horizontal: "left",
  });

  return (
    <View
      style={{
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
        gap: 5,
        elevation: 2500,
        zIndex: 1000,
      }}
    >
      <View
        style={{
          flexDirection: position.horizontal === "left" ? "row" : "row-reverse",
          gap: 10,
        }}
      >
        <DevHelperTrigger onPress={() => setIsVisible((v) => !v)} />

        {isVisible && (
          <DevHelperTabNavigation
            contentMode={contentMode}
            switchMode={(m) => setContentMode(m)}
            hasActions={Object.keys(actions).length > 0}
            hasChildren={!!children}
          />
        )}
      </View>

      {isVisible && (
        <ScrollView
          style={{
            flex: 1,
            maxHeight: 400,
            maxWidth: 350,
          }}
        >
          <View
            style={{
              gap: 10,
            }}
          >
            {contentMode === "info" && (
              <DevHelperInfo
                position={position}
                onPositionChanged={setPosition}
              />
            )}

            {contentMode === "pins" && (
              <DevHelperPins
                pins={pins}
                properties={properties}
                onPinChange={(p) => togglePin(p)}
                onResetPins={() => setPins([])}
              />
            )}

            {contentMode === "properties" && (
              <DevHelperProps
                pins={pins}
                properties={properties}
                onPinChange={(p) => togglePin(p)}
              />
            )}

            {contentMode === "actions" &&
              Object.entries(actions).map(([name, fName]) => (
                <TouchableOpacity key={name} onPress={() => fName()}>
                  <Text>{name}</Text>
                </TouchableOpacity>
              ))}
          </View>

          {contentMode === "children" && (
            <View
              style={[
                style,
                {
                  gap: 16,
                },
              ]}
            >
              <Text small>
                This section is deprecated pease use properties and actions.
              </Text>

              {children && children}
            </View>
          )}
        </ScrollView>
      )}
    </View>
  );
};

const DevHelperTabNavigation = ({
  contentMode,
  switchMode,
  hasActions,
  hasChildren,
}: {
  contentMode: ContentMode;
  switchMode: (mode: ContentMode) => void;
  hasActions: boolean;
  hasChildren: boolean;
}) => {
  return (
    <View
      style={{
        flexDirection: "row",
        gap: 5,
        flex: 1,
        borderBottomWidth: 1,
        borderBottomColor: devHelperBlue,
      }}
    >
      <DevHelperContentModeTrigger
        type="Pins"
        isActive={contentMode === "pins"}
        onPress={() => switchMode("pins")}
      />
      <DevHelperContentModeTrigger
        type="Properties"
        isActive={contentMode === "properties"}
        onPress={() => switchMode("properties")}
      />
      {hasActions && (
        <DevHelperContentModeTrigger
          type="Actions"
          isActive={contentMode === "actions"}
          onPress={() => switchMode("actions")}
        />
      )}
      <DevHelperContentModeTrigger
        type="Info"
        isActive={contentMode === "info"}
        onPress={() => switchMode("info")}
      />
      {hasChildren && (
        <DevHelperContentModeTrigger
          type="Children"
          isActive={contentMode === "children"}
          onPress={() => switchMode("children")}
        />
      )}
    </View>
  );
};

const DevHelperTrigger = ({ onPress }: { onPress: () => void }) => {
  return (
    <TouchableOpacity
      style={[
        {
          borderRadius: 10,
        },
      ]}
      onPress={onPress}
    >
      <IconBox icon="codepen" iconColor={devHelperBlack} size="medium" />
    </TouchableOpacity>
  );
};

const DevHelperContentModeTrigger = ({
  type,
  isActive = false,
  onPress,
}: {
  type: string;
  isActive?: boolean;
  onPress: () => void;
}) => {
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

  const Icon = ({ isActive }: { isActive: boolean }) => {
    return (
      <FontAwesome
        name={iconName}
        size={16}
        color={isActive ? devHelperWhite : devHelperBlack}
      />
    );
  };

  return (
    <TouchableOpacity
      style={{
        backgroundColor: isActive ? devHelperBlue : devHelperWhite,
        paddingHorizontal: 15,
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        justifyContent: "center",
        alignItems: "center",
      }}
      onPress={onPress}
    >
      <Icon isActive={isActive} />
    </TouchableOpacity>
  );
};

export default DevelopmentHelper;
