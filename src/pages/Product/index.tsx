import { useEffect, useState } from "react";
import { Base } from "../../components/Base";
import TextInput from "../../components/TextInput";
import { Button } from "../../components/Button";
import { useContextSelector } from "use-context-selector";
import { ProductsContext } from "../../contexts/ProductContext";
import { Modal } from "../../components/Modal";
import { Controller, useForm } from "react-hook-form";
import * as z from 'zod'
import { zodResolver } from "@hookform/resolvers/zod";
import InputFile from "../../components/InputFile";

const formSchema = z.object({
  id: z.string().optional(),
  img: z.instanceof(File),
  name: z.string().min(1, "Campo obrigatório."),
  price: z.string().min(1, "Campo obrigatório."),
})

type formInputs = z.infer<typeof formSchema>
export function Product(){
  const products = useContextSelector(
    ProductsContext,
    (context) => context.products
  )
  const createProduct = useContextSelector(
    ProductsContext,
    (context) => context.createProduct
  )

  const fetchProducts = useContextSelector(
    ProductsContext,
    (context) => context.fetchProducts
  )
  const [showModal, setShowModal] = useState<boolean>(false);
  const [searchProduct, setSearchProduct] = useState<string>('')
  const [file, setFile] = useState<File>()
  const classTd = "col-span-1 flex justify-center items-center truncate"
  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = useForm<formInputs>({
    resolver: zodResolver(formSchema)
  })

  const handleCloseForm = () => {
    setShowModal(false)
  }

  async function handleSendForm(data:formInputs ) {
    console.log(data.img);

    const response = await createProduct(data.img, data.name, data.price)
    await fetchProducts()
  }

  console.log(products);

  const handleSearchChange = (event: any) =>{
    setSearchProduct(event.target.value)
  }

  const filteredProducts = searchProduct
  ? products.filter(product =>
      product.name.toLowerCase().includes(searchProduct.toLowerCase())
    )
  : products;
  return(
    <Base>
      <div className="w-full flex justify-start items-center">
        <h1 className="text-3xl text-primary font-medium">Produtos</h1>
      </div>
      <div className="w-full flex justify-between items-center">
        <TextInput
          className="w-3/4 mr-4"
          placeholder="Buscar produtos"
          value={searchProduct}
          onChange={handleSearchChange}
          icon
        />
        <Button
          icon
          label="Novo produto"
          className="w-44 !border-none hover:opacity-85 text-white"
          title="Adicionar Novo Produto"
          onClick={() => setShowModal(true)}
        />
      </div>
      <div className="w-full">
        <table className="w-full flex flex-col border border-[#B4B4B4] !rounded-2xl">
          <thead className="bg-[#F9F9F9] rounded-t-2xl px-2">
            <tr className="grid grid-cols-4 w-full text-primary text-base font-sans font-bold">
              <th className="col-span-1">Produto</th>
              <th className="col-span-1">nome</th>
              <th className="col-span-1">preço</th>
              <th className="col-span-1">Editar</th>
            </tr>
          </thead>
          <tbody className="w-full flex flex-col">

            {
              filteredProducts.map((product, index) =>{
                return(
                  <tr className={`w-full grid grid-cols-4 font-sans text-base font-medium border border-[#D9D9D9] py-2`} key={index}>
                    <td className={classTd}><img className="w-4/5 h-auto max-h-32" src={require(`../../main/uploads/${product.id}/imagem.png`)} alt="" /></td>
                    <td className={classTd}>{product.name} </td>
                    <td className={classTd}>{product.price}</td>
                    <td className={classTd}>X</td>
                  </tr>

                )
              })
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
                name="img"
                render={({ field, fieldState }) => (
                  <InputFile
                    ref={field.ref}
                    onChange={(file) => field.onChange(file.target.value)}
                    file={(file) => setFile(file)}
                    label="Imagem do produto"
                    className="w-full"
                    icon={false}
                    error={fieldState.error}
                  />
                )}
              />
              <Controller
                control={control}
                name="name"
                render={({ field }) => (
                  <TextInput
                    ref={field.ref}
                    value={field.value}
                    onChange={field.onChange}
                    label="Nome:"
                    className="w-full"
                    icon={false}
                  />
                )}
              />
              <Controller
                control={control}
                name="price"
                render={({ field }) => (
                  <TextInput
                    ref={field.ref}
                    value={field.value}
                    onChange={field.onChange}
                    label="Preço:"
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
  )
}
