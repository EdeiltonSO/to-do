import logo from '../../assets/logo.svg'
import {
  Header,
  TaskContainer,
  TaskCounter,
  TaskHeader,
  TaskList,
} from './styles'
import { Task } from '../../components/Task'
import { NewTaskForm } from '../../components/NewTaskForm'
import { useEffect, useState } from 'react'
import { EmptyState } from '../../components/EmptyState'

interface Task {
  id: string
  title: string
  done: boolean
}

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [numberOfTasksDone, setNumberOfTasksDone] = useState(0)

  function handleCreateNewTask(title: string) {
    if (!title) return

    const now = new Date()
    const id = now.getTime().toString()

    const task = {
      id,
      title,
      done: false,
    }

    setTasks([task, ...tasks])
  }

  function handleMarkTaskAsDone(id: string) {
    const tasksUpdated = tasks.map((task) => {
      if (task.id === id) task.done = !task.done

      return task
    })

    setTasks(tasksUpdated)

    setNumberOfTasksDone(tasksUpdated.filter((task) => task.done).length)
  }

  function handleDeleteTask(id: string) {
    const tasksUpdated = tasks.filter((task) => {
      return task.id !== id ? task : null
    })

    setTasks(tasksUpdated)
    setNumberOfTasksDone(tasksUpdated.filter((task) => task.done).length)
  }

  useEffect(() => {
    const tasksNotDone = tasks.length - numberOfTasksDone

    if (tasksNotDone === 1) document.title = '1 tarefa pendente'
    else if (tasksNotDone > 1)
      document.title = `${tasksNotDone} tarefas pendentes`
    else document.title = 'Sem tarefas pendentes'
  }, [tasks, numberOfTasksDone])

  return (
    <>
      <Header>
        <img src={logo} alt="" />
        <NewTaskForm onSubmitFunction={handleCreateNewTask} />
      </Header>

      <TaskContainer>
        <TaskHeader>
          <TaskCounter>
            <p id="created">Tarefas criadas</p>
            <span>{tasks.length}</span>
          </TaskCounter>
          <TaskCounter>
            <p id="done">Concluídas</p>
            <span>
              {numberOfTasksDone} de {tasks.length}
            </span>
          </TaskCounter>
        </TaskHeader>
        <TaskList>
          {tasks.length === 0 ? <EmptyState /> : <></>}
          {tasks.map((task) => {
            return task.done ? null : (
              <Task
                key={task.id}
                done={task.done}
                title={task.title}
                onChangeCheckbox={() => handleMarkTaskAsDone(task.id)}
                onClickTrash={() => handleDeleteTask(task.id)}
              />
            )
          })}
          {tasks.map((task) => {
            return !task.done ? null : (
              <Task
                key={task.id}
                done={task.done}
                title={task.title}
                onChangeCheckbox={() => handleMarkTaskAsDone(task.id)}
                onClickTrash={() => handleDeleteTask(task.id)}
              />
            )
          })}
        </TaskList>
      </TaskContainer>
    </>
  )
}
