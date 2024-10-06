import React from "react";
import { Button, ButtonGroup } from "@mui/material";

interface TaskFilterProps {
  filter: "all" | "completed" | "incomplete";
  setFilter: (filter: "all" | "completed" | "incomplete") => void;
}

const TaskFilter: React.FC<TaskFilterProps> = ({ filter, setFilter }) => {
  return (
    <ButtonGroup
      variant="contained"
      aria-label="outlined primary button group"
      sx={{ mt: 1, mb: 1, alignSelf:"flex-start" }}
    >
      <Button onClick={() => setFilter("all")} disabled={filter === "all"}>
        All
      </Button>
      <Button
        onClick={() => setFilter("completed")}
        disabled={filter === "completed"}
      >
        Complited
      </Button>
      <Button
        onClick={() => setFilter("incomplete")}
        disabled={filter === "incomplete"}
      >
        Incomplete
      </Button>
    </ButtonGroup>
  );
};

export default TaskFilter;
