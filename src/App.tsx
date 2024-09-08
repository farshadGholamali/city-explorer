import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Map from './components/Map';
import SearchBar from './components/SearchBar';
import CityInfo from './components/CityInfo';

interface City {
  name: string;
  country: string;
  population: number;
  lat: number;
  lng: number;
}

const fetchCityData = async (cityName: string): Promise<City> => {
  const response = await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${cityName}&key=5b806adc48044d549c70cbfb6d385636`);
  if (!response.ok) {
    throw new Error('Failed to fetch city data');
  }
  const data = await response.json();

  if (data.results.length === 0) {
    return Promise.reject(new Error('City not found'));
  }

  const result = data.results[0];
  return {
    name: result.components.city || result.components.town || result.components.village || cityName,
    country: result.components.country,
    population: result.annotations.population || 'N/A',
    lat: result.geometry.lat,
    lng: result.geometry.lng,
  };
};

function App() {
  const [cityName, setCityName] = useState<string>('');
  const { data: city, error, isLoading, refetch } = useQuery({
    queryKey: ['cityData', cityName],
    queryFn: () => fetchCityData(cityName),
    enabled: !!cityName,
    retry: false, 
  });

  useEffect(() => {
    if (cityName) {
      refetch();
    }
  }, [cityName, refetch]);


  const handleSearch = (cityName: string) => {
    setCityName(cityName);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <h1 className="text-4xl font-bold mb-5 text-center text-gray-800">City Explorer</h1>
          <SearchBar onSearch={handleSearch} />
          {isLoading && <p className="text-blue-500 mt-2">Loading...</p>}
          {error && <p className="text-red-500 mt-2">{error.message}</p>}
          {city && <CityInfo city={city} />}
          <Map city={city || null} />
        </div>
      </div>
    </div>
  );
}

export default App;
