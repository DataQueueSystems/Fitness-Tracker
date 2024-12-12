import {Alert, Linking, Platform, StyleSheet, Text, View} from 'react-native';
import React, {createContext, useContext, useEffect, useState} from 'react';
import NetInfo from '@react-native-community/netinfo';
import {showToast} from '../../utils/Toast.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';

const Authcontext = createContext();
export const AuthContextProvider = ({children}) => {
  const [isLogin, setIsLogin] = useState(false);
  const [userDetail, setUserDetail] = useState(null);
  const [count, setCount] = useState(0);
  const [ipAddress, setIpAddress] = useState(null);

  // BMI category
  const [bmi, setBmi] = useState(null);
  //fav exercise
  const [favExercise, setFavExercise] = useState([]);
  const [favFood, setFavFood] = useState([]);


  const GetUserDetail = async () => {
    try {
      const getData = await AsyncStorage.getItem('user');
      if(getData!==null){
        let userDetail=await JSON.parse(getData)
        console.log(userDetail,'userDetail');
        setUserDetail(userDetail)
      }
    } catch (error) {
      console.error('Error fetching user details:', error);
    }
  };

  const GetEndPoint = async () => {
    try {
      await firestore()
        .collection('EndPoint')
        .doc('portNum')
        .onSnapshot(async snapShot => {
          if (snapShot.exists) {
            let data = snapShot.data();
            await setIpAddress(data?.ipAddress);
          } else {
            console.warn('User document does not exist');
          }
        });
    } catch (error) {
      // console.log('error when getting endPoint : ', error);
    }
  };

  useEffect(() => {
    GetUserDetail();
    GetEndPoint();
  }, []);

  const Checknetinfo = async () => {
    const state = await NetInfo.fetch(); // Get the current network state
    if (!state.isConnected) {
      showToast('No internet connection.', 'error');
      return false; // No internet connection
    }
    return true; // Internet connection is available
  };

  const gotoSetting = () => {
    Alert.alert(
      'Notification Permission Denied',
      'Please grant permission for notifications in the app settings to continue.',
      [
        {
          text: 'Open Settings',
          onPress: () => Linking.openSettings(),
        },
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
      ],
    );
  };

  const handleLogout = () => {
    Alert.alert(
      'Logout', //title
      'Are you sure ,you want to logout ?', //message
      [
        {
          text: 'Cancel', // Cancel button
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'OK', // OK button
          onPress: () => {
            setIsLogin(true);
            AsyncStorage.setItem('IsLogin', 'false');
            AsyncStorage.clear();
            setUserDetail(null);
            showToast('Logout successfully!');
            // some logic
          },
        },
      ],
      {cancelable: false}, // Optionally prevent dismissing by tapping outside the alert
    );
  };

  const GetStoredBmi = async () => {
    const userBMI = await AsyncStorage.getItem('BMI');
    await setBmi(userBMI);
  };
  useEffect(() => {
    GetStoredBmi();
  }, []);

  const GetStoredData = async () => {
    const storedExercise = await AsyncStorage.getItem('Fav-Exercise');
    const parsedFavs = storedExercise ? JSON.parse(storedExercise) : []; // Default to empty array if no saved data
    console.log('Parsed Fav Exercise:', parsedFavs); // This should log a plain array
    const storedFood = await AsyncStorage.getItem('Fav-Food');
    await setFavExercise(parsedFavs); // No need for '|| []' since parsedFavs is already an array
    await setFavFood(storedFood ? JSON.parse(storedFood) : []); // Ensure 'Fav-Food' is parsed as an array if necessary
  };
  

  useEffect(() => {
    GetStoredData();
  }, []);


  return (
    <Authcontext.Provider
      value={{
        isLogin,
        setIsLogin,
        Checknetinfo,

        // User Detail
        userDetail,
        setUserDetail,

        // logout func
        handleLogout,

        gotoSetting,
        setCount,

        ipAddress,

        bmi,
        setBmi,

        favExercise, setFavExercise,
        favFood,setFavFood,
        
      }}>
      {children}
    </Authcontext.Provider>
  );
};

export const useAuthContext = () => useContext(Authcontext);
