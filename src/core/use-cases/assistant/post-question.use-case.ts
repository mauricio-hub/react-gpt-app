import { QuestionResponse } from "../../../interfaces";

export const postQuestionsUseCase = async (
  threadId: string,
  question: string
) => {
  try {
    const resp = await fetch(
      `${import.meta.env.VITE_ASSITANT_API}/user-question`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ threadId, question }),
      }
    );

    
    const replies = (await resp.json()) as QuestionResponse[];
    
    console.log(replies);
    return replies;
  } catch (error) {
    throw new Error("Error posting question.");
  }
};
