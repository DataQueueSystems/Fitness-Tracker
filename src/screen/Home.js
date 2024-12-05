import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {Button, useTheme} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import CustomText from '../customText/CustomText';
import {fonts} from '../customText/fonts';
import Calcaulate from '../../assets/Image/Calculate.svg';
import CalculateModal from '../component/Modal/Calculate';

export default function Home() {
  let theme = useTheme();
  let navigation = useNavigation();

  const [isModalVisible, setModalVisible] = useState(false);

  const handleNavigate = () => {
    navigation.navigate('EditProfile');
  };

  function calculateBMI(weight, heightInCm) {
    // Convert height from cm to meters
    const heightInMeters = heightInCm / 100;

    // Calculate BMI
    const bmi = weight / (heightInMeters * heightInMeters);

    // Determine BMI category
    let category = '';
    if (bmi < 18.5) {
      category = 'Underweight';
    } else if (bmi >= 18.5 && bmi < 24.9) {
      category = 'Normal weight';
    } else if (bmi >= 25 && bmi < 29.9) {
      category = 'Overweight';
    } else {
      category = 'Obesity';
    }

    return {bmi: bmi.toFixed(2), category}; // Rounded BMI and category
  }

  const ShowModal = () => {
    setModalVisible(true);
  };

  // Example usage
  const weight = 70; // in kilograms
  const height = 175; // in centimeters

  const result = calculateBMI(weight, height);
  console.log(`Your BMI is ${result.bmi} (${result.category})`);

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
            <View className="flex-row items-center space-x-2 my-3">
              <Image
                className="rounded-full"
                source={{
                  uri: 'https://img.freepik.com/free-photo/handsome-young-man-with-new-stylish-haircut_176420-19636.jpg?t=st=1733376805~exp=1733380405~hmac=1817ce5a6f6fc544dec6790dbd692226536f275ee5b494d120227147554eb769&w=2000',
                }}
                style={{width: 45, height: 45}}
              />
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
                  Rilwan
                </CustomText>
              </View>
            </View>

            <View className="flex-row justify-between">
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
    paddingHorizontal: 10,
  },
  Calcaulate: {
    width: Dimensions.get('window').width / 2.3,
    height: Dimensions.get('window').width / 2.2,
  },
});
