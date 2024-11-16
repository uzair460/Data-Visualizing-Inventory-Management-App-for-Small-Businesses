import { View, Text, StyleSheet, TextInput, Alert } from "react-native";
import React, { useState } from "react";
import InputBox from "../../components/Form/InputBox";
import SubmitButton from "../../components/Form/SubmitButton";
import { NavigationContainer } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";


const Login = ({ navigation }) => {
  //states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  //function
  //btn function
  const handleSubmit = async () => {
    try {
      setLoading(true);
      // check for empty fields
      if (!email || !password) {
        alert("Please fill ALL the Fields");
        setLoading(false);
        return;
      }
      const { data } = await axios.post(
        "http://localhost:8080/api/v1/auth/login",
        { email, password }
      );
      await AsyncStorage.setItem("@auth", JSON.stringify(data));
      alert(data && data.message);
      setLoading(false);
      console.log("Login Data==>", { email, password });
    } catch (error) {
      alert(error.response.data.message);
      setLoading(false);
      console.log(error);
    }
  };

  // temp funscion to test
  const getLocalStorageData = async () => {
    let data = await AsyncStorage.getItem("@auth");
    console.log("local storage data", data);
  };
  getLocalStorageData();

  return (
    <View style={style.container}>
      <Text style={style.paigeTitle}>Login</Text>
      <View style={{ marginHorizontal: 20 }}>
        <InputBox
          inputTitle={"Email"}
          keyboardType="email-address"
          autoComplete="email"
          value={email}
          setValue={setEmail}
        />
        <InputBox
          inputTitle={"Password"}
          secureTextEntry={true}
          autoComplete="password"
          value={password}
          setValue={setPassword}
        />
      </View>
      {/*<Text>{JSON.stringify({name,email,password},null, 4)}</Text>}*/}
      <SubmitButton
        btnTitle="Login"
        loading={loading}
        handleSubmit={handleSubmit}
      />
      <Text style={style.linkText}>
        not a user Please{" "}
        <Text
          style={style.link}
          onPress={() => navigation.navigate("Register")}
        >
          REGISTER
        </Text>
      </Text>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#e1d5c9",
  },
  paigeTitle: {
    fontSize: 40,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  inputBox: {
    height: 40,
    marginBottom: 20,
    backgroundColor: "#ffffff",
    borderRadius: 10,
    marginTop: 10,
    padding: 10,
    color: "#af9f85",
  },
  linkText: {
    textAlign: "center",
  },
  link: {
    color: "red",
  },
});

export default Login;
