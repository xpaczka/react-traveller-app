const Button = props => {
  return (
    <button
      type={props.type}
      className='bg-[#2d5bd0] rounded-[8px] py-[5px] px-[20px] text-white text-[18px] font-medium'
    >
      {props.text}
    </button>
  );
};

export default Button;
