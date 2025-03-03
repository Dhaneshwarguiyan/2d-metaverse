const Image1 = ({ img }: { img: string }) => {
  return (
    <img src={img} alt="img" className="w-[385px] object-cover rounded-lg" />
  );
};

export default Image1;
