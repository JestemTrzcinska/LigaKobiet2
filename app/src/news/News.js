import React from 'react';
import { Image, SafeAreaView, Text, View, StyleSheet, Row } from 'react-native';
import { news } from '../hardCodingDb/news';

export const News = ({ navigation, route }) => {
  return (
    <SafeAreaView style={styles.flex}>
      {news.map((item) => {
        return (
          <View key={item.index} style={styles.card}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <Text>{item.title}</Text>
          </View>
        );
      })}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  flex: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  card: {
    backgroundColor: 'red',
    width: 150,
    height: 150,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
  },
  image: { width: 100, height: 100 },
});
