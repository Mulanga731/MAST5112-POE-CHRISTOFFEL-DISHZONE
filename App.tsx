import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useState } from "react";
import AddMenuItemsScreen from "./screens/AddMenuItemsScreen";
import FilterScreen from "./screens/FilterScreen";
import HomeScreen from "./screens/HomeScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  const [menuData, setMenuData] = useState([
    { name: "Soup", price: 50, course: "Starter" },
    { name: "Steak", price: 120, course: "Main" },
    { name: "Cake", price: 100, course: "Dessert" },
  ]);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home">
          {(props) => (
            <HomeScreen {...props} menuData={menuData} setMenuData={setMenuData} />
          )}
        </Stack.Screen>

        <Stack.Screen name="AddMenu">
          {(props) => (
            <AddMenuItemsScreen
              {...props}
              menuData={menuData}
              setMenuData={setMenuData}
            />
          )}
        </Stack.Screen>

        <Stack.Screen name="Filter">
          {(props) => (
            <FilterScreen {...props} menuData={menuData} setMenuData={setMenuData} />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}





