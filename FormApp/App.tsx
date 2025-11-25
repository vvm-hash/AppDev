import React, { useState } from 'react';
import { View, ScrollView, Alert } from 'react-native';
import {
  TextInput, Button, RadioButton, Checkbox, Text,
  Menu, Provider as PaperProvider
} from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import firestore from '@react-native-firebase/firestore';

// Calculate AGE from Date of Birth
function calculateAge(date: any) {
  if (!date) return 0;

  const dob = new Date(date);
  if (isNaN(dob.getTime())) return 0;

  const diff = Date.now() - dob.getTime();
  const ageDate = new Date(diff);
  return Math.abs(ageDate.getUTCFullYear() - 1970);
}


export default function App() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const [gender, setGender] = useState('male');

  const [course, setCourse] = useState('Select Course');
  const [menuVisible, setMenuVisible] = useState(false);

  const [dob, setDob] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const [agree, setAgree] = useState(false);

  const age = calculateAge(dob);

  const addUser = async () => {
    try {
      await firestore().collection('users').add({
        name,
        email,
        gender,
        course,
        age,
        dob: dob.toDateString(),
        agree,
      });

      Alert.alert('Success', 'User added!');

      setName('');
      setEmail('');
      setGender('male');
      setCourse('Select Course');
      setDob(new Date());
      setAgree(false);

    } catch (e) {
      Alert.alert('Error', String(e));
    }
  };

  const handleSubmit = () => {
    if (!name || !email || course === 'Select Course') {
      Alert.alert('Error', 'Please fill all required fields.');
      return;
    }
    addUser();
  };

  return (
    <PaperProvider>
      <ScrollView style={{ padding: 20 }}>
        <Text variant="headlineMedium" style={{ textAlign: 'center', marginBottom: 20 }}>
          Student Registration Form
        </Text>

        <TextInput
          label="Full Name"
          value={name}
          onChangeText={setName}
          style={{ marginBottom: 10 }}
        />

        <TextInput
          label="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          style={{ marginBottom: 10 }}
        />

        <Text>Gender</Text>
        <RadioButton.Group onValueChange={setGender} value={gender}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <RadioButton value="male" /><Text>Male</Text>
            <RadioButton value="female" /><Text>Female</Text>
          </View>
        </RadioButton.Group>

        {/* COURSE DROPDOWN */}
        <Menu
          visible={menuVisible}
          onDismiss={() => setMenuVisible(false)}
          anchor={
            <Button mode="outlined" onPress={() => setMenuVisible(true)} style={{ marginBottom: 10 }}>
              {course}
            </Button>
          }
        >
          <Menu.Item title="B.E IT" onPress={() => { setCourse("B.E IT"); setMenuVisible(false); }} />
          <Menu.Item title="B.E CS" onPress={() => { setCourse("B.E CS"); setMenuVisible(false); }} />
          <Menu.Item title="B.E Mechanical" onPress={() => { setCourse("B.E Mechanical"); setMenuVisible(false); }} />
        </Menu>

        {/* DOB PICKER */}
        <Button mode="outlined" onPress={() => setShowDatePicker(true)} style={{ marginBottom: 10 }}>
          Select Date of Birth
        </Button>

        {showDatePicker && (
          <DateTimePicker
            value={dob}
            mode="date"
            display="default"
            onChange={(_, selectedDate) => {
              setShowDatePicker(false);
              if (selectedDate) setDob(selectedDate);
            }}
          />
        )}

        <Text style={{ marginBottom: 10 }}>DOB: {dob.toDateString()}</Text>

        {/* AUTO CALCULATED AGE */}
        <Text style={{ marginBottom: 10 }}>Age: {age}</Text>

        {/* CHECKBOX FIXED */}
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Checkbox
            status={agree ? "checked" : "unchecked"}
            onPress={() => setAgree(!agree)}
          />
          <Text>I agree to the terms</Text>
        </View>

        <Button mode="contained" onPress={handleSubmit} style={{ marginTop: 20 }}>
          Submit
        </Button>
      </ScrollView>
    </PaperProvider>
  );
}
