// Assets import
import icons from '../../assets/icons/_index';

const DashboardLogout = props => {
  return (
    <div
      onClick={props.onLogout}
      className={`px-[15px] flex items-center rounded-full h-[40px] cursor-pointer z-[999] ${props.className}`}
    >
      <img src={icons.logout} alt='Dashboard Logout' className='w-[24px] h-[24px] object-contain' />
      <p className='ml-[10px]'>Logout</p>
    </div>
  );
};

export default DashboardLogout;
