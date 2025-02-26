import { Routes, Route } from 'react-router-dom'
import { Home } from './pages/Home'
import { ErrorPage } from './pages/ErrorPage'
import { DisplayChart } from './pages/DisplayChart'
import { Sidebar } from './components/Sidebar'
import { useEffect } from 'react';
import { addSensorData } from './slices/chartsSlice'
import { useDispatch } from 'react-redux'
import type { AppDispatch } from './store'

function App() {
	const dispatch = useDispatch<AppDispatch>();
  
    // Fetch the data from json file
    useEffect(() => {
      fetch("/dataseries.json")
        .then((response) => response.json())
        .then((data) => {
          dispatch(addSensorData(data))
      })
      .catch((error) => console.error("Error fetching dataseries:", error))
    }, []);

  return (
    <div>
       <Sidebar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/displaychart" element={<DisplayChart />} />
        <Route path="/*" element={<ErrorPage />} />
      </Routes>
    </div>
  );
}

export default App;
