// Assets import
import icons from '../../assets/icons/_index';

const RegisterPasswordCondition = props => {
  return (
    <div className='flex items-center justify-start mb-[10px]'>
      <div
        className={`w-[24px] h-[24px] mr-[10px] rounded-full flex items-center justify-center ${
          props.isValid ? 'bg-[#048204]' : 'bg-[red]'
        }`}
      >
        <img
          src={props.isValid ? icons.check : icons.xmark}
          alt='Validation mark'
          className={`w-[16px] h-[16px] ${!props.isValid && 'invert'}`}
        />
      </div>
      <p className='text-[14px]'>{props.text}</p>
    </div>
  );
};

export default RegisterPasswordCondition;
