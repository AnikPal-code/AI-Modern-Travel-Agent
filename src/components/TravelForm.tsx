import { useState } from 'react';
import './TravelForm.css';
import { getCurrencyByDestination } from '../utils/countryCurrency';

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

interface TravelFormProps {
  onSubmit: (data: FormData) => void;
}

export default function TravelForm({ onSubmit }: TravelFormProps) {
  const [formData, setFormData] = useState<FormData>({
    destination: '',
    departureCity: '',
    departureDate: '',
    returnDate: '',
    currency: 'EUR',
    flightBudget: '',
    accomBudget: '',
    people: '1',
    preferences: '',
    directFlights: false,
    rentCar: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    let newData = {
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    };

    // Auto-update currency when destination or departure city changes
    // Priority: departure city (where user is from) > destination
    if ((name === 'destination' || name === 'departureCity') && value) {
      if (name === 'departureCity' && value) {
        // Use departure city currency as primary
        newData.currency = getCurrencyByDestination(value);
      } else if (name === 'destination' && value) {
        // Use destination currency if departure city is empty
        if (!newData.departureCity) {
          newData.currency = getCurrencyByDestination(value);
        }
      }
    }

    setFormData(newData);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.destination.trim() || !formData.departureCity.trim()) {
      alert('Please fill in at least your destination and departure city.');
      return;
    }

    onSubmit(formData);
  };

  return (
    <form className="card travel-form" onSubmit={handleSubmit}>
      <div className="form-grid">
        {/* Row 1 */}
        <div className="field">
          <label htmlFor="destination">
            <span className="icon">📍</span> Where do you want to travel?
          </label>
          <input
            type="text"
            id="destination"
            name="destination"
            placeholder="e.g. Paris, Tokyo, Bali"
            value={formData.destination}
            onChange={handleChange}
          />
        </div>
        <div className="field">
          <label htmlFor="departureCity">
            <span className="icon">✈️</span> Departure airport/city?
          </label>
          <input
            type="text"
            id="departureCity"
            name="departureCity"
            placeholder="e.g. New York, London"
            value={formData.departureCity}
            onChange={handleChange}
          />
        </div>

        {/* Row 2 */}
        <div className="field">
          <label htmlFor="departureDate">
            <span className="icon">📅</span> When are you leaving?
          </label>
          <input
            type="date"
            id="departureDate"
            name="departureDate"
            value={formData.departureDate}
            onChange={handleChange}
          />
        </div>
        <div className="field">
          <label htmlFor="returnDate">
            <span className="icon">📅</span> When are you returning?
          </label>
          <input
            type="date"
            id="returnDate"
            name="returnDate"
            value={formData.returnDate}
            onChange={handleChange}
          />
        </div>

        {/* Row 3 */}
        <div className="field budget-row">
          <label>
            <span className="icon">💰</span> Flight budget
          </label>
          <div className="budget-inputs">
            <select name="currency" value={formData.currency} onChange={handleChange}>
              <option value="USD">USD - US Dollar</option>
              <option value="EUR">EUR - Euro</option>
              <option value="GBP">GBP - British Pound</option>
              <option value="JPY">JPY - Japanese Yen</option>
              <option value="INR">INR - Indian Rupee</option>
              <option value="AUD">AUD - Australian Dollar</option>
              <option value="CAD">CAD - Canadian Dollar</option>
              <option value="CHF">CHF - Swiss Franc</option>
              <option value="CNY">CNY - Chinese Yuan</option>
              <option value="AED">AED - UAE Dirham</option>
            </select>
            <input
              type="number"
              name="flightBudget"
              placeholder="e.g. 500"
              min="0"
              value={formData.flightBudget}
              onChange={handleChange}
            />
          </div>
          <p className="currency-hint">
            {formData.departureCity 
              ? `💡 Auto-detected from ${formData.departureCity}` 
              : formData.destination 
              ? `💡 Auto-detected from ${formData.destination}`
              : '💡 Enter departure city to auto-detect currency'}
          </p>
        </div>
        <div className="field">
          <label htmlFor="accomBudget">
            <span className="icon">🏨</span> Accommodation budget (per night)
          </label>
          <input
            type="number"
            id="accomBudget"
            name="accomBudget"
            placeholder="e.g. 100"
            min="0"
            value={formData.accomBudget}
            onChange={handleChange}
          />
        </div>
        <div className="field">
          <label htmlFor="people">
            <span className="icon">👥</span> How many people?
          </label>
          <input
            type="number"
            id="people"
            name="people"
            value={formData.people}
            min="1"
            max="20"
            onChange={handleChange}
          />
        </div>

        {/* Row 4 */}
        <div className="field preferences-field">
          <label htmlFor="preferences">
            <span className="icon">✨</span> Preferences
          </label>
          <textarea
            id="preferences"
            name="preferences"
            placeholder="e.g. Beach relaxation, adventure activities, local cuisine, budget-friendly, luxury hotels, family-friendly, nightlife, cultural sites..."
            value={formData.preferences}
            onChange={handleChange}
            rows={4}
          />
        </div>
        <div className="field toggles-field">
          <div className="toggle-row">
            <label className="toggle-label" htmlFor="directFlights">
              Direct flights only?
            </label>
            <label className="toggle">
              <input
                type="checkbox"
                id="directFlights"
                name="directFlights"
                checked={formData.directFlights}
                onChange={handleChange}
              />
              <span className="slider"></span>
            </label>
          </div>
          <p className="toggle-hint">Avoid layovers and connections</p>
          <div className="toggle-row" style={{ marginTop: '12px' }}>
            <label className="toggle-label" htmlFor="rentCar">
              Rent a car?
            </label>
            <label className="toggle">
              <input
                type="checkbox"
                id="rentCar"
                name="rentCar"
                checked={formData.rentCar}
                onChange={handleChange}
              />
              <span className="slider"></span>
            </label>
          </div>
        </div>
      </div>

      <button type="submit" className="btn-plan">
        Plan My Trip
      </button>
    </form>
  );
}
