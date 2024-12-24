import axios from "@/utils/axios.customize"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { Platform } from "react-native"

export const registerAPI = (email: string, password: string, name: string) => {
    const url = `/auth/register`
    return axios.post<IBackendRes<IRegister>>(url, { email, password, name })
}

export const verifyCodeAPI = (email: string, code: string) => {
    const url = `/auth/verification`
    return axios.post<IBackendRes<IRegister>>(url, { email, code })
}

export const resendCodeAPI = (email: string, code: string) => {
    const url = `/auth/register`
    return axios.post<IBackendRes<IRegister>>(url, { email, code })
}

export const loginAPI = (email: string, password: string) => {
    const url = `/auth/login`
    return axios.post<IBackendRes<IUserLogin>>(url, { email, password })
}

export const resetPasswordAPI = (email: string) => {
    const url = `/auth/forgotPassword`
    return axios.post<IBackendRes<IRegister>>(url, { email })
}

export const getAccountAPI = () => {
    const url = `/auth/get-account`
    return axios.get<IBackendRes<IRegister>>(url)
}

export const getTopRestaurantAPI = (ref: string) => {
    const url = `/restaurant/${ref}`
    return axios.post<IBackendRes<ITopRestaurant[]>>(url, {}, {
        headers: {delay: 3000}
    })
}

export const getRestaurantByIdAPI = (id: string) => {
    const url = `/restaurant/${id}`    
    return axios.get<IBackendRes<IRestaurant>>(url, {
        headers: {delay: 3000}
    })
}

export const getURLBaseBackend = () => {
    const backend = Platform.OS === "android"
      ? process.env.EXPO_PUBLIC_ANDROID_API_URL
      : process.env.EXPO_PUBLIC_IOS_API_URL;
  
    return backend;
  };

//check async storage
export const printAsyncStorage = () => {
    AsyncStorage.getAllKeys((err, keys) => {
    AsyncStorage.multiGet(keys!, (error, stores) => {
    let asyncStorage: any = {}
    stores?.map((result, i, store) => {
    asyncStorage[store[i][0]] = store[i][1]
});
    console.log(JSON.stringify(asyncStorage, null, 2));
});
 });
};
    

export const processDataRestaurantMenu = (restaurant: IRestaurant | null) => {
    if (!restaurant) return [];
    return restaurant?.menu?.map((menu, index) => {
        return {
            index,
            key: menu._id,
            title: menu.title,
            data: menu.menuItem
    }
})
}

export const currencyFormatter = (value: any) => {
    const options = {
        signicantDigits: 2,
        thousandsSeparator: '.',
        decimalSeparator: ',',
        symbol: 'đ'
    }
    if (typeof value !== 'number') value = 0.0
        value = value.toFixed(options.signicantDigits)
    const [currency, decimal] = value.split('.')
        return `${currency.replace(
            /\B(?=(\d{3})+(?!\d))/g,
            options.thousandsSeparator
        )} ${options.symbol}`
}
    