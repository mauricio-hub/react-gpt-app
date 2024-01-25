import { FormEvent, useState } from "react";

interface Props {
  onSendMessage: (message: string) => void;
  placeholder?: string;
  disabledCorretions?: boolean;
}

export const TextMessageBox = ({
  onSendMessage,
  placeholder,
  disabledCorretions = false,
}: Props) => {
  const [message, setMessage] = useState("");

  const handleSendMessage = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (message.trim().length === 0) return;
    onSendMessage(message);
    setMessage("");
  };

  return (
    <form
      onSubmit={handleSendMessage}
      className="flex flex-row items-center h-16 rounded-xl bg-white w-full px-4"
    >
      <div className="flex-grow">
        <div className="relative w-full">
          <input
            type="text"
            className="flex w-full border rounded-xl text-gray-800 focus:outline-none focus:border-indigo-300 pl-4 h-10"
            placeholder={placeholder}
            autoComplete={disabledCorretions ? "off" : "on"}
            autoCorrect={disabledCorretions ? "off" : "on"}
            spellCheck={disabledCorretions ? false : true}
            value={message}
            onChange={(event) => setMessage(event.target.value)}
          ></input>
        </div>
      </div>

      <div>
        <button className="btn-primary">
          <span className="mr-2">Enviar</span>
          <i className="fa-regular fa-paper-plane"></i>
        </button>
      </div>
    </form>
  );
};
