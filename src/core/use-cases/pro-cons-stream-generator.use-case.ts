export async function* prosConsStreamGeneratorUseCases(prompt: string, abortsignal: AbortSignal) {
  try {
    const resp = await fetch(
      `${import.meta.env.VITE_GPT_API}/pros-cons-discusser-stream`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
        //todo: abortsignal
        signal: abortsignal,
      }
    );

    if (!resp.ok) {
      throw new Error("No se pudo realizar la comparacion");
    }

    const reader = resp.body?.getReader();

    if (!reader) {
      console.log(!reader);
      throw new Error("No se pudo realizar la comparacion");
    }

     const decoder = new TextDecoder();

    let text = "";

    while (true) {
      const { done, value } = await reader.read();

      if (done) {
        break;
      }

      const decodedChunk = decoder.decode(value, { stream: true });
      text += decodedChunk;
      yield text;
    } 
  } catch (error) {
    console.log(error);
    return null;
  }
};
