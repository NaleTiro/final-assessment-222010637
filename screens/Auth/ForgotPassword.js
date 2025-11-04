import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, Alert } from 'react-native';

export default function ForgotPasswordScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const submit = async () => {
    if (!email) return Alert.alert('Validation', 'Enter your email');
    // Replace with firebase sendPasswordResetEmail
    Alert.alert('Password reset', 'If this email exists, a reset link will be sent');
    navigation.navigate('SignIn');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reset Password</Text>
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} style={styles.input} keyboardType="email-address" autoCapitalize="none" />
      <Button title="Send Reset Link" onPress={submit} />
    </View>
  );
}

const styles = StyleSheet.create({ container: { flex:1, padding:20, justifyContent:'center' }, title:{ fontSize:24, fontWeight:'700', marginBottom:12 }, input:{ borderWidth:1, borderColor:'#ddd', padding:10, marginBottom:12, borderRadius:8 } });
