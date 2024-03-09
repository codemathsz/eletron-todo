import { useCallback, useEffect, useState } from "react"
import { createContext } from "use-context-selector"

interface ICustomer{
  name: string
  phone: string
  address: string
  zipcode: string
}

interface ICustomerProviderProps{
  children: React.ReactNode
}

interface CustomerContextType {
  customers: ICustomer[]
  fetchCustomers: () => Promise<void>
  createCustomers: (data: ICustomer) => Promise<void>
}

export const CustomersContext = createContext({} as CustomerContextType)

export function CustomerProvider({children}: ICustomerProviderProps){
  const [customers, setCustomers] = useState<ICustomer[]>([])

  const fetchCustomers  = useCallback(async (query?: string) => {}, [])

  const createCustomers = useCallback(async (data: ICustomer) => {}, [])

  useEffect(() => {
    setCustomers([
      {
        name: "Matheus Oliveira",
        address: "Rua do Parque",
        zipcode: "12345-678",
        phone: "1234-567-890",
      },
      {
        name: "João Silva",
        address: "Avenida Principal",
        zipcode: "98765-432",
        phone: "9876-543-210",
      },
      {
        name: "Maria Souza",
        address: "Praça Central",
        zipcode: "56789-012",
        phone: "5678-901-234",
      },
      {
        name: "Carlos Santos",
        address: "Travessa da Colina",
        zipcode: "34567-890",
        phone: "3456-789-012",
      },
      {
        name: "Ana Oliveira",
        address: "Alameda das Flores",
        zipcode: "90123-456",
        phone: "9012-345-678",
      },
      {
        name: "Pedro Rocha",
        address: "Largo do Sol",
        zipcode: "23456-789",
        phone: "2345-678-901",
      },
    ])
  })
  return(
    <CustomersContext.Provider
      value={{
        customers,
        fetchCustomers,
        createCustomers
      }}
    >
      {children}
    </CustomersContext.Provider>
  )
}
