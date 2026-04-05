interface TravelPlanRequest {
  destination: string;
  departureCity: string;
  departureDate: string;
  returnDate: string;
  people: string;
  tripType: string;
  budget: string;
  currency: string;
}

const itineraryTemplates: Record<string, string> = {
  beach: `Day 1: Arrival & Beach Relaxation
- Arrive at destination and check into beachfront hotel
- Relax on the pristine beach and enjoy sunset
- Dinner at local seafood restaurant

Day 2: Water Sports & Exploration
- Morning snorkeling or diving tour
- Lunch at beachside café
- Afternoon beach volleyball or paddleboarding
- Evening beach walk and local market visit

Day 3: Island Hopping
- Full day island hopping tour
- Visit multiple islands with swimming stops
- Picnic lunch on secluded beach
- Return for sunset dinner

Day 4: Spa & Wellness
- Morning yoga session on beach
- Spa treatment and massage
- Healthy lunch at wellness café
- Evening meditation and relaxation

Day 5: Local Culture & Departure
- Visit local temples or cultural sites
- Shopping at local markets
- Farewell dinner with local cuisine
- Departure`,

  adventure: `Day 1: Arrival & Orientation
- Arrive and settle into accommodation
- Meet adventure guide and safety briefing
- Evening hike to viewpoint

Day 2: Hiking & Trekking
- Full day guided hiking expedition
- Visit waterfalls and natural landmarks
- Packed lunch in nature
- Return for evening rest

Day 3: Rock Climbing or Zip-lining
- Professional rock climbing instruction
- Multiple climbing routes for different levels
- Lunch at mountain lodge
- Zip-line adventure through forest canopy

Day 4: Water Sports
- Whitewater rafting or kayaking
- Professional guides and safety equipment
- Riverside picnic
- Evening campfire

Day 5: Relaxation & Departure
- Optional light morning activity
- Spa treatment to recover
- Farewell dinner
- Departure`,

  city: `Day 1: City Exploration
- Arrive and check into central hotel
- Walking tour of historic district
- Dinner at famous local restaurant

Day 2: Museums & Culture
- Visit major museums and galleries
- Lunch at trendy café
- Shopping in famous markets
- Evening theater or concert

Day 3: Food Tour & Nightlife
- Guided food tour of local cuisine
- Visit street food markets
- Rooftop bar experience
- Late night dining

Day 4: Day Trip & Local Experiences
- Day trip to nearby attractions
- Visit local neighborhoods
- Interact with locals
- Evening cultural show

Day 5: Shopping & Departure
- Final shopping at local boutiques
- Farewell lunch
- Departure`,

  cultural: `Day 1: Historical Sites
- Arrive and visit main historical monuments
- Guided tour of ancient temples/ruins
- Traditional welcome dinner

Day 2: Cultural Immersion
- Visit local museums and heritage sites
- Attend cultural workshop (cooking, art, etc.)
- Lunch with local family
- Evening traditional performance

Day 3: Religious & Spiritual Sites
- Visit sacred temples and pilgrimage sites
- Participate in local rituals
- Meditation session
- Dinner with spiritual guide

Day 4: Local Traditions
- Visit traditional markets
- Learn traditional crafts
- Participate in local festivals if available
- Evening cultural exchange

Day 5: Reflection & Departure
- Morning meditation
- Visit final cultural site
- Farewell ceremony
- Departure`,
};

export async function generateTravelItinerary(data: TravelPlanRequest): Promise<string> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1500));

  const tripType = data.tripType.toLowerCase();
  const template = itineraryTemplates[tripType] || itineraryTemplates.city;

  const nights = data.returnDate && data.departureDate
    ? Math.ceil((new Date(data.returnDate).getTime() - new Date(data.departureDate).getTime()) / (1000 * 60 * 60 * 24))
    : 5;

  const itinerary = `
PERSONALIZED TRAVEL ITINERARY
========================================

Trip Details:
- Destination: ${data.destination}
- Departure from: ${data.departureCity}
- Duration: ${nights} nights
- Travelers: ${data.people}
- Budget: ${data.currency} ${data.budget}
- Trip Type: ${data.tripType}

========================================

${template}

BUDGET BREAKDOWN
========================================
Flights: ${data.currency} ${Math.round(Number(data.budget) * 0.4)}
Accommodation: ${data.currency} ${Math.round(Number(data.budget) * 0.35)}
Food & Dining: ${data.currency} ${Math.round(Number(data.budget) * 0.15)}
Activities & Tours: ${data.currency} ${Math.round(Number(data.budget) * 0.1)}

TRAVEL TIPS
========================================
1. Book flights in advance for better rates
2. Check visa requirements before traveling
3. Get travel insurance for peace of mind
4. Download offline maps of the destination
5. Learn basic phrases in local language
6. Keep copies of important documents
7. Inform your bank about travel dates
8. Pack light and bring essentials only

SAFETY & HEALTH
========================================
- Check health requirements and vaccinations
- Carry travel insurance documents
- Keep emergency contacts handy
- Stay aware of local customs and laws
- Use registered taxis or ride-sharing apps
- Avoid traveling alone at night
- Keep valuables secure

PACKING CHECKLIST
========================================
- Passport and travel documents
- Travel insurance documents
- Medications and first aid kit
- Comfortable walking shoes
- Weather-appropriate clothing
- Sunscreen and hat
- Phone charger and power bank
- Travel adapter
- Camera or smartphone
- Reusable water bottle

BEST TIME TO VISIT
========================================
- Research peak and off-season times
- Consider weather patterns
- Check for local festivals and events
- Book accommodations early during peak season
- Enjoy lower prices during off-season

Have a wonderful trip!
`;

  return itinerary;
}

export async function generateActivitySuggestions(destination: string, tripType: string): Promise<string[]> {
  const suggestions: Record<string, string[]> = {
    beach: [
      `Snorkeling or diving tour in ${destination}`,
      `Sunset cruise along ${destination} coast`,
      `Beach volleyball and water sports`,
      `Local seafood market tour and cooking class`,
      `Island hopping adventure from ${destination}`,
    ],
    adventure: [
      `Hiking expedition in ${destination} mountains`,
      `Rock climbing or zip-lining experience`,
      `Whitewater rafting adventure`,
      `Mountain biking trails`,
      `Camping under the stars`,
    ],
    city: [
      `Walking tour of historic ${destination}`,
      `Museum and gallery hopping`,
      `Street food tour and local cuisine`,
      `Rooftop bar and nightlife experience`,
      `Shopping at famous markets and boutiques`,
    ],
    cultural: [
      `Visit ancient temples and historical sites`,
      `Traditional cooking class`,
      `Local craft workshop`,
      `Attend cultural festival or performance`,
      `Meet with local artisans and craftspeople`,
    ],
  };

  return suggestions[tripType.toLowerCase()] || suggestions.city;
}
