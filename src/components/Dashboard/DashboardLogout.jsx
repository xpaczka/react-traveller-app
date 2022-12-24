import icons from '../../assets/icons/_index';

const DashboardLogout = props => {
  return (
    <div onClick={props.onLogout} className={`p-[4px] cursor-pointer z-[999] ${props.className}`}>
      <img src={icons.logout} alt='Dashboard Logout' className='w-[24px] h-[24px] object-contain' />
    </div>
  );
};

export default DashboardLogout;
