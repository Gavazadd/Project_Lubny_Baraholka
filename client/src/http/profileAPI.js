import {$authHost, $host} from "./index";

export const createProfile = async (profileInfo) => {
  const {data} = await $authHost.post('api/profile', profileInfo)
  return data
}
