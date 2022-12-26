// Hooks, React import
import { useContext } from 'react';

// Context import
import AuthContext from '../../context/auth-context';

// Assets import
import icons from '../../assets/icons/_index';

const DashboardLogout = props => {
  const { currentUser } = useContext(AuthContext);

  return (
    <div className={`flex items-center px-[15px] rounded-full h-[40px] cursor-pointer z-[999] ${props.className}`}>
      <div className='mr-[30px]'>
        Welcome, <b>{currentUser.name}</b>
      </div>
      <div onClick={props.onLogout} className='flex items-center'>
        <img src={icons.logout} alt='Dashboard Logout' className='w-[24px] h-[24px] object-contain' />
        <p className='ml-[10px]'>Logout</p>
      </div>
    </div>
  );
};

export default DashboardLogout;
