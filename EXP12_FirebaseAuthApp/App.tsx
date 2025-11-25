import React, { useState } from 'react';
import { View, StyleSheet, Alert, ScrollView } from 'react-native';
import auth from '@react-native-firebase/auth';
import { TextInput, Button, Text, Card } from 'react-native-paper';

export default function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [confirm, setConfirm] = useState<any>(null);

  // ---------------- EMAIL AUTH ----------------
  const handleSignup = async () => {
    try {
      await auth().createUserWithEmailAndPassword(email, password);
      Alert.alert('Success', 'Account created and signed in!');
    } catch (error: any) {
      if (error.code === 'auth/email-already-in-use') {
        Alert.alert('Error', 'That email address is already in use!');
      } else if (error.code === 'auth/invalid-email') {
        Alert.alert('Error', 'That email address is invalid!');
      } else {
        Alert.alert('Error', error.message);
      }
    }
  };

  const handleLogin = async () => {
    try {
      await auth().signInWithEmailAndPassword(email, password);
      Alert.alert('Welcome!', 'User signed in successfully.');
    } catch (error: any) {
      Alert.alert('Error', error.message);
    }
  };

  // ---------------- PHONE AUTH ----------------
  const sendOtp = async () => {
    try {
      const formattedPhone = phone.startsWith('+') ? phone : '+91' + phone.trim();
      const confirmation = await auth().signInWithPhoneNumber(formattedPhone);

      setConfirm(confirmation);
      Alert.alert('OTP sent', 'Please check your phone.');
    } catch (error: any) {
      console.log(error)
      Alert.alert('Error', error.message);
    }
  };

  const confirmOtp = async () => {
    try {
      await confirm.confirm(otp);
      Alert.alert('Success', 'Phone number verified!');
    } catch (error: any) {
      Alert.alert('Invalid code.', error.message);
    }
  };

  const handleSignOut = async () => {
    await auth().signOut();
    Alert.alert('Signed Out', 'You have been logged out.');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text variant="headlineMedium" style={styles.title}>Firebase Authentication</Text>

      <Card style={styles.card}>
        <Card.Content>
          <Text variant="titleLarge">Email / Password Login</Text>
          <TextInput
            label="Email"
            value={email}
            onChangeText={setEmail}
            style={styles.input}
            keyboardType="email-address"
          />
          <TextInput
            label="Password"
            value={password}
            onChangeText={setPassword}
            style={styles.input}
            secureTextEntry
          />
          <Button mode="contained" onPress={handleSignup} style={styles.button}>
            Sign Up
          </Button>
          <Button mode="outlined" onPress={handleLogin} style={styles.button}>
            Sign In
          </Button>
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Text variant="titleLarge">Phone Authentication</Text>
          {!confirm ? (
            <>
              <TextInput
                label="Phone (+91XXXXXXXXXX)"
                value={phone}
                onChangeText={setPhone}
                style={styles.input}
                keyboardType="phone-pad"
              />
              <Button mode="contained" onPress={sendOtp} style={styles.button}>
                Send OTP
              </Button>
            </>
          ) : (
            <>
              <TextInput
                label="Enter OTP"
                value={otp}
                onChangeText={setOtp}
                style={styles.input}
                keyboardType="number-pad"
              />
              <Button mode="contained" onPress={confirmOtp} style={styles.button}>
                Verify OTP
              </Button>
            </>
          )}
        </Card.Content>
      </Card>

      <Button mode="text" onPress={handleSignOut} style={styles.signout}>
        Sign Out
      </Button>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fafafa',
    flexGrow: 1,
  },
  title: {
    textAlign: 'center',
    marginVertical: 10,
    fontWeight: 'bold',
  },
  card: {
    marginVertical: 10,
    borderRadius: 15,
  },
  input: {
    marginVertical: 5,
  },
  button: {
    marginTop: 10,
  },
  signout: {
    marginTop: 20,
  },
});
