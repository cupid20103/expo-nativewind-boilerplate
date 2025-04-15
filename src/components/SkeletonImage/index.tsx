import React, { useState } from "react";
import { View } from "react-native";
import { Image } from "expo-image";
import { cn } from "@/lib/utils";
import { SkeletonImageProps } from "@/types/component";

const SkeletonImage: React.FC<SkeletonImageProps> = ({
  className = "",
  uri,
}) => {
  const [loading, setLoading] = useState(true);

  return (
    <View className={cn("relative", className)}>
      {loading && (
        <View className="absolute inset-0 bg-gray-500 animate-pulse" />
      )}
      <Image
        className="w-full h-full"
        source={{ uri: uri }}
        onLoadEnd={() => setLoading(false)}
        contentFit="cover"
      />
    </View>
  );
};

export default SkeletonImage;
