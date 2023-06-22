import './App.css';
import AdminComponents from './components/allComponents/adminComponents'
import UserComponents from './components/allComponents/userComponents'
import {BrowserRouter as Router} from 'react-router-dom'

function App() {
  return (
  <Router>
  <AdminComponents/>
  <UserComponents/>
  </Router>
  );
}

export default App;
