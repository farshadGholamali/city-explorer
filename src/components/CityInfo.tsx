interface CityInfoProps {
  city: {
    name: string;
    country: string;
    population: number;
  };
}

function CityInfo({ city }: CityInfoProps) {
  return (
    <div className="bg-gray-100 rounded-lg p-4 mb-4 shadow-md">
      <h2 className="text-2xl font-semibold text-gray-800 mb-2">{city.name}</h2>
      <p className="text-gray-600">Country: {city.country}</p>
      <p className="text-gray-600">Population: {city.population.toLocaleString()}</p>
    </div>
  );
}

export default CityInfo;