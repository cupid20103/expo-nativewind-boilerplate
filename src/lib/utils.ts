import Toast from "react-native-root-toast";
import * as FileSystem from "expo-file-system";
import { twMerge } from "tailwind-merge";
import { type ClassValue, clsx } from "clsx";
import { MessageType } from "@/types/utils";

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const toast = ({
  message = "",
  duration = 2500,
  position = 0,
}: MessageType) => {
  Toast.show(message, {
    duration: duration,
    position: position,
    animation: true,
    hideOnPress: true,
  });
};

export const isEmpty = (value: any) => {
  if (value === null || value === undefined || Number.isNaN(value)) {
    return true;
  }

  if (typeof value === "string" && value.trim() === "") {
    return true;
  }

  if (Array.isArray(value) && value.length === 0) {
    return true;
  }

  if (typeof value === "object" && Object.keys(value).length === 0) {
    return true;
  }

  if (typeof value === "number" && value === 0) {
    return true;
  }

  return false;
};

export const imageToBase64 = async (uri: string) => {
  try {
    const base64 = await FileSystem.readAsStringAsync(uri, {
      encoding: FileSystem.EncodingType.Base64,
    });

    return `data:application/octet-stream;base64,${base64}`;
  } catch (error) {
    console.error("Error converting image to Base64: ", error);
    throw error;
  }
};
