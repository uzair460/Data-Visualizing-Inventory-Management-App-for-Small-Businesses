import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Register from "../screens/auth/Register";
import Login from "../screens/auth/Login";

export default function Index() {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name ="Register" component={Register} />
        <Stack.Screen name = "Login" component={Login} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
