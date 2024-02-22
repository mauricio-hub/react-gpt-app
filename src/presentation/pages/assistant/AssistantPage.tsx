import { useEffect, useState } from "react";
import { GptMessage, MyMessage, TypingLoader, TextMessageBox } from "../../components";
import { createThreadUseCase } from "../../../core/use-cases";


interface Message {
  text: string;
  isGpt: boolean;
}

export const  AssistantPage  = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);

  const [threadId, setThreadId] = useState<string>();

  useEffect(() => {
   const threadId = localStorage.getItem("threadId");
   if(threadId){
      setThreadId(threadId);
   }else{
    createThreadUseCase()
    .then((id) => {
      setThreadId(id);
      localStorage.setItem("threadId", id);
    })
   }

  }, [])
  

  const handlePost = async (text: string) => {
    setIsLoading(true);
    setMessages((prev) => [...prev, { text: text, isGpt: false }]);

    setIsLoading(false);
  }

  useEffect(() => {
   if(threadId){
      setMessages((prev) => [...prev, { text: `Numero de thread ${threadId}`, isGpt: true }]);
   }

  }, [threadId])
  


  return (
    <div className="chat-container">
      <div className="chat-messages">
        <div className="grid grid-cols-12 gap-y-2">
                    {/* bienvenida */}
          <GptMessage text="Hola, soy Sam en que puedo ayudarte ?" />

          {messages.map((message, index) =>
            message.isGpt ? (
              <GptMessage key={index} text={message.text} />
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
  );
};
