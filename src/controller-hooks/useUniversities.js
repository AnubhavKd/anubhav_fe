import { useState, useEffect } from "react";
import { fetchUniversities } from "../services/universityService";
export const useUniversities = (country) => {
  const [universities, setUniversities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const getUniversities = async () => {
      try {
        setLoading(true);
        const data = await fetchUniversities(country);
        setUniversities(data);
        setError(null);
        localStorage.setItem("universities", JSON.stringify(data));
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    const storedUniversities = localStorage.getItem("universities");
    if (storedUniversities) {
      setUniversities(JSON.parse(storedUniversities));
      setLoading(false);
    } else {
      getUniversities();
    }
  }, [country]);
  const handleDeleteUniversity = (universityName) => {
    const updatedUniversities = universities.filter(
      (uni) => uni.name !== universityName
    );
    setUniversities(updatedUniversities);
    localStorage.setItem("universities", JSON.stringify(updatedUniversities));
  };
  return { universities, loading, error, handleDeleteUniversity };
};
