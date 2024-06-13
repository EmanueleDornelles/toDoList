import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { FAB, Card, Title, Paragraph } from 'react-native-paper';
import { useFocusEffect } from '@react-navigation/native';
import { deleteTask, readTasks } from '../../services/tasks';
import { Task } from '../../types/types';

const HomeScreen = ({ navigation }) => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const fetchData = async () => {
    try {
      const tasksData = await readTasks();
      setTasks(tasksData as Task[]);
    } catch (error) {
      console.error('Erro ao buscar tarefas:', error);
    }
  };

  // Atualiza as tarefas sempre que a tela estiver em foco
  useFocusEffect(
    React.useCallback(() => {
      fetchData();
    }, [])
  );

  // Função para lidar com a exclusão de uma tarefa
  const handleDeleteTask = async (taskId: number) => {
    try {
      // Chame a função de exclusão da tarefa aqui
      // Aguarde a exclusão ser concluída
      // Após a exclusão, atualize o estado tasks chamando fetchData novamente
      await deleteTask(taskId);
      fetchData();
    } catch (error) {
      console.error('Erro ao excluir tarefa:', error);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        {tasks.map(task => (
          <Card key={task.id} style={styles.card}>
            <Card.Content>
              <Title>{task.title}</Title>
              <Paragraph>{task.description}</Paragraph>
            </Card.Content>
            <Card.Actions>
              {/* Botão para atualizar a tarefa */}
              <FAB
                small
                icon="pencil"
                onPress={() => navigation.navigate('TaskDetail', { id: task.id })}
              />
              {/* Botão para excluir a tarefa */}
              <FAB
                small
                icon="delete"
                onPress={() => handleDeleteTask(task.id)}
              />
            </Card.Actions>
          </Card>
        ))}
      </ScrollView>
      {/* Botão para adicionar uma nova tarefa */}
      <FAB
        style={styles.fab}
        icon="plus"
        onPress={() => navigation.navigate('CreateTask')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  card: {
    marginVertical: 10,
  },
  fab: {
    position: 'absolute',
    right: 16,
    bottom: 16,
  },
});

export default HomeScreen;
