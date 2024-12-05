import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import {Divider, useTheme} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import CustomText from '../customText/CustomText';
import {fonts} from '../customText/fonts';
import {Iconify} from 'react-native-iconify';

export default function Profile() {
  let theme = useTheme();
  let navigation = useNavigation();
  let size = 30;
  const handleEdit=()=>{
    navigation.navigate("EditProfile")
  }
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
            <View className="items-end right-3 top-3">
              <Iconify
                icon="fluent:edit-32-filled"
                size={28}
                color={theme.colors.appColor}
                onPress={handleEdit}
              />
            </View>
            <View className="flex-column items-center justify-center space-y-3 my-4">
              <Image
                className="rounded-full"
                source={{
                  uri: 'https://img.freepik.com/free-photo/handsome-young-man-with-new-stylish-haircut_176420-19636.jpg?t=st=1733376805~exp=1733380405~hmac=1817ce5a6f6fc544dec6790dbd692226536f275ee5b494d120227147554eb769&w=2000',
                }}
                style={{width: 100, height: 100}}
              />
              <CustomText
                className="text-[19px]"
                style={{
                  fontFamily: fonts.SemiBold,
                  color: theme.colors.appColor,
                }}>
                Rilwan
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
                    r@gmail.com
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
                    1234567892
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
                    23
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
                    Male
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
                    100
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
                    100
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
});
