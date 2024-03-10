import React, { ChangeEventHandler } from 'react'
import {FaSearch} from 'react-icons/fa'

interface IProps{
  placeholder?: string,
  icon: boolean,
  label?: string,
  className: string,
  value?: string,
  onChange?: ChangeEventHandler<HTMLInputElement>,
  error?: any
}

const TextInput = React.forwardRef<HTMLInputElement, IProps>((props, ref) => {
  return (
    <div className='w-full flex flex-col gap-2'>
      {
        props.label && <label>{props.label}</label>
      }
      <div className={`${props.className} flex items-center gap-2 bg-gray-150 border border-gray-250 outline-none px-2 py-1 rounded-lg text-gray-500 text-sm`}>
        {
        props.icon && <FaSearch size={18} color='#777777'/>
        }

        <input
          ref={ref}
          type="text"
          className="!w-full bg-gray-150 outline-none p-2 rounded-lg text-gray-500 text-sm"
          value={props.value}
          placeholder={props.placeholder}
          onChange={props.onChange}
        />
      </div>
      {props.error && <p className="text-red-500 text-sm">Campo obrigatório.</p>}
    </div>
  )
});

export default TextInput
