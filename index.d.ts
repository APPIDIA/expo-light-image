import React from "react";
import { ImageProps } from "react-native";

export interface LightImageProps extends ImageProps {
  isBackground?: Boolean;
}

export default function LightImage(props: LightImageProps): React.FC;
