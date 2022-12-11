import { useState } from 'react';

const Checkbox = () => {
  const [checked, setChecked] = useState(false);
  const checkboxHandler = () => setChecked(!checked);

  return (
    <div className='checkbox'>
      <div className={checked ? 'checkbox-trigger is-checked' : 'checkbox-trigger'} onClick={checkboxHandler}></div>
      <input type='checkbox' onChange={checkboxHandler} className='checkbox-input' checked={checked} />
    </div>
  );
};

export default Checkbox;
