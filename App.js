import React, { useState } from "react";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, View, Switch, TouchableOpacity, Button } from 'react-native';
import * as Clipboard from 'expo-clipboard';

const lowerCaseSet = "abcdefghijklmnopqrstuvwxyz";
const upperCaseSet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const numberSet = "0123456789";
const symbolSet = "!@#$%^&";

export default function App() {

  const [length, setLength] = React.useState(12);

  const [upperCase, setUpperCase] = useState(true);
  const toggleUpperCase = () => setUpperCase(previousState => !previousState);
  const [lowerCase, setLowerCase] = useState(true);
  const toggleLowerCase = () => setLowerCase(previousState => !previousState);
  const [numbers, setNumbers] = useState(true);
  const toggleNumbers = () => setNumbers(previousState => !previousState);
  const [symbols, setSymbols] = useState(true);
  const toggleSymbols = () => setSymbols(previousState => !previousState);

  const [password, setPassword] = useState('');

  const handleLengthChange = (e) => {
    console.log('event', e);
    if(e < 1) {
      setLength(12);
    } else {
      setLength(e);
    }
  }

  const generatePassword = () => {
    let password = '';
    let characterSet = '';
    if (upperCase) { characterSet += upperCaseSet };
    if (lowerCase) { characterSet += lowerCaseSet };
    if (numbers) { characterSet += numberSet };
    if (symbols) { characterSet += symbolSet };
    for (let i = 0; i < length; i++) {
      password += characterSet.charAt(Math.floor(Math.random() * characterSet.length));
    }
    setPassword(password);
  }

  const handleGenerate = () => {
    generatePassword();
  }

  const copyToClipboard = async () => {
    await Clipboard.setStringAsync(password);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Random Password Generator</Text>
      <View style={styles.length}>

        <Text style={styles.inputLabel}>Password Length:</Text>
        <TextInput
          style={styles.input}
          onChangeText={(e) => handleLengthChange(e)}
          value={length}
          placeholder="12"
          keyboardType="numeric"
          returnKeyType="done"
        />
      </View>
      <View style={styles.switchBox}>
        <View style={styles.switchItem}>
          <Text style={styles.switchHeader}>Uppercase</Text>
          <Switch
            trackColor={{ false: "#767577", true: "#25A18E" }}
            thumbColor={upperCase ? "#7AE582" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleUpperCase}
            value={upperCase}
          />
        </View>
        <View style={styles.switchItem}>
          <Text style={styles.switchHeader}>Lowercase</Text>
          <Switch
            trackColor={{ false: "#767577", true: "#25A18E" }}
            thumbColor={lowerCase ? "#7AE582" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleLowerCase}
            value={lowerCase}
          />
        </View>
        <View style={styles.switchItem}>
          <Text style={styles.switchHeader}>Numbers</Text>
          <Switch
            trackColor={{ false: "#767577", true: "#25A18E" }}
            thumbColor={numbers ? "#7AE582" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleNumbers}
            value={numbers}
          />
        </View>
        <View style={styles.switchItem}>
          <Text style={styles.switchHeader}>Symbols</Text>
          <Switch
            trackColor={{ false: "#767577", true: "#25A18E" }}
            thumbColor={symbols ? "#7AE582" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSymbols}
            value={symbols}
          />
        </View>
      </View>
      <TouchableOpacity onPress={handleGenerate} style={styles.button}>
        <Text style={styles.buttonText}>Generate Password</Text>
      </TouchableOpacity>
      <Text style={styles.passwordHeader}>New Password:</Text>
      <Text style={styles.password}>{password}</Text>
      <Button title="Copy to Clipboard" onPress={copyToClipboard} />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 70,
    fontWeight: "bold",
    marginTop: 60,
    lineHeight: 70,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  inputLabel: {
    fontSize: 30,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 8,
    minWidth: 100,
    fontSize: 25,
  },
  length: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    margin: 10,
  },
  switchBox: {
    display: "flex",
    flexDirection: "row",
    flexWrap: 'wrap',
    justifyContent: "space-evenly",
    width: "90%",
    marginBottom: 30,
  },
  switchItem: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    margin: 5,
  },
  switchHeader: {
    fontSize: 30,
  },
  button: {
    backgroundColor: "#7AE582",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#25A18E",
    padding: 10,
    marginBottom: 30,
  },
  buttonText: {
    fontSize: 30,
  },
  passwordHeader: {
    fontSize: 25,
    marginBottom: 5,
  },
  password: {
    fontSize: 40,
    fontWeight: "bold",
    marginBottom: 5,
  }
});
