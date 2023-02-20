import {$authHost, $host} from "./index";

export const createDevice = async (device) => {
  const {data} = await $authHost.post('api/device', device)
  return data
}

export const fetchDevices = async (categoryId, offerTypeId, page, limit= 5) => {
  const {data} = await $host.get('api/device', {params: {
      categoryId, offerTypeId, page, limit
    }})
  return data
}

export const fetchUserDevices = async (userId) => {
  const {data} = await $host.get('api/device/userDevices', {params: {userId}})
  return data
}

export const fetchOneDevice = async (id) => {
  const {data} = await $host.get('api/device/' + id)
  return data
}

export const deleteDevice = async (id) => {
  const {data} = await $authHost.delete('api/device', {params: {id}})
  return data
}