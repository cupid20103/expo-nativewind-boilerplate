import React, { useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import { Image } from "expo-image";
import * as ImagePicker from "expo-image-picker";
import Feather from "@expo/vector-icons/Feather";
import { HairStyle, UploadModal } from "@/components";
import { hairStyleData } from "@/lib/constant";
import { cn, isEmpty } from "@/lib/utils";

const AppScreen: React.FC = () => {
  const [avatar, setAvatar] = useState<string | undefined>(undefined);
  const [prompt, setPrompt] = useState<string>("");
  const [modalVisible, setModalVisible] = useState(false);
  const [isReady, setIsReady] = useState(false);

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
          setAvatar(result.assets[0].uri);
        }
      } else if (mode === "gallery") {
        const result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ["images"],
          allowsEditing: true,
          aspect: [1, 1],
          quality: 1,
        });

        if (!result.canceled) {
          setAvatar(result.assets[0].uri);
        }
      } else {
        setAvatar(undefined);
      }

      setModalVisible(false);
    } catch (error) {
      console.error("Error picking image: ", error);
    }
  };

  const handleImage = async () => {
    if (isReady) {
      console.log(`Prompt: ${prompt}`);
    } else {
      setIsReady(true);
    }
  };

  return (
    <>
      <View className="flex-1 flex-col justify-between px-5 py-10">
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
            <Pressable onPress={() => setIsReady(false)}>
              <Feather name="arrow-left" size={24} color="black" />
            </Pressable>
          )}
          <View className="flex flex-col gap-y-5">
            <Pressable
              className={cn(
                "w-full bg-white rounded-xl overflow-hidden",
                isReady ? "h-96" : "h-64",
                isEmpty(avatar) && "border-2 border-gray-300 border-dashed"
              )}
              onPress={() => setModalVisible(true)}
              disabled={isReady}
            >
              {!isEmpty(avatar) ? (
                <Image
                  className="w-full h-full"
                  source={{ uri: avatar }}
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
            </Pressable>
            <TextInput
              className="p-3 text-base text-gray-700 bg-white border border-gray-300 rounded-xl"
              value={prompt}
              onChangeText={(text) => setPrompt(text)}
              numberOfLines={1}
              placeholder="e.g. Short bob with icy highlights"
              placeholderTextColor="#d1d5db"
            />
            <Pressable
              className="p-3 bg-black rounded-full shadow-lg shadow-black/50 disabled:bg-black/50"
              onPress={handleImage}
              disabled={isEmpty(avatar) || prompt.trim().length == 0}
            >
              <Text className="text-lg font-bold text-white text-center">
                See My New Look
              </Text>
            </Pressable>
          </View>
        </View>
        {!isReady ? (
          <View className="flex flex-col gap-y-5">
            <Text className="text-lg font-semibold text-gray-700">
              Popular Styles
            </Text>
            <View className="flex flex-row justify-between gap-x-3">
              {hairStyleData.map((item, index) => (
                <HairStyle key={index} title={item.title} image={item.image} />
              ))}
            </View>
          </View>
        ) : (
          <Text className="text-sm text-gray-500 text-center">
            Your photo is processed securely for transformation only -- is not
            stored or shared.
          </Text>
        )}
      </View>
      <UploadModal
        modalVisible={modalVisible}
        onCameraPress={() => uploadImage("camera")}
        onGalleryPress={() => uploadImage("gallery")}
        onRemovePress={() => uploadImage("remove")}
        onClose={() => setModalVisible(false)}
      />
    </>
  );
};

export default AppScreen;
