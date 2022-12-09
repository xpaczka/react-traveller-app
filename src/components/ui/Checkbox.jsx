import { useState } from 'react';
import classes from './Checkbox.module.css';

const Checkbox = () => {
  const [checked, setChecked] = useState(false);
  const checkboxTriggerClasses = checked
    ? `${classes['checkbox-trigger']} ${classes['is-checked']}`
    : classes['checkbox-trigger'];

  const checkboxHandler = () => setChecked(!checked);

  return (
    <div className={classes['checkbox']}>
      <div className={checkboxTriggerClasses} onClick={checkboxHandler}></div>
      <input type='checkbox' onChange={checkboxHandler} className={classes['checkbox-input']} checked={checked} />
    </div>
  );
};

export default Checkbox;
