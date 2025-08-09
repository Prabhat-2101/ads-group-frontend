import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AddItem from './components/AddItem';
import ShowItems from './components/ShowItems';
import GenerateBill from './components/GenerateBill';
import ShowBills from './components/ShowBills';

function App() {
  return (
    <Router>
      <div className="bg-gray-50 min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow p-4">
          <Routes>
            <Route path="/" element={<AddItem />} />
            <Route path="/add" element={<AddItem />} />
            <Route path="/items" element={<ShowItems />} />
            <Route path="/bill" element={<GenerateBill />} />
            <Route path="/show-bills" element={<ShowBills />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
