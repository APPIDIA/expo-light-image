import React, { memo, useEffect, useState } from "react";
import { Image, ImageBackground } from "react-native";
import * as FileSystem from "expo-file-system";
import sha256 from "crypto-js/sha256";

// check and get image from cache
const getCachedImage = async (uri) => {
  try {
    const digest = sha256(uri);
    const image = await FileSystem.getInfoAsync(
      FileSystem.cacheDirectory + digest
    );
    return image;
  } catch (error) {
    throw error;
  }
};

// write image to cache
const writeImageToCache = async (uri) => {
  try {
    const digest = sha256(uri);
    const downloadResumable = FileSystem.createDownloadResumable(
      uri,
      `${FileSystem.cacheDirectory}${digest}`
    );
    return await downloadResumable.downloadAsync();
  } catch (error) {
    throw error;
  }
};

const LightImage = ({ source, isBackground, children, ...props }) => {
  const [imageUri, setImageUri] = useState(
    `${FileSystem.cacheDirectory}${sha256(source.uri)}`
  );

  const load = async () => {
    const cachedResumable = await getCachedImage(source.uri);

    if (!cachedResumable.exists) {
      const { uri } = await writeImageToCache(source.uri);
      setImageUri(`${uri}/frc`);
      setImageUri(uri);
    }
  };

  useEffect(() => {
    if (source.uri) {
      load();
    }
  }, [source]);

  return !isBackground ? (
    <Image source={{ uri: imageUri }} {...props} />
  ) : (
    <ImageBackground source={{ uri: imageUri }} {...props}>
      {children}
    </ImageBackground>
  );
};

LightImage.defaultProps = {
  isBackground: false,
};

export default memo(LightImage);
