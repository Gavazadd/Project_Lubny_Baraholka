import {$authHost, $host} from "./index";

export const createUserInfo = async (profileInfo) => {
  const {data} = await $authHost.post('api/userInfo', profileInfo)
  return data
}

export const fetchUserInfo= async (userId) => {
  const {data} = await $host.get('api/userInfo', {params: {userId}})
  return data
}
