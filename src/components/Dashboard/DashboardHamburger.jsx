import { useState } from 'react';
import icons from '../../assets/icons/_index';

const DashboardHamburger = props => {
  const [menuActive, setMenuActive] = useState(false);

  const toggleMenuHandler = () => {
    setMenuActive(!menuActive);
    props.onMenuAction(menuActive);
  };

  return (
    <div className={`p-[4px] cursor-pointer z-[999] ${props.className}`} onClick={toggleMenuHandler}>
      <img
        src={menuActive ? icons.bars : icons.xmark}
        alt='Dashboard Hamburger'
        className='w-[24px] h-[24px] object-contain'
      />
    </div>
  );
};

export default DashboardHamburger;
