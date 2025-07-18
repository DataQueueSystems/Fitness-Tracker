import {Dimensions, StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import Onboarding from 'react-native-onboarding-swiper';
import CustomText from '../customText/CustomText';
import {useTheme} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {fonts} from '../customText/fonts';
import {hexToRgba} from '../../utils/globa';
import {Iconify} from 'react-native-iconify';

const FirstScreen = theme => ({
  backgroundColor: theme.colors.banner1,

  title: (
    <>
      <View style={{flexDirection: 'row', gap: 1, marginHorizontal: 6}}>
        <CustomText
          style={{
            fontFamily: fonts.Bold,
            fontSize: 24,
            color: theme.colors.appColor,
          }}>
          Your Health, Your Way
        </CustomText>
      </View>
      <CustomText
        style={{
          fontFamily: fonts.Bold,
          fontSize: 17,
          color: theme.colors.text,
        }}>
        Kickstart Your Fitness Lifestyle
      </CustomText>
    </>
  ),
  subtitle: (
    <>
      <View style={{marginTop: 5, marginHorizontal: 4}}>
        <CustomText
          style={{
            fontFamily: fonts.Regular,
            fontSize: 15,
            textAlign: 'center',
            color: hexToRgba(theme.colors.text, 0.7),
          }}>
          Begin your journey towards a healthier you. Set goals, stay committed,
          and transform your routine with confidence.
        </CustomText>
      </View>
    </>
  ),
  image: (
    <View style={styles.imageContainer}>
      <Iconify
        icon="arcticons:mapmyfitness"
        size={280}
        color={theme.colors.appColor}
      />
    </View>
  ),
});

const SecondScreen = theme => ({
  backgroundColor: theme.colors.banner2,

  title: (
    <>
      <View style={{flexDirection: 'row', gap: 1, marginHorizontal: 6}}>
        <CustomText
          style={{
            fontFamily: fonts.Bold,
            fontSize: 24,
            color: theme.colors.appColor,
          }}>
          Stay on Top of Your Goals
        </CustomText>
      </View>
      <CustomText
        style={{
          fontFamily: fonts.Bold,
          fontSize: 18,
          color: theme.colors.text,
        }}>
        Insights That Keep You Moving
      </CustomText>
    </>
  ),
  subtitle: (
    <>
      <View style={{marginTop: 5, marginHorizontal: 4}}>
        <CustomText
          style={{
            fontFamily: fonts.Regular,
            fontSize: 15,
            textAlign: 'center',
            color: hexToRgba(theme.colors.text, 0.7),
          }}>
          Analyze your activity, track achievements, and push your limits with
          smart insights and visual progress updates.
        </CustomText>
      </View>
    </>
  ),
  image: (
    <View style={styles.imageContainer}>
      <Iconify
        icon="mynaui:chart-line"
        size={280}
        color={theme.colors.appColor}
      />
    </View>
  ),
});

const ThirdScreen = theme => ({
  backgroundColor: theme.colors.banner3,

  title: (
    <>
      <View style={{flexDirection: 'row', gap: 1, marginHorizontal: 2}}>
        <CustomText
          style={{
            fontFamily: fonts.Bold,
            fontSize: 24,
            color: theme.colors.appColor,
          }}>
          Smarter Fitness, Just for You
        </CustomText>
      </View>
      <CustomText
        style={{
          fontFamily: fonts.Bold,
          fontSize: 18,
          color: theme.colors.text,
        }}>
        AI-Powered Health Guidance
      </CustomText>
    </>
  ),
  subtitle: (
    <>
      <View style={{marginTop: 5, marginHorizontal: 4}}>
        <CustomText
          style={{
            fontFamily: fonts.Regular,
            fontSize: 15,
            textAlign: 'center',
            color: hexToRgba(theme.colors.text, 0.7),
          }}>
          Get curated workouts, meal ideas, and weekly routines based on your
          body and goals — no more guessing.
        </CustomText>
      </View>
    </>
  ),
  image: (
    <View style={styles.imageContainer}>
      <Iconify
        icon="ri:apps-2-ai-line"
        size={280}
        color={theme.colors.appColor}
      />
    </View>
  ),
});

export default function OnboardingScreen() {
  const theme = useTheme();
  const navigation = useNavigation();

  const handleNavigate = () => {
    navigation.navigate('Login');
  };

  return (
    <>
      <Onboarding
        onDone={handleNavigate}
        onSkip={handleNavigate} // Replace 'HomeScreen' with your desired navigation target
        containerStyles={{flex: 1, justifyContent: 'center'}}
        pages={[FirstScreen(theme), SecondScreen(theme), ThirdScreen(theme)]}
        bottomBarHighlight={false}
        skipLabel={
          <CustomText
            style={{
              fontSize: 16,
              color: theme.colors.appColor,
              fontFamily: fonts.Medium,
            }}>
            Skip
          </CustomText>
        }
        nextLabel={
          <CustomText
            style={{
              fontSize: 16,
              color: theme.colors.appColor,
              fontFamily: fonts.Medium,
            }}>
            Next
          </CustomText>
        }
      />
    </>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    zIndex: 1,
  },
  image: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').width,
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 50,
    marginHorizontal: 5,
    bottom: 40,
  },
});
