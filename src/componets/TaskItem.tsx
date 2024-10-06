import React, { useState } from 'react'
import { ListItem, ListItemText, IconButton, TextField, Box, Checkbox } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import SaveIcon from '@mui/icons-material/Save'
import CancelIcon from '@mui/icons-material/Cancel'

interface TaskItemProps {
  task: {
    id: number;
    title: string;
    description: string;
    completed: boolean;
  };
  onUpdateTask: (id: number, newTitle: string, newDescription: string, completed: boolean) => void;
  onDeleteTask: (id: number) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onUpdateTask, onDeleteTask }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [newTitle, setNewTitle] = useState(task.title)
  const [newDescription, setNewDescription] = useState(task.description)
  const [completed, setCompleted] = useState(task.completed)

  const handleEdit = () => {
    setIsEditing(true)
  }

  const handleSave = () => {
    onUpdateTask(task.id, newTitle, newDescription, completed)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setIsEditing(false)
    setNewTitle(task.title)
    setNewDescription(task.description)
    setCompleted(task.completed)
  }

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCompleted(event.target.checked)
    onUpdateTask(task.id, newTitle, newDescription, event.target.checked)
  }

  return (
    <ListItem
      sx={{
        border: `2px solid ${task.completed ? 'green' : 'gray'}`,
        borderRadius: '8px',
        mb: 1,
        p: 1
      }}
    >
      {isEditing ? (
        <Box display="flex" flexDirection="column" gap={1} width="100%">
          <TextField
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            variant="outlined"
            fullWidth
            label="Tiêu đề"
          />
          <TextField
            value={newDescription}
            onChange={(e) => setNewDescription(e.target.value)}
            variant="outlined"
            fullWidth
            multiline
            rows={4}
            label="Mô tả"
          />
          <Box display="flex" gap={1}>
            <IconButton onClick={handleSave} color="primary">
              <SaveIcon />
            </IconButton>
            <IconButton onClick={handleCancel} color="secondary">
              <CancelIcon />
            </IconButton>
          </Box>
        </Box>
      ) : (
        <Box display="flex" justifyContent="space-between" alignItems="center" width="100%">
          <Checkbox
            checked={completed}
            onChange={handleCheckboxChange}
            sx={{ mr: 2 }}
          />
          <ListItemText primary={task.title} secondary={task.description} />
          <Box>
            <IconButton onClick={handleEdit} color="primary">
              <EditIcon />
            </IconButton>
            <IconButton onClick={() => onDeleteTask(task.id)} color="secondary">
              <DeleteIcon />
            </IconButton>
          </Box>
        </Box>
      )}
    </ListItem>
  )
}

export default TaskItem