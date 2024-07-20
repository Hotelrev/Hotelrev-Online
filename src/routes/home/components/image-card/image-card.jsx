const ImageCard = (props) => {
  const { name, imageUrl, onPopularDestincationCardClick } = props;
  return (
    <div
      className="p-2 border hover:scale-[1.2] transition-all cursor-pointer"
      onClick={() => onPopularDestincationCardClick(name)}
      data-testid="image-card"
    >
      <img src={imageUrl} className="rounded w-[150px] h-[95px] " alt="mumbai" />
      <h4 className="text-center">{name}</h4>
    </div>
  );
};
export default ImageCard;
