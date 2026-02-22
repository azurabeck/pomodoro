import { useEffect, useReducer, useState } from "react";
import type { TaskStateModel } from "../../models/TaskStateModel";
import { initialTaskState } from "./initialTaskState";
import { TaskContext } from "./TaskContext";

type TaskContextProviderProps = {
  children: React.ReactNode;
}

export const TaskContextProvider = ({children} : TaskContextProviderProps) => {

  const [state, setState] = useState<TaskStateModel>(initialTaskState);

  useEffect(() => {
    console.log('TaskContext state updated:', state);
  }, [state])

  return (
    <TaskContext.Provider value={{state, setState}}>
      {children}
    </TaskContext.Provider>
  )
}