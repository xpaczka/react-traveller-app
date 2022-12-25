import { useContext, useState } from 'react';
import icons from '../../assets/icons/_index';

import Card from '../ui/Card';
import DashboardCountries from './DashboardCountries';
import DashboardButton from './DashboardButton';
import DashboardHamburger from './DashboardHamburger';
import DashboardScorebard from './DashboardScoreboard';
import DashboardSummary from './DashboardSummary';
import DashboardLogout from './DashboardLogout';
import AuthContext from '../../context/auth-context';

const Dashboard = () => {
  const { logout } = useContext(AuthContext);
  const [dashboardOpen, setDashboardOpen] = useState(true);
  const [currentTab, setCurrentTab] = useState(0);

  const toggleDashboardHandler = value => setDashboardOpen(value);
  const tabChangeHandler = value => setCurrentTab(value);

  return (
    <>
      <div className='flex absolute right-[80px] top-[60px] z-[100]'>
        <DashboardLogout onLogout={logout} className='mr-[20px]' />
        <DashboardHamburger onMenuAction={toggleDashboardHandler} />
      </div>
      {dashboardOpen && (
        <Card className='min-w-[320px] w-[640px] h-[90vh] overflow-hidden absolute right-[40px] top-[40px] bg-[rgba(255,255,255,0.8)] px-[40px] pt-[70px] pb-[20px]'>
          <div className='w-full flex gap-[20px] mb-[20px]'>
            <DashboardButton image={icons.flag} text='Countries' value={0} onTabChange={tabChangeHandler} />
            <DashboardButton image={icons.globe} text='Summary' value={1} onTabChange={tabChangeHandler} />
            <DashboardButton image={icons.star} text='Scoreboard' value={2} onTabChange={tabChangeHandler} />
          </div>
          {currentTab === 0 && <DashboardCountries />}
          {currentTab === 1 && <DashboardSummary />}
          {currentTab === 2 && <DashboardScorebard />}
        </Card>
      )}
    </>
  );
};

export default Dashboard;
