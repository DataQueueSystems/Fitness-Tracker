import {
  ActivityIndicator,
  Alert,
  Animated,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useRef, useState} from 'react';
import {Button, TextInput, useTheme} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import CustomText from '../customText/CustomText';
import {fonts} from '../customText/fonts';
import Header from '../component/Header';
import {useAuthContext} from '../context/GlobaContext';
import {showToast} from '../../utils/Toast';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export default function EditProfile() {
  let theme = useTheme();
  let navigation = useNavigation();
  const {Checknetinfo, userDetail, setUserDetail, ipAddress} = useAuthContext();

  const [spinner, setSpinner] = useState(false);
  const [errors, setErrors] = useState({});

  // Initialize state with the prepared object
  const [form, setForm] = useState({
    Name: userDetail?.Name || '',
    Email: userDetail?.Email || '',
    height: userDetail?.height || '',
    weight: userDetail?.weight || '',
    age: userDetail?.age || '',
    gender: userDetail?.gender || '',
    Password: userDetail?.Password || '',
    contact: userDetail?.contact || '',
  });
  // Simple validation function
  const validateForm = () => {
    const newErrors = {};
    if (!form.Name) newErrors.Name = 'Name is required';
    if (!form.Email) newErrors.Email = 'Email is required';
    if (!form.weight) newErrors.weight = 'Weight is required';
    if (!form.height) newErrors.height = 'Height is required';
    if (!form.age) newErrors.age = 'Age is required';
    if (!form.gender) newErrors.gender = 'Gender is required';
    if (!form.Password) newErrors.Password = 'Password is required';
    if (!form.contact) newErrors.contact = 'Contact number is required';
    else if (!/^\d{10}$/.test(form.contact))
      newErrors.contact = 'Contact number must be 10 digits';
    setErrors(newErrors);
    setSpinner(false);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (field, value) => {
    setForm(prevForm => ({
      ...prevForm,
      [field]: value,
    }));
  };

  const handleSubmit = async () => {
    setSpinner(true);
    const isConnected = await Checknetinfo(); // Check for internet connection
    if (!isConnected) {
      setSpinner(false);
      return; // Do not proceed if there is no internet connection
    }
    try {
      if (validateForm()) {
        // Create the payload for the request
        const userData = {
          Name: form.Name,
          Email: form.Email,
          PrevEmail: userDetail?.Email, // Pass the previous email to identify the user
          Password: form.Password,
        };
        // Make the API request to update user details
        const response = await axios.post(`${ipAddress}/updateuser`, userData, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (response.data.status === 'success') {
          // Update the user details locally and show a success toast
          let updateData = {...userDetail?.Id, ...form};
          await setUserDetail(updateData);
          AsyncStorage.setItem('user', JSON.stringify(updateData));
          showToast('Profile Updated');
        } else {
          // Show error message from the backend
          showToast(data.message);
        }
        setSpinner(false);
      }
    } catch (error) {
      setSpinner(false);
      // console.error('Error updating profile:', error);
      showToast('Error updating profile');
    }
  };

  return (
    <>
      <Header screenName={'Edit Profile'} />
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
            <View activeOpacity={0.8} style={styles.imageView}>
              <Image
                source={require('../../assets/Image/defaultAvtar.jpg')}
                style={[
                  styles.profileImage,
                  {borderColor: theme.colors.onBackground},
                ]}
              />
            </View>

            <TextInput
              label="Name"
              value={form?.Name}
              onChangeText={value => handleChange('Name', value)}
              style={styles.input}
              contentStyle={styles.inputContent}
              mode="outlined"
            />
            {errors?.Name && (
              <CustomText
                className="bottom-2"
                style={[
                  styles.errorText,
                  {color: theme.colors.error, fontFamily: fonts.Light},
                ]}>
                {errors?.Name}
              </CustomText>
            )}
            <TextInput
              label="Email"
              value={form?.Email}
              onChangeText={value => handleChange('Email', value)}
              style={styles.input}
              contentStyle={styles.inputContent}
              mode="outlined"
            />
            {errors?.Email && (
              <CustomText
                className="bottom-2"
                style={[
                  styles.errorText,
                  {color: theme.colors.error, fontFamily: fonts.Light},
                ]}>
                {errors?.Email}
              </CustomText>
            )}
            <TextInput
              label="Password"
              value={form?.Password}
              onChangeText={value => handleChange('Password', value)}
              style={styles.input}
              contentStyle={styles.inputContent}
              mode="outlined"
            />
            {errors?.Password && (
              <CustomText
                className="bottom-2"
                style={[
                  styles.errorText,
                  {color: theme.colors.error, fontFamily: fonts.Light},
                ]}>
                {errors?.Password}
              </CustomText>
            )}

            <TextInput
              label="Gender"
              value={form?.gender}
              onChangeText={value => handleChange('gender', value)}
              style={styles.input}
              contentStyle={styles.inputContent}
              mode="outlined"
            />
            {errors?.gender && (
              <CustomText
                className="bottom-2"
                style={[
                  styles.errorText,
                  {color: theme.colors.error, fontFamily: fonts.Light},
                ]}>
                {errors?.gender}
              </CustomText>
            )}
            <TextInput
              label="Age"
              value={form?.age}
              onChangeText={value => handleChange('age', value)}
              style={styles.input}
              contentStyle={styles.inputContent}
              mode="outlined"
            />
            {errors?.age && (
              <CustomText
                className="bottom-2"
                style={[
                  styles.errorText,
                  {color: theme.colors.error, fontFamily: fonts.Light},
                ]}>
                {errors?.age}
              </CustomText>
            )}

            <TextInput
              label="Weight"
              value={form?.weight}
              onChangeText={value => handleChange('weight', value)}
              style={styles.input}
              contentStyle={styles.inputContent}
              mode="outlined"
            />
            {errors?.weight && (
              <CustomText
                className="bottom-2"
                style={[
                  styles.errorText,
                  {color: theme.colors.error, fontFamily: fonts.Light},
                ]}>
                {errors?.weight}
              </CustomText>
            )}

            <TextInput
              label="Height"
              value={form?.height}
              onChangeText={value => handleChange('height', value)}
              style={styles.input}
              contentStyle={styles.inputContent}
              mode="outlined"
            />
            {errors?.height && (
              <CustomText
                className="bottom-2"
                style={[
                  styles.errorText,
                  {color: theme.colors.error, fontFamily: fonts.Light},
                ]}>
                {errors?.height}
              </CustomText>
            )}
            <TextInput
              label="Contact"
              value={form?.contact}
              onChangeText={value => handleChange('contact', value)}
              style={styles.input}
              contentStyle={styles.inputContent}
              mode="outlined"
            />
            {errors?.contact && (
              <CustomText
                className="bottom-2"
                style={[
                  styles.errorText,
                  {color: theme.colors.error, fontFamily: fonts.Light},
                ]}>
                {errors?.contact}
              </CustomText>
            )}

            <Button
              onPress={spinner ? () => {} : handleSubmit}
              mode="contained"
              style={[styles.btn, {backgroundColor: theme.colors.btn}]}>
              {spinner ? (
                <ActivityIndicator size={24} color={theme.colors.background} />
              ) : (
                <CustomText
                  style={{
                    color: '#fff',
                    fontFamily: fonts.Bold,
                  }}>
                  Submit
                </CustomText>
              )}
            </Button>
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
  },
  imageView: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignSelf: 'center',
    marginBottom: 15,
  },

  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginRight: 16,
    borderWidth: 1,
  },
  input: {
    marginBottom: 15,
  },
  errorText: {
    marginLeft: 10,
  },
  btn: {
    padding: 4,
    marginTop: 10,
    borderRadius: 16,
    marginBottom: 40,
  },
});
