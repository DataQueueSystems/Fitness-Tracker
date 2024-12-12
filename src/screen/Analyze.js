import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useTheme} from 'react-native-paper';
import CustomText from '../customText/CustomText';

export default function Analyze() {
  let theme = useTheme();
  return (
    <>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        style={[
          styles.tabContainer,
          {backgroundColor: theme.colors.background},
        ]}>
        {/* Header */}
        <CustomText>Analyze</CustomText>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({});
