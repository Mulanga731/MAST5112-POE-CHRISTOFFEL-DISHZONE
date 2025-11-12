import { MaterialIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Alert, FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function FilterScreen({ navigation, menuData, setMenuData }) {
  const [deleted, setDeleted] = useState([]);

  const deleteDish = (index) => {
    const updated = [...menuData];
    const removed = updated.splice(index, 1);
    setDeleted([...deleted, ...removed]);
    setMenuData(updated);
    Alert.alert("Deleted", `${removed[0].name} has been removed.`);
  };

  const restoreAll = () => {
    if (deleted.length === 0) {
      Alert.alert("Nothing to restore", "No dishes have been deleted yet.");
      return;
    }
    setMenuData([...menuData, ...deleted]);
    setDeleted([]);
    Alert.alert("Restored", "All deleted dishes have been restored.");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>FILTER BY COURSE</Text>

      <FlatList
        data={menuData}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.listItem}>
            <Text style={styles.dishText}>
              {item.name} - R{item.price} ({item.course})
            </Text>
            <TouchableOpacity onPress={() => deleteDish(index)}>
              <MaterialIcons name="delete" size={28} color="#D32F2F" />
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.emptyText}>No dishes found.</Text>}
      />

      <View style={styles.buttonRow}>
        <TouchableOpacity style={[styles.button, styles.cancel]} onPress={() => navigation.goBack()}>
          <Text style={styles.cancelText}>CANCEL</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, styles.restore]} onPress={restoreAll}>
          <Text style={styles.restoreText}>RESTORE</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#E6F4FE" },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
    color: "#0D47A1",
  },
  listItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: "#BBDEFB",
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    marginBottom: 8,
  },
  dishText: { fontSize: 16, fontWeight: "500", color: "#1565C0" },
  emptyText: { textAlign: "center", color: "#666", marginTop: 20 },
  buttonRow: { flexDirection: "row", justifyContent: "space-around", marginTop: 30 },
  button: { padding: 15, borderRadius: 10, width: "40%", alignItems: "center" },
  cancel: { backgroundColor: "#1565C0" },
  restore: { borderWidth: 2, borderColor: "#1565C0", backgroundColor: "#fff" },
  cancelText: { color: "#fff", fontWeight: "bold" },
  restoreText: { color: "#1565C0", fontWeight: "bold" },
});
