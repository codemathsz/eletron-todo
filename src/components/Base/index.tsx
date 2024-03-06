import {ReactNode} from 'react'

export function Base({ children }: {children: ReactNode}) {
  return (
    <div className="w-full flex flex-col gap-10 mx-auto mt-10 px-32 py-8">
      {children}
    </div>
  );
}
