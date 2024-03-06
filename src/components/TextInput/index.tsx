import {FaSearch} from 'react-icons/fa'

interface IProps{
  placeholder: string,
  icon: boolean,
  className: string,
}

export function TextInput (props: IProps){
  return(
    <div className={`${props.className} flex items-center gap-2 bg-gray-150 border border-gray-250 outline-none px-2 py-1 rounded-lg text-gray-500 text-sm`}>
      {
       props.icon && <FaSearch size={18} color='#777777'/>
      }

      <input type="text" className="!w-full bg-gray-150 outline-none p-2 rounded-lg text-gray-500 text-sm" placeholder={props.placeholder} />
    </div>
  )
}
