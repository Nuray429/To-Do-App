import React, { useContext, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList } from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import Icon from 'react-native-vector-icons/FontAwesome';
import { TaskContext } from '../components/TaskContext';

export default function TaskListScreen({ navigation }) {
  const { tasks, changeStatus, deleteTask } = useContext(TaskContext);
  const [tab, setTab] = useState('All');

  const renderRightActions = (id) => (
    <TouchableOpacity style={styles.deleteButton} onPress={() => deleteTask(id)}>
      <Text style={styles.deleteText}>Удалить</Text>
    </TouchableOpacity>
  );

  const filteredTasks = tasks.filter(task => {
    if (tab === 'All') return true;
    return task.status === tab;
  });

  const renderItem = ({ item }) => (
    <Swipeable renderRightActions={() => renderRightActions(item.id)}>
      <TouchableOpacity onPress={() => navigation.navigate('EditTaskScreen', { task: item })}>
        <View style={styles.taskItem}>
          <Text style={styles.taskTitle}>{item.title}</Text>
          <View style={styles.taskDetails}>
            <Text style={styles.taskTime}>{item.time}</Text>
            <Text style={styles.taskLocation}>{item.location}</Text>
          </View>
          <View style={styles.taskActions}>
            <TouchableOpacity onPress={() => changeStatus(item.id, 'Done')} style={styles.iconButton}>
              <Icon name="check-circle" size={40} color="#191A19" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => changeStatus(item.id, 'Cancelled')} style={styles.iconButton}>
              <Icon name="times-circle" size={40} color="#ff3b30" />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    </Swipeable>
  );

  return (
    <View style={styles.container}>
      <View style={styles.tabs}>
        <TouchableOpacity onPress={() => setTab('All')}>
          <Text style={tab === 'All' ? styles.activeTab : styles.tab}>Все</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setTab('In Progress')}>
          <Text style={tab === 'In Progress' ? styles.activeTab : styles.tab}>В процессе</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setTab('Done')}>
          <Text style={tab === 'Done' ? styles.activeTab : styles.tab}>Завершенные</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setTab('Cancelled')}>
          <Text style={tab === 'Cancelled' ? styles.activeTab : styles.tab}>Отмененные</Text>
        </TouchableOpacity>
      </View>

      {filteredTasks.length === 0 ? (
        <Text style={styles.noTasksText}>Нет задач для отображения</Text>
      ) : (
        <FlatList
          data={filteredTasks}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      )}

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('NewTaskScreen')}
      >
        <Text style={styles.addButtonText}>+</Text>
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
  tabs: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  tab: {
    fontSize: 15,
    color: '#D8E9A8',
  },
  activeTab: {
    fontSize: 15,
    color: '#4E9F3D',
    fontWeight: 'bold',
  },
  taskItem: {
    backgroundColor: '#4E9F3D',
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  taskTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#D8E9A8',
    marginBottom: 5,
  },
  taskDetails: {
    flexDirection: 'column',
    marginBottom: 10,
  },
  taskTime: {
    fontSize: 14,
    color: '#D8E9A8',
  },
  taskLocation: {
    fontSize: 14,
    color: '#D8E9A8',
  },
  taskActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  iconButton: {
    marginHorizontal: 10,
  },
  noTasksText: {
    color: '#D8E9A8',
    textAlign: 'center',
    marginTop: 20,
  },
  addButton: {
    backgroundColor: '#4E9F3D',
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: 20,
    bottom: 20,
  },
  addButtonText: {
    color: '#D8E9A8',
    fontSize: 30,
    lineHeight: 30,
  },
  deleteButton: {
    backgroundColor: '#ff3b30',
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    height: '100%',
    borderRadius: 8,
  },
  deleteText: {
    color: '#D8E9A8',
    fontWeight: 'bold',
  },
});
