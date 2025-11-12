import { MaterialIcons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function HomeScreen({ navigation, menuData, setMenuData }) {
  const [search, setSearch] = useState("");
  const [filtered, setFiltered] = useState(menuData);

  // Whenever menuData changes, update list
  useEffect(() => {
    setFiltered(menuData);
  }, [menuData]);

  const handleSearch = () => {
    const result = menuData.filter((item) =>
      item.name.toLowerCase().includes(search.toLowerCase())
    );
    if (result.length === 0) {
      Alert.alert("Not Found", `No menu item named "${search}" was found.`);
    }
    setFiltered(result);
  };

  const clearSearch = () => {
    setSearch("");
    setFiltered(menuData);
  };

  const deleteItem = (index) => {
    const updated = [...menuData];
    const removed = updated.splice(index, 1);
    setMenuData(updated);
    Alert.alert("Deleted", `${removed[0].name} was removed.`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>CHRISTOFFEL'S DISHZONE</Text>

      <View style={styles.searchRow}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search for a dish..."
          value={search}
          onChangeText={setSearch}
        />
        <TouchableOpacity style={styles.searchBtn} onPress={handleSearch}>
          <Text style={styles.btnText}>Search</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.clearBtn} onPress={clearSearch}>
          <Text style={styles.btnText}>Clear</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={filtered}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.item}>
            <Text style={styles.itemText}>
              {item.name} - R{item.price} ({item.course})
            </Text>
            <TouchableOpacity onPress={() => deleteItem(index)}>
              <MaterialIcons name="delete" size={26} color="#D32F2F" />
            </TouchableOpacity>
          </View>
        )}
      />

      <TouchableOpacity
        style={styles.addBtn}
        onPress={() => navigation.navigate("AddMenu")}
      >
        <Text style={styles.addText}>+ ADD MENU ITEM</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.addBtn, styles.filterBtn]}
        onPress={() => navigation.navigate("Filter")}
      >
        <Text style={[styles.addText, { color: "#1565C0" }]}>FILTER BY COURSE</Text>
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
  searchRow: { flexDirection: "row", marginBottom: 20 },
  searchInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#90CAF9",
    borderRadius: 25,
    padding: 10,
    backgroundColor: "#FFFFFF",
  },
  searchBtn: {
    backgroundColor: "#1565C0",
    borderRadius: 25,
    paddingHorizontal: 15,
    justifyContent: "center",
    marginLeft: 5,
  },
  clearBtn: {
    backgroundColor: "#64B5F6",
    borderRadius: 25,
    paddingHorizontal: 15,
    justifyContent: "center",
    marginLeft: 5,
  },
  btnText: { color: "#fff", fontWeight: "bold" },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    backgroundColor: "#FFFFFF",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  itemText: { fontWeight: "600", color: "#0D47A1" },
  addBtn: {
    backgroundColor: "#1565C0",
    borderRadius: 25,
    padding: 15,
    marginVertical: 8,
    alignItems: "center",
  },
  filterBtn: {
    backgroundColor: "#fff",
    borderWidth: 2,
    borderColor: "#1565C0",
  },
  addText: { color: "#fff", fontWeight: "bold" },
});
