import React from 'react';
import { Image, ScrollView } from 'react-native';
import { TextWhite } from '../consts/Text';
import Containter from '../Container';
import { styles } from './news.style';

export const NewsItem = ({ route }) => {
  const { index, title, description, image } = route.params.item;
  return (
    <Containter>
      <ScrollView style={styles.view}>
        <Image source={{ uri: image }} style={styles.imageItem} />
        <TextWhite style={styles.titleItem}>{title}</TextWhite>
        <TextWhite style={styles.description}>{description}</TextWhite>
      </ScrollView>
    </Containter>
  );
};
