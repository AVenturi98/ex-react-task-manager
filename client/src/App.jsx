import { BrowserRouter, Routes, Route } from 'react-router';

//Layout 
import DefaultLayout from './layout/DefaultLayout';

//Context
import { GlobalProvider } from './context/GlobalContext';

//Components
import TaskList from './pages/TaskList';
import AddTask from './pages/AddTask';
import TaskDetail from './pages/TaskDetail';




function App() {


  return (
    <GlobalProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<DefaultLayout />}>
            <Route index element={<TaskList />} />
            <Route path='add' element={<AddTask />} />
            <Route path='task/:id' element={<TaskDetail />} />

          </Route>
        </Routes>
      </BrowserRouter>
    </GlobalProvider>
  )
}

export default App
