import React from 'react';
import { View, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import TaskListScreen from './app/screens/TaskListScreen';
import NewTaskScreen from './app/screens/NewTaskScreen';
import EditTaskScreen from './app/screens/EditTaskScreen';
import { TaskProvider } from './app/components/TaskContext';

const Stack = createStackNavigator();

export default function MainApp() {
  return (
    <TaskProvider>
      <View style={styles.appContainer}>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerStyle: { backgroundColor: '#4E9F3D' },
              headerTintColor: '#D8E9A8',
            }}>
            <Stack.Screen name="TaskList" component={TaskListScreen} />
            <Stack.Screen name="NewTaskScreen" component={NewTaskScreen} />
            <Stack.Screen name="EditTaskScreen" component={EditTaskScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </View>
    </TaskProvider>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    backgroundColor: '#191A19',
  },
});
