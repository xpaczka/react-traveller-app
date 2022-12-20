const DashboardScoreboardProfile = ({ flag, name, rank, visitedCount, countriesCount }) => {
  return (
    <div className='border-b border-solid border-[rgba(0,0,0,0.2)] pb-[10px]'>
      <div className='flex justify-center items-center mb-[10px]'>
        <img
          src={`https://hatscripts.github.io/circle-flags/flags/${flag}.svg`}
          alt='Profile Flag'
          className='max-w-[32px] border-[2px] border-solid border-black rounded-full'
        />
        <p className='text-[20px] ml-[10px] font-bold'>{name}</p>
      </div>
      <div className='flex items-start'>
        <div className='w-1/3 text-center px-[10px]'>
          <p className='text-[12px]'>Rank</p>
          <p className='text-[18px] font-bold'>{rank}</p>
        </div>
        <div className='w-1/3 text-center px-[10px]'>
          <p className='text-[12px]'>Countries</p>
          <p className='text-[18px] font-bold'>
            {visitedCount} / {countriesCount}
          </p>
        </div>
        <div className='w-1/3 text-center px-[10px]'>
          <p className='text-[12px]'>% of the world</p>
          <p className='text-[18px] font-bold'>
            {((parseInt(visitedCount) / parseInt(countriesCount)) * 100).toFixed(1)}%
          </p>
        </div>
      </div>
    </div>
  );
};

export default DashboardScoreboardProfile;
