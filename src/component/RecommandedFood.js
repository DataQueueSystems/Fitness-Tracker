import React, {useState} from 'react';
import {
  View,
  FlatList,
  Image,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import {Button, useTheme} from 'react-native-paper';
import CustomText from '../customText/CustomText';
import {fonts} from '../customText/fonts';
import axios from 'axios';
import {useAuthContext} from '../context/GlobaContext';
import {showToast} from '../../utils/Toast';

const RecommendedFood = ({forDelete, nutritionFood, userdietDetail}) => {
  console.log(nutritionFood,'nutritionFood');
  
  let theme = useTheme();
  const {ipAddress, userDetail} = useAuthContext();
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
        console.log(data.message, 'data.message');

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

  const renderItem = ({item}) => {
    console.log(item[1],'item111');
    console.log(item[2],'item222');
    console.log(item[3],'item333');
    console.log(item[4],'item444');
    console.log(item[5],'item555');
    console.log(item[6],'item666');
    console.log(item[7],'item777');
    return (
      <>
        <View className="mt-3 border border-white p-2 rounded-14">
          {/* Image and Nutritional Information */}
          <View
            style={{backgroundColor: theme.colors.background}}
            className="flex-row rounded-lg overflow-hidden">
            {/* Main Image */}
            <Image
              style={{
                width: Dimensions.get('window').width / 1.6,
                height: Dimensions.get('window').width / 2,
              }}
              source={{uri: forDelete?item[3]:item?.image_url}}
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
                  {item?.Carbs} g
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
                  {item?.Protein} g
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
                  {item?.Calories} kcal
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
            {item?.FoodName}
          </CustomText>

          {/* Dish Description */}
          <CustomText
            className="text-sm text-gray-500 mt-2"
            style={{fontFamily: fonts.Regular}}>
            {item?.FoodDescription}
          </CustomText>

          {forDelete ? (
            <>
              {/* Delete Log Button */}
              <Button
                mode="contained"
                style={[
                  {backgroundColor: theme.colors.error, marginTop: 16},
                  {borderRadius: 14},
                ]}
                className="py-2">
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
                mode="contained"
                style={[
                  {backgroundColor: theme.colors.btn, marginTop: 16},
                  {borderRadius: 14},
                ]}
                className="py-2">
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
      {/* Header */}
      {/* Food List */}
      <FlatList
        data={nutritionFood}
        renderItem={renderItem}
        keyExtractor={item => item?.FoodName}
        className="mt-2 mb-10"
      />
    </View>
  );
};

export default RecommendedFood;
