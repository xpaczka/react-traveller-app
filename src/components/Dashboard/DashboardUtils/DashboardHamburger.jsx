// Hooks, React import
import { useState } from 'react';

// Assets import
import icons from '../../../assets/icons/_index';

const DashboardHamburger = props => {
  const [menuActive, setMenuActive] = useState(false);

  const toggleMenuHandler = () => {
    setMenuActive(!menuActive);
    props.onMenuAction(menuActive);
  };

  return (
    <div
      className={`p-[4px] w-[40px] h-[40px] rounded-full cursor-pointer z-[999] flex items-center justify-center ${
        props.className ?? ''
      }`}
      onClick={toggleMenuHandler}
    >
      <img
        src={menuActive ? icons.bars : icons.xmark}
        alt='Dashboard Hamburger'
        className='w-[24px] h-[24px] object-contain'
      />
    </div>
  );
};

export default DashboardHamburger;
