import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  TextInput,
  Modal,
} from "react-native";

const Contacs = () => {
  const verticalContacts = [
    {
      id: "1",
      name: "Emily (Angleterre)",
      message: "Ce fait longtemps ! Tu vas bien ?",
      source: require("../../assets/images/pp/1.png"),
    },
    {
      id: "2",
      name: "Emily (Angleterre)",
      message: "Ce fait longtemps ! Tu vas bien ?",
      source: require("../../assets/images/pp/2.png"),
    },
    {
      id: "3",
      name: "Anna (Allemagne)",
      message: "Dis, on se voit bientôt pour discuter un peu ?",
      source: require("../../assets/images/pp/3.png"),
    },
    { id: "4", name: "Camila (Brésil)", message: "Quoi de neuf chez toi ?", source: require("../../assets/images/pp/4.png"), },

    {
      id: "5",
      name: "Yuki (Japon)",
      message: "Yuki, ça me fait plaisir de te parler",
      source: require("../../assets/images/pp/5.png"),
    },
    {
      id: "6",
      name: "Michael (États-Unis)",
      message: "Toujours aussi sérieuse au travail ?",
      source: require("../../assets/images/pp/6.png"),
    },
    {
      id: "7",
      name: "Minho (Corée du Sud)",
      message: "Tas toujours des plans cool",
      source: require("../../assets/images/pp/7.png"),
    },
    { id: "8", name: "Diego (Espagne)", message: "On se capte bientôt", source: require("../../assets/images/pp/8.png"), },
    { id: "9", name: "Fatima (Maroc)", message: "Broi Ça fait un bail", source: require("../../assets/images/pp/9.png"), },
  ];

  return (
    <View className="flex-1">
      {/* Header */}
      <View className="bg-[#DECFBC] pt-[5]">
        <View className="flex-row justify-between items-center p-[3]">
          <Image
            className="h-[100] w-[100] rounded-full"
            source={require("../../assets/images/lg.jpg")}
          />
          <Image
            className="h-[80] w-[90] rounded-[20]"
            source={require("../../assets/s.png")}
          />
        </View>


        {/* Search Button */}
        <View className="pb-[20] items-center">
          <TouchableOpacity className="bg-[#000000] h-[50] w-[200] rounded-full justify-center items-center">
            <TextInput
              placeholder="Rechercher"
              placeholderTextColor="white" //
              className="font-[500] text-white w-full text-center"
              style={{ fontSize: 16 }} // Ajustez selon votre besoin
            />
          </TouchableOpacity>
        </View>
      </View>

      <View>
        {/* Contacts List - Suppression des hauteurs/marges inutiles */}
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingVertical: 10 }}
          data={[
            { id: "1", source: require("../../assets/images/1.png") },
            { id: "2", source: require("../../assets/images/2.png") },
            { id: "3", source: require("../../assets/images/3.png") },
            { id: "4", source: require("../../assets/images/4.png") },
            { id: "5", source: require("../../assets/images/5.png") },
            { id: "6", source: require("../../assets/images/1.png") },
            { id: "7", source: require("../../assets/images/3.png") },
            // ... autres items
          ]}
          renderItem={({ item }) => (
            <Image
              className="h-[80] w-[80] rounded-full mx-[1] justify-between mr-[10] "
              source={item.source}
            />
          )}
          keyExtractor={(item) => item.id}
          className="bg-[#85664A]"
        />
      </View>

      <View className="bg-[#FFFBFB] py-[2]"></View>

      <FlatList
        data={verticalContacts}
        renderItem={({ item }) => (
          <View>
            <View className="flex-row items-center p-4">
              <Image
                className="h-[60] w-[60] rounded-full mr-4"
                source={item.source}
              />
              <View className="flex-1">
                <Text className="text-white font-semibold">{item.name}</Text>
                <Text className=" text-white">{item.message}</Text>
              </View>
            </View>
            {/* Barre de séparation */}
            <View className="bg-[#FFFBFB] py-[2]" />
          </View>
        )}
        keyExtractor={(item) => item.id}
        className="flex-1 bg-[#85664A]"
      />

      <View>
        <TouchableOpacity
          className="bg-[#6B46C1] rounded-full h-16 w-16 items-center justify-center absolute bottom-6 right-6 shadow-lg"
          // onPress={() => setIsModalVisible(true)}
        >
          <Text className="text-white text-2xl">+</Text>
        </TouchableOpacity>
      </View>

      <View className="bg-slate-600 py-[40] items-center" />
      <TouchableOpacity className="bg-white rounded-full h-[50] w-[100] items-center justify-center absolute bottom-[20] right-[170]">
        <Text className="font-[500]">Fr </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Contacs;
