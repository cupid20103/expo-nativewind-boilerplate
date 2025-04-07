import React from "react";
import { Modal, Pressable, Text, View } from "react-native";
import Feather from "@expo/vector-icons/Feather";
import { UploadModalProps } from "@/types/component";

const UploadModal: React.FC<UploadModalProps> = ({
  modalVisible,
  onCameraPress,
  onGalleryPress,
  onRemovePress,
  onClose,
}) => {
  return (
    <View>
      <Modal animationType="fade" transparent={true} visible={modalVisible}>
        <Pressable
          className="relative w-full h-full bg-black/75"
          onPress={onClose}
        >
          <View className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col gap-y-5 px-10 py-5 bg-gray-100 rounded-xl">
            <Text className="text-xl font-semibold text-center">
              Upload Photo
            </Text>
            <View className="flex flex-row items-center gap-x-5">
              <Pressable
                className="flex flex-col items-center justify-center"
                onPress={onCameraPress}
              >
                <Feather name="camera" size={24} color="black" />
                <Text className="text-base">Camera</Text>
              </Pressable>
              <Pressable
                className="flex flex-col items-center justify-center"
                onPress={onGalleryPress}
              >
                <Feather name="image" size={24} color="black" />
                <Text className="text-base">Gallery</Text>
              </Pressable>
              <Pressable
                className="flex flex-col items-center justify-center"
                onPress={onRemovePress}
              >
                <Feather name="trash-2" size={24} color="black" />
                <Text className="text-base">Remove</Text>
              </Pressable>
            </View>
          </View>
        </Pressable>
      </Modal>
    </View>
  );
};

export default UploadModal;
