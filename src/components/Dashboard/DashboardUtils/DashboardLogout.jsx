// Hooks, React import
import { useState, useContext, useEffect } from 'react';

// Context import
import AuthContext from '../../../context/auth-context';

// Assets import
import icons from '../../../assets/icons/_index';

const DashboardLogout = props => {
  const { currentUser } = useContext(AuthContext);
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (currentUser) {
      setUser(currentUser.name);
    }
  }, [currentUser]);

  return (
    <div className={`flex items-center px-[15px] rounded-full h-[40px] cursor-pointer z-[999] ${props.className}`}>
      <div className='mr-[30px]'>
        {user && (
          <p>
            Welcome, <b>{user}</b>
          </p>
        )}
      </div>
      <div onClick={props.onLogout} className='flex items-center'>
        <img src={icons.logout} alt='Dashboard Logout' className='w-[24px] h-[24px] object-contain' />
        <p className='ml-[10px]'>Logout</p>
      </div>
    </div>
  );
};

export default DashboardLogout;
