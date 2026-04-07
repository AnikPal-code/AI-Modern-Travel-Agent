import { useState } from 'react';
import './App.css';
import TravelForm from './components/TravelForm';
import TravelResults from './components/TravelResults';
import Loading from './components/Loading';
import { generateTravelItinerary } from './services/groqService';

interface FormData {
  destination: string;
  departureCity: string;
  departureDate: string;
  returnDate: string;
  currency: string;
  flightBudget: string;
  accomBudget: string;
  people: string;
  preferences: string;
  directFlights: boolean;
  rentCar: boolean;
}

interface ResultsData extends FormData {
  itinerary?: string;
  error?: string;
}

export default function App() {
  const [results, setResults] = useState<ResultsData | null>(null);
  const [loading, setLoading] = useState(false);

  const handlePlanTrip = async (data: FormData) => {
    setLoading(true);
    setResults(null);

    try {
      // Generate AI itinerary
      const itinerary = await generateTravelItinerary({
        destination: data.destination,
        departureCity: data.departureCity,
        departureDate: data.departureDate,
        returnDate: data.returnDate,
        people: data.people,
        tripType: data.preferences,
        budget: data.flightBudget || '0',
        currency: data.currency,
      });

      setResults({
        ...data,
        itinerary,
      });
    } catch (error) {
      console.error('Error:', error);
      setResults({
        ...data,
        error: error instanceof Error ? error.message : 'Failed to generate itinerary',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <header className="header">
        <h1>
          <span className="highlight">TravelHelperAI</span>
        </h1>
        <p className="subtitle">Plan your perfect getaway with our intelligent travel assistant</p>
      </header>

      <div className="container">
        <TravelForm onSubmit={handlePlanTrip} />
        {loading && <Loading />}
        {results && <TravelResults data={results} />}
      </div>
    </div>
  );
}
