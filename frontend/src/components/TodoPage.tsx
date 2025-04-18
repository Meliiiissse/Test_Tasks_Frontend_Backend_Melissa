/**
 * @todo YOU HAVE TO IMPLEMENT THE DELETE AND SAVE TASK ENDPOINT, A TASK CANNOT BE UPDATED IF THE TASK NAME DID NOT CHANGE, YOU'VE TO CONTROL THE BUTTON STATE ACCORDINGLY
 */
import { Check, Delete } from '@mui/icons-material';
import { Box, Button, Container, IconButton, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import useFetch from '../hooks/useFetch.ts';
import { Task } from '../index';

const TodoPage = () => {
  const api = useFetch();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [editedTasks, setEditedTasks] = useState<Record<number, string>>({});
  const [newTaskName, setNewTaskName] = useState('');


  
  const handleFetchTasks = async () => {
    try {
      const tasks = await api.get('/tasks');
      console.log('Tasks fetched from API:', tasks);  
      setTasks(tasks);  
    } catch (error) {
      console.error('Failed to fetch tasks:', error);
    }
  };

  const handleDelete = async (id: number) => {
    await api.delete(`/tasks/${id}`);
    handleFetchTasks(); // recharge la liste après suppression
  };

  const handleSave = async () => {

    if (newTaskName.trim() === '') return;

    await api.post('/tasks', { name: newTaskName });
    setNewTaskName('');
    handleFetchTasks();
  };

  const handleEdit = async (id: number) => {
    const newName = editedTasks[id];
    if (newName && newName !== '') {
      await api.patch(`/tasks/${id}`, { name: newName });

      setEditedTasks((prev) => {
        const copy = { ...prev };
        delete copy[id]; // on enlève la tâche modifiée de l'état temporaire
        return copy;
      });

      handleFetchTasks(); // recharge la liste depuis l’API
    }
  };

  useEffect(() => {
    (async () => {
      handleFetchTasks();
    })();
  }, []);

  return (
    <Container>
      <Box display="flex" justifyContent="center" mt={5}>
        <Typography variant="h2">HDM Todo List</Typography>
      </Box>
  
      <Box justifyContent="center" mt={5} flexDirection="column">
        {tasks.map((task) => (
          <Box key={task.id} display="flex" justifyContent="center" alignItems="center" mt={2} gap={1} width="100%">
            <TextField
              size="small"
              value={editedTasks[task.id] ?? task.name}
              onChange={(e) =>
                setEditedTasks({ ...editedTasks, [task.id]: e.target.value })
              }
              fullWidth
              sx={{ maxWidth: 350 }}
            />
            <Box>
            <IconButton
              color="success"
              onClick={() => handleEdit(task.id)}
              disabled={editedTasks[task.id] === undefined || editedTasks[task.id] === task.name}
            >
              <Check />
            </IconButton>
              <IconButton color="error" onClick={() => handleDelete(task.id)}>
                <Delete />
              </IconButton>
            </Box>
          </Box>
        ))}
  
        {/* C’est ici que j'ai ajouté le champ pour taper une nouvelle tâche */}
        {newTaskName !== '' && (
          <Box display="flex" justifyContent="center" alignItems="center" mt={2} gap={1} width="100%">
            <TextField
              size="small"
              value={newTaskName}
              onChange={(e) => setNewTaskName(e.target.value)}
              fullWidth
              sx={{ maxWidth: 350 }}
            />
            <Box>
              <IconButton
                color="success"
                onClick={handleSave}
                disabled={newTaskName.trim() === ''}
              >
                <Check />
              </IconButton>
            </Box>
          </Box>
        )}
  
        {/*  Le bouton "Ajouter une tâche" reste en dernier */}
        <Box display="flex" justifyContent="center" alignItems="center" mt={2}>
        <Button variant="outlined" onClick={() => setNewTaskName('Nouvelle tâche')}>Ajouter une tâche</Button>

        </Box>
      </Box>
    </Container>
  );
  
}

export default TodoPage;
