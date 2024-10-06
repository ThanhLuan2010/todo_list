import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { TextField, Button, Box } from "@mui/material";

interface TaskFormProps {
  onAddTask: (title: string, description: string) => void;
}

interface IFormInput {
  title: string;
  description: string;
}

const TaskForm: React.FC<TaskFormProps> = ({ onAddTask }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    onAddTask(data.title, data.description);
    reset(); // Reset lại form sau khi submit thành công
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      display="flex"
      sx={{ flexDirection: { xs: "row", md: "column" } }}
      alignItems={"flex-start"}
      gap={2}
    >
      <TextField
        label="Title"
        variant="outlined"
        fullWidth
        {...register("title", { required: "Title is require!" })}
        error={!!errors.title}
        helperText={errors.title ? errors.title.message : ""}
      />
      <TextField
        label="Description"
        variant="outlined"
        fullWidth
        sx={{ height: "50px" }}
        {...register("description", { required: "Description is require!" })}
        error={!!errors.description}
        helperText={errors.description ? errors.description.message : ""}
      />
      <Button
        sx={{ width: "300px", height: "55px" }}
        type="submit"
        variant="contained"
        color="primary"
      >
        Add task
      </Button>
    </Box>
  );
};

export default TaskForm;
