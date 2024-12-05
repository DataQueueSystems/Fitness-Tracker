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
import firestore from '@react-native-firebase/firestore';
import {showToast} from '../../utils/Toast';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Login() {
  let theme = useTheme();
  const {setIsLogin, Checknetinfo, setUserDetail} = useAuthContext();
  let navigation = useNavigation();
  
  const [spinner, setSpinner] = useState(false);
  const [errors, setErrors] = useState({});

  const [form, setForm] = useState({
    name: '',
    email: '',
  });

  let screenName = '';

  const handleChange = (field, value) => {
    setForm(prevForm => ({
      ...prevForm,
      [field]: value,
    }));
  };



  const CheckDataBase = async () => {
    setSpinner(true);
    let isConnected = await Checknetinfo();
    if (!isConnected) {
      setSpinner(false);
      return;
    }
    try {
      const snapShot = await firestore().collection('conductor').get();
      if (snapShot.empty) {
        showToast('No user found');
        return;
      }
      let userDoc = snapShot.docs.find(doc => {
        const data = doc.data();
        return data.email == email && data.password == password;
      });
      if (!userDoc) {
        setSpinner(false);
        showToast('Invalid email or password');
        return;
      } else {
        let userData = {id: userDoc.id, ...userDoc.data()};
        await setUserDetail(userData);
        await AsyncStorage.setItem('token', userData.id);
        AsyncStorage.setItem('IsLogin', 'true');
        setIsLogin(false);
      }
    } catch (error) {
      console.log(error, 'error');

      showToast('Something went wrong');
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!form.email) newErrors.email = 'Email is required';
    if (!form.password) newErrors.password = 'Password is required';
    setErrors(newErrors);
    setSpinner(false);
    return Object.keys(newErrors).length === 0;
  };


  
  const handleLogin = async () => {
    // setSpinner(true);
    // const isConnected = await Checknetinfo();
    // if (!isConnected) {
    //   setSpinner(false);
    //   return;
    // }
    // if (validateForm()) {
    //   let CanAdd = await CheckDataBase(); // Checks for existing user
    //   console.log(CanAdd, 'CanAdd');
    // } else {
    //   showToast('Some invalid data');
    // }
    setIsLogin(false);

  };

  const handleRegister = () => {
    navigation.navigate('Register');
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
              Sign in
            </CustomText>
            <CustomText
              style={{
                fontFamily: fonts.Regular,
              }}>
              Sign in to track your fitness progress, get personalized workout
              and diet plans, and achieve your health goals.
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
              onPress={spinner ? () => {} : handleLogin}
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
                  Login
                </CustomText>
              )}
            </Button>

            <View
              style={{
                fontFamily: fonts.Light,
              }}
              className="my-2 text-center items-center flex-row justify-center space-x-1">
              <CustomText style={{fontFamily: fonts.Light}}>
                Don't have an account?{' '}
              </CustomText>
              <TouchableOpacity onPress={handleRegister}>
                <CustomText
                  style={{
                    color: theme.colors.appColor,
                    fontFamily: fonts.Light,
                  }}
                  className="underline">
                  Register
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
  image: {
    width: 70,
    height: 70,
    borderRadius: 100,
  },
});
