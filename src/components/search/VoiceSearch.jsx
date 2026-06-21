import { useEffect, useState } from "react";
import { useSpeechToText } from "../hooks/useSpeechToText";
import { useVoiceSearchAnswer } from "../hooks/useVoiceSearchAnswer";

const VoiceSearch = () => {
  const { transcript } = useSpeechToText();
  const { searchAndRespond } = useVoiceSearchAnswer();

  const [result, setResult] = useState("");

  useEffect(() => {
    if (!transcript) return;

    console.log("🟡 TRANSCRIPT RECEIVED:", transcript);

    const timeout = setTimeout(() => {
      const finalQuery = transcript.toLowerCase().trim();

      console.log("🚀 CALLING SEARCH:", finalQuery);

      searchAndRespond(finalQuery, setResult);
    }, 1000);

    return () => clearTimeout(timeout);
  }, [transcript]);

  return (
    <div>
      <h3>🎤 Voice Search</h3>

      <p>Transcript: {transcript}</p>
      <p>Result: {result}</p>
    </div>
  );
};

export default VoiceSearch;