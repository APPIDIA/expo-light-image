import React, { memo, useEffect, useState } from "react";
import { Image, ImageBackground } from "react-native";
import * as FileSystem from "expo-file-system";
import sha256 from "crypto-js/sha256";

// check and get image from cache
const getCachedImage = async (digest) => {
  try {
    const image = await FileSystem.getInfoAsync(
      FileSystem.cacheDirectory + digest
    );
    return image;
  } catch (error) {
    throw error;
  }
};

// write image to cache
const writeImageToCache = async (uri, digest) => {
  try {
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
  const digest = sha256(source?.uri);
  const [imageUri, setImageUri] = useState(FileSystem.cacheDirectory + digest);

  const load = async () => {
    const cachedResumable = await getCachedImage(digest);

    if (!cachedResumable.exists) {
      const { uri } = await writeImageToCache(source.uri, digest);
      setImageUri(`${uri}/frc`);
      setImageUri(uri);
    } else {
      setImageUri(cachedResumable.uri);
    }
  };

  useEffect(() => {
    if (source?.uri) {
      load();
    }
  }, [source]);

  return !isBackground ? (
    <Image source={source?.uri ? { uri: imageUri } : source} {...props} />
  ) : (
    <ImageBackground
      source={source?.uri ? { uri: imageUri } : source}
      {...props}
    >
      {children}
    </ImageBackground>
  );
};

LightImage.defaultProps = {
  isBackground: false,
};

export default memo(LightImage);
