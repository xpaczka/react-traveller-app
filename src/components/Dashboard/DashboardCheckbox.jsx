// Assets import
import images from '../../assets/icons/_index';

const DashboardCheckbox = props => {
  const containerClasses = `h-[24px] w-[24px] border border-solid border-black rounded-full relative flex items-center justify-center ${
    props.checked && 'bg-[#026906] text-white'
  }`;
  const checkbocClasses = `h-[16px] w-[16px] ${props.checked ? 'block' : 'hidden'}`;

  return (
    <div className='relative'>
      <div className={containerClasses}>
        <img className={checkbocClasses} src={images.check} alt='Checkmark' />
      </div>
    </div>
  );
};

export default DashboardCheckbox;
