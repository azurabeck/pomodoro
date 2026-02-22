import React, { useRef } from "react";
import { PlayCircleIcon, StopCircleIcon } from "lucide-react";
import { Button } from "../Button";
import { Container } from "../Container";
import { Cycles } from "../Cycles";
import { Input } from "../Input";
import { useTaskContext } from "../../contexts/TaskContext/TaskContextHook";
import type { TaskModel } from "../../models/TaskModel";
import { getNextCycle } from "../../utils/getNextCycle";
import { getNextCycleType } from "../../utils/getNextCycleType";
import { formatSecondsToMinutes } from "../../utils/formatSecondsToMinutes";

export function MainForm() {

  const { state, setState } = useTaskContext();
  const taskName = useRef<HTMLInputElement>(null);
  const nextCycle = getNextCycle(state.currentCycle);
  const nextCycleType = getNextCycleType(nextCycle);

  const handleInterruptTask = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setState((prevState) => {
      return {
        ...prevState,
        activeTask: null,
        formattedSecondsRemaining: '00:00',
        secondsRemaining: 0,
        tasks: prevState.tasks.map(task => {
          if (prevState.activeTask && task.id === prevState.activeTask.id) {
            return {
              ...task,
              interruptDate: Date.now(),
              completeDate: prevState.currentCycle === 8 ? Date.now() : null
            }
          } else {
            return task;
          }
        })
      }
    })
  
  }

  const handleCreateNewTask = (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    if(taskName.current === null) return;

    const task = taskName.current.value.trim();

    if(!task) {
      alert('Por favor, insira o nome da tarefa.');
      return;
    }

    const newTask : TaskModel = {
      id: Date.now().toString(),
      name: task,
      startDate: Date.now(),
      completeDate: null,
      interruptDate: null,
      duration: state.config[nextCycleType],
      type: nextCycleType
    }

    const secondsRemaining = newTask.duration * 60;
    const formattedSecondsRemaining = formatSecondsToMinutes(secondsRemaining);

    setState((prevState) => {
      return {
        ...prevState,
        tasks: [...prevState.tasks, newTask],
        secondsRemaining,
        formattedSecondsRemaining: formattedSecondsRemaining,
        currentCycle: nextCycle,
        activeTask: newTask
      }
    })
  }

    return (
        <Container>
          <form onSubmit={handleCreateNewTask} className='form' action=''>
            <div className='formRow'>
              <Input 
                type='text' 
                id='taskInput' 
                label='task' 
                placeholder='Entre com sua task'
                ref={taskName}
                disabled={!!state.activeTask}
              />
            </div>

            <div className='formRow'>
              <p>Lorem ipsum dolor sit amet.</p>
            </div>

            {
              state.currentCycle > 0 && (
                <div className='formRow'>
                  <Cycles />
                </div>
              )
            }

            <div className='formRow'>
              {!state.activeTask  
                && <Button type="submit" key='button_submit' aria-label="Iniciar nova tarefa" title="Iniciar nova tarefa" icon={<PlayCircleIcon />}/>
              }
              {!!state.activeTask 
                && <Button type="button" key='button_button' aria-label="Para tarefa atual" title="Para tarefa atual" color='red' icon={<StopCircleIcon />} onClick={handleInterruptTask}/>
              }
            </div>
          </form>
        </Container>
    )
}