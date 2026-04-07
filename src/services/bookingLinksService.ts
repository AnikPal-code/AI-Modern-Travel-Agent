// Booking Links Service - Generate accurate booking URLs

interface BookingParams {
  destination: string;
  departureCity: string;
  departureDate: string;
  returnDate: string;
  people: number;
  rentCar: boolean;
}

interface BookingLinks {
  flights: FlightLinks;
  hotels: HotelLinks;
  carRental?: CarRentalLinks;
}

interface FlightLinks {
  googleFlights: string;
  kayak: string;
  skyscanner: string;
  expedia: string;
  booking: string;
}

interface HotelLinks {
  bookingCom: string;
  hotels: string;
  airbnb: string;
  agoda: string;
  trivago: string;
}

interface CarRentalLinks {
  rentalCars: string;
  enterprise: string;
  hertz: string;
  avis: string;
  budget: string;
}

// Format date for URLs (YYYY-MM-DD)
const formatDateForUrl = (dateStr: string): string => {
  return dateStr; // Already in YYYY-MM-DD format
};

// Extract airport code or use city name
const getLocationCode = (location: string): string => {
  // Remove extra spaces and convert to uppercase
  return location.trim().toUpperCase();
};

// Generate flight booking links
export const generateFlightLinks = (params: BookingParams): FlightLinks => {
  const { departureCity, destination, departureDate, returnDate, people } = params;
  
  const depCode = getLocationCode(departureCity);
  const destCode = getLocationCode(destination);
  const depDate = formatDateForUrl(departureDate);
  const retDate = formatDateForUrl(returnDate);
  const passengers = people;

  return {
    // Google Flights
    googleFlights: `https://www.google.com/flights?hl=en#search;f=${depCode};t=${destCode};d=${depDate};r=${retDate};tt=r;ps=${passengers}`,
    
    // Kayak
    kayak: `https://www.kayak.com/flights/${depCode}-${destCode}/${depDate}/${retDate}?fs=cabin=e;stops=0,1,2&sort=price_a&passengers=${passengers}`,
    
    // Skyscanner
    skyscanner: `https://www.skyscanner.com/transport/flights/${depCode}/${destCode}/${depDate}/?adultsv2=${passengers}&childrenv2=&ref=home&rtn=${retDate}`,
    
    // Expedia
    expedia: `https://www.expedia.com/Flights-Search?trip=roundtrip&leg1=from:${depCode},to:${destCode},departure:${depDate}&leg2=from:${destCode},to:${depCode},departure:${retDate}&passengers=adults:${passengers},children:0,seniors:0&options=cabinclass:economy&sort=price`,
    
    // Booking.com Flights
    booking: `https://www.booking.com/flights/index.html?ss=${destination}&ssne=${destination}&ssne_untouched=${destination}&efdco=1&label=gen173nr-1FCAEoggI46AdIM1gEaFCIAQGYAQm4ARfIAQzYAQPoAQH4AQKIAgGoAgO4AqDj-6wGwAIB0gIkZjk4ZjI0ZjItNzA5Ny00YTY5LWE5ZTAtYzI0ZjI0ZjI0ZjI42AIF4AIB&aid=304142&ss_raw=${destination}&checkin=${depDate}&checkout=${retDate}&group_adults=${passengers}&no_rooms=1&group_children=0`,
  };
};

// Generate hotel booking links
export const generateHotelLinks = (params: BookingParams): HotelLinks => {
  const { destination, departureDate, returnDate, people } = params;
  
  const destName = destination.trim();
  const checkin = formatDateForUrl(departureDate);
  const checkout = formatDateForUrl(returnDate);
  const adults = people;

  return {
    // Booking.com
    bookingCom: `https://www.booking.com/searchresults.html?ss=${encodeURIComponent(destName)}&ssne=${encodeURIComponent(destName)}&ssne_untouched=${encodeURIComponent(destName)}&efdco=1&label=gen173nr-1FCAEoggI46AdIM1gEaFCIAQGYAQm4ARfIAQzYAQPoAQH4AQKIAgGoAgO4AqDj-6wGwAIB0gIkZjk4ZjI0ZjItNzA5Ny00YTY5LWE5ZTAtYzI0ZjI0ZjI0ZjI42AIF4AIB&aid=304142&ss_raw=${encodeURIComponent(destName)}&checkin=${checkin}&checkout=${checkout}&group_adults=${adults}&no_rooms=1&group_children=0`,
    
    // Hotels.com
    hotels: `https://www.hotels.com/search.do?destination=${encodeURIComponent(destName)}&startDate=${checkin}&endDate=${checkout}&rooms=1&adults=${adults}&children=0`,
    
    // Airbnb
    airbnb: `https://www.airbnb.com/s/${encodeURIComponent(destName)}/homes?checkin=${checkin}&checkout=${checkout}&adults=${adults}&children=0&infants=0&pets=0`,
    
    // Agoda
    agoda: `https://www.agoda.com/search?ss=${encodeURIComponent(destName)}&checkin=${checkin}&checkout=${checkout}&rooms=1&adults=${adults}&children=0`,
    
    // Trivago
    trivago: `https://www.trivago.com/?aDateRange.checkInDate=${checkin}&aDateRange.checkOutDate=${checkout}&aPriceRange.max=&aPriceRange.min=&aRoomConfig.nAdults=${adults}&aRoomConfig.nChildren=0&aRoomConfig.nRooms=1&sSearchBoxInput=${encodeURIComponent(destName)}`,
  };
};

// Generate car rental booking links
export const generateCarRentalLinks = (params: BookingParams): CarRentalLinks => {
  const { destination, departureDate, returnDate, people } = params;
  
  const destName = destination.trim();
  const pickupDate = formatDateForUrl(departureDate);
  const dropoffDate = formatDateForUrl(returnDate);
  const drivers = people;

  // Extract day, month, year for some services
  const [year, month, day] = pickupDate.split('-');
  const [retYear, retMonth, retDay] = dropoffDate.split('-');

  return {
    // Rental Cars
    rentalCars: `https://www.rentalcars.com/SearchResults?dropCity=${encodeURIComponent(destName)}&puDay=${day}&puMonth=${month}&puYear=${year}&doDay=${retDay}&doMonth=${retMonth}&doYear=${retYear}&drivers=${drivers}`,
    
    // Enterprise
    enterprise: `https://www.enterprise.com/en/car-rental/locations/${encodeURIComponent(destName.toLowerCase().replace(/\s+/g, '-'))}.html?pickupDate=${pickupDate}&dropoffDate=${dropoffDate}&pickupTime=1000&dropoffTime=1000&numDrivers=${drivers}`,
    
    // Hertz
    hertz: `https://www.hertz.com/rentacar/reservation/index.jsp?targetPage=searchCars.jsp&pickupLocation=${encodeURIComponent(destName)}&pickupDate=${pickupDate}&dropoffDate=${dropoffDate}&numDrivers=${drivers}`,
    
    // Avis
    avis: `https://www.avis.com/en/reservations/home?pickupLocation=${encodeURIComponent(destName)}&pickupDate=${pickupDate}&dropoffDate=${dropoffDate}&numDrivers=${drivers}`,
    
    // Budget
    budget: `https://www.budget.com/en/reservations/home?pickupLocation=${encodeURIComponent(destName)}&pickupDate=${pickupDate}&dropoffDate=${dropoffDate}&numDrivers=${drivers}`,
  };
};

// Generate all booking links
export const generateAllBookingLinks = (params: BookingParams): BookingLinks => {
  const flights = generateFlightLinks(params);
  const hotels = generateHotelLinks(params);
  const carRental = params.rentCar ? generateCarRentalLinks(params) : undefined;

  return {
    flights,
    hotels,
    ...(carRental && { carRental }),
  };
};

// Format links for display
export const formatBookingLinksForDisplay = (links: BookingLinks): string => {
  let output = '';

  output += '✈️ FLIGHT BOOKING LINKS\n';
  output += `• Google Flights: ${links.flights.googleFlights}\n`;
  output += `• Kayak: ${links.flights.kayak}\n`;
  output += `• Skyscanner: ${links.flights.skyscanner}\n`;
  output += `• Expedia: ${links.flights.expedia}\n`;
  output += `• Booking.com: ${links.flights.booking}\n\n`;

  output += '🏨 HOTEL BOOKING LINKS\n';
  output += `• Booking.com: ${links.hotels.bookingCom}\n`;
  output += `• Hotels.com: ${links.hotels.hotels}\n`;
  output += `• Airbnb: ${links.hotels.airbnb}\n`;
  output += `• Agoda: ${links.hotels.agoda}\n`;
  output += `• Trivago: ${links.hotels.trivago}\n`;

  if (links.carRental) {
    output += '\n🚗 CAR RENTAL BOOKING LINKS\n';
    output += `• Rental Cars: ${links.carRental.rentalCars}\n`;
    output += `• Enterprise: ${links.carRental.enterprise}\n`;
    output += `• Hertz: ${links.carRental.hertz}\n`;
    output += `• Avis: ${links.carRental.avis}\n`;
    output += `• Budget: ${links.carRental.budget}\n`;
  }

  return output;
};