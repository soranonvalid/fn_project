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
  const [copied, setCopied] = useState("");
  const [darkMode, setDarkMode] = useState(false);
<<<<<<< HEAD
=======

>>>>>>> 4a9d88a051bb950804a25dda42562013e1cd9ad9
  const api = import.meta.env.VITE_API_KEY;
  const target = ["id", "su", "jw"];

  const getFact = async () => {
    setLoading(true);
    const rand = Math.floor(Math.random() * target.length);
    const targetTo = target[rand];
    try {
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
          to: targetTo,
          text: rawFact,
        },
      };
      try {
        const trans = await axios.request(options);
        setFact(trans.data.trans);
        setTrueFact(rawFact);
        setOrigin(targetTo);
      } catch (err) {
        console.error(err);
        return;
      }
    } catch (err) {
      console.error(err);
      return;
    } finally {
      console.log("fact fetched...");
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(fact);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  useEffect(() => {
    getFact();
  }, []);
<<<<<<< HEAD

  return (
    <main
      className={`h-screen w-screen flex flex-col sm:px-20 px-4 gap-20 justify-center items-center transition-colors duration-500 ${darkMode ? "bg-[#1e1e1e] text-[#f5f5f5]" : "bg-[#f1f1f1] text-[#2E2E2E]"
        }`}
    >
      {/* Header */}
      <section className="relative w-full max-w-[600px] flex items-center justify-center p-4 rounded-2xl shadow-md transition-all duration-300">
        <p className="font-alata font-semibold text-2xl tracking-wide drop-shadow-sm hover:scale-105 transition-transform duration-300">
          Fakta Nguwawur
        </p>

        {/* 🌓 Tombol Toggle Dark Mode di kanan */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="absolute right-4 p-2 rounded-full hover:scale-110 transition-all"
        >
          {darkMode ? <Sun size={22} /> : <Moon size={22} />}
        </button>
      </section>

      {/* Fact Card */}
      <div className="max-w-[500px] w-full h-[500px] relative">
        <div className="w-full h-full rounded-2xl shadow-lg z-0"></div>

        <div
          className={`w-full h-full rounded-2xl shadow-xl absolute sm:top-[5%] sm:left-[5%] top-[1%] left-[1%] p-10 z-10 transition-colors duration-500 ${darkMode ? "bg-[#2b2b2b]" : "bg-white"
            }`}
        >
          <div className="relative w-full h-full">
=======
  return (
    <main
      className={`h-screen w-screen flex flex-col sm:px-20 px-4 gap-20 justify-center items-center transition-all duration-500 ${
        darkMode ? "bg-[#121212] text-[#f1f1f1]" : "bg-[#f1f1f1] text-[#121212]"
      }`}
    >
      <section
        className={`w-full max-w-[600px] flex items-center justify-between p-4 rounded-2xl shadow-lg ${
          darkMode ? "bg-[#1e1e1e] border border-[#4a4a4a]" : "bg-card"
        }`}
      >
        <p className="playfair font-semibold text-xl">Fakta Nguwawur</p>
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="smooth p-2 rounded-full hover:scale-120 cursor-pointer"
        >
          {darkMode ? <Sun size={18} /> : <Moon size={18} />}
        </button>
      </section>

      <div className="max-w-[500px] w-full h-[500px] relative">
        <div
          className={`w-full h-full rounded-2xl shadow-md z-higher ${
            darkMode ? "bg-[#1e1e1e]" : "bg-card"
          }`}
        ></div>
        <div
          className={`w-full h-full rounded-2xl shadow-lg absolute z-lower sm:top-[5%] sm:left-[5%] top-[1%] left-[1%] p-10 ${
            darkMode ? "bg-[#2a2a2a]" : "bg-card"
          }`}
        >
          <div className={`relative w-full h-full`}>
>>>>>>> 4a9d88a051bb950804a25dda42562013e1cd9ad9
            <img
              height={200}
              width={200}
              src={"/logo.svg"}
              alt="Logo"
              className="absolute inset-0 m-auto opacity-15 z-0 animate-bounce-slow select-none"
            />
<<<<<<< HEAD

            <div className="relative z-10">
=======
            <div
              className={`relative z-10 ${
                darkMode ? "text-white" : "text-[#2E2E2E]"
              } `}
            >
>>>>>>> 4a9d88a051bb950804a25dda42562013e1cd9ad9
              <FactText fact={fact} trueFact={trueFact} loading={loading} />
            </div>
          </div>
        </div>
      </div>

<<<<<<< HEAD
      {/* Footer / Controls */}
      <section
        className={`w-full max-w-[600px] flex items-center justify-between p-4 rounded-2xl shadow-md transition-colors duration-500 ${darkMode ? "bg-[#2b2b2b]" : "bg-white"
          }`}
=======
      <section
        className={`w-full max-w-[600px] flex items-center justify-between p-4 rounded-2xl shadow-md ${
          darkMode ? "bg-[#1e1e1e] border border-[#4a4a4a]" : "bg-card"
        }`}
>>>>>>> 4a9d88a051bb950804a25dda42562013e1cd9ad9
      >
        <div className="relative flex items-center">
          <button
            disabled={loading}
<<<<<<< HEAD
            className={`smooth ${loading
                ? "opacity-35 cursor-not-allowed"
                : "opacity-100 cursor-pointer"
              }`}
=======
            className={`smooth ${
              loading
                ? "opacity-35 cursor-not-allowed"
                : "opacity-100 cursor-pointer"
            }`}
>>>>>>> 4a9d88a051bb950804a25dda42562013e1cd9ad9
            onClick={handleCopy}
          >
            {copied ? <Check /> : <Copy />}
          </button>
          <p
<<<<<<< HEAD
            className={`playfair smooth text-sm font-light absolute top-[50%] translate-y-[-50%] left-[150%] text-[#4A7856] ${copied
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-[30%]"
              }`}
=======
            className={`playfair smooth text-sm font-light absolute top-[50%] translate-y-[-50%] left-[150%] text-[#4A7856] ${
              copied
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-[30%]"
            }`}
>>>>>>> 4a9d88a051bb950804a25dda42562013e1cd9ad9
          >
            copied!
          </p>
        </div>

        <p
<<<<<<< HEAD
          className={`font-alata smooth-slow font-semibold ${loading ? "opacity-0" : "opacity-100"
            }`}
=======
          className={`playfair smooth-slow ] font-semibold ${
            loading ? "opacity-0" : "opacity-100"
          }`}
>>>>>>> 4a9d88a051bb950804a25dda42562013e1cd9ad9
        >
          {origin == "id" ? "indonesia" : origin == "su" ? "sunda" : "jawa"}
        </p>

        <div className="relative flex items-center">
          <p
<<<<<<< HEAD
            className={`playfair smooth text-sm font-light absolute top-[50%] translate-y-[-50%] right-[150%] text-[#4A7856] ${loading
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-[-30%]"
              }`}
=======
            className={`playfair smooth text-sm font-light absolute top-[50%] translate-y-[-50%] right-[150%] text-[#4A7856] ${
              loading
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-[-30%]"
            }`}
>>>>>>> 4a9d88a051bb950804a25dda42562013e1cd9ad9
          >
            Loading
          </p>
          <button
            onClick={getFact}
            disabled={loading}
<<<<<<< HEAD
            className={`smooth ${loading
                ? "opacity-35 cursor-not-allowed"
                : "opacity-100 cursor-pointer"
              }`}
=======
            className={`smooth ${
              loading
                ? "opacity-35 cursor-not-allowed"
                : "opacity-100 cursor-pointer"
            }`}
>>>>>>> 4a9d88a051bb950804a25dda42562013e1cd9ad9
          >
            <StepForward />
          </button>
        </div>
      </section>
    </main>
  );
};

export default App;
