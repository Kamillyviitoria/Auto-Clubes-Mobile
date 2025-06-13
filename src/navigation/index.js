import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Platform } from 'react-native';
import HomeScreen from '../screens/HomeScreen';
import ClubesScreen from '../screens/ClubesScreen.jsx';
import VeiculosScreen from '../screens/VeiculosScreen.jsx';
import FormClubeScreen from '../screens/FormClubeScreen';
import FormVeiculoScreen from '../screens/FormVeiculoScreen';
import EventosScreen from '../screens/EventosScreen.jsx';
import FormEventoScreen from '../screens/FormEventoScreen';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#eb17b0',
        tabBarInactiveTintColor: '#666',
        tabBarStyle: { 
          backgroundColor: '#222',
          borderTopWidth: 0,
          elevation: 0,
          shadowOpacity: 0,
          height: Platform.OS === 'ios' ? 88 : 60,
          paddingBottom: Platform.OS === 'ios' ? 28 : 8,
          paddingTop: 8,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
        },
      }}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }} 
      />
      <Tab.Screen 
        name="Clubes" 
        component={ClubesScreen} 
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="car-multiple" color={color} size={size} />
          ),
        }} 
      />
      <Tab.Screen 
        name="Veículos" 
        component={VeiculosScreen} 
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="car" color={color} size={size} />
          ),
        }} 
      />
      <Tab.Screen 
        name="Eventos" 
        component={EventosScreen} 
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="calendar" color={color} size={size} />
          ),
        }} 
      />
    </Tab.Navigator>
  );
}

export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        screenOptions={{ 
          headerShown: false,
          cardStyle: { backgroundColor: '#222' },
          cardOverlayEnabled: true,
          animationEnabled: true,
        }}
      >
        <Stack.Screen name="MainTabs" component={MainTabs} />
        <Stack.Screen name="FormClubeScreen" component={FormClubeScreen} />
        <Stack.Screen name="FormVeiculoScreen" component={FormVeiculoScreen} />
        <Stack.Screen name="EventosScreen" component={EventosScreen} />
        <Stack.Screen name="FormEventoScreen" component={FormEventoScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
} 