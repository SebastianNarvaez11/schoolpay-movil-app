import AsyncStorage from '@react-native-async-storage/async-storage';

export const setData = async (key, value) => {
    try {
        return await AsyncStorage.setItem(key, value)
    } catch (e) {
        console.log(e)
    }
}

export const getData = async (key) => {
    try {
        const value = await AsyncStorage.getItem(key)
        // if (value !== null) {
        //     return console.log(value)
        // }
        return value
    } catch (e) {
        console.log(e)
        return false
    }
}


export const delData = async (key) => {
    try {
        return await AsyncStorage.removeItem(key)
    } catch (e) {
        console.log(e)
        return false
    }
}
