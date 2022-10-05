import { Toaster } from 'react-hot-toast';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DoneTask from './pages/DoneTask';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import NoRoute from './pages/NoRoute';
import OnePage from './pages/OnePage';
import Registration from './pages/Registration';
import TaskHistory from './pages/TaskHistory';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route index element={<LandingPage />} />
          <Route path="/home" element={<OnePage />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/login" element={<Login />} />
          <Route path="history" element={<TaskHistory />} />
          <Route path="done" element={<DoneTask />} />
          <Route path="*" element={<NoRoute />} />
        </Routes>
      </Router>
      <Toaster />
    </div>
  );
}

export default App;
