import {$authHost, $host} from "./index";

export const AddToFavourite = async (device) => {
    const {data} = await $authHost.post('api/favourites', device)
    return data
}

export const fetchFavouriteDevices = async (userId) => {
    const {data} = await $host.get('api/favourites', {params: {userId}})
    return data
}

export const fetchOneFavourite = async (userId, deviceId) => {
    const {data} = await $host.get('api/favourites/check', {params:{userId, deviceId}})
    return data
}

export const deleteFavouriteDevice = async (userId, deviceId) => {
    const {data} = await $authHost.delete('api/favourites', {params:{userId, deviceId}})
    return data
}