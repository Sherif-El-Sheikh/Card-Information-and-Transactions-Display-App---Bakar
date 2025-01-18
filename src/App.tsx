import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from "sonner";
import CardPage from './pages/CardPage';
import TransactionsPage from './pages/TransactionsPage';
import NotFoundPage from './pages/NotFoundPage';
import { Navigation } from './components/Navigation';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 pt-16">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Navigation />
                <CardPage />
              </>
            }
          />
          <Route
            path="/transactions"
            element={
              <>
                <Navigation />
                <TransactionsPage />
              </>
            }
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <Toaster position="top-center" />
      </div>
    </Router>
  );
}

export default App;

