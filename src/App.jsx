import React, { useEffect, useState } from "react";
import axios from "axios";
import { ReplaceAll, Target } from "lucide";

const App = () => {
  const [fact, setFact] = useState("");
  const api = import.meta.env.VITE_API_KEY;

  const getFact = async () => {
    const res = await axios.get(
      "https://uselessfacts.jsph.pl/api/v2/facts/random?language=en"
    );

    const rawFact = res.data.text;
    const options = {
      method: "POST",
      url: "https://google-translate113.p.rapidapi.com/api/v1/translator/text",
      headers: {
        "x-rapidapi-key": api,
        "x-rapidapi-host": "google-translate113.p.rapidapi.com",
        "Content-Type": "application/json",
      },
      data: {
        from: "en",
        to: "id",
        text: rawFact,
      },
    };
    const trans = await axios.request(options);

    setFact(trans.data.trans);
  };

  useEffect(() => {
    getFact();
  }, []);
  return (
    <main>
      <p>{fact}</p>
    </main>
  );
};

export default App;
