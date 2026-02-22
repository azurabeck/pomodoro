import { Home } from './pages/Home';
import { TaskContextProvider } from './contexts/TaskContext';

import './styles/theme.css'
import './styles/global.css'

export default function App() {

  return (
    <TaskContextProvider><Home /></TaskContextProvider> 
  )
}