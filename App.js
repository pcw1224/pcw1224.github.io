import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { Accelerometer } from 'expo-sensors';

function HomeScreen() {
  const [stepCount, setStepCount] = useState(0);

  useEffect(() => {
    let subscription;
    Accelerometer.setUpdateInterval(1000);

    subscription = Accelerometer.addListener((accelerometerData) => {
      const { x, y, z } = accelerometerData;
      const acceleration = Math.sqrt(x * x + y * y + z * z);
      const stepThreshold = 1.2;

      if (acceleration > stepThreshold) {
        setStepCount((prevCount) => prevCount + 1);
      }
    });

    return () => {
      if (subscription) {
        subscription.remove();
      }
    };
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>일일 활동량</Text>
      <Text style={styles.text}>걸음 수: {stepCount}</Text>
      <Text style={styles.text}>칼로리: {stepCount * 0.0336}</Text>
    </View>
  );
}

function ExerciseCategoriesScreen({ navigation }) {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [exerciseList, setExerciseList] = useState([]);

  const toggleCategory = (category) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories((prevSelected) =>
        prevSelected.filter((item) => item !== category)
      );
    } else {
      setSelectedCategories((prevSelected) => [...prevSelected, category]);
    }
  };

  useEffect(() => {
    let newExerciseList = [];
    if (selectedCategories.includes('Aerobic')) {
      newExerciseList.push('유산소 운동 1', '유산소 운동 2', '유산소 운동 3');
    }
    if (selectedCategories.includes('Strength')) {
      newExerciseList.push('근력 운동 1', '근력 운동 2', '근력 운동 3');
    }
    if (selectedCategories.includes('PostureCorrection')) {
      newExerciseList.push('자세 교정 운동 1', '자세 교정 운동 2', '자세 교정 운동 3');
    }
    setExerciseList(newExerciseList);
  }, [selectedCategories]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>운동 카테고리</Text>
      <TouchableOpacity
        style={[
          styles.categoryButton,
          selectedCategories.includes('Aerobic') && styles.selectedCategory,
        ]}
        onPress={() => toggleCategory('Aerobic')}
      >
        <Ionicons name="walk" size={24} color="white" />
        <Text style={styles.categoryButtonText}>유산소</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.categoryButton,
          selectedCategories.includes('Strength') && styles.selectedCategory,
        ]}
        onPress={() => toggleCategory('Strength')}
      >
        <Ionicons name="barbell" size={24} color="white" />
        <Text style={styles.categoryButtonText}>근력</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.categoryButton,
          selectedCategories.includes('PostureCorrection') && styles.selectedCategory,
        ]}
        onPress={() => toggleCategory('PostureCorrection')}
      >
        <Ionicons name="body" size={24} color="white" />
        <Text style={styles.categoryButtonText}>자세 교정</Text>
      </TouchableOpacity>

      <View style={styles.exerciseListContainer}>
        {exerciseList.map((exercise, index) => (
          <TouchableOpacity
            key={index}
            style={styles.exerciseItem}
            onPress={() => {
              // 운동 선택 시 동작할 로직을 구현하세요.
            }}
          >
            <Text style={styles.exerciseText}>{exercise}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('RoutineManagement')}
      >
        <Text style={styles.buttonText}>루틴 관리</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('CustomInput')}
      >
        <Text style={styles.buttonText}>직접 입력</Text>
      </TouchableOpacity>
    </View>
  );
}

function RoutineManagementScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>루틴 관리</Text>
    </View>
  );
}

function CustomInputScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>직접 입력</Text>
    </View>
  );
}

function CommunityScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>커뮤니티</Text>
    </View>
  );
}

function MyPageScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>마이 페이지</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="home" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="ExerciseCategories"
          component={ExerciseCategoriesScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="bicycle" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Community"
          component={CommunityScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="people" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="MyPage"
          component={MyPageScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="person" size={size} color={color} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  text: {
    fontSize: 18,
    marginBottom: 8,
  },
  categoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#007AFF',
    borderRadius: 10,
    padding: 10,
    marginBottom: 16,
  },
  selectedCategory: {
    backgroundColor: '#0052D6',
  },
  categoryButtonText: {
    color: 'white',
    marginLeft: 8,
  },
  exerciseListContainer: {
    marginTop: 16,
    alignItems: 'center',
  },
  exerciseItem: {
    backgroundColor: '#F0F0F0',
    borderRadius: 10,
    padding: 10,
    marginBottom: 8,
    width: '80%',
    alignItems: 'center',
  },
  exerciseText: {
    fontSize: 16,
  },
  button: {
    backgroundColor: '#007AFF',
    borderRadius: 10,
    padding: 10,
    marginTop: 16,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
});
