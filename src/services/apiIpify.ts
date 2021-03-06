import axios from "axios";

const API_KEY = process.env.REACT_APP_IPIFY_API;

type IpifyResponse = {
  ip: string;
  location: {
    country: string;
    region: string;
    city: string;
    postalCode: string;
    timezone: string;
    lat: number;
    lng: number;
  };
  isp: string;
};

// check if user input it's a IP address
function validateIpAddress(ipAddress: string): boolean {
  return (
    /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(
      ipAddress
    )
  )
}

export async function getLocation(search: string) {
  let url = 'https://geo.ipify.org/api/v1?apiKey=${API_KEY}&';
  
  // search according to input type
  if (validateIpAddress(search)) {
    url += `ipAddress=${search}`;
  } else {
    url += `domain=${search}`;
  }
  
  const apiResponse = await axios.get(url);
  const result: IpifyResponse = apiResponse.data;

  return {
    ipAddress: result.ip,
    city: result.location.city,
    country: result.location.country,
    postalCode: result.location.postalCode,
    timezone: result.location.timezone,
    coordinates: [result.location.lat, result.location.lng],
    isp: result.isp,
  };
}
