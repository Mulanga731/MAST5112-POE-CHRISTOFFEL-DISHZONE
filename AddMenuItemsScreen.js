import { MaterialIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function AddMenuItemsScreen({ navigation, menuData, setMenuData }) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [course, setCourse] = useState("");

  const addItem = () => {
    if (!name || !price || !course) {
      Alert.alert("Missing info", "Please fill in all fields.");
      return;
    }
    const newItem = { name, price: parseFloat(price), course };
    setMenuData([...menuData, newItem]);
    Alert.alert("Added", `${name} added successfully!`);
    setName("");
    setPrice("");
    setCourse("");
  };

  const deleteItem = (index) => {
    const updated = [...menuData];
    const removed = updated.splice(index, 1);
    setMenuData(updated);
    Alert.alert("Deleted", `${removed[0].name} was removed.`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>ADD MENU ITEM</Text>

      <TextInput style={styles.input} placeholder="Item name" value={name} onChangeText={setName} />
      <TextInput
        style={styles.input}
        placeholder="Price"
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Course (Starter/Main/Dessert)"
        value={course}
        onChangeText={setCourse}
      />

      <TouchableOpacity style={styles.addButton} onPress={addItem}>
        <Text style={styles.addButtonText}>ADD ITEM</Text>
      </TouchableOpacity>

      <FlatList
        data={menuData}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.listItem}>
            <Text style={styles.listText}>
              {item.name} - R{item.price} ({item.course})
            </Text>
            <TouchableOpacity onPress={() => deleteItem(index)}>
              <MaterialIcons name="delete" size={26} color="#D32F2F" />
            </TouchableOpacity>
          </View>
        )}
      />

      <TouchableOpacity style={styles.cancelButton} onPress={() => navigation.goBack()}>
        <Text style={styles.cancelText}>BACK TO HOME</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#E6F4FE" },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#0D47A1",
  },
  input: {
    borderWidth: 1,
    borderColor: "#90CAF9",
    borderRadius: 25,
    padding: 10,
    marginBottom: 10,
    backgroundColor: "#FFFFFF",
  },
  addButton: {
    backgroundColor: "#1565C0",
    borderRadius: 25,
    padding: 12,
    alignItems: "center",
    marginBottom: 20,
  },
  addButtonText: { color: "#fff", fontWeight: "bold" },
  listItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 12,
    borderBottomWidth: 1,
    borderColor: "#BBDEFB",
    backgroundColor: "#fff",
    borderRadius: 10,
    marginBottom: 8,
  },
  listText: { fontSize: 16, fontWeight: "500", color: "#0D47A1" },
  cancelButton: {
    marginTop: 20,
    backgroundColor: "#1565C0",
    padding: 15,
    borderRadius: 25,
    alignItems: "center",
  },
  cancelText: { color: "#fff", fontWeight: "bold" },
});

