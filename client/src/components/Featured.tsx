import {useState,useEffect} from 'react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import FeaturedCard from './FeaturedCard'
import { Button } from './ui/button'


interface CardData {
  id: string;
  Image: string;
  Name: string;
  Mode: string;
  lastDate: string;
  teamSize: number;
  URI: string;
}

function Featured() {

  const [cardsData, setCardsData] = useState<CardData[]>([]);

  useEffect(() => {
    const fetchDefaultProfiles = async () => {
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
      } 
    };

    fetchDefaultProfiles();
  }, []);


 
  return (
    <div className="bg-black px-4 py-8 flex flex-col justify-center items-center">
      <h1 className="text-center text-white text-3xl md:text-6xl font-bold">FEATURED HACKATHON</h1>
      <div className="w-full md:w-3/4 py-10">
        <Carousel>
          <CarouselContent>
            {cardsData.map((card:any , index) => (
              <CarouselItem key={index}>
                <FeaturedCard 
                  imageUrl={card.Image}
                  name={card.Name}
                  mode={card.Mode}
                  date={card.lastDate}
                  teamSize={card.teamSize}
                  hackURL={card.hackURL}
                  // registrationPrice={card.registrationPrice}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
      <a href="/hackathons">
        <Button className="w-fit bg-yellow-500 border-black text-lg rounded-xl text-white font-semibold" variant={'outline'}>See More</Button>
      </a>
    </div>
  );
}

export default Featured;
