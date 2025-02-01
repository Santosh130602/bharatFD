import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Trans from './component/trans';
import AdminComponent from './component/admin/admin';

function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Trans />} />
      <Route path='/admin' element={<AdminComponent/>} />
      </Routes>
    </Router>
    
     
  );
}

export default App;
