import { useState } from "react";
import {
  GptMessage,
  MyMessage,
  TypingLoader,
  TextMessageBoxFile,
} from "../../components";
import { audioToTextUseCase } from "../../../core/use-cases";

interface Message {
  text: string;
  isGpt: boolean;
}

export const AudioToTextPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);

  const handlePost = async (text: string, audioFile: File) => {
    setIsLoading(true);
    setMessages((prev) => [...prev, { text: text, isGpt: false }]);

    const response = await audioToTextUseCase(audioFile, text);
    setIsLoading(false);

    if (!response) return;

    const gptMessage = `
      ## TRANSCRIPCIÓN DE AUDIO ##
      __DURACIÓN:__ ${Math.round(response.duration)} segundos
      ## TEXTO: ##
      ${response.text}
    `;

    setMessages((prev) => [...prev, { text: gptMessage, isGpt: true }]);

    for (const segment of response.segments) {
      const segmentMessage = `
      ## TRANSCRIPCIÓN DE AUDIO ##
      __DURACIÓN:__  ${Math.round(segment.start)} a ${Math.round(
        segment.end
      )} segundos   
      ## TEXTO: ##
      ${segment.text}
    `;
      setMessages((prev) => [...prev, { text: segmentMessage, isGpt: true }]);
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-messages">
        <div className="grid grid-cols-12 gap-y-2">
          {/* bienvenida */}
          <GptMessage text="Hola, que audio quieres generar hoy?" />

          {messages.map((message, index) =>
            message.isGpt ? (
              <GptMessage key={index} text={message.text} />
            ) : (
              <MyMessage
                key={index}
                text={
                  message.text === "" ? "Transcribe el audio" : message.text
                }
              />
            )
          )}

          {isLoading && (
            <div className="col-start-1 col-end-12 fade-in">
              <TypingLoader />
            </div>
          )}
        </div>
      </div>

      <TextMessageBoxFile
        onSendMessage={handlePost}
        placeholder="Escribe tu mensaje aquí"
        disabledCorretions
        accept="audio/*"
      />
    </div>
  );
};
