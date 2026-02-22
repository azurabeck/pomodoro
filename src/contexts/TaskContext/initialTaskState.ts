import type { TaskStateModel } from "../../models/TaskStateModel";

export const initialTaskState: TaskStateModel = {
    tasks: [], 
    secondsRemaining: 0,
    formattedSecondsRemaining: "",
    activeTask: null, 
    currentCycle: 0,
    config: {
      workTime: 25, 
      shortBreakTime: 5, 
      longBreakTime: 15,
    }
}
