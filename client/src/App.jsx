import { BrowserRouter, Routes, Route } from 'react-router';

//Layout 
import DefaultLayout from './layout/DefaultLayout';

//Context
import { GlobalProvider } from './context/GlobalContext';

//Components
import TaskList from './pages/TaskList';
import AddTask from './pages/AddTask';




function App() {


  return (
    <GlobalProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<DefaultLayout />}>
            <Route index element={<TaskList />} />
            <Route path='add' element={<AddTask />} />

          </Route>
        </Routes>
      </BrowserRouter>
    </GlobalProvider>
  )
}

export default App
