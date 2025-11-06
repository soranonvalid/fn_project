/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import axios from "axios";
import FactText from "./components/text";
import { Check, Copy, StepForward } from "lucide-react";

const App = () => {
  const [fact, setFact] = useState("");
  const [origin, setOrigin] = useState("");
  const [trueFact, setTrueFact] = useState("");
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState("");
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
  return (
    <main className="h-screen w-screen flex flex-col sm:px-20 px-4 gap-20 justify-center items-center bg-[#f1f1f1]">
      <section className="w-full max-w-[600px] flex items-center justify-between">
        <img height={32} width={32} src={"/logo.svg"} alt="" />
        <p className="playfair h-min font-bold">Fakta Nguwawur</p>
      </section>
      <div className={`max-w-[500px] w-full h-[500px] relative`}>
        <div className="w-full h-full bg-card z-higher shadow-xl"></div>
        <div className="w-full h-full bg-card shadow-xl absolute z-lower sm:top-[5%] sm:left-[5%] top-[1%] left-[1%] p-10">
          <FactText fact={fact} trueFact={trueFact} loading={loading} />
        </div>
      </div>
      <section className="w-full max-w-[600px] flex items-center justify-between">
        <div className="relative flex items-center">
          <button
            disabled={loading}
            className={`smooth ${
              loading
                ? "opacity-35 cursor-not-allowed"
                : "opacity-100 cursor-pointer"
            }`}
            onClick={handleCopy}
          >
            {copied ? <Check /> : <Copy />}
          </button>
          <p
            className={`playfair smooth text-sm font-light absolute top-[50%] translate-y-[-50%] left-[150%] ${
              copied
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-[30%]"
            }`}
          >
            copied!
          </p>
        </div>
        <p
          className={`playfair smooth-slow ${
            loading ? "opacity-0" : "opacity-100"
          }`}
        >
          {origin == "id" ? "indonesia" : origin == "su" ? "sunda" : "jawa"}
        </p>
        <div className="relative flex items-center">
          <p
            className={`playfair smooth text-sm font-light absolute top-[50%] translate-y-[-50%] right-[150%] ${
              loading
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-[-30%]"
            }`}
          >
            Loading
          </p>
          <button
            onClick={() => {
              getFact();
            }}
            disabled={loading}
            className={`smooth ${
              loading
                ? "opacity-35 cursor-not-allowed"
                : "opacity-100 cursor-pointer"
            }`}
          >
            <StepForward />
          </button>
        </div>
      </section>
    </main>
  );
};

export default App;
