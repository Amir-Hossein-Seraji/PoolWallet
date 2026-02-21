import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Home, PlusCircle } from 'lucide-react-native';
// Screens
import HomeScreen from './src/screens/HomeScreen';
import AddScreen from './src/screens/AddScreen';
import LoginScreen from './src/screens/LoginScreen';
import SignupScreen from './src/screens/SignupScreen'; // <--- NEW IMPORT

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function AppTabs({ setIsLoggedIn }) {
  return (
    <Tab.Navigator 
      screenOptions={({ route }) => ({
        headerShown: true,
        tabBarActiveTintColor: '#007BFF',
        tabBarInactiveTintColor: 'gray',
        tabBarIcon: ({ color, size }) => {
          if (route.name === 'Home') {
            return <Home color={color} size={size} />;
          } else if (route.name === 'Add') {
            return <PlusCircle color={color} size={size} />;
          }
        },
      })}
    >
      <Tab.Screen name="Home" options={{ title: 'My Wallet' }}>
        {props => <HomeScreen {...props} setIsLoggedIn={setIsLoggedIn} />}
      </Tab.Screen>
      <Tab.Screen name="Add" component={AddScreen} options={{ title: 'Add Transaction' }} />
    </Tab.Navigator>
  );
}

function AuthStack({ setIsLoggedIn }) {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login">
        {props => <LoginScreen {...props} setIsLoggedIn={setIsLoggedIn} />}
      </Stack.Screen>
      {/* 2. ADD THE SIGNUP SCREEN HERE */}
      <Stack.Screen name="Signup">
        {props => <SignupScreen {...props} setIsLoggedIn={setIsLoggedIn} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
}

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(null);

  useEffect(() => {
    checkLoginStatus();
  }, []);

  const checkLoginStatus = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      setIsLoggedIn(!!token);
    } catch (e) {
      setIsLoggedIn(false);
    }
  };

  if (isLoggedIn === null) {
    return <View style={{flex:1, justifyContent:'center'}}><ActivityIndicator size="large" /></View>;
  }

  return (
    <NavigationContainer>
      {isLoggedIn ? (
        <AppTabs setIsLoggedIn={setIsLoggedIn} /> // <--- Pass it here
      ) : (
        <AuthStack setIsLoggedIn={setIsLoggedIn} />
      )}
    </NavigationContainer>
  );
}