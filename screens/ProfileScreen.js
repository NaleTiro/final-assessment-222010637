import React, { useContext } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { AuthContext } from '../context/AuthContext';

export default function ProfileScreen() {
  const { user, signOut } = useContext(AuthContext);
  const bookings = [ { id:'b1', hotelName:'Lakeview Hotel', checkIn:'2025-11-10', checkOut:'2025-11-12' } ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      {user ? (
        <>
          <Text style={styles.label}>Name: {user.displayName || '—'}</Text>
          <Text style={styles.label}>Email: {user.email}</Text>
          <View style={{ marginTop:12 }}>
            <Text style={{ fontWeight:'700' }}>Bookings</Text>
            {bookings.map(b => (
              <View key={b.id} style={{ padding:8, borderWidth:1, borderColor:'#eee', marginTop:8 }}>
                <Text>{b.hotelName}</Text>
                <Text>{b.checkIn} → {b.checkOut}</Text>
              </View>
            ))}
          </View>
          <View style={{ marginTop:24 }}>
            <Button title="Logout" onPress={signOut} />
          </View>
        </>
      ) : (
        <Text>You are not signed in.</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({ container:{ flex:1, padding:12 }, title:{ fontSize:22, fontWeight:'700' }, label:{ marginTop:8 } });
