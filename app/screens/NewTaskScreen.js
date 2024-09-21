import React, { useState, useContext } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { TaskContext } from '../components/TaskContext';

export default function NewTaskScreen({ navigation }) {
  const { addTask } = useContext(TaskContext);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [time, setTime] = useState('');
  const [location, setLocation] = useState('');

  const handleTimeChange = (input) => {
    const cleanedInput = input.replace(/[^\d]/g, '');

    let formattedTime = cleanedInput;
    if (cleanedInput.length > 2) {
      formattedTime = `${cleanedInput.slice(0, 2)}:${cleanedInput.slice(2, 4)}`;
    }

    const [hours, minutes] = formattedTime.split(':');

    if (hours && parseInt(hours, 10) > 23) {
      formattedTime = `23:${minutes || ''}`;
    }

    if (minutes && parseInt(minutes, 10) > 59) {
      formattedTime = `${hours || ''}:59`;
    }

    setTime(formattedTime);
  };

  const handleAddTask = () => {
    addTask(title, description, time, location);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Название"
        placeholderTextColor="#D8E9A8"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.input}
        placeholder="Описание"
        placeholderTextColor="#D8E9A8"
        value={description}
        onChangeText={setDescription}
        multiline
      />
      <TextInput
        style={styles.input}
        placeholder="Время (HH:MM)"
        placeholderTextColor="#D8E9A8"
        value={time}
        onChangeText={handleTimeChange}
        keyboardType="numeric"
        maxLength={5}
      />
      <TextInput
        style={styles.input}
        placeholder="Место"
        placeholderTextColor="#D8E9A8"
        value={location}
        onChangeText={setLocation}
      />
      <TouchableOpacity style={styles.addButton} onPress={handleAddTask}>
        <Text style={styles.addButtonText}>Добавить задачу</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#191A19',
    padding: 20,
  },
  input: {
    fontSize: 18,
    color: '#D8E9A8',
    height: 60,
    marginBottom: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  addButton: {
    backgroundColor: '#4E9F3D',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#D8E9A8',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
