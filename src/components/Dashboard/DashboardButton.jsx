const DashboardButton = props => {
  const buttonClickHandler = () => {
    props.onTabChange(props.value);
  };

  const buttonClasses = `flex-1 flex justify-center items-center px-[30px] py-[10px] bg-[#ff971a] rounded-[8px] cursor-pointer ${props.className}`;

  return (
    <div className={buttonClasses} value={props.value} onClick={buttonClickHandler}>
      <img className='max-w-[20px] max-h-[20px]' src={props.image} alt={props.text} />
      <p className='text-center ml-[10px]'>{props.text}</p>
    </div>
  );
};

export default DashboardButton;
