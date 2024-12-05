import React from 'react';
import {View, StyleSheet, Text, ScrollView} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {useTheme} from 'react-native-paper';
import Header from '../component/Header';
import CustomText from '../customText/CustomText';
import {fonts} from '../customText/fonts';

const Tab = createMaterialTopTabNavigator();

// Exercise Screen
function ExerciseScreen() {
  let theme = useTheme();

  return (
    <ScrollView
      style={[styles.tabContainer, {backgroundColor: theme.colors.background}]}>
      <CustomText style={styles.text}>Exercise Content</CustomText>
    </ScrollView>
  );
}

// Nutrition Food Screen
function NutritionScreen() {
  let theme = useTheme();

  return (
    <ScrollView
      style={[styles.tabContainer, {backgroundColor: theme.colors.background}]}>
      <CustomText style={styles.text}>Nutrition Food Content</CustomText>
    </ScrollView>
  );
}

// Main Bookmark Component
export default function Bookmark() {
  let theme = useTheme();
  return (
    <>
      <Header screenName={'Bookmark'} backIcon={false} />
      <View
        style={[
          styles.mainContainer,
          {backgroundColor: theme.colors.background},
        ]}>
        <Tab.Navigator
          screenOptions={{
            tabBarStyle: {backgroundColor: theme.colors.background},
            tabBarLabelStyle: {
              fontFamily: fonts.Medium,
              fontSize: 14,
              color: theme.colors.appColor,
            },
            tabBarIndicatorStyle: {backgroundColor: theme.colors.appColor},
          }}>
          <Tab.Screen name="Exercise" component={ExerciseScreen} />
          <Tab.Screen name="Nutrition Food" component={NutritionScreen} />
        </Tab.Navigator>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  tabContainer: {
    flex: 1,
    padding: 10,
  },
  text: {
    fontFamily: fonts.Regular,
    fontSize: 16,
  },
});
