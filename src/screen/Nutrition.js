import {
  ActivityIndicator,
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Button, useTheme} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import CustomText from '../customText/CustomText';
import {fonts} from '../customText/fonts';
import {Iconify} from 'react-native-iconify';
import RecommendedFood from '../component/RecommandedFood';
import Animated from 'react-native-reanimated';

export default function Nutrition() {
  let theme = useTheme();
  let navigation = useNavigation();
  const [spinner, setSpinner] = useState(false);
  const [nutritionFood, setNutritionFood] = useState(null);
  const [userdietDetail, setUserdietDetail] = useState(null);
  // Navigation handler for the "Find Nutrition Food" button
  const handleFindNutritionFood = async () => {
    setSpinner(true);
    await navigation.navigate('NutritionForm', {
      setNutritionFood,
      setUserdietDetail,
    });
    setSpinner(false);
  };
  const [totalDetail, setTotalDetail] = useState(null);
  useEffect(() => {
    const calculateTotals = () => {
      return nutritionFood.reduce(
        (totals, item) => {
          if (item && item?.Calories !== null)
            totals.Calories += item?.Calories || 0;
          if (item && item?.Protein !== null)
            totals.Protein += item?.Protein || 0;
          return totals;
        },
        {Calories: 0, Protein: 0},
      );
    };

    if (nutritionFood != null) {
      let totalData = calculateTotals();
      setTotalDetail(totalData);
    }
  }, [nutritionFood]);

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
            {/* Header content */}
            <View className="flex-column gap-2">
              <CustomText
                style={[
                  styles.headerText,
                  {color: theme.colors.appColor, fontFamily: fonts.SemiBold},
                ]}
                className="text-lg">
                Nutrition Tips for a Healthier Life
              </CustomText>

              <CustomText
                className="text-gray-200"
                style={[styles.subTitleText, {fontFamily: fonts.Regular}]}>
                A balanced diet is key to a healthy body and mind. Whether you
                want to lose weight, build muscle, or boost your overall health,
                nutrition is essential to achieving your goals.
              </CustomText>

              <CustomText
                className="text-gray-200"
                style={[styles.subTitleText, {fontFamily: fonts.Regular}]}>
                Let’s make small, impactful changes to improve our eating habits
                and feel our best every day.
              </CustomText>

              {/* Button for Finding Nutrition Food */}
              <Button
                onPress={spinner ? () => {} : handleFindNutritionFood}
                mode="contained"
                style={[{backgroundColor: theme.colors.btn}]}
                className="rounded-14">
                {spinner ? (
                  <ActivityIndicator
                    size={24}
                    color={theme.colors.background}
                  />
                ) : (
                  <CustomText
                    style={{
                      color: '#fff',
                      fontFamily: fonts.Bold,
                    }}>
                    Find Nutrition Food
                  </CustomText>
                )}
              </Button>
            </View>

            {nutritionFood && (
              <>
                {/* Discovered Recommondation */}
                <View className="my-2 mt-6">
                  {/* Header */}
                  <View>
                    <CustomText
                      className="text-lg"
                      style={{fontFamily: fonts.Medium}}>
                      Today's Recommendations
                    </CustomText>
                    <CustomText
                      className="text-md text-gray-400"
                      style={{fontFamily: fonts.Regular}}>
                      Explore our delicious recommendations specially curated
                      for you. Fresh ingredients and flavorful dishes await!
                    </CustomText>
                  </View>

                  {/* Detail */}

                  <View className="my-2">
                    <View className="flex-row justify-between items-center mx-2 my-2">
                      <View className="flex-row items-center space-x-1">
                        <Iconify
                          icon="material-symbols:monitor-weight-loss-outline-rounded"
                          size={50}
                          color={theme.colors.onBackground}
                        />
                        <CustomText
                          className="text-md"
                          style={{fontFamily: fonts.Regular, width: 120}}>
                          Weight Loss Diets
                        </CustomText>
                      </View>
                      <View className="flex-row items-center space-x-1">
                        <Iconify
                          icon="lets-icons:protein"
                          size={50}
                          color={theme.colors.onBackground}
                        />
                        <CustomText
                          className="text-md"
                          style={{fontFamily: fonts.Regular, width: 120}}>
                          Protein {totalDetail ? totalDetail?.Protein : ''} g
                        </CustomText>
                      </View>
                    </View>
                    <View className="flex-row justify-between items-center mx-2 my-2">
                      <View className="flex-row items-center space-x-1">
                        <Iconify
                          icon="fluent-mdl2:diet-plan-notebook"
                          size={43}
                          color={theme.colors.onBackground}
                        />
                        <CustomText
                          className="text-md"
                          style={{fontFamily: fonts.Regular, width: 120}}>
                          Mediterranean Diet
                        </CustomText>
                      </View>
                      <View className="flex-row items-center space-x-1">
                        <Iconify
                          icon="fluent-mdl2:calories"
                          size={42}
                          color={theme.colors.onBackground}
                        />
                        <CustomText
                          className="text-md"
                          style={{fontFamily: fonts.Regular, width: 120}}>
                          Calories {totalDetail ? totalDetail?.Calories : ''} kcal
                        </CustomText>
                      </View>
                    </View>
                  </View>
                </View>
                {/* Recommanded Food */}

                <Animated.View>
                  <CustomText
                    className="text-lg"
                    style={{fontFamily: fonts.Medium}}>
                    Recommended Foods
                  </CustomText>
                  <CustomText
                    className="text-md text-gray-400"
                    style={{fontFamily: fonts.Regular}}>
                    Discover our carefully curated selection of delicious and
                    nutritious foods that cater to your dietary needs and
                    preferences.
                  </CustomText>
                </Animated.View>

                <RecommendedFood
                  nutritionFood={nutritionFood}
                  userdietDetail={userdietDetail}
                />
              </>
            )}
          </ScrollView>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  maincontainer: {
    flex: 1,
    paddingHorizontal: 10,
    paddingTop: 20,
  },
});
