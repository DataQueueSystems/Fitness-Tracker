import React, {useEffect, useState} from 'react';
import {
  View,
  FlatList,
  Image,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import {Button, Text, useTheme} from 'react-native-paper';
import CustomText from '../customText/CustomText';
import {fonts} from '../customText/fonts';
import axios from 'axios';
import {useAuthContext} from '../context/GlobaContext';
import {showToast} from '../../utils/Toast';

const RecommendedFood = ({
  forDelete,
  nutritionFood,
  userdietDetail,
  setMeals,
}) => {
  let theme = useTheme();
  const {ipAddress, userDetail, setCount, count} = useAuthContext();
  const [spinner, setSpinner] = useState(false);

  const handleAddLog = async food => {
    let {dietName, dietType} = userdietDetail;
    let {FoodName, Protein, Calories, Carbs, image_url} = food;
    const foodData = {
      dietName: dietName,
      dietType: dietType,
      protein: Protein,
      calories: Calories,
      carbs: Carbs, // Add if you're tracking carbs
      foodName: FoodName, // Ensure `food.name` exists
      image_url: image_url || '', // Optional image URL
      email: userDetail?.Email,
    };
    try {
      const response = await axios.post(`${ipAddress}/add_to_log`, foodData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setSpinner(false);

      const data = response.data;

      if (data.message) {
        showToast(data.message);
        await setCount(count => count + 1);
        // navigation.goBack();
      } else {
        showToast('Something went wrong');
      }
    } catch (error) {
      setSpinner(false);
      showToast('Something went wrong');
      console.error(error);
    }
  };

  const handleDeleteLog = async item => {
    const userData = {
      email: userDetail?.Email, // Ensure Email is correctly formatted and passed
    };
    let foodId = item[0];
    try {
      // Send a POST request with the email and user ID
      const response = await axios.post(
        `${ipAddress}/delete/${foodId}`,
        userData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      setSpinner(false);
      const data = response.data; // Get response data
      if (data.success) {
        showToast(data.message); // Show success message
        // Correct filter logic: Remove the deleted item
        const filteredData = nutritionFood?.filter(food => food[0] !== item[0]); // Exclude the item with the same ID
        setMeals(filteredData);
        // navigation.goBack(); // Uncomment if you want to navigate back
      } else {
        showToast(data.message || 'Something went wrong'); // Show error message if available
      }
    } catch (error) {
      setSpinner(false);
      showToast('Something went wrong');
      console.error('Error deleting log:', error);
    }
  };

  const renderItem = ({item}) => {
    return (
      <>
        <View className="mt-3 border border-white p-2 rounded-14">
          <View
            style={{backgroundColor: theme.colors.background}}
            className="flex-row rounded-lg overflow-hidden">
            {/* Main Image */}
            <Image
              style={{
                width: Dimensions.get('window').width / 1.6,
                height: Dimensions.get('window').width / 2,
              }}
              source={{uri: forDelete ? item[3] : item?.image_url}}
            />

            {/* Nutritional Information */}
            <View className="ml-3 justify-around">
              <View className="flex-row items-center mb-2">
                <Image
                  style={{width: 40, height: 40}}
                  source={require('../../assets/Food/Single/carb.png')}
                />
                <CustomText
                  className="text-sm ml-1"
                  style={{fontFamily: fonts.Regular}}>
                  {forDelete ? item[5] : item?.Carbs} g
                </CustomText>
              </View>
              <View className="flex-row items-center mb-2">
                <Image
                  style={{width: 40, height: 40}}
                  source={require('../../assets/Food/Single/food.png')}
                />
                <CustomText
                  className="text-sm ml-1"
                  style={{fontFamily: fonts.Regular}}>
                  {forDelete ? item[6] : item?.Protein} g
                </CustomText>
              </View>
              <View className="flex-row items-center">
                <Image
                  style={{width: 40, height: 40}}
                  source={require('../../assets/Food/Single/kcal.png')}
                />
                <CustomText
                  className="text-sm ml-1"
                  style={{fontFamily: fonts.Regular}}>
                  {forDelete ? item[7] : item?.Calories} kcal
                </CustomText>
              </View>
            </View>
          </View>

          {/* Dish Name */}
          <CustomText
            className="text-lg mt-4"
            style={{
              color: theme.colors.appColor,
              fontFamily: fonts.SemiBold,
            }}>
            {forDelete ? item[4] : item?.FoodName}
          </CustomText>

          {/* Dish Description */}
          {item?.FoodDescription && (
            <CustomText
              className="text-sm text-gray-500 mt-2"
              style={{fontFamily: fonts.Regular}}>
              {item?.FoodDescription}
            </CustomText>
          )}

          {forDelete && (
            <>
              <CustomText
                className="text-sm text-gray-400 mt-2"
                style={{fontFamily: fonts.Regular}}>
                Diet Name: {item[1]}
              </CustomText>
              <CustomText
                className="text-sm text-gray-400 mt-2"
                style={{fontFamily: fonts.Regular}}>
                Diet Type: {item[2]}
              </CustomText>
            </>
          )}

          {forDelete ? (
            <>
              {/* Delete Log Button */}
              <Button
                onPress={() => handleDeleteLog(item)}
                style={{
                  backgroundColor: theme.colors.error,
                  borderRadius: 14,
                  marginTop: 12,
                }}
                contentStyle={{
                  paddingVertical: 2, // Decrease for thinner button
                }}>
                {spinner ? (
                  <ActivityIndicator
                    size={20}
                    color={theme.colors.background}
                  />
                ) : (
                  <CustomText
                    style={{
                      color: '#fff',
                      fontFamily: fonts.Bold,
                    }}>
                    Delete
                  </CustomText>
                )}
              </Button>
            </>
          ) : (
            <>
              {/* Add to Log Button */}
              <Button
                onPress={() => handleAddLog(item)}
                style={{
                  backgroundColor: theme.colors.btn,
                  borderRadius: 14,
                  marginTop: 12,
                }}
                contentStyle={{
                  paddingVertical: 2, // Reduce height (default is 8–12)
                }}>
                {spinner ? (
                  <ActivityIndicator
                    size={20}
                    color={theme.colors.background}
                  />
                ) : (
                  <CustomText
                    style={{
                      color: '#fff',
                      fontFamily: fonts.Bold,
                    }}>
                    Add to Log
                  </CustomText>
                )}
              </Button>
            </>
          )}
        </View>
      </>
    );
  };

  return (
    <View className="my-1 mt-1">
      {nutritionFood?.length == 0 ? (
        <>
          <View className="flex-column justify-center pb-10 mt-10">
            <CustomText
              className="text-[16px] text-center"
              style={{fontFamily: fonts.Regular}}>
              No logged meals found!
            </CustomText>
          </View>
        </>
      ) : (
        <FlatList
          data={nutritionFood}
          renderItem={renderItem}
          keyExtractor={item => item?.FoodName}
          className="mt-2 mb-10"
        />
      )}
    </View>
  );
};

export default RecommendedFood;
