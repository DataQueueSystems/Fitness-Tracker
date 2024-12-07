import {
  ActivityIndicator,
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
import {Iconify} from 'react-native-iconify';
import {launchImageLibrary} from 'react-native-image-picker';
import ImageModal from '../component/Modal/ImageModal';
import {useAuthContext} from '../context/GlobaContext';
import firestore from '@react-native-firebase/firestore';
import {uploadImageToCloudinary} from '../cloudinary';

export default function EditProfile() {
  let theme = useTheme();
  let navigation = useNavigation();
  const {Checknetinfo, userDetail} = useAuthContext();

  const [spinner, setSpinner] = useState(false);
  const [errors, setErrors] = useState({});

  // Initialize state with the prepared object
  const [form, setForm] = useState({
    name: userDetail?.name || '',
    email: userDetail?.email || '',
    height: userDetail?.height || '',
    weight: userDetail?.email || '',
    age: userDetail?.age || '',
    gender: userDetail?.height || '',
    email: userDetail?.weight || '',
    password: userDetail?.password || '',
    contact: userDetail?.contact || '',
    profile_image: userDetail?.profile_image || '',
  });

  const [visible, setVisible] = useState(false);
  const opacityAnim = useRef(new Animated.Value(0)).current;
  const [previmage, setPrevimage] = useState(null);
  const [selectedImageUri, setSelectedImageUri] = useState(null);

  // Function to handle opening the modal with animation
  const handlePrevImage = () => {
    setVisible(true);
    let imageUri = userDetail?.profile_image?.imageUri;
    setPrevimage(selectedImageUri || imageUri);
    Animated.timing(opacityAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };
  // Function to pick an image from the library
  const selectImage = () => {
    const options = {
      mediaType: 'photo',
      quality: 1,
    };
    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        const imageUri = response.assets[0].uri;
        setSelectedImageUri(imageUri);
      }
    });
  };

  // Simple validation function
  const validateForm = () => {
    const newErrors = {};
    if (!form.name) newErrors.name = 'Name is required';
    if (!form.weight) newErrors.weight = 'Weight is required';
    if (!form.height) newErrors.height = 'Height is required';
    if (!form.age) newErrors.age = 'Age is required';
    if (!form.gender) newErrors.gender = 'Gender is required';
    if (!form.password) newErrors.password = 'Password is required';
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
    const isConnected = await Checknetinfo();
    if (!isConnected) {
      setSpinner(false);
      return; // Do not proceed if there is no internet connection
    }
    try {
      if (validateForm()) {
        let defaultData = {
          ...form,
          create_date: new Date().toISOString(), // Current date and time in ISO format
        };

        if (selectedImageUri) {
          // Wait for the image upload to complete and get the image URL
          const uploadedImageUrl = await uploadImageToCloudinary(
            form?.name,
            // form?.profile_image,
            selectedImageUri,
            'FitnessTrack',
          );
          defaultData.profile_image = uploadedImageUrl;
          // If the image upload failed, handle it
          if (!uploadedImageUrl) {
            console.error('Image upload failed');
            setSpinner(false);
            return;
          }
        }
        await firestore()
          .collection('users')
          .doc(userDetail?.id)
          .update(defaultData);
        // await navigation.goBack();
        showToast('Profile Updated');
        setSpinner(false);
      }
    } catch (error) {
      setSpinner(false);
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
            <TouchableOpacity
              onPress={handlePrevImage}
              activeOpacity={0.8}
              style={styles.imageView}>
              {selectedImageUri ? (
                <Image
                  source={{uri: selectedImageUri}}
                  style={[
                    styles.profileImage,
                    {borderColor: theme.colors.onBackground},
                  ]}
                />
              ) : form?.profile_image?.imageUri ? (
                <Image
                  source={{uri: form?.profile_image?.imageUri}}
                  style={[
                    styles.profileImage,
                    {borderColor: theme.colors.appcolor},
                  ]}
                />
              ) : (
                <Image
                  source={require('../../assets/Image/defaultAvtar.jpg')}
                  style={[
                    styles.profileImage,
                    {borderColor: theme.colors.onBackground},
                  ]}
                />
              )}

              <TouchableOpacity onPress={selectImage} style={[styles.editView]}>
                <Iconify
                  icon="basil:edit-outline"
                  size={25}
                  color={theme.colors.appColor}
                />
              </TouchableOpacity>
            </TouchableOpacity>

            <TextInput
              label="Name"
              value={form?.name}
              onChangeText={value => handleChange('name', value)}
              style={styles.input}
              contentStyle={styles.inputContent}
              mode="outlined"
            />
            {errors?.name && (
              <CustomText
                className="bottom-2"
                style={[
                  styles.errorText,
                  {color: theme.colors.error, fontFamily: fonts.Light},
                ]}>
                {errors?.name}
              </CustomText>
            )}
            <TextInput
              label="Email"
              value={form?.email}
              onChangeText={value => handleChange('email', value)}
              style={styles.input}
              contentStyle={styles.inputContent}
              mode="outlined"
            />
            {errors?.email && (
              <CustomText
                className="bottom-2"
                style={[
                  styles.errorText,
                  {color: theme.colors.error, fontFamily: fonts.Light},
                ]}>
                {errors?.email}
              </CustomText>
            )}
            <TextInput
              label="Password"
              value={form?.password}
              onChangeText={value => handleChange('password', value)}
              style={styles.input}
              contentStyle={styles.inputContent}
              mode="outlined"
            />
            {errors?.password && (
              <CustomText
                className="bottom-2"
                style={[
                  styles.errorText,
                  {color: theme.colors.error, fontFamily: fonts.Light},
                ]}>
                {errors?.password}
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

      <ImageModal
        visible={visible}
        image={previmage}
        opacityAnim={opacityAnim}
        setVisible={setVisible}
      />
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
  },
  editView: {
    alignSelf: 'flex-end',
    right: 14,
    top: -10,
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
