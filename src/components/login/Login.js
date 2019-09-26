import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import * as firebase from 'firebase';

import { styles } from './style';

const Login = props => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);

  const handleLogin = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch(error => setErrorMessage(error.message));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.greeting}>{'Hello again.\nWelcome back.'}</Text>

      <View style={styles.errorMessage}>
        {errorMessage && <Text style={styles.error}>{errorMessage}</Text>}
      </View>

      <View style={styles.form}>
        <View>
          <Text style={styles.inputTitle}>Email Address</Text>
          <TextInput
            style={styles.input}
            autoCapitalize="none"
            onChangeText={val => setEmail(val)}
            value={email}
          />
        </View>

        <View style={{ marginTop: 32 }}>
          <Text style={styles.inputTitle}>Password</Text>
          <TextInput
            style={styles.input}
            secureTextEntry
            autoCapitalize="none"
            onChangeText={val => setPassword(val)}
            value={password}
          />
        </View>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={{ color: '#FFF', fontWeight: '500' }}>Sign in</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{ alignSelf: 'center', marginTop: 32 }}
        onPress={() => props.navigation.navigate('Register')}>
        <Text style={{ color: '#414959', fontSize: 13 }}>
          New to SocialApp?{' '}
          <Text style={{ fontWeight: '500', color: '#E9446A' }}>Sign Up</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Login;
