import React from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, TextInput, Modal } from 'react-native';

const Contacs = () => {

    const verticalContacts = [
        { id: '1', name: 'Emily (Angleterre)', message: 'Ce fait longtemps ! Tu vas bien ?' },
        { id: '2', name: 'Emily (Angleterre)', message: 'Ce fait longtemps ! Tu vas bien ?' },
        { id: '3', name: 'Anna (Allemagne)', message: 'Dis, on se voit bientôt pour discuter un peu ?' },
        { id: '4', name: 'Camila (Brésil)', message: 'Quoi de neuf chez toi ?' },
        { id: '5', name: 'Yuki (Japon)', message: 'Yuki, ça me fait plaisir de te parler' },
        { id: '6', name: 'Michael (États-Unis)', message: 'Toujours aussi sérieuse au travail ?' },
        { id: '7', name: 'Minho (Corée du Sud)', message: 'Tas toujours des plans cool' },
        { id: '8', name: 'Diego (Espagne)', message: 'On se capte bientôt' },
        { id: '9', name: 'Fatima (Maroc)', message: 'Broi Ça fait un bail' },
      ];

  return (
    <View className="flex-1">
      {/* Header */}
      <View className="bg-[#817D7D] pt-[5]">
        <View className="flex-row justify-between items-center p-[3]">
          <Image
            className="h-[100] w-[100] rounded-full"
            source={require('../../assets/images/lg.jpg')}
          />
          <Image
            className="h-[80] w-[80] rounded-[20]"
            source={require('../../assets/images/lg.jpg')}
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
          { id: '1', source: require('../../assets/images/lg.jpg') },
          { id: '2', source: require('../../assets/images/lg.jpg') },
          { id: '3', source: require('../../assets/images/lg.jpg') },
          { id: '4', source: require('../../assets/images/lg.jpg') },
          { id: '5', source: require('../../assets/images/lg.jpg') },
          { id: '6', source: require('../../assets/images/lg.jpg') },
          { id: '7', source: require('../../assets/images/lg.jpg') },
          // ... autres items
        ]}
        renderItem={({ item }) => (
          <Image
            className="h-[80] w-[80] rounded-full mx-[1] "
            source={item.source}
          />
        )}
        keyExtractor={item => item.id}
        className="bg-[#2F2F2F2F]"
      />
    </View>

      
      <View className="bg-[#FFFBFB] py-[2]">
      </View>

      <FlatList
        data={verticalContacts}
        renderItem={({ item }) => (
          <View>
            <View className="flex-row items-center p-4">
              <Image
                className="h-[60] w-[60] rounded-full mr-4"
                source={require('../../assets/images/lg.jpg')}
              />
              <View className="flex-1">
                <Text className="text-lg font-semibold">{item.name}</Text>
                <Text className="text-gray-600">{item.message}</Text>
              </View>
            </View>
            {/* Barre de séparation */}
            <View className="bg-[#FFFBFB] py-[2]" />
          </View>
        )}
        keyExtractor={item => item.id}
        className="flex-1 bg-[#2F2F2F2F]"
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
        <TouchableOpacity className="bg-white rounded-full h-[50] w-[100] items-center justify-center absolute bottom-[20] right-[20]">
                <Text className="font-[500]">Fr </Text>
        </TouchableOpacity>
    </View>
  );
};

export default Contacs;