import {$authHost, $host} from "./index";

export const createUserInfo = async (profileInfo) => {
  const {data} = await $authHost.post('api/userInfo', profileInfo)
  return data
}

export const rewriteUserInfo = async (profileInfo) => {
  const {data} = await $authHost.put('api/userInfo', profileInfo)
  return data
}

export const fetchUserInfo= async (userId) => {
  const {data} = await $host.get('api/userInfo', {params: {userId}})
  return data
}

export const rewriteUserImg = async (profileImg) => {
  const {data} = await $authHost.put('api/userImg', profileImg)
  return data
}

export const fetchUserImg= async (userId) => {
  const {data} = await $host.get('api/userImg', {params: {userId}})
  return data
}
