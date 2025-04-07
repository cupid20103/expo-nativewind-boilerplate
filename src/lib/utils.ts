import Toast from "react-native-root-toast";
import { twMerge } from "tailwind-merge";
import { type ClassValue, clsx } from "clsx";
import { MessageType } from "@/types/utils";

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const message = ({
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
