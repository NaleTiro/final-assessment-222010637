import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, ActivityIndicator } from 'react-native';
import axios from 'axios';

export default function DealsScreen() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get('https://fakestoreapi.com/products');
        setItems(res.data.slice(0, 10));
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <ActivityIndicator style={{ marginTop:40 }} />;

  return (
    <View style={{ flex:1, padding:12 }}>
      <FlatList data={items} keyExtractor={i => i.id.toString()} renderItem={({ item }) => (
        <View style={{ borderWidth:1, borderColor:'#eee', padding:12, marginBottom:8 }}>
          <Text style={{ fontWeight:'700' }}>{item.title}</Text>
          <Text>${item.price}</Text>
        </View>
      )} />
    </View>
  );
}
