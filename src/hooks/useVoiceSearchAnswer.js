import { useTextToSpeech } from "./useTextToSpeech";
import { searchVoiceAnswer } from "../lib/searchVoiceAnswer";

export const useVoiceSearchAnswer = () => {
  const { speak } = useTextToSpeech();

  const searchAndRespond = async (query, setResult) => {
    if (!query) return;

    console.log("🔥 SEARCH FUNCTION CALLED");

    const result = await searchVoiceAnswer(query);

    console.log("RESULT:", result);

    if (!result || !result.answer) {
      const msg = "No answer found, try asking something else.";
      setResult(msg);

      console.log("🔊 SPEAKING FALLBACK");
      speak(msg);
      return;
    }

    setResult(result.answer);

    console.log("🔊 SPEAKING ANSWER");
    speak(result.answer);
  };

  return { searchAndRespond };
};