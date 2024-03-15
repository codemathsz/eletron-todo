import { useState } from "react";
import { Base } from "../../components/Base";
import { Button } from "../../components/Button";
import TextInput  from "../../components/TextInput";
import { CustomersContext } from "../../contexts/CustomerContext";
import { useContextSelector } from "use-context-selector";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod'
import {Modal}  from "../../components/Modal";
import { FaTrash } from 'react-icons/fa'
import * as z from 'zod'

const formSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, "Campo obrigatório."),
  phone: z.string().min(1, "Campo obrigatório."),
  address: z.string().min(1, "Campo obrigatório."),
  zipcode: z.string().min(1, "Campo obrigatório.")
})

type formInputs = z.infer<typeof formSchema>

export function Customer() {
  const customers = useContextSelector(
    CustomersContext,
    (context) =>{
      return context.customers
    }
  )

  const createCustomer = useContextSelector(
    CustomersContext,
    (context) =>{
      return context.createCustomer
    }
  )

  const fetchCustomers = useContextSelector(
    CustomersContext,
    (context) =>{
      return context.fetchCustomers
    }
  )

  const deleteCustomer = useContextSelector(
    CustomersContext,
    (context) =>{
      return context.deleteCustomer
    }
  )
  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = useForm<formInputs>({
    resolver: zodResolver(formSchema)
  })

  const [showModal, setShowModal] = useState<boolean>(false);
  const [searchCustomer, setSearchCustomer] = useState<string>('')
  const classTd = "col-span-1 flex justify-center items-center max-w-80"

  const handleCloseForm = () => {
    setShowModal(false)
  }

  const handleSearchChange = (event: any) =>{
    setSearchCustomer(event.target.value)
  }

  async function handleSendForm(data:formInputs ) {
    await createCustomer(data)
    await fetchCustomers()
    handleCloseForm()
  }

  async function handleExcludeCustomer(data:formInputs):Promise<void>{
    await deleteCustomer(data)
    await fetchCustomers()
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
          onChange={handleSearchChange}
          icon
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
            <tr className="grid grid-cols-5 w-full text-primary text-base font-sans font-bold">
              <th className="col-span-1">Nome</th>
              <th className="col-span-1">Endereço</th>
              <th className="col-span-1">CEP</th>
              <th className="col-span-1">Celular/Telefone</th>
              <th className="col-span-1">Excluir</th>
            </tr>
          </thead>
          <tbody className="w-full flex flex-col">
            {
              filteredCustomers.map((customer, index) =>{
               return(
                <tr className={`w-full grid grid-cols-5 font-sans text-base font-medium border border-[#D9D9D9] py-2 px-3 ${ index === customers.length - 1 ? '!rounded-b-2xl' :''}`} key={index}>
                  <td className={classTd}>
                    <div className="truncate">{customer.name}</div>
                  </td>
                  <td className={classTd}>
                    <div className="truncate">{customer.address}</div>
                  </td>
                  <td className={classTd}>
                    <div className="truncate">{customer.zipcode}</div>
                  </td>
                  <td className={classTd}>
                    <div className="truncate">{customer.phone}</div>
                  </td>
                  <td onClick={() => handleExcludeCustomer(customer)} className="w-full max-w-14 mx-auto text-red-600  col-span-1 flex justify-center items-center truncate cursor-pointer" title="excluir cliente">
                    <FaTrash/>
                  </td>
                </tr>
               )
              })
            }
            {
              filteredCustomers.length === 0 &&
              (
                <tr className="w-full mx-auto font-sans text-base font-medium border border-[#D9D9D9] py-4 !rounded-b-2xl">
                  <td className='w-full mx-auto col-span-1 flex justify-center items-center truncate '>Nenhum cliente encontrado.</td>
                </tr>
              )
            }
          </tbody>
        </table>
      </div>
      {
        showModal && (
            <Modal onClose={() => handleCloseForm()} onSubmit={handleSubmit(handleSendForm)} isSubmitting={isSubmitting}>
              <div className="w-full flex flex-col justify-center items-center gap-6">
                <Controller
                  control={control}
                  name="name"
                  render={({ field, fieldState }) => (
                    <TextInput
                      ref={field.ref}
                      value={field.value || ''}
                      onChange={field.onChange}
                      label="Nome:"
                      className="w-full"
                      icon={false}
                      error={fieldState.error}
                    />
                  )}
                />
                <div className="w-full flex justify-between items-center gap-2">
                  <Controller
                    control={control}
                    name="zipcode"
                    render={({ field }) => (
                      <TextInput
                        ref={field.ref}
                        value={field.value || ''}
                        onChange={field.onChange}
                        label="CEP:"
                        className="w-full"
                        icon={false}
                      />
                    )}
                  />
                  <Controller
                    control={control}
                    name="address"
                    render={({ field }) => (
                      <TextInput
                        ref={field.ref}
                        value={field.value || '' }
                        onChange={field.onChange}
                        label="Endereço:"
                        className="w-full"
                        icon={false}
                      />
                    )}
                  />
                </div>
                <Controller
                  control={control}
                  name="phone"
                  render={({ field }) => (
                    <TextInput
                      ref={field.ref}
                      value={field.value || ''}
                      onChange={field.onChange}
                      label="Celular/Telefone:"
                      className="w-full"
                      icon={false}
                    />
                  )}
                />
              </div>
            </Modal>
        )

      }
    </Base>
  );
}
