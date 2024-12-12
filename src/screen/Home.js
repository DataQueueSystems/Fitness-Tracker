import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Button, Divider, useTheme} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import CustomText from '../customText/CustomText';
import {fonts} from '../customText/fonts';
import Calcaulate from '../../assets/Image/Calculate.svg';
import CalculateModal from '../component/Modal/Calculate';
import Exercise from './Exercise';
import {useAuthContext} from '../context/GlobaContext';

export default function Home() {
  let theme = useTheme();
  let navigation = useNavigation();
  const {userDetail, bmi} = useAuthContext();

  const [isModalVisible, setModalVisible] = useState(false);
  const [subtitle, setSubtitle] = useState('');

  const handleNavigate = () => {
    navigation.navigate('Profile');
  };
  const ShowModal = () => {
    setModalVisible(true);
  };

  const getBMISubtitle = bmi => {
    if (bmi < 18.5) {
      return "A BMI under 18.5 is considered underweight. It's important to focus on gaining healthy weight.";
    } else if (bmi >= 18.5 && bmi < 24.9) {
      return 'Your BMI is within the healthy range! Continue maintaining a balanced diet and staying active.';
    } else if (bmi >= 25 && bmi < 29.9) {
      return "You are overweight. It's important to aim for a healthier weight through exercise and a balanced diet.";
    } else {
      return 'Your BMI falls into the obesity category. Consulting a healthcare provider for guidance is recommended.';
    }
  };

  useEffect(() => {
    if (bmi) {
      const subtitle = getBMISubtitle(bmi);
      setSubtitle(subtitle);
    }
  }, []);

  return (
    <>
      <View
        style={[
          styles.maincontainer,
          {backgroundColor: theme.colors.background},
        ]}>
        {/* Header */}
        <View style={styles.mainHeaderView}>
          <ScrollView
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}>
            <View className="flex-row items-center space-x-2 my-3 px-2">
              <TouchableOpacity onPress={handleNavigate}>
                <Image
                  className="rounded-full"
                  source={require('../../assets/Image/defaultAvtar.jpg')}
                  style={{width: 45, height: 45}}
                />
              </TouchableOpacity>
              <View className="flex-row items-center space-x-1">
                <CustomText
                  className="text-[19px]"
                  style={{fontFamily: fonts.Medium}}>
                  Good Day,
                </CustomText>
                <CustomText
                  className="text-[19px]"
                  style={{
                    fontFamily: fonts.Bold,
                    color: theme.colors.appColor,
                  }}>
                  {userDetail?.Name}
                </CustomText>
              </View>
            </View>

            <View className="flex-row justify-between px-2">
              <View className="top-6">
                <CustomText
                  numberOfLines={3}
                  className="text-[16px]"
                  style={{fontFamily: fonts.Medium}}>
                  Easily Calculate your BMI
                </CustomText>
                <Button
                  mode="contained"
                  onPress={ShowModal}
                  style={[{backgroundColor: theme.colors.btn}]}
                  className="my-1">
                  <CustomText
                    style={{
                      color: '#fff',
                      fontFamily: fonts.Bold,
                    }}>
                    Calcaulate
                  </CustomText>
                </Button>
              </View>
              <Calcaulate style={styles.Calcaulate} />
            </View>

            {bmi && (
              <View
                className="my-3 p-4 rounded-lg mx-2 "
                style={{backgroundColor: theme.colors.appDark, elevation: 10}}>
                <CustomText
                  className="text-[16px] font-medium"
                  style={{fontFamily: fonts.Medium}}>
                  {bmi >= 30
                    ? 'Obesity: You should consult a healthcare provider.'
                    : bmi >= 25
                    ? 'Overweight: It’s time to make healthier choices.'
                    : bmi >= 18.5
                    ? 'Normal Weight: Keep up the good work!'
                    : 'Underweight: You may need to focus on gaining healthy weight.'}
                </CustomText>
                <CustomText
                  className="text-[14px] text-white mt-2"
                  style={{
                    fontFamily: fonts.Regular,
                    color: theme.colors.outline,
                  }}>
                  {subtitle}
                </CustomText>
              </View>
            )}

            {bmi ? (
              <>
                <View className="my-3  px-2">
                  <CustomText
                    className="text-[18px]"
                    style={{fontFamily: fonts.Medium}}>
                    Exercise for you
                  </CustomText>
                  <Divider
                    style={{
                      width: 159,
                      borderColor: theme.colors.appColor,
                      borderWidth: 0.5,
                    }}
                  />
                </View>
                <View className="px-2">
                  <CustomText
                    className="text-[12px]"
                    style={{
                      fontFamily: fonts.Light,
                      color: theme.colors.appColor,
                    }}>
                    10-Day Exercise Plan Based on BMI:
                  </CustomText>
                </View>
                <Exercise />
              </>
            ) : (
              <>
                <View className="mt-7 px-2 mb-2">
                  <CustomText
                    className="text-[18px]"
                    style={{fontFamily: fonts.Medium}}>
                    Please enter your BMI to get personalized exercise
                    recommendations.
                  </CustomText>
                </View>
                <View className="px-2">
                  <CustomText
                    className="text-[12px]"
                    style={{
                      fontFamily: fonts.Light,
                      color: theme.colors.appColor,
                    }}>
                    We need your BMI to suggest a tailored workout plan.
                  </CustomText>
                </View>
              </>
            )}
          </ScrollView>
        </View>
      </View>

      <CalculateModal
        visible={isModalVisible}
        setModalVisible={setModalVisible}
      />
    </>
  );
}

const styles = StyleSheet.create({
  maincontainer: {
    flex: 1,
  },
  Calcaulate: {
    width: Dimensions.get('window').width / 2.3,
    height: Dimensions.get('window').width / 2.2,
  },
});
