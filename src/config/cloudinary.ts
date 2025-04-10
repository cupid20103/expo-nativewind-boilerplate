import { v2 as cludianry } from "cloudinary";
import {
  EXPO_PUBLIC_CLOUDINARY_API_KEY,
  EXPO_PUBLIC_CLOUDINARY_API_SECRET,
  EXPO_PUBLIC_CLOUDINARY_CLOUD_NAME,
} from "./env";

cludianry.config({
  cloud_name: EXPO_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: EXPO_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: EXPO_PUBLIC_CLOUDINARY_API_SECRET,
});

export default cludianry;
