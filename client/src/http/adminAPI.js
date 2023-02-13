import {$authHost, $host} from "./index";

export const createCategory = async (category) => {
  const {data} = await $authHost.post('api/category', category)
  return data
}

export const deleteCategory = async (category) => {
  const {data} = await $authHost.delete('api/category', { data: category  })
  return data
}

export const fetchCategories = async () => {
  const {data} = await $host.get('api/category')
  return data
}

export const createOfferType = async (offerType) => {
  const {data} = await $authHost.post('api/type', offerType)
  return data
}

export const deleteOfferType = async (offerType) => {
  const {data} = await $authHost.delete('api/type', { data: offerType  })
  return data
}

export const fetchOfferTypes = async () => {
  const {data} = await $host.get('api/type', )
  return data
}