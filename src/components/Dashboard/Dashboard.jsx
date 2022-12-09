import { images } from '../../assets/_index';

import Card from '../ui/Card';
import DashboardCountries from './DashboardCountries';
import DashboardButton from './DashboardButton';

const Dashboard = () => {
  return (
    <Card className='max-w-[50%] absolute right-[40px] top-[40px] bg-[rgba(255,255,255,0.8)] px-[40px] py-[20px]'>
      <div className='w-full flex gap-[20px] mb-[20px]'>
        <DashboardButton image={images.flag} text='Countries' />
        <DashboardButton image={images.globe} text='Summary' />
        <DashboardButton image={images.star} text='Scoreboard' />
      </div>
      <DashboardCountries />
    </Card>
  );
};

export default Dashboard;
