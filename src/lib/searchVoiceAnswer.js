import { supabase } from "../config/supabase";

/**
 * Pure search function (NO useEffect, NO React)
 */
export const searchVoiceAnswer = async (query) => {
const cleanedQuery = query.toLowerCase().trim();

const { data: questions, error } = await supabase
  .from("questions")
  .select("id, title");

if (error || !questions) {
  console.error("Search error:", error);
  return null;
}

// 🔥 NEW SMART MATCHING
const match = questions
  .map((q) => {
    const title = q.title.toLowerCase();

    const score = cleanedQuery
      .split(" ")
      .filter((word) => title.includes(word)).length;

    return { q, score };
  })
  .sort((a, b) => b.score - a.score)[0]?.q;

console.log("BEST MATCH:", match);

if (!match) return null;
 
const { data: answers, error: ansError } = await supabase
  .from("answers")
  .select("content")
  // .order("is_accepted", { ascending: false })
  .eq("question_id", match.id);
console.log("ANS ERROR:", ansError);
console.log("ANS DATA:", answers);

  if (ansError || !answers || answers.length === 0) {
    return {
      question: match.title,
      answer: null,
    };
  }

  return {
    question: match.title,
    answer: answers[0].content,
  };
};