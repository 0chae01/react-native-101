import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Pressable,
  TextInput,
  ScrollView,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { theme } from "./colors";
import { Fontisto } from "@expo/vector-icons";

const STORAGE_TODOS = "@toDos";
const STORAGE_PAGE = "@page";

export default function App() {
  const [working, setWorking] = useState(true);
  const [text, setText] = useState("");
  const [toDos, setToDos] = useState({});
  const travel = async () => {
    setWorking(false);
    await AsyncStorage.setItem(STORAGE_PAGE, "false");
  };
  const work = async () => {
    setWorking(true);
    await AsyncStorage.setItem(STORAGE_PAGE, "true");
  };
  const onChangeText = (payload) => setText(payload);
  const saveToDos = async (toSave) => {
    await AsyncStorage.setItem(STORAGE_TODOS, JSON.stringify(toSave));
  };
  const setPage = async () => {
    const isWorking = await AsyncStorage.getItem(STORAGE_PAGE);
    setWorking(isWorking === "true" ? true : false);
  };
  const loadToDos = async () => {
    setPage();
    const s = await AsyncStorage.getItem(STORAGE_TODOS);
    s ? setToDos(JSON.parse(s)) : null;
  };
  useEffect(() => {
    loadToDos();
  }, []);
  const addToDo = async () => {
    if (text === "") return;
    const newToDos = {
      ...toDos,
      [Date.now()]: { text, working, completed: false },
    };
    setToDos(newToDos);
    await saveToDos(newToDos);
    setText("");
  };
  const deleteToDo = (key) => {
    Alert.alert("Delete To Do", "Are you sure?", [
      { text: "Cancel" },
      {
        text: "I'm Sure",
        onPress: () => {
          const newToDos = { ...toDos };
          delete newToDos[key];
          setToDos(newToDos);
          saveToDos(newToDos);
        },
        style: "destructive",
      },
    ]);
  };
  const toggleToDo = (key) => {
    const newToDos = { ...toDos };
    newToDos[key].completed = !newToDos[key].completed;
    setToDos(newToDos);
    saveToDos(newToDos);
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.header}>
        <TouchableOpacity onPress={work}>
          <Text
            style={{ ...styles.btnText, color: working ? "white" : theme.gray }}
          >
            Work
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={travel}>
          <Text
            style={{
              ...styles.btnText,
              color: !working ? "white" : theme.gray,
            }}
          >
            Travel
          </Text>
        </TouchableOpacity>
      </View>
      <TextInput
        onSubmitEditing={addToDo}
        onChangeText={onChangeText}
        returnKeyType="done"
        value={text}
        placeholder={working ? "Add a To Do" : "Where do you want to go?"}
        style={styles.input}
      />
      <ScrollView>
        {Object.keys(toDos).map((key) =>
          toDos[key].working === working ? (
            <View style={styles.toDo} key={key}>
              <View style={styles.todoLeft}>
                <TouchableOpacity onPress={() => deleteToDo(key)}>
                  <Fontisto name="trash" size={18} color={theme.gray} />
                </TouchableOpacity>
                <Text
                  style={
                    toDos[key].completed
                      ? styles.completedToDoText
                      : styles.toDoText
                  }
                >
                  {toDos[key].text}
                </Text>
              </View>
              <View style={styles.todoRight}>
                <Pressable onPress={() => toggleToDo(key)} hitSlop={20}>
                  {toDos[key].completed ? (
                    <Fontisto
                      name="checkbox-active"
                      size={20}
                      color={theme.gray}
                    />
                  ) : (
                    <Fontisto
                      name="checkbox-passive"
                      size={20}
                      color={theme.gray}
                      style={{ marginRight: 2 }}
                    />
                  )}
                </Pressable>
              </View>
            </View>
          ) : null
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.bg,
    paddingHorizontal: 20,
  },
  header: {
    justifyContent: "space-between",
    flexDirection: "row",
    marginTop: 100,
  },
  btnText: {
    fontSize: 38,
    fontWeight: "600",
  },
  input: {
    backgroundColor: "white",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 30,
    marginVertical: 20,
    fontSize: 18,
  },
  toDo: {
    backgroundColor: theme.todoBg,
    marginBottom: 10,
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderRadius: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  completedToDoText: {
    color: theme.gray,
    textDecorationLine: "line-through",
    fontSize: 16,
    fontWeight: "500",
    marginLeft: 10,
  },
  toDoText: {
    color: "white",
    fontSize: 16,
    fontWeight: "500",
    marginLeft: 10,
  },
  todoLeft: {
    flexDirection: "row",
  },
  todoRight: {
    flexDirection: "row",
  },
});
