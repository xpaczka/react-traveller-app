// Hooks, React import
import { forwardRef } from 'react';

const Input = (props, ref) => {
  return (
    <div className={`w-full flex flex-col ${props.className}`}>
      <label className='text-[14px] mb-[5px] pl-[5px]' htmlFor={props.id}>
        {props.label}
      </label>
      <input
        ref={ref}
        onChange={props.onChange}
        type={props.type}
        name={props.id}
        id={props.id}
        className='py-[5px] px-[10px] rounded-[8px]'
      />
    </div>
  );
};

export default forwardRef(Input);
