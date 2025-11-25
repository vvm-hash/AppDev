import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';
import { openDatabaseAsync } from 'expo-sqlite';

export default function TabOneScreen() {
  const [db, setDb] = useState<any>(null);
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState<{ id: number; title: string }[]>([]);

  useEffect(() => {
    const initDb = async () => {
      const database = await openDatabaseAsync('todo.db');
      setDb(database);
      await database.execAsync(
        'CREATE TABLE IF NOT EXISTS tasks (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT);'
      );
      fetchTasks(database);
    };
    initDb();
  }, []);

  const fetchTasks = async (database = db) => {
    if (!database) return;
    const result = await database.getAllAsync('SELECT * FROM tasks;');
    console.log('✅ Current Tasks in DB:', result); // 👈 ADD THIS LINE
    setTasks(result);
  };

  const addTask = async () => {
    if (!task.trim() || !db) return;
    await db.runAsync('INSERT INTO tasks (title) VALUES (?);', [task]);
    setTask('');
    fetchTasks();
  };

  const deleteTask = async (id: number) => {
    if (!db) return;
    await db.runAsync('DELETE FROM tasks WHERE id = ?;', [id]);
    fetchTasks();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>SQLite To-Do List</Text>

      <TextInput
        style={styles.input}
        placeholder="Add a task"
        value={task}
        onChangeText={setTask}
      />

      <Button title="Add Task" onPress={addTask} />

      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.taskContainer}>
            <Text style={styles.task}>{item.title}</Text>
            <Button title="Delete" onPress={() => deleteTask(item.id)} />
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, marginTop: 50 },
  heading: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  input: { borderWidth: 1, padding: 10, marginBottom: 10, borderRadius: 5 },
  taskContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  task: { fontSize: 18 },
});
