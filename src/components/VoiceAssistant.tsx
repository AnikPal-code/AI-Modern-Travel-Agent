import { useState, useRef, useEffect } from 'react';
import './VoiceAssistant.css';

interface VoiceAssistantProps {
  onFormDataUpdate: (data: Partial<FormData>) => void;
  onStartVoiceMode: () => void;
  onEndVoiceMode: () => void;
}

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

export default function VoiceAssistant({ onFormDataUpdate, onStartVoiceMode, onEndVoiceMode }: VoiceAssistantProps) {
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [voiceMode, setVoiceMode] = useState(false);
  const [debugInfo, setDebugInfo] = useState('');
  
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const synthRef = useRef<SpeechSynthesis | null>(null);

  const questions = [
    "Hi there! I'm your AI travel assistant. I'm excited to help you plan your trip! Where would you like to travel to?",
    "That sounds amazing! Which city or airport will you be departing from?",
    "Perfect! When would you like to start your journey? Please tell me your departure date.",
    "Great! And when would you like to return home?",
    "Wonderful! How many people will be traveling together?",
    "Thanks! What's your approximate budget for flights? You can say something like 'five hundred dollars' or 'one thousand'.",
    "Perfect! And what's your budget for accommodation per night? Again, just give me a rough number.",
    "Excellent! Now tell me about your travel style. Are you looking for relaxation, adventure, cultural experiences, or something else?",
    "Almost done! Would you prefer direct flights only, or are you okay with connections?",
    "Last question! Would you like to rent a car at your destination?"
  ];

  useEffect(() => {
    // Initialize Speech Recognition
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        console.log('Speech recognized:', transcript);
        setTranscript(transcript);
        setIsListening(false);
        setDebugInfo(`Heard: "${transcript}"`);
        handleVoiceInput(transcript);
      };

      recognitionRef.current.onend = () => {
        console.log('Speech recognition ended');
        setIsListening(false);
        setDebugInfo('Speech recognition ended');
      };

      recognitionRef.current.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
        setDebugInfo(`Error: ${event.error}`);
        
        if (event.error === 'not-allowed') {
          alert('Microphone access denied. Please allow microphone access and try again.');
        } else if (event.error === 'no-speech') {
          console.log('No speech detected, trying again...');
          setDebugInfo('No speech detected - please try speaking louder');
          // If there's an error, try to continue the conversation
          if (voiceMode && currentQuestion < questions.length) {
            setTimeout(() => {
              speak("I didn't hear anything. Could you please try speaking again?");
            }, 1000);
          }
        } else {
          // If there's an error, try to continue the conversation
          if (voiceMode && currentQuestion < questions.length) {
            setTimeout(() => {
              speak("I didn't catch that. Could you please repeat?");
            }, 1000);
          }
        }
      };

      recognitionRef.current.onstart = () => {
        console.log('Speech recognition started');
        setIsListening(true);
        setDebugInfo('Listening... Please speak now');
      };
    }

    // Initialize Speech Synthesis
    synthRef.current = window.speechSynthesis;

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      if (synthRef.current) {
        synthRef.current.cancel();
      }
    };
  }, [voiceMode, currentQuestion]);

  const speak = (text: string) => {
    if (synthRef.current) {
      synthRef.current.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
      utterance.pitch = 1;
      utterance.volume = 0.8;
      
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => {
        setIsSpeaking(false);
        // Auto-start listening after speaking (natural conversation flow)
        setTimeout(() => {
          if (voiceMode && currentQuestion < questions.length) {
            startListening();
          }
        }, 800);
      };
      
      synthRef.current.speak(utterance);
    }
  };

  const startListening = () => {
    if (recognitionRef.current && !isListening && !isSpeaking) {
      console.log('Starting to listen...');
      setIsListening(true);
      setTranscript('');
      
      try {
        recognitionRef.current.start();
      } catch (error) {
        console.error('Error starting speech recognition:', error);
        setIsListening(false);
        alert('Could not start speech recognition. Please check your microphone permissions.');
      }
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  const handleVoiceInput = (input: string) => {
    const lowerInput = input.toLowerCase();
    
    switch (currentQuestion) {
      case 0: // Destination
        onFormDataUpdate({ destination: input });
        nextQuestion();
        break;
      case 1: // Departure city
        onFormDataUpdate({ departureCity: input });
        nextQuestion();
        break;
      case 2: // Departure date
        const depDate = parseDate(input);
        if (depDate) {
          onFormDataUpdate({ departureDate: depDate });
          nextQuestion();
        } else {
          speak("I didn't catch that date. Please say it again, like 'December 25th 2024' or 'January 1st 2025'");
        }
        break;
      case 3: // Return date
        const retDate = parseDate(input);
        if (retDate) {
          onFormDataUpdate({ returnDate: retDate });
          nextQuestion();
        } else {
          speak("I didn't catch that date. Please say it again, like 'January 5th 2025'");
        }
        break;
      case 4: // Number of people
        const people = extractNumber(input);
        if (people) {
          onFormDataUpdate({ people: people.toString() });
          nextQuestion();
        } else {
          speak("How many people will be traveling? Please say a number like 'two' or 'four'.");
        }
        break;
      case 5: // Flight budget
        const flightBudget = extractNumber(input);
        if (flightBudget) {
          onFormDataUpdate({ flightBudget: flightBudget.toString() });
          nextQuestion();
        } else {
          speak("What's your flight budget? Please say a number like 'five hundred' or '1000'.");
        }
        break;
      case 6: // Accommodation budget
        const accomBudget = extractNumber(input);
        if (accomBudget) {
          onFormDataUpdate({ accomBudget: accomBudget.toString() });
          nextQuestion();
        } else {
          speak("What's your accommodation budget per night? Please say a number like 'one hundred' or '200'.");
        }
        break;
      case 7: // Preferences
        onFormDataUpdate({ preferences: input });
        nextQuestion();
        break;
      case 8: // Direct flights
        const directFlights = lowerInput.includes('yes') || lowerInput.includes('direct');
        onFormDataUpdate({ directFlights });
        nextQuestion();
        break;
      case 9: // Rent car
        const rentCar = lowerInput.includes('yes') || lowerInput.includes('rent');
        onFormDataUpdate({ rentCar });
        speak("Perfect! I have all the information I need. Let me create your travel plan now.");
        endVoiceMode();
        break;
    }
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      const next = currentQuestion + 1;
      setCurrentQuestion(next);
      setTimeout(() => {
        speak(questions[next]);
      }, 500);
    }
  };

  const parseDate = (input: string): string | null => {
    const lowerInput = input.toLowerCase();
    
    // Handle relative dates
    if (lowerInput.includes('tomorrow')) {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      return tomorrow.toISOString().split('T')[0];
    }
    
    if (lowerInput.includes('next week')) {
      const nextWeek = new Date();
      nextWeek.setDate(nextWeek.getDate() + 7);
      return nextWeek.toISOString().split('T')[0];
    }
    
    // Handle "December 25" or "December 25th"
    const monthDayRegex = /(\w+)\s+(\d{1,2})(?:st|nd|rd|th)?(?:\s+(\d{4}))?/i;
    const match = input.match(monthDayRegex);
    
    if (match) {
      const [, month, day, year] = match;
      const monthMap: Record<string, string> = {
        january: '01', jan: '01', february: '02', feb: '02', march: '03', mar: '03',
        april: '04', apr: '04', may: '05', june: '06', jun: '06',
        july: '07', jul: '07', august: '08', aug: '08', september: '09', sep: '09',
        october: '10', oct: '10', november: '11', nov: '11', december: '12', dec: '12'
      };
      
      const monthNum = monthMap[month.toLowerCase()];
      if (monthNum) {
        const currentYear = new Date().getFullYear();
        const useYear = year || currentYear.toString();
        return `${useYear}-${monthNum}-${day.padStart(2, '0')}`;
      }
    }
    
    // Handle numeric dates like "12/25" or "25/12"
    const numericRegex = /(\d{1,2})[\/\-](\d{1,2})(?:[\/\-](\d{2,4}))?/;
    const numMatch = input.match(numericRegex);
    
    if (numMatch) {
      const [, first, second, year] = numMatch;
      const currentYear = new Date().getFullYear();
      const useYear = year ? (year.length === 2 ? `20${year}` : year) : currentYear.toString();
      
      // Assume MM/DD format for US users, but could be enhanced
      return `${useYear}-${first.padStart(2, '0')}-${second.padStart(2, '0')}`;
    }
    
    return null;
  };

  const extractNumber = (input: string): number | null => {
    // Handle both written numbers and digits
    const numberWords: Record<string, number> = {
      'one': 1, 'two': 2, 'three': 3, 'four': 4, 'five': 5,
      'six': 6, 'seven': 7, 'eight': 8, 'nine': 9, 'ten': 10,
      'eleven': 11, 'twelve': 12, 'thirteen': 13, 'fourteen': 14, 'fifteen': 15,
      'sixteen': 16, 'seventeen': 17, 'eighteen': 18, 'nineteen': 19, 'twenty': 20,
      'hundred': 100, 'thousand': 1000
    };

    const lowerInput = input.toLowerCase();
    
    // First try to find written numbers
    for (const [word, num] of Object.entries(numberWords)) {
      if (lowerInput.includes(word)) {
        // Handle compound numbers like "five hundred"
        if (word === 'hundred' && lowerInput.includes('five hundred')) return 500;
        if (word === 'hundred' && lowerInput.includes('one hundred')) return 100;
        if (word === 'hundred' && lowerInput.includes('two hundred')) return 200;
        if (word === 'hundred' && lowerInput.includes('three hundred')) return 300;
        if (word === 'thousand' && lowerInput.includes('one thousand')) return 1000;
        if (word === 'thousand' && lowerInput.includes('two thousand')) return 2000;
        return num;
      }
    }
    
    // Then try to find digits
    const numbers = input.match(/\d+/);
    return numbers ? parseInt(numbers[0]) : null;
  };

  const startVoiceMode = async () => {
    // Request microphone permission first
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });
      console.log('Microphone permission granted');
      
      setVoiceMode(true);
      setCurrentQuestion(0);
      onStartVoiceMode();
      speak(questions[0]);
    } catch (error) {
      console.error('Microphone permission denied:', error);
      alert('Microphone access is required for voice conversation. Please allow microphone access and try again.');
    }
  };

  const endVoiceMode = () => {
    setVoiceMode(false);
    setCurrentQuestion(0);
    setIsListening(false);
    setIsSpeaking(false);
    onEndVoiceMode();
    if (synthRef.current) {
      synthRef.current.cancel();
    }
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
  };

  if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
    return (
      <div className="voice-assistant-error">
        <h3>🎤 Voice Features Not Supported</h3>
        <p>Voice features require Chrome, Edge, or Safari browser.</p>
        <p>Current browser: {navigator.userAgent.includes('Chrome') ? 'Chrome' : 
                            navigator.userAgent.includes('Safari') ? 'Safari' : 
                            navigator.userAgent.includes('Edge') ? 'Edge' : 'Unknown'}</p>
        <p>Please switch to a supported browser to use voice planning.</p>
      </div>
    );
  }

  return (
    <div className="voice-assistant">
      {!voiceMode ? (
        <div className="voice-start-section">
          <button className="voice-start-btn" onClick={startVoiceMode}>
            🎤 Start Voice Conversation
          </button>
          <p className="voice-description">
            Have a natural conversation with our AI assistant to plan your trip
          </p>
        </div>
      ) : (
        <div className="voice-conversation">
          <div className="conversation-header">
            <h3>🤖 AI Travel Assistant</h3>
            <button onClick={endVoiceMode} className="end-conversation">
              End Conversation
            </button>
          </div>
          
          <div className="conversation-status">
            <div className={`status-indicator ${isListening ? 'listening' : isSpeaking ? 'speaking' : 'thinking'}`}>
              <div className="pulse-ring"></div>
              <div className="status-icon">
                {isListening ? '👂' : isSpeaking ? '🗣️' : '🤔'}
              </div>
            </div>
            <div className="status-text">
              {isListening ? 'I\'m listening... Please speak now' : 
               isSpeaking ? 'Speaking...' : 
               'Ready to listen'}
            </div>
            
            {/* Manual listening button as fallback */}
            {!isListening && !isSpeaking && (
              <button 
                className="manual-listen-btn" 
                onClick={startListening}
                title="Click if automatic listening doesn't work"
              >
                🎤 Click to Speak
              </button>
            )}
          </div>
          
          {transcript && (
            <div className="conversation-bubble user-bubble">
              <div className="bubble-content">
                <strong>You:</strong> "{transcript}"
              </div>
            </div>
          )}
          
          {/* Debug information */}
          {debugInfo && (
            <div className="debug-info">
              <small>Debug: {debugInfo}</small>
            </div>
          )}
          
          <div className="conversation-progress">
            <div className="progress-text">
              Question {currentQuestion + 1} of {questions.length}
            </div>
            <div className="progress-bar">
              <div 
                className="progress-fill" 
                style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}