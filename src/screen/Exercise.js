import {
  StyleSheet,
  View,
  FlatList,
  TouchableOpacity,
  Appearance,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Tooltip, useTheme} from 'react-native-paper';
import CustomText from '../customText/CustomText';
import {fonts} from '../customText/fonts';
import LinearGradient from 'react-native-linear-gradient';
import {Iconify} from 'react-native-iconify';
import {useAuthContext} from '../context/GlobaContext';
import {showToast} from '../../utils/Toast';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Exercise() {
  const theme = useTheme();
  const {bmi, setFavExercise, favExercise} = useAuthContext();
  const [exercisePlan, setExercisePlan] = useState(null);
  const [category, setCategory] = useState(null);

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

  const renderItem = (item, handleFav) => {
    const isFav = favExercise.some(fav => fav?.day === item?.day); // Check if any object in favExercise has the same day
    return (
      <LinearGradient
        colors={gradientColors[0]} // Apply random gradient colors
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        style={{
          padding: 16,
          marginVertical: 8,
          borderRadius: 10,
          elevation: 6,
          marginHorizontal: 10,
        }}>
        <TouchableOpacity
          onPress={() => handleFav(item)}
          style={{
            position: 'absolute', // `absolute` from Tailwind
            right: 12, // `right-3` -> 3 * 4px = 12px
            top: 12, // `top-3` -> 3 * 4px = 12px
            zIndex: 1, // `zIndex-1`
          }}>
          <Iconify
            icon="solar:heart-bold"
            size={32}
            color={isFav ? '#353434' : theme.colors.appColor} // Red if the item is favorited
          />
        </TouchableOpacity>

        <CustomText
          className="text-[15px] "
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

  function getExercisePlan(bmi) {
    if (bmi < 18.5) {
      return {
        category: 'Underweight',
        plan: [
          {
            day: 1,
            exercise: 'Light yoga and stretching',
            subtitle: 'Gentle movements to improve flexibility and relaxation.',
          },
          {
            day: 2,
            exercise: '20-minute walk',
            subtitle:
              'A leisurely pace to build stamina and energize your day.',
          },
          {
            day: 3,
            exercise: 'Bodyweight exercises (push-ups, squats)',
            subtitle: 'Simple strength-building exercises to tone muscles.',
          },
          {
            day: 4,
            exercise: 'Rest',
            subtitle: 'A day to recover and let your body heal.',
          },
          {
            day: 5,
            exercise: '30-minute brisk walk',
            subtitle: 'Pick up the pace to increase cardiovascular strength.',
          },
          {
            day: 6,
            exercise: 'Light yoga',
            subtitle: 'Focus on breathing and gentle poses to relax your body.',
          },
          {day: 7, exercise: 'Rest', subtitle: 'Time to recharge your energy.'},
          {
            day: 8,
            exercise: 'Resistance band exercises',
            subtitle:
              'Enhance muscle tone with low-impact resistance training.',
          },
          {
            day: 9,
            exercise: '20-minute walk',
            subtitle: 'Stay active with a comfortable pace walk.',
          },
          {
            day: 10,
            exercise: 'Light jogging',
            subtitle: 'Engage your heart and build endurance.',
          },
          {
            day: 11,
            exercise: 'Bodyweight exercises',
            subtitle: 'Strengthen your core with simple bodyweight moves.',
          },
          {
            day: 12,
            exercise: 'Rest',
            subtitle: 'Allow muscles to recover for optimal growth.',
          },
          {
            day: 13,
            exercise: 'Yoga and meditation',
            subtitle: 'Combine mindfulness and flexibility exercises.',
          },
          {
            day: 14,
            exercise: '30-minute brisk walk',
            subtitle: 'Boost your energy levels with a faster walk.',
          },
          {
            day: 15,
            exercise: 'Rest',
            subtitle: 'Complete the cycle with restorative rest.',
          },
        ],
      };
    } else if (bmi >= 18.5 && bmi < 24.9) {
      return {
        category: 'Normal weight',
        plan: [
          {
            day: 1,
            exercise: 'Cardio (running or cycling for 30 minutes)',
            subtitle: 'Burn calories and enhance heart health.',
          },
          {
            day: 2,
            exercise: 'Strength training (upper body)',
            subtitle: 'Focus on building arm, chest, and back muscles.',
          },
          {
            day: 3,
            exercise: 'Yoga for flexibility',
            subtitle: 'Stretch your muscles to improve range of motion.',
          },
          {
            day: 4,
            exercise: 'Rest',
            subtitle: 'Take a break to recover and recharge.',
          },
          {
            day: 5,
            exercise: 'HIIT workout (20 minutes)',
            subtitle: 'Boost metabolism with short bursts of intense exercise.',
          },
          {
            day: 6,
            exercise: 'Strength training (lower body)',
            subtitle: 'Target your legs and glutes for a balanced build.',
          },
          {
            day: 7,
            exercise: '30-minute brisk walk',
            subtitle: 'A simple way to keep your body active and engaged.',
          },
          {
            day: 8,
            exercise: 'Cardio (swimming or cycling)',
            subtitle: 'Low-impact options to build endurance.',
          },
          {
            day: 9,
            exercise: 'Core strength workout',
            subtitle: 'Strengthen your abs and stabilize your body.',
          },
          {
            day: 10,
            exercise: 'Rest',
            subtitle: 'Let your muscles recover from the week’s workouts.',
          },
          {
            day: 11,
            exercise: 'Cardio (running or brisk walk)',
            subtitle: 'Increase your heart rate for improved fitness.',
          },
          {
            day: 12,
            exercise: 'Full-body strength training',
            subtitle: 'Target all major muscle groups for a complete session.',
          },
          {
            day: 13,
            exercise: 'Yoga for relaxation',
            subtitle: 'Unwind with calming poses and breathing techniques.',
          },
          {
            day: 14,
            exercise: 'HIIT workout',
            subtitle: 'A high-energy session for maximum calorie burn.',
          },
          {
            day: 15,
            exercise: 'Rest',
            subtitle: 'Give your body time to rebuild stronger.',
          },
        ],
      };
    } else if (bmi >= 25 && bmi < 29.9) {
      return {
        category: 'Overweight',
        plan: [
          {
            day: 1,
            exercise: 'Walking (40 minutes)',
            subtitle: 'A steady pace to start burning calories effectively.',
          },
          {
            day: 2,
            exercise: 'Bodyweight exercises',
            subtitle: 'Use your body’s weight to build strength gradually.',
          },
          {
            day: 3,
            exercise: 'Yoga (focus on balance)',
            subtitle: 'Improve balance and coordination with simple poses.',
          },
          {
            day: 4,
            exercise: 'Rest',
            subtitle: 'Allow time to relax and reduce muscle soreness.',
          },
          {
            day: 5,
            exercise: 'Swimming or cycling',
            subtitle: 'Engage multiple muscle groups in a low-impact way.',
          },
          {
            day: 6,
            exercise: 'Strength training (light weights)',
            subtitle: 'Build muscle endurance without straining joints.',
          },
          {
            day: 7,
            exercise: 'Rest',
            subtitle: 'Focus on recovery for continued progress.',
          },
          {
            day: 8,
            exercise: 'Brisk walking (45 minutes)',
            subtitle: 'Extend your walking routine to boost stamina.',
          },
          {
            day: 9,
            exercise: 'Cardio workout',
            subtitle: 'Engage your heart with steady, moderate exercise.',
          },
          {
            day: 10,
            exercise: 'Yoga for flexibility',
            subtitle: 'Enhance muscle pliability and prevent stiffness.',
          },
          {
            day: 11,
            exercise: 'Rest',
            subtitle: 'Take a day off to rebuild energy reserves.',
          },
          {
            day: 12,
            exercise: 'Strength training (upper body)',
            subtitle: 'Concentrate on upper-body strength with light weights.',
          },
          {
            day: 13,
            exercise: 'HIIT workout (low intensity)',
            subtitle: 'A gentler version of HIIT to suit your pace.',
          },
          {
            day: 14,
            exercise: 'Walking (30 minutes)',
            subtitle: 'A shorter session to stay active without overexertion.',
          },
          {
            day: 15,
            exercise: 'Rest',
            subtitle: 'Wrap up the plan with a restful day.',
          },
        ],
      };
    } else {
      return {
        category: 'Obesity',
        plan: [
          {
            day: 1,
            exercise: 'Light walking (20 minutes)',
            subtitle: 'Start slow to ease into physical activity.',
          },
          {
            day: 2,
            exercise: 'Yoga (focus on breathing)',
            subtitle: 'Deep breathing to relax and enhance lung capacity.',
          },
          {
            day: 3,
            exercise: 'Chair exercises',
            subtitle: 'Low-impact moves for improved mobility.',
          },
          {
            day: 4,
            exercise: 'Rest',
            subtitle: 'A day to let your body recover and adapt.',
          },
          {
            day: 5,
            exercise: 'Light swimming or cycling',
            subtitle: 'Gentle cardio to reduce joint impact.',
          },
          {
            day: 6,
            exercise: 'Resistance band exercises',
            subtitle: 'Build strength with controlled resistance.',
          },
          {day: 7, exercise: 'Rest', subtitle: 'Allow muscles to rejuvenate.'},
          {
            day: 8,
            exercise: 'Walking (30 minutes)',
            subtitle: 'Increase your endurance with a longer session.',
          },
          {
            day: 9,
            exercise: 'Yoga for relaxation',
            subtitle: 'Calm your mind and body for overall wellness.',
          },
          {
            day: 10,
            exercise: 'Rest',
            subtitle: 'Give yourself time to relax and reset.',
          },
          {
            day: 11,
            exercise: 'Strength training (low resistance)',
            subtitle: 'Light resistance to gradually tone muscles.',
          },
          {
            day: 12,
            exercise: 'Light jogging or brisk walk',
            subtitle: 'Engage in low-impact cardio for weight management.',
          },
          {
            day: 13,
            exercise: 'Chair exercises',
            subtitle: 'Simple seated moves to stay active.',
          },
          {
            day: 14,
            exercise: 'Light swimming',
            subtitle: 'Gentle full-body exercise in a pool.',
          },
          {
            day: 15,
            exercise: 'Rest',
            subtitle: 'Finish the plan with restorative downtime.',
          },
        ],
      };
    }
  }

  useEffect(() => {
    // Example usage
    if (bmi) {
      const exercisePlan = getExercisePlan(bmi);
      setExercisePlan(exercisePlan?.plan);
      setCategory(exercisePlan?.category);
    }
  }, [bmi]);

  const handleFav = async exercise => {
    setFavExercise(prev => {
      const currentFavExercises = prev || []; // Ensure it's always an array
      const isAlreadyFav = currentFavExercises.some(
        item => item.day === exercise.day,
      );
      if (isAlreadyFav) {
        // Remove exercise from favorites
        showToast('Removing Exercise from Favorite ..');
        const updatedFavs = currentFavExercises.filter(
          item => item.day !== exercise.day,
        );
        AsyncStorage.setItem('Fav-Exercise', JSON.stringify(updatedFavs));
        return updatedFavs;
      } else {
        // Add exercise to favorites
        const data = [...currentFavExercises, {...exercise, category}];
        AsyncStorage.setItem('Fav-Exercise', JSON.stringify(data)); // Store as array
        return data;
      }
    });
  };

  return (
    <View>
      <FlatList
        data={exercisePlan}
        renderItem={({item}) => renderItem(item, handleFav, category)}
        keyExtractor={item => item.day.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
