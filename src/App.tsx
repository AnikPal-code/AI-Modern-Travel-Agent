import { useState } from 'react';
import './App.css';
import TravelForm from './components/TravelForm';
import TravelResults from './components/TravelResults';
import Loading from './components/Loading';
import VoiceAssistant from './components/VoiceAssistant';
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
  const [voiceMode, setVoiceMode] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    destination: '',
    departureCity: '',
    departureDate: '',
    returnDate: '',
    currency: 'USD',
    flightBudget: '',
    accomBudget: '',
    people: '1',
    preferences: '',
    directFlights: false,
    rentCar: false,
  });

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

  const handleVoiceFormUpdate = (updates: Partial<FormData>) => {
    setFormData(prev => ({ ...prev, ...updates }));
  };

  const handleStartVoiceMode = () => {
    setVoiceMode(true);
  };

  const handleEndVoiceMode = () => {
    setVoiceMode(false);
    // Auto-submit when voice mode ends
    if (formData.destination && formData.departureCity) {
      handlePlanTrip(formData);
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
        <VoiceAssistant 
          onFormDataUpdate={handleVoiceFormUpdate}
          onStartVoiceMode={handleStartVoiceMode}
          onEndVoiceMode={handleEndVoiceMode}
        />
        
        {!voiceMode && (
          <TravelForm 
            onSubmit={handlePlanTrip} 
            initialData={formData}
          />
        )}
        
        {voiceMode && (
          <div className="voice-form-preview card">
            <h3>Voice Input Progress</h3>
            <div className="form-preview">
              {formData.destination && <p><strong>Destination:</strong> {formData.destination}</p>}
              {formData.departureCity && <p><strong>From:</strong> {formData.departureCity}</p>}
              {formData.departureDate && <p><strong>Departure:</strong> {formData.departureDate}</p>}
              {formData.returnDate && <p><strong>Return:</strong> {formData.returnDate}</p>}
              {formData.people && <p><strong>Travelers:</strong> {formData.people}</p>}
              {formData.flightBudget && <p><strong>Flight Budget:</strong> {formData.currency} {formData.flightBudget}</p>}
              {formData.accomBudget && <p><strong>Hotel Budget:</strong> {formData.currency} {formData.accomBudget}/night</p>}
              {formData.preferences && <p><strong>Preferences:</strong> {formData.preferences}</p>}
            </div>
          </div>
        )}
        
        {loading && <Loading />}
        {results && <TravelResults data={results} />}
      </div>
    </div>
  );
}
