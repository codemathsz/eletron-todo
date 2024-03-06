import { FaPlus } from 'react-icons/fa'

interface IButtonProps{
  label: string,
  className: string,
  title?: string
}

export function Button(props: IButtonProps){
  return(
    <button className={`${props.className} bg-blue hover:opacity-85 border-none text-white rounded-lg px-4 py-3 flex justify-between items-center gap-2`} title={props.title}>
      <p>{props.label}</p>
      <FaPlus/>
    </button>
  )
}
