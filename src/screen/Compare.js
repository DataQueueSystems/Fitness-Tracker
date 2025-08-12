import {
  ActivityIndicator,
  Alert,
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {Button, useTheme} from 'react-native-paper';
import CustomText from '../customText/CustomText';
import {fonts} from '../customText/fonts';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {Dropdown} from 'react-native-element-dropdown';
import {useAuthContext} from '../context/GlobaContext';
import axios from 'axios';
import {showToast} from '../../utils/Toast';

export default function Compare() {
  let theme = useTheme();
  let navigation = useNavigation();
  const {meals, ipAddress, userDetail} = useAuthContext();
  const [spinner, setSpinner] = useState(false);
  const [foods, setFoods] = useState(null);
  const [food1, setFood1] = useState(null);
  const [food2, setFood2] = useState(null);
  const [comparedData, setComparedData] = useState(null);
  useFocusEffect(
    useCallback(() => {
      const GetfoodNames = () => {
        // Format the food names into the required structure
        const formattedFoodNames = meals?.map(item => ({
          label: item[4],
          value: item[4],
        }));
        return formattedFoodNames;
      };
      if (meals) {
        const foodNames = GetfoodNames(); // Get the formatted food names
        setFoods(foodNames);
      }
    }, [meals]),
  );

  const handleCompare = async () => {
    let email = userDetail?.Email; // Assuming userDetail has the user's email
    // Prepare the data as a JSON object, including the email
    const foodData = {
      Email: email, // Include Email from frontend
      food1: food1,
      food2: food2,
    };

    try {
      // Send a POST request with the email and selected food items as JSON
      const response = await axios.post(`${ipAddress}/compareFood`, foodData, {
        headers: {
          'Content-Type': 'application/json', // Ensure Flask processes it as JSON
        },
      });
      setSpinner(false);
      const responseData = response.data; // Get response data
      if (responseData.success) {
        showToast(responseData.message); // Show success message
        setComparedData(responseData?.data);
        // navigation.goBack(); // Uncomment if you want to navigate back
      } else {
        showToast(responseData.message || 'Something went wrong'); // Show error message if available
      }
    } catch (error) {
      setSpinner(false);
      showToast('Something went wrong');
      console.error('Error:', error);
    }
  };

  const pickerStyle = {
    fontFamily: 'Poppins-Regular',
    color: theme.colors.appColor,
  };
  const selectedPickerStyle = {
    fontFamily: 'Poppins-Regular',
    color: theme.colors.onBackground,
  };

  return (
    <>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        style={[
          styles.maincontainer,
          {backgroundColor: theme.colors.background},
        ]}>
        {/* Header */}
        {/* Header content */}
        <View className="flex-column gap-2 my-2 mt-0">
          <CustomText
            style={[
              styles.headerText,
              {color: theme.colors.appColor, fontFamily: fonts.SemiBold},
            ]}
            className="text-lg">
            Meal Comparison Made Easy
          </CustomText>

          <CustomText
            className="text-gray-500"
            style={[styles.subTitleText, {fontFamily: fonts.Regular}]}>
            Discover nutritious meal options tailored to your dietary needs.
            Compare and choose the best meals for your lifestyle!
          </CustomText>
        </View>

        <View className="flex-column gap-2 my-3">
          <CustomText
            style={[
              styles.headerText,
              {color: theme.colors.appColor, fontFamily: fonts.SemiBold},
            ]}
            className="text-lg">
            Nutrient-Rich Food Selection
          </CustomText>

          <CustomText
            className="text-gray-500"
            style={[styles.subTitleText, {fontFamily: fonts.Regular}]}>
            Dive into our selection of meals that are not only delicious but
            also packed with nutrients. Make informed choices for a healthier
            you!
          </CustomText>
        </View>

        {foods && (
          <>
            <Dropdown
              style={styles.dropdown}
              placeholder="Select Food 1"
              data={foods}
              labelField="label"
              valueField="value"
              value={food1}
              itemTextStyle={pickerStyle}
              containerStyle={{backgroundColor: theme.colors.background}}
              selectedTextStyle={selectedPickerStyle}
              onChange={item => setFood1(item.value)}
              placeholderStyle={selectedPickerStyle}
            />

            <Dropdown
              style={styles.dropdown}
              placeholder="Select Food 2"
              data={foods}
              labelField="label"
              valueField="value"
              value={food2}
              itemTextStyle={pickerStyle}
              containerStyle={{backgroundColor: theme.colors.background}}
              selectedTextStyle={selectedPickerStyle}
              onChange={item => setFood2(item.value)}
              placeholderStyle={selectedPickerStyle}
            />
          </>
        )}

        {/* Button for Finding Nutrition Food */}
        <Button
          onPress={spinner ? () => {} : handleCompare}
          mode="contained"
          style={[{backgroundColor: theme.colors.btn}]}
          className="rounded-14">
          {spinner ? (
            <ActivityIndicator size={24} color={theme.colors.background} />
          ) : (
            <CustomText
              style={{
                color: '#fff',
                fontFamily: fonts.Bold,
              }}>
              Compare Meals
            </CustomText>
          )}
        </Button>

        {comparedData && (
          <View style={styles.comparisonContainer}>
            <CustomText
              style={[
                styles.headerText,
                {color: theme.colors.appColor, fontFamily: fonts.SemiBold},
              ]}
              className="text-lg my-3">
              Comparison Results
            </CustomText>

            <View
              style={[
                styles.foodCard,
                {
                  borderColor:
                    comparedData?.food1?.protein > comparedData?.food2?.protein
                      ? theme.colors.appColor
                      : 'gray', // If Food 1 has higher protein, appColor else 'red'
                  borderBottomWidth:
                    comparedData?.food1?.protein > comparedData?.food2?.protein
                      ? 13
                      : 4, // If Food 1 has higher protein, appColor else 'red'
                  backgroundColor: theme.colors.background,
                },
              ]}>
              <Image
                style={{
                  width: Dimensions.get('window').width / 1.2,
                  height: Dimensions.get('window').width / 1.6,
                  alignSelf: 'center',
                }}
                className="rounded-14 my-2"
                source={{uri: comparedData?.food1?.image_url}}
              />
              <CustomText
                style={[styles.foodText, {color: theme.colors.appColor}]}>
                {comparedData?.food1?.foodName}
              </CustomText>
              <CustomText style={styles.foodText}>
                Diet Type: {comparedData?.food1?.dietType}
              </CustomText>
              <CustomText style={styles.foodText}>
                Protein: {comparedData?.food1?.protein}g
              </CustomText>
              <CustomText style={styles.foodText}>
                Calories: {comparedData?.food1?.calories}kcal
              </CustomText>
              <CustomText style={styles.foodText}>
                Carbs: {comparedData?.food1?.carbs}g
              </CustomText>
            </View>

            <View
              style={[
                styles.foodCard,
                {
                  borderColor:
                    comparedData?.food2?.protein > comparedData?.food1?.protein
                      ? theme.colors.appColor
                      : theme.colors.error, // If Food 1 has higher protein, appColor else 'red'
                  borderBottomWidth:
                    comparedData?.food2?.protein > comparedData?.food1?.protein
                      ? 13
                      : 4, // If Food 1 has higher protein, appColor else 'red'
                  backgroundColor: theme.colors.background,
                },
              ]}>
              <Image
                style={{
                  width: Dimensions.get('window').width / 1.2,
                  height: Dimensions.get('window').width / 1.6,
                  alignSelf: 'center',
                }}
                className="rounded-14 my-2"
                source={{uri: comparedData?.food2?.image_url}}
              />
              <CustomText
                style={[styles.foodText, {color: theme.colors.appColor}]}>
                {comparedData?.food2?.foodName}
              </CustomText>
              <CustomText style={styles.foodText}>
                Diet Type: {comparedData?.food2?.dietType}
              </CustomText>
              <CustomText style={styles.foodText}>
                Protein: {comparedData?.food2?.protein}g
              </CustomText>
              <CustomText style={styles.foodText}>
                Calories: {comparedData?.food2?.calories}kcal
              </CustomText>
              <CustomText style={styles.foodText}>
                Carbs: {comparedData?.food2?.carbs}g
              </CustomText>
            </View>
          </View>
        )}
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  maincontainer: {
    flex: 1,
    paddingHorizontal: 10,
    paddingTop: 20,
  },
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    marginBottom: 16,
  },
  input: {
    marginBottom: 16,
    fontFamily: 'Poppins-Regular',
  },
  comparisonContainer: {
    marginTop: 20,
    borderRadius: 10,
    marginBottom: 100,
  },
  foodCard: {
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowRadius: 2,
    elevation: 3,
  },
  foodText: {
    fontSize: 16,
    fontFamily: fonts.Regular,
  },
});
