import { useState } from "react";
import {
  GptMessage,
  MyMessage,
  TypingLoader,
  TextMessageBox,
  GptMessageImage,
  GptMessageSelectableImage,
} from "../../components";
import {
  imageGenerationUseCase,
  imageVariationUseCase,
} from "../../../core/use-cases";

interface Message {
  text: string;
  isGpt: boolean;
  info?: {
    imageUrl: string;
    alt: string;
  };
}

export const ImageTunningPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      isGpt: true,
      text: "Imagen base",
      info: {
        imageUrl: "http://localhost:3000/gpt/image-generation/1707623489177.png",
        alt: "imagen base",
      },
    }
    
  ]);

  const [originalImageAndMask, setOriginalImageAndMask] = useState({
    originalImage: undefined as string | undefined,
    maskImage: undefined as string | undefined,
  });

  const handleVariation = async () => {
    setIsLoading(true);
    const resp = await imageVariationUseCase(
      originalImageAndMask.originalImage!
    );
    setIsLoading(false);

    if (!resp) return;

    setMessages((prev) => [
      ...prev,
      {
        text: "Variacion generada",
        isGpt: true,
        info: {
          imageUrl: resp.url,
          alt: resp.alt,
        },
      },
    ]);
  };

  const handlePost = async (text: string) => {
    setIsLoading(true);
    setMessages((prev) => [...prev, { text: text, isGpt: false }]);

    const imageInfo = await imageGenerationUseCase(text);

    setIsLoading(false);

    if (!imageInfo) {
      return setMessages((prev) => [
        ...prev,
        { text: "No se pudo generar la imagen", isGpt: true },
      ]);
    }

    setMessages((prev) => [
      ...prev,
      {
        text: text,
        isGpt: true,
        info: {
          imageUrl: imageInfo.url,
          alt: imageInfo.alt,
        },
      },
    ]);
  };

  return (
    <>
      {originalImageAndMask.originalImage && (
        <div className="fixd flex-col items-center top-10 right-10 z-10 fade-in">
          <span>Editando</span>
          <img
            src={originalImageAndMask.originalImage}
            alt="original"
            className="border rounded-xl w-36 h-36 object-contain"
          />
          <button className="btn-primary mt-2" onClick={handleVariation}>
            Generar variacion
          </button>
        </div>
      )}
      <div className="chat-container">
        <div className="chat-messages">
          <div className="grid grid-cols-12 gap-y-2">
            {/* bienvenida */}
            <GptMessage text="Hola, que imagen deseas generar" />

            {messages.map((message, index) =>
              message.isGpt ? (
               /*  <GptMessageImage
                  key={index}
                  text={message.text}
                  alt={message.info?.alt!}
                  imageUrl={message.info?.imageUrl!}
                  onImageSelect={(url) =>
                    setOriginalImageAndMask({
                      originalImage: url,
                      maskImage: undefined,
                    })
                  }
                /> */

                <GptMessageSelectableImage
                key={index}
                text={message.text}
                alt={message.info?.alt!}
                imageUrl={message.info?.imageUrl!}
                onImageSelect={(url) =>
                  setOriginalImageAndMask({
                    originalImage: url,
                    maskImage: undefined,
                  })
                }
                />

              ) : (
                <MyMessage key={index} text={message.text} />
              )
            )}

            {isLoading && (
              <div className="col-start-1 col-end-12 fade-in">
                <TypingLoader />
              </div>
            )}
          </div>
        </div>

        <TextMessageBox
          onSendMessage={handlePost}
          placeholder="Escribe tu mensaje aquí"
          disabledCorretions
        />
      </div>
    </>
  );
};
