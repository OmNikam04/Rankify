

const Card: React.FC<any> = ({data, handleCardClick}) => {
  // console.log(data)
  return (
    <div className="bg-white hover:cursor-pointer hover:scale-105 transition-transform duration-500 w-1/2 rounded overflow-hidden shadow-lg"
    onClick={() => handleCardClick(data._id)}
    >
      
      <div className="text-center">
        <p className="text-8xl font-bold py-8">{data.emoji}</p>
      </div>
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{data.title}</div>
        <p className="text-gray-700 text-base">
          {data.description}
        </p>
      </div>
      <div className="px-6 pt-4 pb-2">
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">rating : {data.eloRating.toFixed(2)}</span>
      </div>
    </div>
  );
};

export default Card;