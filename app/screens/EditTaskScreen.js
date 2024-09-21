import React, { useState, useContext } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { TaskContext } from '../components/TaskContext';

export default function EditTaskScreen({ route, navigation }) {
  const { updateTask } = useContext(TaskContext);
  const { task } = route.params;

  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [time, setTime] = useState(task.time);
  const [location, setLocation] = useState(task.location);

  const handleUpdateTask = () => {
    updateTask({ ...task, title, description, time, location });
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
        onChangeText={setTime}
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
      <TouchableOpacity style={styles.saveButton} onPress={handleUpdateTask}>
        <Text style={styles.saveButtonText}>Сохранить изменения</Text>
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
  saveButton: {
    backgroundColor: '#4E9F3D',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#D8E9A8',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
