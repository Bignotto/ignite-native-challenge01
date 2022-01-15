import React, { useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/Feather";
import { Task } from "./TasksList";
import pencilIcon from "../assets/icons/pencil/pencil.png";
import trashIcon from "../assets/icons/trash/trash.png";
import cancelIcon from "../assets/icons/cancel/cancel.png";

interface TaskItemProps {
  task: Task;
  toggleTaskDone: (id: number) => void;
  removeTask: (id: number) => void;
  editTask: (id: number, newTaskTitle: string) => void;
}

export function TaskItem({
  task,
  toggleTaskDone,
  removeTask,
  editTask,
}: TaskItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState(task.title);

  function handleIsEditing() {
    isEditing ? setIsEditing(false) : setIsEditing(true);
  }

  return (
    <View>
      <TouchableOpacity
        testID={`button-${task.id}`}
        activeOpacity={0.7}
        style={styles.taskButton}
        onPress={() => toggleTaskDone(task.id)}
      >
        <View
          testID={`marker-${task.id}`}
          style={task.done ? styles.taskMarkerDone : styles.taskMarker}
        >
          {task.done && <Icon name="check" size={12} color="#FFF" />}
        </View>
        {isEditing ? (
          <TextInput
            style={styles.input}
            value={newTaskTitle}
            onChangeText={setNewTaskTitle}
            returnKeyType="send"
            selectionColor="#666666"
          />
        ) : (
          <Text style={task.done ? styles.taskTextDone : styles.taskText}>
            {task.title}
          </Text>
        )}

        <TouchableOpacity testID={`trash-${task.id}`} onPress={handleIsEditing}>
          <Image source={isEditing ? cancelIcon : pencilIcon} />
        </TouchableOpacity>
        <TouchableOpacity
          testID={`trash-${task.id}`}
          style={{ paddingHorizontal: 24 }}
          onPress={() => removeTask(task.id)}
        >
          <Image source={trashIcon} />
        </TouchableOpacity>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    // flex: 1,
    // height: 22,
    // paddingHorizontal: 20,
    backgroundColor: "#FFF",
    // borderTopLeftRadius: 5,
    // borderBottomLeftRadius: 5,
    // borderRightWidth: 1,
    // borderRightColor: "#EBEBEB",
    // color: "#666666",
  },
  taskButton: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 15,
    marginBottom: 4,
    borderRadius: 4,
    flexDirection: "row",
    alignItems: "center",
  },
  taskMarker: {
    height: 16,
    width: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#B2B2B2",
    marginRight: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  taskText: {
    color: "#666",
    fontFamily: "Inter-Medium",
  },
  taskMarkerDone: {
    height: 16,
    width: 16,
    borderRadius: 4,
    backgroundColor: "#1DB863",
    marginRight: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  taskTextDone: {
    color: "#1DB863",
    textDecorationLine: "line-through",
    fontFamily: "Inter-Medium",
  },
});
