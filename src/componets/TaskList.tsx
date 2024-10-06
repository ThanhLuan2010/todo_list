
import React, { useEffect, useState } from "react";
import axios from "../api/api.ts";
import TaskForm from "./TaskForm.tsx";
import TaskItem from "./TaskItem.tsx";
import TaskFilter from "./TaskFilter.tsx";
import { List, Typography, Box, TextField, Pagination } from "@mui/material";

interface Task {
  id: number;
  title: string;
  description: string;
  completed: boolean;
}

const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filter, setFilter] = useState<"all" | "completed" | "incomplete">(
    "all"
  );
  const [currentPage, setCurrentPage] = useState(1);
  const tasksPerPage = 10;

  useEffect(() => {
    axios.get("/tasks").then((response) => {
      setTasks(response.data);
    });
  }, []);

  const addTask = (title: string, description: string) => {
    axios
      .post("/tasks", { title, description, completed: false })
      .then((response) => {
        setTasks([...tasks, response.data]);
      });
  };

  const updateTask = (
    id: number,
    newTitle: string,
    newDescription: string,
    completed: boolean
  ) => {
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? { ...task, title: newTitle, description: newDescription, completed }
          : task
      )
    );
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  // Tìm kiếm công việc dựa vào từ khóa tìm kiếm
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); // Reset lại trang hiện tại về 1 khi tìm kiếm mới
  };

  // Lọc công việc dựa trên từ khóa tìm kiếm, trạng thái và phân trang
  const filteredTasks = tasks.filter((task) => {
    const lowerSearchTerm = searchTerm.toLowerCase();
    const matchesSearch =
      task.title.toLowerCase().includes(lowerSearchTerm) ||
      task.description.toLowerCase().includes(lowerSearchTerm);

    if (filter === "completed") return task.completed && matchesSearch;
    if (filter === "incomplete") return !task.completed && matchesSearch;
    return matchesSearch;
  });

  // Phân trang
  const totalPages = Math.ceil(filteredTasks.length / tasksPerPage);
  const displayedTasks = filteredTasks.slice(
    (currentPage - 1) * tasksPerPage,
    currentPage * tasksPerPage
  );

  const handleChangePage = (
    _event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    setCurrentPage(page);
  };

  return (
    <Box display="flex" flexDirection="column" height="100vh" width="100%">
      <Typography variant="h4" gutterBottom>
        My Todo
      </Typography>

      <Box
        display="flex"
        flex={1}
        gap={2}
        sx={{
          flexDirection: {
            xs: "column",
            md: "row",
          },
        }}
        height="90%"
        justifyContent="flex-start"
      >
        <Box>
          <TaskForm onAddTask={addTask} />
        </Box>

        <Box display="flex" flex={1} flexDirection="column" height="100%">
          <TaskFilter filter={filter} setFilter={setFilter} />

          <TextField
            label="Search"
            variant="outlined"
            fullWidth
            value={searchTerm}
            onChange={handleSearch}
          />

          {displayedTasks.length === 0 ? (
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              width="100%"
              flex={1}
            >
              <Typography
                align="center"
                variant="h6"
                color="textSecondary"
                sx={{ mt: 2 }}
              >
                Empty list
              </Typography>
            </Box>
          ) : (
            <>
              {/* Danh sách TaskItem có thể cuộn */}
              <Box
                sx={{
                  flexGrow: 1,
                  overflowY: "auto", // Cho phép cuộn nếu có nhiều TaskItem
                  borderRadius: "8px",
                  maxHeight: "55vh", // Giới hạn chiều cao để cho phép cuộn
                }}
              >
                <List>
                  {displayedTasks.map((task) => (
                    <TaskItem
                      key={task.id}
                      task={task}
                      onUpdateTask={(id, newTitle, newDescription, completed) =>
                        updateTask(id, newTitle, newDescription, completed)
                      }
                      onDeleteTask={deleteTask}
                    />
                  ))}
                </List>
              </Box>

              {/* Phân trang */}
              <Box
                sx={{
                  mt: 2,
                  display: "flex",
                  justifyContent: "center",
                  bgcolor: "white", // Đảm bảo phân trang tách biệt với danh sách
                  p: 2,
                }}
              >
                <Pagination
                  count={totalPages}
                  page={currentPage}
                  onChange={handleChangePage}
                  sx={{ alignSelf: "center" }}
                />
              </Box>
            </>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default TaskList;