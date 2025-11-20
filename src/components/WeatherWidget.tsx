import { Cloud, Sun, CloudRain, CloudSnow, Wind } from 'lucide-react';
import { useEffect, useState } from 'react';

const WeatherWidget = () => {
  const [data, setData] = useState({
    temperature: 0,
    condition: '',
    location: '',
    humidity: 0,
    windSpeed: 0,
    icon: '',
    temperatureUnit: 'C',
    windSpeedUnit: 'm/s',
  });

  const [loading, setLoading] = useState(true);

  const getApproxLocation = async () => {
    const res = await fetch('https://ipwhois.app/json/');
    const data = await res.json();

    return {
      latitude: data.latitude,
      longitude: data.longitude,
      city: data.city,
    };
  };

  const getLocation = async (
    callback: (location: {
      latitude: number;
      longitude: number;
      city: string;
    }) => void,
  ) => {
    if (navigator.geolocation) {
      const result = await navigator.permissions.query({
        name: 'geolocation',
      });

      if (result.state === 'granted') {
        navigator.geolocation.getCurrentPosition(async (position) => {
          const res = await fetch(
            `https://api-bdc.io/data/reverse-geocode-client?latitude=${position.coords.latitude}&longitude=${position.coords.longitude}&localityLanguage=en`,
            {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
              },
            },
          );

          const data = await res.json();

          callback({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            city: data.locality,
          });
        });
      } else if (result.state === 'prompt') {
        callback(await getApproxLocation());
        navigator.geolocation.getCurrentPosition((position) => {});
      } else if (result.state === 'denied') {
        callback(await getApproxLocation());
      }
    } else {
      callback(await getApproxLocation());
    }
  };

  const updateWeather = async () => {
    getLocation(async (location) => {
      const res = await fetch(`/api/weather`, {
        method: 'POST',
        body: JSON.stringify({
          lat: location.latitude,
          lng: location.longitude,
          measureUnit: localStorage.getItem('measureUnit') ?? 'Metric',
        }),
      });

      const data = await res.json();

      if (res.status !== 200) {
        console.error('Error fetching weather data');
        setLoading(false);
        return;
      }

      setData({
        temperature: data.temperature,
        condition: data.condition,
        location: location.city,
        humidity: data.humidity,
        windSpeed: data.windSpeed,
        icon: data.icon,
        temperatureUnit: data.temperatureUnit,
        windSpeedUnit: data.windSpeedUnit,
      });
      setLoading(false);
    });
  };

  useEffect(() => {
    updateWeather();
    const intervalId = setInterval(updateWeather, 30 * 1000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="glass-strong rounded-2xl sm:rounded-3xl liquid-border shadow-xl shadow-black/50 flex flex-row items-center w-full h-20 sm:h-24 min-h-[80px] sm:min-h-[96px] max-h-[80px] sm:max-h-[96px] px-2.5 sm:px-3 py-2 gap-2 sm:gap-3 hover:border-white/20 smooth-transition active:scale-[0.98]">
      {loading ? (
        <>
          <div className="flex flex-col items-center justify-center w-12 sm:w-16 min-w-12 sm:min-w-16 max-w-12 sm:max-w-16 h-full animate-pulse">
            <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-full glass mb-1 sm:mb-2" />
            <div className="h-3 w-8 sm:h-4 sm:w-10 rounded glass" />
          </div>
          <div className="flex flex-col justify-between flex-1 h-full py-1 animate-pulse">
            <div className="flex flex-row items-center justify-between">
              <div className="h-2.5 sm:h-3 w-16 sm:w-20 rounded glass" />
              <div className="h-2.5 sm:h-3 w-10 sm:w-12 rounded glass" />
            </div>
            <div className="h-2.5 sm:h-3 w-12 sm:w-16 rounded glass mt-1" />
            <div className="flex flex-row justify-between w-full mt-auto pt-1 border-t border-white/10">
              <div className="h-2.5 sm:h-3 w-12 sm:w-16 rounded glass" />
              <div className="h-2.5 sm:h-3 w-6 sm:w-8 rounded glass" />
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="flex flex-col items-center justify-center w-12 sm:w-16 min-w-12 sm:min-w-16 max-w-12 sm:max-w-16 h-full">
            <img
              src={`/weather-ico/${data.icon}.svg`}
              alt={data.condition}
              className="h-8 w-auto sm:h-10"
            />
            <span className="text-sm sm:text-base font-semibold text-white">
              {data.temperature}°{data.temperatureUnit}
            </span>
          </div>
          <div className="flex flex-col justify-between flex-1 h-full py-1.5 sm:py-2">
            <div className="flex flex-row items-center justify-between">
              <span className="text-xs sm:text-sm font-semibold text-white truncate">
                {data.location}
              </span>
              <span className="flex items-center text-[10px] sm:text-xs text-white/60 font-medium ml-2">
                <Wind className="w-2.5 h-2.5 sm:w-3 sm:h-3 mr-0.5 sm:mr-1" />
                {data.windSpeed} {data.windSpeedUnit}
              </span>
            </div>
            <span className="text-[10px] sm:text-xs text-white/50 italic truncate">
              {data.condition}
            </span>
            <div className="flex flex-row justify-between w-full mt-auto pt-1.5 sm:pt-2 border-t border-white/10 text-[10px] sm:text-xs text-white/50 font-medium">
              <span>Humidity {data.humidity}%</span>
              <span className="font-semibold text-white/70">
                Now
              </span>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default WeatherWidget;
