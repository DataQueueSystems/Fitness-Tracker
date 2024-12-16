import {
  StyleSheet,
  View,
  TextInput,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {Button, useTheme} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import CustomText from '../customText/CustomText';
import Header from '../component/Header';
import {useAuthContext} from '../context/GlobaContext';
import {fonts} from '../customText/fonts';
import {showToast} from '../../utils/Toast';
import axios from 'axios';

export default function Register() {
  let theme = useTheme();
  const {setIsLogin, Checknetinfo, setUserDetail, ipAddress} = useAuthContext();
  let navigation = useNavigation();
  const [spinner, setSpinner] = useState(false);
  const [errors, setErrors] = useState({});

  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
  });

  let screenName = '';

  const handleChange = (field, value) => {
    setForm(prevForm => ({
      ...prevForm,
      [field]: value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!form.username) newErrors.username = 'Username is required';
    if (!form.email) newErrors.email = 'Email is required';
    if (!form.password) newErrors.password = 'Password is required';
    setErrors(newErrors);
    setSpinner(false);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async () => {
    if (validateForm()) {
      setSpinner(true);

      const userForm = new FormData();
      userForm.append('Name', form.username); // Append the username field
      userForm.append('Email', form.email); // Append the email field
      userForm.append('Password', form.password); // Append the password field
      try {
        // Send POST request with userForm
        let response = await axios.post(
          `${ipAddress}/RegistrationNewUser`,
          userForm,
          {
            headers: {
              'Content-Type': 'multipart/form-data', // Ensure Flask processes it as FormData
            },
          },
        );
        if (response.data.success) {
          showToast(response.data.message); // Show success message
          navigation.goBack();
          setSpinner(true);
        } else {
          showToast(response.data.message); // Show failure message
        }
      } catch (error) {
        setSpinner(false);
        // console.error('Error:', error);
        if (axios.isAxiosError(error)) {
          if (error.response) {
            showToast(
              `${error.response.data.message || 'Something went wrong'}`,
            );
          } else {
            showToast('Network error, please try again');
          }
        }
      }
    } else {
      showToast('Some invalid data');
    }
  };

  const NavigateToLogin = () => {
    navigation.goBack();
  };

  return (
    <>
      <Header screenName={screenName} />
      <View
        style={[
          styles.mainContainer,
          {backgroundColor: theme.colors.background},
        ]}>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}>
          {/* Heading */}
          <View style={styles.headingContainer}>
            <CustomText
              style={[
                styles.authHead,
                {fontFamily: fonts.Bold, color: theme.colors.onBackground},
              ]}>
              Sign Up
            </CustomText>
            <CustomText
              style={{
                fontFamily: fonts.Regular,
              }}>
              Join now to access personalized fitness plans and achieve your
              health goals.
            </CustomText>
          </View>

          {/* Inputs */}
          <View style={styles.inputContainer}>
            <TextInput
              style={[
                styles.input,
                {
                  color: theme.colors.onBackground,
                  borderColor: theme.colors.onBackground,
                },
              ]}
              placeholder="User name"
              placeholderTextColor="#888"
              keyboardType="username"
              onChangeText={value => handleChange('username', value)}
              value={form?.username}
            />

            {errors.username && (
              <CustomText
                className="bottom-2"
                style={[
                  styles.errorText,
                  {color: theme.colors.error, fontFamily: fonts.Light},
                ]}>
                {errors.username}
              </CustomText>
            )}

            <TextInput
              style={[
                styles.input,
                {
                  color: theme.colors.onBackground,
                  borderColor: theme.colors.onBackground,
                },
              ]}
              placeholder="Email"
              placeholderTextColor="#888"
              keyboardType="email-address"
              onChangeText={value => handleChange('email', value)}
              value={form?.email}
            />

            {errors.email && (
              <CustomText
                className="bottom-2"
                style={[
                  styles.errorText,
                  {color: theme.colors.error, fontFamily: fonts.Light},
                ]}>
                {errors.email}
              </CustomText>
            )}

            <TextInput
              style={[
                styles.input,
                {
                  color: theme.colors.onBackground,
                  borderColor: theme.colors.onBackground,
                },
              ]}
              placeholder="Password"
              placeholderTextColor="#888"
              secureTextEntry
              onChangeText={value => handleChange('password', value)}
              value={form?.password}
            />

            {errors.password && (
              <CustomText
                className="bottom-2"
                style={[
                  styles.errorText,
                  {color: theme.colors.error, fontFamily: fonts.Light},
                ]}>
                {errors.password}
              </CustomText>
            )}

            <Button
              onPress={spinner ? () => {} : handleRegister}
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
                  Register
                </CustomText>
              )}
            </Button>

            <View
              style={{
                fontFamily: fonts.Light,
              }}
              className="my-2 text-center items-center flex-row justify-center space-x-1">
              <CustomText style={{fontFamily: fonts.Light}}>
                Already have an account?{' '}
              </CustomText>
              <TouchableOpacity onPress={NavigateToLogin}>
                <CustomText
                  style={{
                    color: theme.colors.appColor,
                    fontFamily: fonts.Light,
                  }}
                  className="underline">
                  Login
                </CustomText>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  headingContainer: {
    paddingVertical: 12,
    paddingHorizontal: 16,
  },

  authHead: {
    fontSize: 30,
    // textAlign: 'center',
  },
  inputContainer: {
    paddingHorizontal: 16,
    paddingTop: 20,
    marginVertical: 10,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 20,
    fontSize: 16,
  },
  btn: {
    padding: 4,
    marginTop: 20,
    borderRadius: 16,
  },
});
