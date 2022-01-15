import React, { useEffect, useRef, useState } from "react";
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
import disabledTrash from "../assets/icons/disabled_trash/disabled_trash.png";

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
  const inputRef = useRef<TextInput>(null);

  function handleIsEditing() {
    // isEditing ? setIsEditing(false) : setIsEditing(true);
    setIsEditing(true);
  }

  function handleSubmitEditTask(id: number) {
    setIsEditing(false);
    editTask(id, newTaskTitle);
  }

  function handleCancelEditing() {
    setIsEditing(false);
    setNewTaskTitle(task.title);
  }

  useEffect(() => {
    if (inputRef.current) {
      if (isEditing) {
        inputRef.current.focus();
      } else {
        inputRef.current.blur();
      }
    }
  }, [isEditing]);

  return (
    <View style={styles.component}>
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
        <TextInput
          ref={inputRef}
          style={task.done ? styles.taskTextDone : styles.taskText}
          value={newTaskTitle}
          editable={isEditing}
          onChangeText={setNewTaskTitle}
          onSubmitEditing={() => handleSubmitEditTask(task.id)}
          onBlur={handleCancelEditing}
        />
        <View style={styles.iconContainer}>
          <TouchableOpacity
            testID={`trash-${task.id}`}
            onPress={isEditing ? handleCancelEditing : handleIsEditing}
          >
            <Image source={isEditing ? cancelIcon : pencilIcon} />
          </TouchableOpacity>
          <TouchableOpacity
            testID={`trash-${task.id}`}
            disabled={isEditing}
            onPress={() => removeTask(task.id)}
          >
            <Image source={!isEditing ? trashIcon : disabledTrash} />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  component: {
    flex: 1,
    justifyContent: "space-between",
  },
  iconContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
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
    flex: 1,
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
    flex: 1,
    color: "#1DB863",
    textDecorationLine: "line-through",
    fontFamily: "Inter-Medium",
  },
});
