import React, { useEffect, useState } from 'react';
import { Image, View, ScrollView, TouchableOpacity } from 'react-native';
import Containter from '../Container';
import { TextWhite } from '../consts/Text';
import { styles } from './news.style';
import { single } from '../consts/Strings';

import { getNews } from '../actions';

export const News = ({ navigation, route }) => {
  const [news, setNews] = useState();

  useEffect(async () => {
    setNews(await getNews());
  }, [getNews]);

  return (
    <Containter>
      <ScrollView style={styles.view}>
        {news?.map((item) => {
          return (
            <TouchableOpacity
              key={item.index}
              onPress={() => {
                navigation.navigate(single.newsItem, { item });
              }}
              style={styles.wrap}>
              <View style={styles.card}>
                <Image source={{ uri: item.image }} style={styles.image} />
              </View>
              <View style={styles.texts}>
                <TextWhite numberOfLines={2} style={styles.title}>
                  {item.title}
                </TextWhite>
                <TextWhite numberOfLines={3} style={styles.text}>
                  {item.description}
                </TextWhite>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </Containter>
  );
};
