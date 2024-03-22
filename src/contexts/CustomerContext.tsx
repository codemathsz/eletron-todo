import { useCallback, useEffect, useState } from "react"
import { createContext } from "use-context-selector"
import { API } from "../lib/axios"

interface ICustomer{
  id?: string
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
  createCustomer: (data: ICustomer) => Promise<void>
  deleteCustomer: (data: ICustomer) => Promise<void>
}

export const CustomersContext = createContext({} as CustomerContextType)

export function CustomerProvider({children}: ICustomerProviderProps){
  const [customers, setCustomers] = useState<ICustomer[]>([])

  const fetchCustomers  = useCallback(async (query?: string) => {
    try {
      const { data } = await API.get('/customers', {
        params: {
          q: query
        }
      })
      setCustomers(data)
    } catch (error) {
      console.error(error)
      throw error
    }
  }, [])

  const createCustomer = useCallback(async (data: ICustomer) => {
    try {
      await API.post('/customer', data)
    } catch (error) {
      console.error(error)
      throw error
    }
  }, [])

  const deleteCustomer = useCallback(async (data: ICustomer) => {
    try {
      await API.delete(`/customer/${data.id}`)
    } catch (error) {
      console.error(error)
      throw error
    }
  },[])

  useEffect(() => {
    fetchCustomers()
    console.log(customers);

  },[])
  return(
    <CustomersContext.Provider
      value={{
        customers,
        fetchCustomers,
        createCustomer,
        deleteCustomer
      }}
    >
      {children}
    </CustomersContext.Provider>
  )
}
