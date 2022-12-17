import images from '../../assets/icons/_index';

const DashboardCheckbox = props => {
  return (
    <div className='checkbox'>
      <div className={props.checked ? 'checkbox-trigger is-checked' : 'checkbox-trigger'}>
        <img src={images.check} alt='Checkmark' />
      </div>
      <input type='checkbox' readOnly className='checkbox-input' checked={props.checked} />
    </div>
  );
};

export default DashboardCheckbox;
