import { useState } from 'react';
import './TravelResults.css';
import { generateAllBookingLinks } from '../services/bookingLinksService';
import { sendItineraryEmail } from '../services/resendEmailService';

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
  const [emailSending, setEmailSending] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [emailData, setEmailData] = useState({
    to_email: '',
    to_name: '',
  });

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

  const nights = calcNights();
  const totalAccom = nights && data.accomBudget
    ? `${data.currency} ${(nights * Number(data.accomBudget) * Number(data.people)).toLocaleString()}`
    : null;
  const totalBudget = data.flightBudget && totalAccom
    ? `${data.currency} ${(Number(data.flightBudget) + nights! * Number(data.accomBudget) * Number(data.people)).toLocaleString()}`
    : null;

  const bookingLinks = generateAllBookingLinks({
    destination: data.destination,
    departureCity: data.departureCity,
    departureDate: data.departureDate,
    returnDate: data.returnDate,
    people: Number(data.people),
    rentCar: data.rentCar,
  });

  const handleEmailShare = async (e: React.FormEvent) => {
    e.preventDefault();
    setEmailSending(true);
    setEmailError('');

    try {
      const emailContent = `🌍 TRIP SUMMARY
Destination: ${data.destination}
Departure: ${data.departureCity}
Dates: ${formatDate(data.departureDate)} - ${formatDate(data.returnDate)}
Travelers: ${data.people}
Preferences: ${data.preferences || 'Not specified'}

💰 BUDGET ESTIMATE
${data.flightBudget ? `Flights: ${data.currency} ${Number(data.flightBudget).toLocaleString()}` : ''}
${data.accomBudget ? `Accommodation: ${data.currency} ${data.accomBudget}/night per person` : ''}
${totalBudget ? `Total Budget: ${totalBudget}` : ''}

🗓️ AI-GENERATED ITINERARY
${data.itinerary || 'No itinerary generated'}

✈️ FLIGHT BOOKING LINKS
• Google Flights: ${bookingLinks.flights.googleFlights}
• Kayak: ${bookingLinks.flights.kayak}
• Skyscanner: ${bookingLinks.flights.skyscanner}
• Expedia: ${bookingLinks.flights.expedia}

🏨 HOTEL BOOKING LINKS
• Booking.com: ${bookingLinks.hotels.bookingCom}
• Airbnb: ${bookingLinks.hotels.airbnb}
• Hotels.com: ${bookingLinks.hotels.hotels}
• Agoda: ${bookingLinks.hotels.agoda}

${data.rentCar ? `🚗 CAR RENTAL LINKS
• Rental Cars: ${bookingLinks.carRental?.rentalCars}
• Enterprise: ${bookingLinks.carRental?.enterprise}
• Hertz: ${bookingLinks.carRental?.hertz}
• Avis: ${bookingLinks.carRental?.avis}` : ''}

Happy travels! 🌟`;

      await sendItineraryEmail({
        to_email: emailData.to_email,
        to_name: emailData.to_name,
        subject: `Your Complete Travel Itinerary for ${data.destination}`,
        message: emailContent,
      });

      setEmailSent(true);
      setShowEmailForm(false);
      setEmailData({ to_email: '', to_name: '' });
      setTimeout(() => setEmailSent(false), 5000);
    } catch (error) {
      console.error('Email sending failed:', error);
      setEmailError(error instanceof Error ? error.message : 'Failed to send email');
    } finally {
      setEmailSending(false);
    }
  };

  const handleEmailInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmailData({
      ...emailData,
      [e.target.name]: e.target.value,
    });
  };

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
      </div>

      <div className="result-section">
        <h3>Budget Estimate</h3>
        <p>
          {data.flightBudget && (
            <>
              Flights: <strong>{data.currency} {Number(data.flightBudget).toLocaleString()}</strong>
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
          {totalBudget && (
            <>
              Estimated total: <strong>{totalBudget}</strong>
            </>
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
        <h3>🔗 Booking Links</h3>
        
        <div className="booking-section">
          <h4>✈️ Flight Booking</h4>
          <div className="booking-links">
            <a href={bookingLinks.flights.googleFlights} target="_blank" rel="noopener noreferrer" className="booking-link">
              🔍 Google Flights
            </a>
            <a href={bookingLinks.flights.kayak} target="_blank" rel="noopener noreferrer" className="booking-link">
              ✈️ Kayak
            </a>
            <a href={bookingLinks.flights.skyscanner} target="_blank" rel="noopener noreferrer" className="booking-link">
              🌍 Skyscanner
            </a>
            <a href={bookingLinks.flights.expedia} target="_blank" rel="noopener noreferrer" className="booking-link">
              🎫 Expedia
            </a>
          </div>
        </div>

        <div className="booking-section">
          <h4>🏨 Hotel Booking</h4>
          <div className="booking-links">
            <a href={bookingLinks.hotels.bookingCom} target="_blank" rel="noopener noreferrer" className="booking-link">
              🏨 Booking.com
            </a>
            <a href={bookingLinks.hotels.airbnb} target="_blank" rel="noopener noreferrer" className="booking-link">
              🏠 Airbnb
            </a>
            <a href={bookingLinks.hotels.hotels} target="_blank" rel="noopener noreferrer" className="booking-link">
              🛏️ Hotels.com
            </a>
            <a href={bookingLinks.hotels.agoda} target="_blank" rel="noopener noreferrer" className="booking-link">
              🌏 Agoda
            </a>
          </div>
        </div>

        {data.rentCar && bookingLinks.carRental && (
          <div className="booking-section">
            <h4>🚗 Car Rental</h4>
            <div className="booking-links">
              <a href={bookingLinks.carRental.rentalCars} target="_blank" rel="noopener noreferrer" className="booking-link">
                🚙 Rental Cars
              </a>
              <a href={bookingLinks.carRental.enterprise} target="_blank" rel="noopener noreferrer" className="booking-link">
                🏢 Enterprise
              </a>
              <a href={bookingLinks.carRental.hertz} target="_blank" rel="noopener noreferrer" className="booking-link">
                🚗 Hertz
              </a>
              <a href={bookingLinks.carRental.avis} target="_blank" rel="noopener noreferrer" className="booking-link">
                🚙 Avis
              </a>
            </div>
          </div>
        )}
      </div>

      {/* Email Sharing Section */}
      <div className="result-section email-section">
        <h3>📧 Share Your Itinerary</h3>
        {!showEmailForm ? (
          <div className="email-actions">
            <button 
              className="btn-email" 
              onClick={() => setShowEmailForm(true)}
              disabled={emailSending}
            >
              📧 Email This Itinerary
            </button>
            <p className="email-hint">Send complete travel plan with all booking links</p>
          </div>
        ) : (
          <form className="email-form" onSubmit={handleEmailShare}>
            <div className="email-inputs">
              <input
                type="text"
                name="to_name"
                placeholder="Recipient's name"
                value={emailData.to_name}
                onChange={handleEmailInputChange}
                required
              />
              <input
                type="email"
                name="to_email"
                placeholder="Recipient's email"
                value={emailData.to_email}
                onChange={handleEmailInputChange}
                required
              />
            </div>
            {emailError && (
              <div className="email-error">
                ❌ {emailError}
              </div>
            )}
            <div className="email-buttons">
              <button type="submit" disabled={emailSending} className="btn-send">
                {emailSending ? '📤 Sending...' : '📧 Send Email'}
              </button>
              <button 
                type="button" 
                onClick={() => {
                  setShowEmailForm(false);
                  setEmailError('');
                }}
                className="btn-cancel"
              >
                Cancel
              </button>
            </div>
          </form>
        )}
        
        {emailSent && (
          <div className="email-success">
            ✅ Email sent successfully to {emailData.to_email}!
          </div>
        )}
      </div>
    </div>
  );
}
