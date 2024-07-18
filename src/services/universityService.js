import axios from "axios";
const BASE_URL = "http://universities.hipolabs.com/search";
export const fetchUniversities = async (country) => {
  try {
    const response = await axios.get(
      `${BASE_URL}?country=${encodeURIComponent(country)}`
    );
    return response.data.map((university) => ({
      name: university.name,
      stateProvince: university["state-province"],
      domains: university.domains,
      web_pages: university.web_pages,
      country: university.country,
      alpha_two_code: university.alpha_two_code,
    }));
  } catch (error) {
    console.error("Error fetching universities:", error);
    throw error;
  }
};
