import { useState } from "react";
import {
  GptMessage,
  MyMessage,
  TextMessageBoxSelect,
  TypingLoader,
} from "../../components";

interface Message {
  text: string;
  isGpt: boolean;
}

export const OrthographyPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);


  const handlePost = async (text: string) => {
    setIsLoading(true);
    setMessages((prev) => [...prev, { text: text, isGpt: false }]);

    setIsLoading(false);
  }


  return (
    <div className="chat-container">
      <div className="chat-messages">
        <div className="grid grid-cols-12 gap-y-2">
          <GptMessage text="Hola, puedes escribir tu texto en espñol y te ayudo con las correcciones" />

          {messages.map((message, index) =>
            message.isGpt ? (
              <GptMessage key={index} text="Esto es de open IA" />
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

      

      <TextMessageBoxSelect
        onSendMessage={console.log}
        options={
          [
            { id: "1", text: "Opción 1" },
            { id: "2", text: "Opción 2" },
            { id: "3", text: "Opción 3" },
          ]
        }
      />
    </div>
  );
};
