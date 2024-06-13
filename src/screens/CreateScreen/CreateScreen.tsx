import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { createTask } from '../../services/tasks';

const CreateScreen = ({ navigation }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [categoryColor, setCategoryColor] = useState('');

  // Função para salvar uma nova tarefa
  const handleSave = async () => {
    try {
      await createTask(title, description, categoryColor);
      navigation.goBack();
    } catch (error) {
      console.error('Erro ao criar tarefa', error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        label="Título"
        value={title}
        onChangeText={setTitle}
        style={styles.input}
      />
      <TextInput
        label="Descrição"
        value={description}
        onChangeText={setDescription}
        style={styles.input}
      />
      <TextInput
        label="Cor da categoria"
        value={categoryColor}
        onChangeText={setCategoryColor}
        style={styles.input}
      />
      <Button mode="contained" onPress={handleSave}>
        Save
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  input: {
    marginBottom: 10,
  },
});

export default CreateScreen;
