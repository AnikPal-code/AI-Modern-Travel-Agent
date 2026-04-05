import './TravelResults.css';

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
  itinerary?: string;
  error?: string;
}

interface TravelResultsProps {
  data: FormData;
}

export default function TravelResults({ data }: TravelResultsProps) {
  const calcNights = () => {
    if (!data.departureDate || !data.returnDate) return null;
    const diff = (new Date(data.returnDate).getTime() - new Date(data.departureDate).getTime()) / (1000 * 60 * 60 * 24);
    return diff > 0 ? diff : null;
  };

  const formatDate = (dateStr: string) => {
    if (!dateStr) return 'Not specified';
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  const tripSuggestions = () => {
    return [
      `Explore ${data.destination} at your own pace`,
      'Check local events during your stay',
      'Ask locals for hidden gems',
      'Visit popular attractions and landmarks',
      'Try local restaurants and cuisine',
    ];
  };

  const nights = calcNights();
  const totalAccom =
    nights && data.accomBudget
      ? `${data.currency} ${(nights * Number(data.accomBudget) * Number(data.people)).toLocaleString()}`
      : null;
  const totalBudget =
    data.flightBudget && totalAccom
      ? `${data.currency} ${(Number(data.flightBudget) + nights! * Number(data.accomBudget) * Number(data.people)).toLocaleString()}`
      : null;

  const suggestions = tripSuggestions();

  return (
    <div className="card results">
      <h2>Your Travel Plan</h2>

      {data.error && (
        <div className="result-section error">
          <h3>Error</h3>
          <p>{data.error}</p>
        </div>
      )}

      <div className="result-section">
        <h3>Trip Summary</h3>
        <p>
          <strong>{data.people} {Number(data.people) === 1 ? 'traveller' : 'travellers'}</strong>
          {' '}flying from <strong>{data.departureCity}</strong> to <strong>{data.destination}</strong>
          {data.departureDate && ` on ${formatDate(data.departureDate)}`}
          {data.returnDate && `, returning ${formatDate(data.returnDate)}`}
          {nights && ` (${nights} night${nights !== 1 ? 's' : ''})`}.
        </p>
        <div className="tag-row" style={{ marginTop: '12px' }}>
          {data.preferences && <span className="tag">✨ {data.preferences.substring(0, 30)}...</span>}
          {data.directFlights && <span className="tag">✈️ Direct flights</span>}
          {data.rentCar && <span className="tag">🚗 Car rental</span>}
        </div>
      </div>

      <div className="result-section">
        <h3>Budget Estimate</h3>
        <p>
          {data.flightBudget && (
            <>
              Flights: <strong>{data.currency} {Number(data.flightBudget).toLocaleString()}</strong> total
              <br />
            </>
          )}
          {data.accomBudget && (
            <>
              Accommodation: <strong>{data.currency} {data.accomBudget}/night</strong> per person
              {totalAccom && ` → ${totalAccom}`}
              <br />
            </>
          )}
          {totalBudget ? (
            <>
              Estimated total: <strong>{totalBudget}</strong>
            </>
          ) : (
            !data.flightBudget &&
            !data.accomBudget && (
              'No budget entered — add flight and accommodation budgets for an estimate.'
            )
          )}
        </p>
      </div>

      {data.itinerary && (
        <div className="result-section itinerary-section">
          <h3>AI-Generated Itinerary</h3>
          <div className="itinerary-content">
            {data.itinerary.split('\n').map((line, idx) => (
              <p key={idx}>{line}</p>
            ))}
          </div>
        </div>
      )}

      <div className="result-section">
        <h3>Suggested Activities</h3>
        <ul>
          {suggestions.map((s, idx) => (
            <li key={idx}>{s}</li>
          ))}
        </ul>
      </div>

      <div className="result-section">
        <h3>Next Steps</h3>
        <ul>
          <li>
            Search flights from <strong>{data.departureCity}</strong> to <strong>{data.destination}</strong>
            {data.directFlights && ' (direct only)'}
          </li>
          <li>Compare accommodation options within your budget</li>
          {data.rentCar && <li>Book a rental car at your destination</li>}
          <li>Check visa requirements for your nationality</li>
          <li>Look into travel insurance for your trip</li>
        </ul>
      </div>
    </div>
  );
}
