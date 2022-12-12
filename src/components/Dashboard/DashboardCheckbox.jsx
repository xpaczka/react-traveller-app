import { useState } from 'react';
import images from '../../assets/icons/_index';

const DashboardCheckbox = () => {
  const [checked, setChecked] = useState(false);
  const checkboxHandler = () => setChecked(!checked);

  return (
    <div className='checkbox'>
      <div className={checked ? 'checkbox-trigger is-checked' : 'checkbox-trigger'} onClick={checkboxHandler}>
        <img src={images.check} alt='Checkmark' />
      </div>
      <input type='checkbox' onChange={checkboxHandler} className='checkbox-input' checked={checked} />
    </div>
  );
};

export default DashboardCheckbox;
