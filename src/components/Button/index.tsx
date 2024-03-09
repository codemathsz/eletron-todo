import { ButtonHTMLAttributes } from 'react'
import { FaPlus } from 'react-icons/fa'

interface IButtonProps{
  label: string,
  className: string,
  title?: string,
  icon: boolean,
  onClick?: () => void,
  type?: ButtonHTMLAttributes<HTMLButtonElement>['type'];
}

export function Button(props: IButtonProps){
  return(
    <button
      type={props.type}
      className={`${props.className} bg-blue text-white font-normal text-sm rounded-lg px-4 py-3 flex ${props.icon ? 'justify-between': 'justify-center'} items-center gap-2`}
      title={props.title}
      onClick={props.onClick}
    >
      <p className='w-full'>{props.label}</p>
      {
        props.icon && <FaPlus/>
      }
    </button>
  )
}
