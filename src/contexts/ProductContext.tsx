import { useCallback, useEffect, useState } from "react";
import { createContext } from "use-context-selector";
import { API } from "../lib/axios";

interface IProduct{
  id?: string
  img: File;
  name: string;
  price: string;
}

interface IProductProviderProps{
  children: React.ReactNode
}

interface ProductContextType {
  products: IProduct[],
  fetchProducts: () => Promise<void>
  createProduct: (img: File, name: string, price: string) => Promise<void>
  deleteProduct: (id: string) => Promise<void>
}

export const ProductsContext = createContext({} as ProductContextType)

export function ProductProvider({children}:IProductProviderProps){
  const [products, setProducts] = useState<IProduct[]>([])

  const fetchProducts = useCallback(async (query?: string) => {
    const { data } = await API.get('/products', {
      params: {
        q: query
      }
    })
    setProducts(data)
  }, [])

  const createProduct = useCallback(async (img: File, name: string, price: string) => {
    const formData = new FormData();
    formData.append('img', img);
    formData.append('name', name);
    formData.append('price', price);

    try {
      await API.post('/product', formData);
      await new Promise((resolve) => setTimeout(resolve, 1000));
    } catch (error) {
      throw error
    }
  },[])

  const deleteProduct = useCallback(async (id: string) => {
    try {
      await API.delete(`/product/${id}`)
    } catch (error) {
      throw error
    }
  },[])

  useEffect(() => {
    fetchProducts()
  },[])

  return(
    <ProductsContext.Provider
      value={{
        products,
        fetchProducts,
        createProduct,
        deleteProduct
      }}
    >
      {children}
    </ProductsContext.Provider>
  )
}
