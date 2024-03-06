export function Header(){
  return(
    <div className="w-full flex justify-between items-center gap-10 px-32 py-4 bg-white border-b border-b-[#EDEDED] shadow-md">
      <div className="w-full flex justify-start items-center">
        <nav className="flex gap-8 font-sans font-medium text-base text-primary">
          <a href="#" className="border-b-2 border-b-transparent hover:border-b-2 hover:border-b-primary">Clientes</a>
          <a href="#" className="border-b-2 border-b-transparent hover:border-b-2 hover:border-b-primary">Produtos</a>
        </nav>
      </div>
      <div className="w-full flex justify-end items-center">
        <h1 className="text-xl text-primary font-bold font-robotoMono uppercase">moveis rosaluca</h1>
      </div>
    </div>
  )
}
