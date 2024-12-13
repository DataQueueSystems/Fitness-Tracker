import {
  Animated,
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useRef, useState} from 'react';
import {Divider, useTheme} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import CustomText from '../customText/CustomText';
import {fonts} from '../customText/fonts';
import {Iconify} from 'react-native-iconify';
import {useAuthContext} from '../context/GlobaContext';
import ImageModal from '../component/Modal/ImageModal';

export default function Profile() {
  let theme = useTheme();
  const {userDetail, handleLogout} = useAuthContext();
  let navigation = useNavigation();
  let size = 30;
  const handleEdit = () => {
    navigation.navigate('EditProfile');
  };

  return (
    <>
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
            <View className="flex-row justify-end gap-2.5">
              <Iconify
                icon="basil:edit-outline"
                size={30}
                color={theme.colors.appColor}
                onPress={handleEdit}
              />
              <Iconify
                icon="hugeicons:logout-03"
                size={30}
                color={theme.colors.appColor}
                onPress={handleLogout}
              />
            </View>
            <View className="flex-column items-center justify-center space-y-3 my-4">
              <Image
                source={require('../../assets/Image/defaultAvtar.jpg')}
                className="rounded-full"
                style={{width: 100, height: 100}}
              />

              <CustomText
                className="text-[19px]"
                style={{
                  fontFamily: fonts.SemiBold,
                  color: theme.colors.appColor,
                }}>
                {userDetail?.Name}
              </CustomText>
            </View>

            {/* Other Detail */}
            <View className="s p-2">
              <View>
                <CustomText
                  className="text-[17px]"
                  style={{
                    fontFamily: fonts.SemiBold,
                    color: theme.colors.onBackground,
                  }}>
                  Profile Detail
                </CustomText>
              </View>
              <Divider className="my-2" />
              {/* Profile Details */}
              <View>
                {/* single Detail */}
                <View className=" flex-row justify-between items-center my-2">
                  <View className=" flex-row space-x-3 items-center">
                    <Iconify
                      icon="eva:email-fill"
                      size={size}
                      color={theme.colors.appColor}
                    />
                    <CustomText
                      className="text-1xl right-3xl"
                      style={{
                        fontFamily: fonts.Medium,
                        color: theme.colors.onBackground,
                      }}>
                      Email
                    </CustomText>
                  </View>
                  {/* Value */}
                  <CustomText
                    className="text-1xl"
                    style={{
                      fontFamily: fonts.Regular,
                      color: theme.colors.onBackground,
                    }}>
                    {userDetail?.Email}
                  </CustomText>
                </View>
                <View className=" flex-row justify-between items-center my-2">
                  <View className=" flex-row space-x-3 items-center">
                    <Iconify
                      icon="solar:phone-bold"
                      size={size}
                      color={theme.colors.appColor}
                    />
                    <CustomText
                      className="text-1xl right-3xl"
                      style={{
                        fontFamily: fonts.Medium,
                        color: theme.colors.onBackground,
                      }}>
                      Contact
                    </CustomText>
                  </View>
                  {/* Value */}
                  <CustomText
                    className="text-1xl"
                    style={{
                      fontFamily: fonts.Regular,
                      color: theme.colors.onBackground,
                    }}>
                    {userDetail?.contact ? userDetail?.contact : '--'}
                  </CustomText>
                </View>
                <View className=" flex-row justify-between items-center my-2">
                  <View className=" flex-row space-x-3 items-center">
                    <Iconify
                      icon="game-icons:ages"
                      size={size}
                      color={theme.colors.appColor}
                    />
                    <CustomText
                      className="text-1xl right-3xl"
                      style={{
                        fontFamily: fonts.Medium,
                        color: theme.colors.onBackground,
                      }}>
                      Age
                    </CustomText>
                  </View>
                  {/* Value */}
                  <CustomText
                    className="text-1xl"
                    style={{
                      fontFamily: fonts.Regular,
                      color: theme.colors.onBackground,
                    }}>
                    {userDetail?.age ? userDetail?.age : '--'}
                  </CustomText>
                </View>
                <View className=" flex-row justify-between items-center my-2">
                  <View className=" flex-row space-x-3 items-center">
                    <Iconify
                      icon="icons8:gender"
                      size={size}
                      color={theme.colors.appColor}
                    />
                    <CustomText
                      className="text-1xl right-3xl"
                      style={{
                        fontFamily: fonts.Medium,
                        color: theme.colors.onBackground,
                      }}>
                      Gender
                    </CustomText>
                  </View>
                  {/* Value */}
                  <CustomText
                    className="text-1xl"
                    style={{
                      fontFamily: fonts.Regular,
                      color: theme.colors.onBackground,
                    }}>
                    {userDetail?.gender ? userDetail?.gender : '--'}
                  </CustomText>
                </View>
                <View className=" flex-row justify-between items-center my-2">
                  <View className=" flex-row space-x-3 items-center">
                    <Iconify
                      icon="mingcute:line-height-fill"
                      size={size}
                      color={theme.colors.appColor}
                    />
                    <CustomText
                      className="text-1xl right-3xl"
                      style={{
                        fontFamily: fonts.Medium,
                        color: theme.colors.onBackground,
                      }}>
                      Height
                    </CustomText>
                  </View>
                  {/* Value */}
                  <CustomText
                    className="text-1xl"
                    style={{
                      fontFamily: fonts.Regular,
                      color: theme.colors.onBackground,
                    }}>
                    {userDetail?.height ? userDetail?.height : '--'}
                  </CustomText>
                </View>
                <View className=" flex-row justify-between items-center my-2">
                  <View className=" flex-row space-x-3 items-center">
                    <Iconify
                      icon="material-symbols:line-weight"
                      size={size}
                      color={theme.colors.appColor}
                    />
                    <CustomText
                      className="text-1xl right-3xl"
                      style={{
                        fontFamily: fonts.Medium,
                        color: theme.colors.onBackground,
                      }}>
                      Weight
                    </CustomText>
                  </View>
                  {/* Value */}
                  <CustomText
                    className="text-1xl"
                    style={{
                      fontFamily: fonts.Regular,
                      color: theme.colors.onBackground,
                    }}>
                    {userDetail?.weight ? userDetail?.weight : '--'}
                  </CustomText>
                </View>
              </View>
            </View>
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
  profileImage: {
    height: 100,
    weight: 100,
  },
});
