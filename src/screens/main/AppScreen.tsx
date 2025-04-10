import React, { useCallback, useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import { Image } from "expo-image";
import * as ImagePicker from "expo-image-picker";
import { fetch } from "expo/fetch";
import Feather from "@expo/vector-icons/Feather";
import { HairStyle, UploadModal } from "@/components";
import { hairStyleData } from "@/lib/constant";
import { cn, imageToBase64, isEmpty, toast } from "@/lib/utils";
import { EXPO_PUBLIC_API_URI } from "@/config/env";

const AppScreen: React.FC = () => {
  const [selfie, setSelfie] = useState<string | undefined>(undefined);
  const [prompt, setPrompt] = useState<string>("");
  const [modalVisible, setModalVisible] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [avatarURL, setAvatarURL] = useState<string | undefined>(undefined);
  const [result, setResult] = useState<string | undefined>(undefined);

  const uploadImage = async (mode: string) => {
    try {
      if (mode === "camera") {
        await ImagePicker.requestCameraPermissionsAsync();

        const result = await ImagePicker.launchCameraAsync({
          cameraType: ImagePicker.CameraType.front,
          allowsEditing: true,
          aspect: [1, 1],
          quality: 1,
        });

        if (!result.canceled) {
          setSelfie(result.assets[0].uri);
        }
      } else if (mode === "gallery") {
        const result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ["images"],
          allowsEditing: true,
          aspect: [1, 1],
          quality: 1,
        });

        if (!result.canceled) {
          setSelfie(result.assets[0].uri);
        }
      } else {
        setSelfie(undefined);
      }

      setModalVisible(false);
    } catch (error) {
      toast({ message: "Failed to pick image" });

      console.error(error);
    }
  };

  const handleImage = async () => {
    if (!selfie) return;

    try {
      setIsLoading(true);

      if (!isReady) {
        const imageUri = await imageToBase64(selfie);

        const response = await fetch(`${EXPO_PUBLIC_API_URI}/upload`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ imageUri }),
        });

        if (!response.ok) {
          throw new Error("Failed to upload image");
        }

        const data = await response.json();

        if (data.error) {
          throw new Error(data.error);
        }

        setAvatarURL(data.result);
        setIsReady(true);
      } else {
        const response = await fetch(`${EXPO_PUBLIC_API_URI}/hair`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ avatarURL, prompt: prompt.trim() }),
        });

        const data = await response.json();

        if (data.error) {
          throw new Error(data.error);
        }

        setResult(data.result);
      }
    } catch (error) {
      toast({ message: "Failed to process image" });

      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClear = useCallback(() => {
    setIsReady(false);
    setResult(undefined);
  }, []);

  return (
    <ScrollView>
      <View className="flex flex-col gap-y-5 mx-5 my-7">
        <View className="flex flex-col gap-y-5">
          {!isReady ? (
            <View className="flex flex-col gap-y-3">
              <Text className="text-4xl font-bold text-center">
                Try a Stunning {"\n"} New Look with {"\n"} AI Hair Magic
              </Text>
              <Text className="text-base text-gray-500 text-center">
                Upload your photo, describe your ideal hairstyle, and see the
                transformation!
              </Text>
            </View>
          ) : (
            <Pressable onPress={handleClear}>
              <Feather name="arrow-left" size={24} color="black" />
            </Pressable>
          )}
          {!isEmpty(result) && (
            <Text className="text-4xl font-bold text-center">
              Here's Your {"\n"} New Look
            </Text>
          )}
          <View className="flex flex-col gap-y-5">
            <Pressable
              className={cn(
                "w-full bg-white rounded-xl overflow-hidden",
                isReady ? "h-96" : "h-64",
                isEmpty(selfie) && "border-2 border-gray-300 border-dashed"
              )}
              onPress={() => setModalVisible(true)}
              disabled={isReady}
            >
              {isEmpty(result) ? (
                <>
                  {!isEmpty(selfie) ? (
                    <Image
                      className="w-full h-full"
                      source={{ uri: selfie }}
                      contentFit="cover"
                    />
                  ) : (
                    <View className="flex-1 flex-col items-center justify-center">
                      <View className="w-16 h-16 flex justify-center items-center bg-gray-100 rounded-full">
                        <Feather name="camera" size={20} color="black" />
                      </View>
                      <Text className="mt-3 text-base text-gray-700">
                        Upload photo
                      </Text>
                      <Text className="text-sm text-gray-500">
                        Click or drag and drop
                      </Text>
                    </View>
                  )}
                </>
              ) : (
                <Image
                  className="w-full h-full"
                  source={{ uri: result }}
                  contentFit="cover"
                />
              )}
            </Pressable>
            {!isEmpty(result) && (
              <View className="flex flex-col gap-y-5">
                <View className="h-48 flex flex-row gap-x-5">
                  <View className="flex-1 flex-col gap-y-1.5">
                    <Text className="text-base font-medium text-gray-500 text-center">
                      Before
                    </Text>
                    <Image
                      className="flex-1 rounded-xl"
                      source={{ uri: selfie }}
                      contentFit="cover"
                    />
                  </View>
                  <View className="flex-1 flex-col gap-y-1.5">
                    <Text className="text-base font-medium text-gray-500 text-center">
                      After
                    </Text>
                    <Image
                      className="flex-1 rounded-xl"
                      source={{ uri: result }}
                      contentFit="cover"
                    />
                  </View>
                </View>
                <Text className="text-lg font-medium text-gray-500 text-center">
                  Want to modify or try another look?
                </Text>
              </View>
            )}
            <TextInput
              className="p-3 text-base text-gray-700 bg-white border border-gray-300 rounded-xl"
              value={prompt}
              onChangeText={(text) => setPrompt(text)}
              numberOfLines={1}
              placeholder={
                isEmpty(result)
                  ? "e.g. Short bob with icy highlights"
                  : "e.g. Make it shorter with more layers"
              }
              placeholderTextColor="#d1d5db"
            />
            <Pressable
              className="p-3 bg-black rounded-full shadow-lg shadow-black/50 disabled:bg-black/50"
              onPress={handleImage}
              disabled={
                isEmpty(selfie) || prompt.trim().length == 0 || isLoading
              }
            >
              {isLoading ? (
                <View className="flex flex-row items-center justify-center gap-x-1.5">
                  <ActivityIndicator color="white" />
                  <Text className="text-lg font-bold text-white text-center">
                    Processing...
                  </Text>
                </View>
              ) : (
                <Text className="text-lg font-bold text-white text-center">
                  {isEmpty(result) ? "See My New Look" : "Generate New Look"}
                </Text>
              )}
            </Pressable>
          </View>
        </View>
        {isEmpty(result) && (
          <>
            {!isReady ? (
              <View className="flex flex-col gap-y-5">
                <Text className="text-lg font-semibold text-gray-700">
                  Popular Styles
                </Text>
                <View className="flex flex-row justify-between gap-x-3">
                  {hairStyleData.map((item, index) => (
                    <HairStyle
                      key={index}
                      title={item.title}
                      image={item.image}
                    />
                  ))}
                </View>
              </View>
            ) : (
              <Text className="text-sm text-gray-500 text-center">
                Your photo is processed securely for transformation only -- is
                not stored or shared.
              </Text>
            )}
          </>
        )}
      </View>
      <UploadModal
        modalVisible={modalVisible}
        onCameraPress={() => uploadImage("camera")}
        onGalleryPress={() => uploadImage("gallery")}
        onRemovePress={() => uploadImage("remove")}
        onClose={() => setModalVisible(false)}
      />
    </ScrollView>
  );
};

export default AppScreen;
