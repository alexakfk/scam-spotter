import { useState } from 'react';
import Header from './components/Header';
import MessageInput from './components/MessageInput';
import ResultsPanel from './components/ResultsPanel';
import Footer from './components/Footer';
import About from './components/About';
import FAQ from './components/FAQ';

function App() {
  const [results, setResults] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState('home');

  const handleAnalyze = async (message) => {
    if (!message.trim()) return;

    setIsLoading(true);
    setError(null);
    setResults(null);

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: message.trim() }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.error || `Analysis failed (${response.status})`);
      }

      const data = await response.json();
      setResults(data);
    } catch (err) {
      setError(err.message || 'Failed to analyze message. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClear = () => {
    setResults(null);
    setError(null);
  };

  return (
    <div className="app">
      <Header onNavigate={setCurrentPage} currentPage={currentPage} />
      <main className="main-content">
        {currentPage === 'home' && (
         <div className="analysis-container">
          <MessageInput
            onAnalyze={handleAnalyze}
            onClear={handleClear}
            isLoading={isLoading}
          />
          <ResultsPanel
            results={results}
            isLoading={isLoading}
            error={error}
          />
        </div> 
        )}
        {currentPage === 'about' && <About />}
        {currentPage === 'faq' && <FAQ />}
      </main>
      <Footer />
    </div>
  );
}

export default App;
