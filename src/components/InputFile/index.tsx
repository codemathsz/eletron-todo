import React, { ChangeEventHandler, useImperativeHandle, useRef, useState } from 'react'
import {FaSearch} from 'react-icons/fa'

interface IProps{
  placeholder?: string,
  icon: boolean,
  label?: string,
  className: string,
  value?: string,
  onChange?:  (event: React.ChangeEvent<HTMLInputElement>) => void;
  error?: any
  file?: (file: File) => void
}

const InputFile: React.ForwardRefRenderFunction<HTMLInputElement, IProps> = (props, forwardedRef) => {
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useImperativeHandle(forwardedRef, () => fileInputRef.current!);

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;

    if (files && files.length > 0) {
      console.log(files[0]);

      const file = files[0];
      const fileName = file.name;
      setUploadedFileName(fileName);
    }

    console.log(event.target.files);
    if(props.file){
      props.file(event.target.files![0])
    }


    const customEvent: React.ChangeEvent<HTMLInputElement> = {
      target: {
        name: event.target.files![0].name, // Nome do campo
        value: event.target.files![0], // Valor desejado para o campo de arquivo
        type: 'file', // Tipo do campo (necessário para alguns validadores)
      },
      currentTarget: event.currentTarget,
      bubbles: event.bubbles,
      cancelable: event.cancelable,
      defaultPrevented: event.defaultPrevented,
      eventPhase: event.eventPhase,
      isTrusted: event.isTrusted,
      nativeEvent: event.nativeEvent,
      persist: event.persist,
      preventDefault: event.preventDefault,
      isDefaultPrevented: event.isDefaultPrevented,
      stopPropagation: event.stopPropagation,
      isPropagationStopped: event.isPropagationStopped,
    };

    if (props.onChange) {
      props.onChange(customEvent);
    }
  };

  return (
    <div className='w-full flex flex-col gap-2'>
      {props.label && <label>{props.label}</label>}
      <div className={`${props.className} flex items-center gap-8 bg-gray-150 border border-gray-250 outline-none px-2 py-1 rounded-lg text-gray-500 text-sm`}>
        <button
          type="button"
          className="bg-secondary text-white px-4 py-2 rounded"
          onClick={handleButtonClick}
        >
          Upload
        </button>
        <input
          ref={fileInputRef}
          type="file"
          className="!w-full bg-gray-150 outline-none p-2 rounded-lg text-gray-500 text-sm hidden"
          placeholder={props.placeholder}
          onChange={handleFileChange}
        />

        {uploadedFileName && <span>{uploadedFileName}</span>}
      </div>
      {props.error && <p className="text-red-500 text-sm">Campo obrigatório.</p>}
    </div>
  );
};

export default React.forwardRef(InputFile);

