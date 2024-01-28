import type { OrthographyResponse } from "../../interfaces";

export const orthographyUseCases = async (prompt: string) => {
  try {
    const resp = await fetch(
      `${import.meta.env.VITE_GPT_API}/orthography-check`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      }
    );

    if (!resp.ok) {
      throw new Error("No se pudo realizar la corrección");
    }

    const data = (await resp.json()) as OrthographyResponse;
    console.log("data aqui", data);
    return {
      ok: true,
      ...data,
    };
  } catch (error) {
    console.log("error en la peticion .........", error);
    return {
      ok: false,
      userScore: 0,
      errors: [],
      message: "No de puedo realizar la corrección ",
    };
  }
};
