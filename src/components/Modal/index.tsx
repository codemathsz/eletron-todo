import {FormEventHandler, ReactNode} from 'react'
import { Button } from '../Button';

interface IModalProps {
  onClose: () => void;
  onSubmit: FormEventHandler<HTMLFormElement>;
  children: ReactNode
}

export function Modal({ onClose, onSubmit, children }: IModalProps) {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-[#ABABAB] bg-opacity-65">
      <form onSubmit={onSubmit} className="w-[35rem] h-[28.75rem] bg-white rounded-lg px-10 py-4 flex flex-col gap-8 items-center justify-center">
        <div>
          {children}
        </div>
        <div className='w-full flex justify-between items-center gap-4 mb-2'>
          <Button
            className='w-full !bg-white !border !border-[#802922] !text-[#802922] hover:!bg-[#802922] hover:!text-white'
            label='Cancelar'
            icon={false}
            title='Cancelar'
            onClick={onClose}
          />
          <Button
            className='w-full !border-none hover:opacity-85'
            type='submit'
            label='Cadastrar'
            icon={false}
            title='Cadastrar novo cliente'
          />
        </div>
      </form>
    </div>
  );
}
