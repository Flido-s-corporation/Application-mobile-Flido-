import React from 'react'
import { View, Text, Image } from 'react-native'

const disc = () => {
    return (
    <>
        <View className="bg-[#85664A] h-[80] w-full flex-row items-center justify-between px-[10]">
            <View className="flex-row items-center">
            <Image
                className="h-[50] w-[50] rounded-full"
                source={require("../../assets/images/pp/3.png")}
            />
            <View className="ml-[10]">
                <Text className="font-bold">Anna (Allemagne)</Text>
                <Text className="text-white-500">Hors ligne</Text>
            </View>
            <View className="flex flex-row items-center h-[80] ml-[190]">
            <Text className="text-[50px]">.</Text>
            <Text className="text-[50px]">.</Text>
            <Text className="text-[50px]">.</Text>
            </View>
            </View>
        </View>
        {/* Les discussions sont affichées ici */}
        <View className="flex-1 bg-[#af2424] p-[10]">
            <Text></Text>
            <Text></Text>
        </View>
      </>
    );
  };

export default disc