import { BrowserRouter, Routes, Route } from 'react-router';

//Layout 
import DefaultLayout from './layout/DefaultLayout';

//components
import TaskList from './pages/TaskList';
import AddTask from './pages/AddTask';


function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<DefaultLayout />}>
          <Route index element={<TaskList />} />
          <Route path='add' element={<AddTask />} />

        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
