import {Alert, StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useState, useEffect} from 'react';
import {Dropdown} from 'react-native-element-dropdown';
import {
  ActivityIndicator,
  Button,
  TextInput,
  useTheme,
} from 'react-native-paper';
import CustomText from '../../customText/CustomText';
import Header from '../Header';
import {fonts} from '../../customText/fonts';
import {useNavigation} from '@react-navigation/native';
import {useAuthContext} from '../../context/GlobaContext';
import axios from 'axios';
import {showToast} from '../../../utils/Toast';

const NutritionForm = ({route}) => {
  let {setNutritionFood,setUserdietDetail} = route.params;
  const {ipAddress,userDetail} = useAuthContext();
  let theme = useTheme();
  let navigation = useNavigation();
  const [spinner, setSpinner] = useState(false);
  const [diet, setDiet] = useState(null);
  const [dietType, setDietType] = useState(null);
  const [protein, setProtein] = useState('');
  const [calories, setCalories] = useState('');

  // Diet options mapping
  const dietOptions = [
    {label: 'Weight Loss Diets', value: 'Weight Loss Diets'},
    {
      label: 'Weight Gain/Muscle Building Diets',
      value: 'Weight Gain/Muscle Building Diets',
    },
    {label: 'Health Maintenance Diets', value: 'Health Maintenance Diets'},
    {label: 'Medical Diets', value: 'Medical Diets'},
  ];

  // Diet type options mapping
  const dietTypeOptionsMap = {
    'Weight Loss Diets': [
      {label: 'Low-Carb Diet', value: 'Low-Carb Diet'},
      {label: 'Ketogenic Diet', value: 'Ketogenic Diet'},
      {label: 'Mediterranean Diet', value: 'Mediterranean Diet'},
      {label: 'Plant-Based/Vegan Diet', value: 'Plant-Based/Vegan Diet'},
      {label: 'Intermittent Fasting', value: 'Intermittent Fasting'},
    ],
    'Weight Gain/Muscle Building Diets': [
      {label: 'High-Protein Diet', value: 'High-Protein Diet'},
      {label: 'Bulking Diet', value: 'Bulking Diet'},
      {
        label: 'Weight Gain Shake Supplement-based Diet',
        value: 'Weight Gain Shake Supplement-based Diet',
      },
      {label: 'Calorie Surplus Diet', value: 'Calorie Surplus Diet'},
      {label: 'Carb Cycling Diet', value: 'Carb Cycling Diet'},
    ],
    'Health Maintenance Diets': [
      {label: 'Balanced Diet', value: 'Balanced Diet'},
      {label: 'DASH Diet', value: 'DASH Diet'},
      {label: 'Whole30 Diet', value: 'Whole30 Diet'},
      {label: 'Flexitarian Diet', value: 'Flexitarian Diet'},
      {label: 'Paleo Diet', value: 'Paleo Diet'},
    ],
    'Medical Diets': [
      {label: 'Gluten Free Diet', value: 'Gluten Free Diet'},
      {label: 'Low FODMAP Diet', value: 'Low FODMAP Diet'},
      {label: 'Low-Sodium Diet', value: 'Low-Sodium Diet'},
      {label: 'Renal Diet', value: 'Renal Diet'},
      {label: 'Diabetic Diet', value: 'Diabetic Diet'},
    ],
  };

  // Set diet types based on selected diet
  const [dietTypeOptions, setDietTypeOptions] = useState([]);

  useEffect(() => {
    if (diet) {
      setDietTypeOptions(dietTypeOptionsMap[diet] || []);
    }
  }, [diet]);

  const handleFormSubmit = async () => {
    if (!diet || !dietType || !protein || !calories) {
      showToast('Please fill out all fields.');
      return;
    }
    setSpinner(true);
    let dietDetail={dietName:diet,dietType:dietType}
    setUserdietDetail(dietDetail)
    // let updateUser={...userDetail,...dietDetail}
    // AsyncStorage.setItem("user",JSON.stringify(updateUser))
    const foodForm = new FormData();
    foodForm.append('DietName', diet);
    foodForm.append('DietType', dietType);
    foodForm.append('Protein', protein);
    foodForm.append('Calories', calories);



    try {
      const response = await axios.post(
        `${ipAddress}/BestFoodRecommend`,
        foodForm,
        {headers: {'Content-Type': 'multipart/form-data'}},
      );
      setSpinner(false);

      const data = response.data;

      if (data.success) {
        showToast(data.message);
        setNutritionFood(data.recommended_foods);
        navigation.goBack();
      } else {
        showToast(data.message || 'Something went wrong');
      }
    } catch (error) {
      setSpinner(false);
      showToast('Something went wrong');
      console.error(error);
    }
  };

  const selectedPickerStyle = {
    fontFamily: 'Poppins-Regular',
    color: theme.colors.text,
  };

  const pickerStyle = {
    fontFamily: 'Poppins-Regular',
    color: theme.colors.appColor,
  };

  return (
    <>
      <Header screenName={'Nutrition Form'} />
      <View
        style={[{backgroundColor: theme.colors.background}]}
        className="flex-1 p-3">
        <CustomText
          style={[
            styles.header,
            {fontFamily: fonts.Medium, color: theme.colors.appColor},
          ]}>
          Find Nutrient Rich Food
        </CustomText>

        <Dropdown
          style={styles.dropdown}
          placeholder="Select Any Diet"
          data={dietOptions}
          labelField="label"
          valueField="value"
          value={diet}
          itemTextStyle={pickerStyle}
          containerStyle={{backgroundColor: theme.colors.background}}
          selectedTextStyle={selectedPickerStyle}
          onChange={item => setDiet(item.value)}
          placeholderStyle={selectedPickerStyle}
        />

        <Dropdown
          style={styles.dropdown}
          placeholder="Select Diet Type"
          data={dietTypeOptions}
          labelField="label"
          valueField="value"
          value={dietType}
          itemTextStyle={pickerStyle}
          containerStyle={{backgroundColor: theme.colors.background}}
          selectedTextStyle={selectedPickerStyle}
          placeholderStyle={selectedPickerStyle}
          onChange={item => setDietType(item.value)}
        />

        <TextInput
          mode="outlined"
          style={styles.input}
          placeholder="Protein 0-50"
          keyboardType="numeric"
          value={protein}
          onChangeText={value => setProtein(value)}
          maxLength={2}
        />

        <TextInput
          mode="outlined"
          style={styles.input}
          placeholder="Calories 100-500"
          keyboardType="numeric"
          value={calories}
          onChangeText={value => setCalories(value)}
          maxLength={3}
        />

        <Button
          onPress={spinner ? () => {} : handleFormSubmit}
          mode="contained"
          style={[styles.btn, {backgroundColor: theme.colors.btn}]}>
          {spinner ? (
            <ActivityIndicator size={24} color={theme.colors.background} />
          ) : (
            <CustomText
              style={{color: '#fff', fontFamily: fonts.Bold, fontSize: 16}}>
              Food Recommended
            </CustomText>
          )}
        </Button>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
    flex: 1,
  },
  header: {
    fontSize: 18,
    marginBottom: 16,
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
  btn: {
    padding: 4,
    marginTop: 20,
    borderRadius: 16,
  },
});

export default NutritionForm;
