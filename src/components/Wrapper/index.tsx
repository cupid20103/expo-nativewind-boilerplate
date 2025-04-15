import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { WrapperProps } from "@/types/component";

const Wrapper: React.FC<WrapperProps> = ({ children = <></> }) => {
  return (
    <SafeAreaView className="w-full h-full bg-[#F5F3EF] dark:bg-[#1C1B1A]">
      {children}
    </SafeAreaView>
  );
};

export default Wrapper;
