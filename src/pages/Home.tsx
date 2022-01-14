import React, { useState } from "react";
import { Alert, StyleSheet, View } from "react-native";

import { Header } from "../components/Header";
import { Task, TasksList } from "../components/TasksList";
import { TodoInput } from "../components/TodoInput";

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    //TODO - add new task
    setTasks((oldTasks) => [
      ...oldTasks,
      { id: new Date().getTime(), done: false, title: newTaskTitle },
    ]);
  }

  function handleToggleTaskDone(id: number) {
    //TODO - toggle task done if exists
    const newTasks = tasks.map((t) => ({ ...t }));
    const idx = tasks.findIndex((t) => t.id === id);

    if (idx < 0) return;

    newTasks[idx].done
      ? (newTasks[idx].done = false)
      : (newTasks[idx].done = true);

    setTasks(newTasks);
  }

  function handleRemoveTask(id: number) {
    //TODO - remove task from state
    return Alert.alert(
      "Remover item",
      "Tem certeza que deseja remover esse item?",
      [
        {
          text: "Não",
        },
        {
          text: "Sim",
          onPress: () => setTasks(tasks.filter((t) => t.id !== id)),
        },
      ]
    );
  }

  function handleEditTask(id: number, newTaskTitle: string) {
    const newTasks = tasks.map((t) => ({ ...t }));
    const idx = tasks.findIndex((t) => t.id === id);

    if (idx < 0) return;

    newTasks[idx].title = newTaskTitle;

    setTasks(newTasks);
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList
        tasks={tasks}
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
        editTask={handleEditTask}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EBEBEB",
  },
});
