import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UniversityDetail from "./Components/UniversityDetails/UniversityDetail";
import { useUniversities } from "./controller-hooks/useUniversities";
import UniversityList from "./Components/universityList/UniversityList";

const App = () => {
  const { universities, loading, error, handleDeleteUniversity } =
    useUniversities("United Arab Emirates");
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <UniversityList
              universities={universities}
              onDelete={handleDeleteUniversity}
            />
          }
        />
        <Route
          path="/university/:name"
          element={<UniversityDetail universities={universities} />}
        />
      </Routes>
    </Router>
  );
};

export default App;
