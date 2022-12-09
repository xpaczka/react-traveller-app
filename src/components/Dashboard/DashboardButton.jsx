const DashboardButton = ({ image, text }) => {
  const buttonClasses =
    'flex-1 flex justify-center items-center px-[30px] py-[10px] bg-[#ff971a] rounded-[8px] cursor-pointer';

  return (
    <div className={buttonClasses}>
      <img className='max-w-[20px] max-h-[20px]' src={image} alt={text} />
      <p className='text-center ml-[10px]'>{text}</p>
    </div>
  );
};

export default DashboardButton;
