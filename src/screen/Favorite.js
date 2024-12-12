import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  FlatList,
  Appearance,
  TouchableOpacity,
} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {useTheme} from 'react-native-paper';
import Header from '../component/Header';
import CustomText from '../customText/CustomText';
import {fonts} from '../customText/fonts';
import {useAuthContext} from '../context/GlobaContext';
import LinearGradient from 'react-native-linear-gradient';
import {Iconify} from 'react-native-iconify';
import {showToast} from '../../utils/Toast';
import RecommendedFood from '../component/RecommandedFood';
import axios from 'axios';

const Tab = createMaterialTopTabNavigator();

// Exercise Screen
function ExerciseScreen() {
  const {favExercise, favFood, setFavExercise} = useAuthContext(); // Getting favorites
  let theme = useTheme();

  let mode = Appearance.getColorScheme();
  const gradientColors =
    mode == 'light'
      ? [
          ['#EAF4FE', '#BBDFFA'], // Light blue to soft blue (calming for light mode)
          ['#E3F2FD', '#90CAF9'], // Pale blue to sky blue (subtle)
        ]
      : [
          ['#14325a', '#A1C4FD'], // Blue to soft light blue (complementing blue tones)
          ['#14325a', '#4B4B59'], // Blue to dark grayish tone (contrast with dark appDark)
        ];

  // Function to get a random gradient color
  const getRandomGradient = () => {
    const randomIndex = Math.floor(Math.random() * gradientColors.length);
    return gradientColors[randomIndex];
  };

  const renderItem = (item, handleFav) => {
    return (
      <LinearGradient
        colors={getRandomGradient()} // Apply random gradient colors
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        style={{
          padding: 16,
          marginVertical: 8,
          borderRadius: 10,
          elevation: 6,
          marginHorizontal: 10,
        }}>
        <View className="flex-row items-center gap-2">
          <Iconify
            icon="iconamoon:category"
            size={20}
            color={theme.colors.appColor}
          />
          <CustomText
            className="text-[13px] top-1"
            style={{
              fontFamily: fonts.Medium,
              color: mode == 'light' ? theme.colors.outline : '#fff',
            }}>
            {item?.category}
          </CustomText>
        </View>
        <TouchableOpacity
          onPress={() => handleFav(item)} // Handle favorite toggle
          style={{
            position: 'absolute',
            right: 12,
            top: 12,
            zIndex: 1,
          }}>
          <Iconify
            icon="solar:heart-bold"
            size={32}
            color={theme.colors.appColor}
          />
        </TouchableOpacity>

        <CustomText
          className="text-[15px]"
          style={{
            fontFamily: fonts.SemiBold,
            color: mode == 'light' ? theme.colors.outline : '#fff',
          }}>
          Day {item?.day}:
        </CustomText>
        <CustomText
          className="text-[18px]"
          style={{
            fontFamily: fonts.Medium,
            color: mode == 'light' ? theme.colors.outline : '#fff',
          }}>
          {item?.exercise}
        </CustomText>
        <CustomText
          className="text-[13px]"
          style={{
            fontFamily: fonts.Regular,
            color: mode == 'light' ? theme.colors.outline : '#fff',
          }}>
          {item?.subtitle}
        </CustomText>
      </LinearGradient>
    );
  };

  const handleFav = exercise => {
    setFavExercise(prev => {
      // If prev is null or undefined, default it to an empty array
      const currentFavExercises = prev || [];
      const isAlreadyFav = currentFavExercises?.some(
        item => item?.day === exercise?.day,
      );
      if (isAlreadyFav) {
        // Remove exercise from favorites
        showToast('Removing Exercise from Favorite ..');
        return currentFavExercises.filter(item => item.day !== exercise.day);
      }
    });
  };

  return (
    <>
      <View
        style={[
          styles.tabContainer,
          {backgroundColor: theme.colors.background},
        ]}>
        {/* <CustomText style={styles.text}>Exercise Content</CustomText> */}
        {favExercise && favExercise.length > 0 ? (
          <FlatList
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            data={favExercise}
            renderItem={({item}) => renderItem(item, handleFav)}
            keyExtractor={item => item.day.toString()}
          />
        ) : (
          <CustomText
            className="text-[13px] top-1"
            style={[
              {
                fontFamily: fonts.Medium,
                color: mode == 'light' ? theme.colors.outline : '#fff',
              },
              styles.text,
            ]}>
            No exercises found!
          </CustomText>
        )}
      </View>
    </>
  );
}

// Nutrition Food Screen
function NutritionScreen({favFood}) {
  let theme = useTheme();
  const {ipAddress, userDetail} = useAuthContext();
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMeals = async () => {
    try {
      let data = {
        email: userDetail?.Email,
      };
      const response = await axios.post(`${ipAddress}/userViewLod`, data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const responseData = response.data;
      if (responseData.meals) {
        setMeals(responseData.meals);
      } else if (responseData.error) {
        console.error(responseData.error);
      }
    } catch (error) {
      console.error('Error fetching meals:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMeals();
  }, []);

  return (
    <ScrollView
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      style={[styles.tabContainer, {backgroundColor: theme.colors.background}]}>
      {/* Header */}
      <View>
        <CustomText style={{fontFamily: fonts.Regular}}>
          Keep track of your meals and nutrition. Once you log your food, it
          will appear here for easy tracking and reference.
        </CustomText>
      </View>

      <RecommendedFood forDelete={true} nutritionFood={meals} />
    </ScrollView>
  );
}

// Main Favorite Component
export default function Favorite() {
  let theme = useTheme();
  const {favExercise, favFood} = useAuthContext();

  return (
    <>
      <Header screenName={'Favorite'} backIcon={false} />
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
