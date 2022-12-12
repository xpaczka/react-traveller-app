import DashboardCheckbox from './DashboardCheckbox';

/* TODO
     -> add click event to countries
*/

const DashboardCountriesElement = ({ name, code }) => {
  return (
    <li className='flex items-center justify-between px-[20px] text-[20px] py-[15px] border-b border-solid border-[rgba(0,0,0,0.2)] hover:bg-[#ccc] transition-colors'>
      <div className='flex items-center'>
        <img
          className='max-w-[32px] border-[2px] border-solid border-black rounded-full'
          src={`https://hatscripts.github.io/circle-flags/flags/${code.toLowerCase()}.svg`}
          alt={name}
        />
        <p className='ml-[20px]'>{name}</p>
      </div>
      <DashboardCheckbox />
    </li>
  );
};

export default DashboardCountriesElement;
