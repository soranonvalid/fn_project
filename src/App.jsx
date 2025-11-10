/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import axios from "axios";
import FactText from "./components/text";
import { Check, Copy, StepForward, Moon, Sun } from "lucide-react";

const App = () => {
  const [fact, setFact] = useState("");
  const [origin, setOrigin] = useState("");
  const [trueFact, setTrueFact] = useState("");
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const target = ["id", "su", "jw"];
  const api = import.meta.env.VITE_RAPIDAPI_KEY;



  const getFact = async () => {
    setLoading(true);
    const rand = Math.floor(Math.random() * target.length);
    const targetTo = target[rand];

    try {
      // Ambil fakta acak dari uselessfacts API
      const res = await axios.get(
        "https://uselessfacts.jsph.pl/api/v2/facts/random?language=en"
      );

      const rawFact = res.data.text;

      // Endpoint & body yang benar untuk Google Translate 113 di RapidAPI
      const options = {
        method: "POST",
        url: "https://google-translate113.p.rapidapi.com/api/v1/translator/text",
        headers: {
          "content-type": "application/json",
          "x-rapidapi-key": api,
          "x-rapidapi-host": "google-translate113.p.rapidapi.com",
        },
        data: {
          from: "en",
          to: targetTo,
          text: rawFact,
        },
      };

      const trans = await axios.request(options);
      setFact(trans.data.trans);
      setTrueFact(rawFact);
      setOrigin(targetTo);
    } catch (err) {
      console.error("Error fetching fact:", err);
    } finally {
      setLoading(false);
    }
  };


  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(fact);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      console.error("Clipboard copy failed:", err);
    }
  };

  useEffect(() => {
    getFact();
  }, []);

  return (
    <main
      className={`h-screen w-screen flex flex-col sm:px-20 px-4 gap-20 justify-center items-center transition-colors duration-500 ${
        darkMode ? "bg-[#1e1e1e] text-[#f5f5f5]" : "bg-[#f1f1f1] text-[#2E2E2E]"
      }`}
    >
      <section
        className={`relative w-full max-w-[600px] flex items-center justify-between sm:justify-center p-4 rounded-2xl shadow-md transition-all duration-300 ${
          darkMode ? "bg-[#2b2b2b]" : "bg-white"
        }`}
      >
        <p className="playfair font-semibold text-xl tracking-wide drop-shadow-sm hover:scale-105 transition-transform duration-300 select-none">
          Fakta Nguwawur
        </p>


        <button
          type="button"
          onClick={() => setDarkMode((prev) => !prev)}
          className="absolute right-4 p-2 cursor-pointer"
          aria-label="Toggle dark mode"
        >
          {darkMode ? <Sun size={22} /> : <Moon size={22} />}
        </button>
      </section>


      <div className="max-w-[500px] w-full h-[500px] relative">
        <div className={`w-full h-full rounded-2xl shadow-lg z-0`} />
        <div
          className={`w-full h-full rounded-2xl shadow-xl absolute sm:top-[5%] sm:left-[5%] top-[1%] left-[1%] p-10 z-10 transition-colors duration-500 ${
            darkMode ? "bg-[#2b2b2b]" : "bg-white"
          }`}
        >
          <div className="relative w-full h-full">
            <img
              height={200}
              width={200}
              src="/logo.svg"
              alt="Logo"
              className={`absolute transition-all duration-500 inset-0 m-auto z-0 animate-bounce-slow select-none ${
                darkMode ? "opacity-35" : "opacity-15"
              }`}
            />
            <div className="relative z-10">
              <FactText fact={fact} trueFact={trueFact} loading={loading} />
            </div>
          </div>
        </div>
      </div>


      <section
        className={`w-full max-w-[600px] flex items-center justify-between p-4 rounded-2xl shadow-md transition-colors duration-500 ${
          darkMode ? "bg-[#2b2b2b]" : "bg-white"
        }`}
      >
        <div className="relative flex items-center">
          <button
            type="button"
            disabled={loading}
            onClick={handleCopy}
            className={`smooth ${
              loading
                ? "opacity-35 cursor-not-allowed"
                : "opacity-100 cursor-pointer"
            }`}
            aria-label="Copy fact"
          >
            {copied ? <Check /> : <Copy />}
          </button>
          <p
            className={`playfair smooth text-sm font-light absolute top-1/2 -translate-y-1/2 left-[150%] text-[#4A7856] ${
              copied
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-[30%]"
            }`}
          >
            Copied!
          </p>
        </div>

        <p
          className={`playfair font-semibold ${
            loading ? "opacity-0" : "opacity-100"
          }`}
        >
          {origin === "id" ? "indonesia" : origin === "su" ? "sunda" : "jawa"}
        </p>


        <div className="relative flex items-center">
          <p
            className={`playfair smooth text-sm font-light absolute top-1/2 -translate-y-1/2 right-[150%] text-[#4A7856] ${
              loading
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-[30%]"
            }`}
          >
            Loading
          </p>
          <button
            type="button"
            onClick={getFact}
            disabled={loading}
            className={`smooth ${
              loading
                ? "opacity-35 cursor-not-allowed"
                : "opacity-100 cursor-pointer"
            }`}
            aria-label="Next fact"
          >
            <StepForward />
          </button>
        </div>
      </section>
    </main>
  );
};

export default App;
