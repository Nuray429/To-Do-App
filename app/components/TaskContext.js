import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      const storedTasks = await AsyncStorage.getItem('tasks');
      if (storedTasks) {
        const parsedTasks = JSON.parse(storedTasks);
        setTasks(parsedTasks);
      }
    } catch (error) {
      console.log('Ошибка загрузки задач:', error);
    }
  };

  const saveTasks = async (updatedTasks) => {
    try {
      await AsyncStorage.setItem('tasks', JSON.stringify(updatedTasks));
    } catch (error) {
      console.log('Ошибка сохранения задач:', error);
    }
  };

  const addTask = (title, description, time, location) => {
    const newTask = {
      id: Math.random().toString(),
      title,
      description,
      time,
      location,
      status: 'In Progress',
    };

    setTasks(prevTasks => {
      const updatedTasks = [...prevTasks, newTask];
      saveTasks(updatedTasks);
      return updatedTasks;
    });
  };

  const changeStatus = (id, newStatus) => {
    setTasks(prevTasks => {
      const updatedTasks = prevTasks.map(task =>
        task.id === id ? { ...task, status: newStatus } : task
      );
      saveTasks(updatedTasks);
      return updatedTasks;
    });
  };

  const deleteTask = (id) => {
    setTasks(prevTasks => {
      const updatedTasks = prevTasks.filter(task => task.id !== id);
      saveTasks(updatedTasks);
      return updatedTasks;
    });
  };

  const updateTask = (updatedTask) => {
    setTasks(prevTasks => {
      const updatedTasks = prevTasks.map(task =>
        task.id === updatedTask.id ? updatedTask : task
      );
      saveTasks(updatedTasks);
      return updatedTasks;
    });
  };

  return (
    <TaskContext.Provider value={{ tasks, addTask, changeStatus, deleteTask, updateTask }}>
      {children}
    </TaskContext.Provider>
  );
};
