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
import SignupScreen from './src/screens/SignupScreen';
import EditScreen from './src/screens/EditScreen';
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
      <Stack.Screen name="Signup">
        {props => <SignupScreen {...props} setIsLoggedIn={setIsLoggedIn} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
}
function MainNavigator({ setIsLoggedIn }) {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Tabs" options={{ headerShown: false }}>
        {props => <AppTabs {...props} setIsLoggedIn={setIsLoggedIn} />}
      </Stack.Screen>
      <Stack.Screen 
        name="Edit" 
        component={EditScreen} 
        options={{ title: 'Edit Transaction', headerBackTitle: 'Back' }} 
      />
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
        <MainNavigator setIsLoggedIn={setIsLoggedIn} /> 
      ) : (
        <AuthStack setIsLoggedIn={setIsLoggedIn} />
      )}
    </NavigationContainer>
  );
}