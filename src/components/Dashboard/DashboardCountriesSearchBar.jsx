// Hooks, React import
import { useState } from 'react';

// Assets import
import icons from '../../assets/icons/_index';

const DashboardCountriesSearchBar = props => {
  const [inputValue, setInputValue] = useState('');

  const inputChangeHandler = e => {
    const value = e.target.value;

    setInputValue(value);
    props.onSearchInput(value);
  };

  const clearInput = () => {
    setInputValue('');
    props.onSearchInput('');
  };

  return (
    <div className='relative w-full py-[10px] px-[20px] flex gap-[20px]'>
      <input
        value={inputValue}
        onChange={inputChangeHandler}
        type='text'
        className='py-[10px] px-[20px] rounded-[8px] flex-1 border-2 border-solid border-black'
        placeholder='Search for a country'
      />
      {inputValue && (
        <div
          onClick={clearInput}
          className='h-[40px] w-[40px] right-[25px] top-1/2 -translate-y-1/2 flex items-center justify-center absolute cursor-pointer'
        >
          <img src={icons.xmark} alt='Clear input' className='h-[20px] w-[20px]' />
        </div>
      )}
    </div>
  );
};

export default DashboardCountriesSearchBar;
