import * as React from 'react';
import { Image, SafeAreaView, Text, View } from 'react-native';
import { news } from '../hardCodingDb/news';

export const News = ({ navigation, route }) => {
  return (
    <SafeAreaView>
      {news.map((item) => {
        return (
          <View key={item.index}>
            <Image source={{ uri: item.image }} />
            <Text>{item.title}</Text>
          </View>
        );
      })}
    </SafeAreaView>
  );
};
