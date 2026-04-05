import Groq from 'groq-sdk';

const groqApiKey = import.meta.env.VITE_GROQ_API_KEY;

if (!groqApiKey) {
  console.warn('Groq API key is not configured. Please add VITE_GROQ_API_KEY to .env.local');
}

const groq = new Groq({
  apiKey: groqApiKey,
  dangerouslyAllowBrowser: true,
});

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

export async function generateTravelItinerary(data: TravelPlanRequest): Promise<string> {
  try {
    if (!groqApiKey) {
      throw new Error('Groq API key is not configured. Please add VITE_GROQ_API_KEY to .env.local');
    }

    const nights = data.returnDate && data.departureDate
      ? Math.ceil((new Date(data.returnDate).getTime() - new Date(data.departureDate).getTime()) / (1000 * 60 * 60 * 24))
      : 'Not specified';

    const prompt = `You are a professional AI travel planner. Your goal is to create a realistic, structured, and helpful travel itinerary.

STRICT RULES:
- Do NOT hallucinate exact prices or availability
- Use realistic price ranges (in ${data.currency})
- Keep recommendations practical and achievable
- Do NOT be vague

ALWAYS INCLUDE THESE SECTIONS:

✈️ FLIGHT OPTIONS
- 2–3 realistic options
- Mention airlines, duration, and approximate price range

🏨 HOTEL RECOMMENDATIONS
- Budget, Mid-range, Luxury
- Include price per night and location type

📅 DAY-BY-DAY ITINERARY
- Clear daily plan for ${nights} days
- Include activities and timing suggestions

🚗 LOCAL TRANSPORT
- Best ways to travel locally

🍽 FOOD & EXPERIENCES
- Local dishes and places to try

💰 BUDGET BREAKDOWN
- Estimated costs for flights, hotels, food, activities

FORMAT:
- Use clean headings with emojis
- Use bullet points
- Make it easy to read
- Keep it concise but informative

USER DETAILS:
- Destination: ${data.destination}
- Departure City: ${data.departureCity}
- Travel Dates: ${data.departureDate} to ${data.returnDate} (${nights} nights)
- Number of Travelers: ${data.people}
- Budget: ${data.currency} ${data.budget}
- Preferences: ${data.tripType}

Create a comprehensive travel plan now:`;

    const message = await groq.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: 'You are a professional travel planner who creates realistic, detailed, and helpful travel itineraries. Always provide practical recommendations with realistic price ranges.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      model: 'llama-3.3-70b-versatile',
      max_tokens: 2048,
      temperature: 0.7,
    });

    if (!message.choices[0].message.content) {
      throw new Error('Empty response from Groq API');
    }

    return message.choices[0].message.content;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error('Error generating itinerary:', errorMessage);
    throw new Error(`Failed to generate travel itinerary: ${errorMessage}`);
  }
}

export async function generateActivitySuggestions(destination: string, tripType: string): Promise<string[]> {
  try {
    if (!groqApiKey) {
      return [];
    }

    const prompt = `Suggest 5 unique activities for a ${tripType} trip to ${destination}. Return only the activities as a numbered list, one per line.`;

    const message = await groq.chat.completions.create({
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
      model: 'llama-3.3-70b-versatile',
      max_tokens: 256,
      temperature: 0.7,
    });

    if (!message.choices[0].message.content) {
      return [];
    }

    const generatedText = message.choices[0].message.content;

    return generatedText
      .split('\n')
      .filter(line => line.trim())
      .map(line => line.replace(/^\d+\.\s*/, '').trim())
      .filter(line => line.length > 0)
      .slice(0, 5);
  } catch (error) {
    console.error('Error generating activity suggestions:', error);
    return [];
  }
}
