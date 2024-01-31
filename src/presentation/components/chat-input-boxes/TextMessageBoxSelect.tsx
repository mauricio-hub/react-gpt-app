import { FormEvent, useState } from "react";

interface Props {
  onSendMessage: (message: string, selectedOptions: string) => void;
  placeholder?: string;
  disabledCorretions?: boolean;
  options: Option[];
}

interface Option {
  id: string;
  text: string;
}

export const TextMessageBoxSelect = ({
  onSendMessage,
  placeholder,
  disabledCorretions = false,
  options,
}: Props) => {
  const [message, setMessage] = useState("");
  const [selectedOption, setSelectedOption] = useState<string>("");

  const handleSendMessage = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (message.trim().length === 0) return;
    if (selectedOption === '' ) return;
    onSendMessage(message, selectedOption);
    setMessage("");
  };

  return (
    <form
      onSubmit={handleSendMessage}
      className="flex flex-row items-center h-16 rounded-xl bg-white w-full px-4"
    >
      <div className="flex-grow">
        <div className="flex">
          <input
            type="text"
            className="w-full border rounded-xl text-gray-800 focus:outline-none focus:border-indigo-300 pl-4 h-10"
            placeholder={placeholder}
            autoComplete={disabledCorretions ? "off" : "on"}
            autoCorrect={disabledCorretions ? "off" : "on"}
            spellCheck={disabledCorretions ? false : true}
            value={message}
            onChange={(event) => setMessage(event.target.value)}
          ></input>

          <select
            name="select"
            className="w-2/5 ml-2 mr-2 border rounded-xl text-gray-800 focus:outline-none focus:border-indigo-300 pl-4 h-10"
            value={selectedOption}
            onChange={(event) => setSelectedOption(event.target.value)}
          >
            <option value="" disabled selected>
              Selecciona una opción
            </option>
            {options.map((option) => (
              <option key={option.id} value={option.id}>
                {option.text}
              </option>
            ))}
          </select>
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
