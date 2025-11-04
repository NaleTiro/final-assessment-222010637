import React, { useState } from 'react';
import { Modal, View, Text, TouchableOpacity, TextInput, StyleSheet, ActivityIndicator } from 'react-native';

export default function AddReviewModal({ visible, onClose, onSubmit, defaultName }) {
  const [rating, setRating] = useState(5);
  const [text, setText] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const submit = async () => {
    if (!rating) return;
    setSubmitting(true);
    const review = { id: `local-${Date.now()}`, name: defaultName || 'Guest', rating, text, createdAt: Date.now() };
    try {
      if (onSubmit) await onSubmit(review);
    } catch (e) {
      console.error(e);
    } finally {
      setSubmitting(false);
      setRating(5);
      setText('');
      onClose();
    }
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.backdrop}>
        <View style={styles.modal}>
          <Text style={styles.title}>Add Review</Text>
          <View style={{ flexDirection:'row', marginVertical:10 }}>
            {[1,2,3,4,5].map((s) => (
              <TouchableOpacity key={s} onPress={() => setRating(s)} style={{ marginRight:8 }}>
                <Text style={{ fontSize:28 }}>{s <= rating ? '★' : '☆'}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <TextInput placeholder="Write your review" value={text} onChangeText={setText} multiline style={styles.input} />
          <View style={{ flexDirection:'row', justifyContent:'flex-end', marginTop:12 }}>
            <TouchableOpacity onPress={onClose} style={{ marginRight:12 }}><Text>Cancel</Text></TouchableOpacity>
            <TouchableOpacity onPress={submit} disabled={submitting} style={styles.submitBtn}>{submitting ? <ActivityIndicator /> : <Text style={{ color:'white' }}>Submit</Text>}</TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({ backdrop:{ flex:1, justifyContent:'center', alignItems:'center', backgroundColor:'rgba(0,0,0,0.4)' }, modal:{ width:'90%', backgroundColor:'white', padding:16, borderRadius:12 }, title:{ fontSize:18, fontWeight:'700' }, input:{ borderWidth:1, borderColor:'#ddd', borderRadius:8, padding:8, minHeight:80 } , submitBtn:{ backgroundColor:'#1f6feb', paddingHorizontal:12, paddingVertical:8, borderRadius:8 } });
