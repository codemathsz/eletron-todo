import { useState } from "react";
import { Base } from "../../components/Base";
import { Button } from "../../components/Button";
import { TextInput } from "../../components/TextInput";
import { Modal } from "../../components/Modal";
import { CustomersContext } from "../../contexts/CustomerContext";
import { useContextSelector } from "use-context-selector";

export function Customer() {
  const customers = useContextSelector(
    CustomersContext,
    (context) =>{
      return context.customers
    }
  )
  const [showModal, setShowModal] = useState<boolean>(false);
  const [searchCustomer, setSearchCustomer] = useState<string>('')
  const [name, setName] = useState<string>('')
  const [address, setAddress] = useState<string>('')
  const [zipcode, setZipcode] = useState<string>('')
  const [phone, setPhone] = useState<string>('')
  const classTd = "col-span-1 flex justify-center items-center truncate"


  const handleSearchChange = (event: any) =>{
    setSearchCustomer(event.target.value)
  }

  const handleCloseForm = (event: any) => {
    setName('')
    setAddress('')
    setZipcode('')
    setPhone('')
    setShowModal(false)
  }
  const handleSendForm = (event: any):void =>{
    console.log(event.target.value);

  }

  const filteredCustomers = searchCustomer
  ? customers.filter(customer =>
      customer.name.toLowerCase().includes(searchCustomer.toLowerCase())
    )
  : customers;
  return (
    <Base>
      <div className="w-full flex justify-start items-center">
        <h1 className="text-3xl text-primary font-medium">Clientes</h1>
      </div>
      <div className="w-full flex justify-between items-center">
        <TextInput
          className="w-3/4 mr-4"
          placeholder="Buscar clientes"
          value={searchCustomer}
          icon
          onChange={handleSearchChange}
        />
        <Button
          icon
          label="Novo cliente"
          className="w-44 !border-none hover:opacity-85 text-white"
          title="Adicionar Novo Cliente"
          onClick={() => setShowModal(true)}
        />
      </div>
      <div className="w-full">
        <table className="w-full flex flex-col border border-[#B4B4B4] !rounded-2xl">
          <thead className="bg-[#F9F9F9] rounded-t-2xl px-2">
            <tr className="grid grid-cols-4 w-full text-primary text-base font-sans font-bold">
              <th className="col-span-1">Nome</th>
              <th className="col-span-1">Endereço</th>
              <th className="col-span-1">CEP</th>
              <th className="col-span-1">Celular/Telefone</th>
            </tr>
          </thead>
          <tbody className="w-full flex flex-col">
            {
              filteredCustomers.map((customer, index) =>{
               return(
                <tr className={`w-full grid grid-cols-4 font-sans text-base font-medium border border-[#D9D9D9] py-2 ${ index === customers.length - 1 ? '!rounded-b-2xl' :''}`} key={index}>
                  <td className={classTd}>{customer.name}</td>
                  <td className={classTd}>{customer.address}</td>
                  <td className={classTd}>{customer.zipcode}</td>
                  <td className={classTd}>{customer.phone}</td>
                </tr>
               )
              })
            }
          </tbody>
        </table>
      </div>
      {
        showModal && (
          <Modal onClose={() => handleCloseForm} onSubmit={() =>handleSendForm}>
            <div className="w-full flex flex-col justify-center items-center gap-6">
              <TextInput
                label="Nome:"
                icon={false}
                className="w-full"
                onChange={(event) => setName(event.target.value)}
              />
              <div className="w-full flex justify-between items-center">
                <TextInput
                  label="CEP:"
                  icon={false}
                  className="w-11/12"
                  onChange={(event) => setZipcode(event.target.value)}
                />
                <TextInput
                  label="Endereço:"
                  icon={false}
                  className="w-72"
                  onChange={(event) => setAddress(event.target.value)}
                />
              </div>
              <TextInput
                  label="Celular/Telefone:"
                  icon={false}
                  className="w-full"
                  onChange={(event) => setPhone(event.target.value)}
                />
            </div>
          </Modal>
        )

      }
    </Base>
  );
}
