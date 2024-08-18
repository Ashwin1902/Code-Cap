import { useState, useEffect } from 'react';
import Card from './FeaturedCard';

// Define an interface for the card data
interface CardData {
  id: string;
  Image: string;
  Name: string;
  Mode: string;
  lastDate: string;
  teamSize: number;
  URI: string;
}

function Hackathons() {
  const [cardsData, setCardsData] = useState<CardData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDefaultProfiles = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/events/getAllEvents`, {
          credentials: "include",
        });
        if (response.ok) {
          const data: CardData[] = await response.json();
          const formattedData = data.map(card => ({
            ...card,
            lastDate: new Date(card.lastDate).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })
          }));
          setCardsData(formattedData);
        } else {
          console.error("Failed to fetch default profiles", response);
        }
      } catch (error) {
        console.error("An error occurred:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDefaultProfiles();
  }, []);

  return (
    <div className='bg-black flex justify-center flex-col items-center min-h-screen px-auto py-16'>
      <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600 mb-4">
            HACKATHON ALERTS
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Discover upcoming hackathons and unleash your coding potential.
          </p>
      </div>
      {
        isLoading? (
          <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-yellow-500"></div>
        </div>
        ) : (
          <div className="w-full md:w-3/4 px-4 md:px-0 space-y-6">
            {cardsData.map((card) => (
              <Card
                key={card.id}
                imageUrl={card.Image}
                name={card.Name}
                mode={card.Mode}
                date={card.lastDate}
                teamSize={card.teamSize}
                hackURL={card.URI}
              />
            ))}
          </div>
        )
      }
      
      {!isLoading && cardsData.length === 0 && (
          <p className="text-center text-gray-400 mt-8">No hackathons available at the moment. Check back later!</p>
        )}
    </div>
  );
}

export default Hackathons;