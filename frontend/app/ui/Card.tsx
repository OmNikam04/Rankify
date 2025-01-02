interface CardProps {
  title: string;
  emoji: string;
  onSelect: ()=>void;
}

const Card: React.FC<CardProps> = ({ title, emoji, onSelect }) => {
  return (
    <div
      className="border rounded-lg p-4 shadow-md hover:shadow-xl transition transform hover:scale-105 cursor-pointer"
      onClick={onSelect}
    >
      <div className="text-6xl text-center">{emoji}</div>
      <h2 className="text-lg font-semibold mt-2 text-center">{title}</h2>
    </div>
  );
};

export default Card;