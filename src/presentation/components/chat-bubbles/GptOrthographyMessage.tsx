//import Markdown from "react-markdown";

interface Props {
  userScore: number;
  errors: string[];
  message: string;
  fixMessage: string;
}

export const GptOrthographyMessage = ({ userScore, errors, message,fixMessage }: Props) => {
  return (
    <div className="col-start-1 col-end-8 p-3 rounded-lg">
      <div className="flex flex-row items-start">
        <div className="flex items-center justify-center h-10 w-10 rounded-full bg-green-600 flex-shrink-0">
          G
        </div>
        <div className="relative ml-3 text-sm bg-black bg-opacity-25 pt-3 pb-2 px-4 shadow rounded-x">
          <h2>Puntaje: {userScore}</h2>
          <p>{message}</p>
          <div className="flex flex-row items-center justify-center">
            {errors.map((error, index) => (
              <div
                key={index}
                className="flex flex-row items-center justify-center"
              >
                <p className="text-red-500">{error}</p>
                <p className="text-red-500">|</p>
              </div>

            ))}
            <p>Correccion: {fixMessage}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
