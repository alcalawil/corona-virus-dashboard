import React, { useEffect, useState } from "react";
import "./App.css";
import Stats from "./components/stats";
import Charts from "./components/charts";
import axios from "axios";

function App() {
  const [dailyStats, setDailyStats] = useState({});

  const fetchData = async () => {
    try {
      const response = await axios(
        "http://localhost:8080/https://argentina-covid19-data.now.sh/api/v0/daily"
      );

      // const {
      //   total_infections,
      //   total_deaths,
      //   new_cases,
      //   new_deaths,
      // } = response.data["2020-04-02"];

      const dailyStats = response.data["2020-04-02"];
      console.log("response", dailyStats);
      setDailyStats(dailyStats);
    } catch (err) {
      console.log(err.message);
    }
  };

  // setInterval(fetchData, 15000);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="App">
      <Stats stats={dailyStats} />
    </div>
  );
}

export default App;
