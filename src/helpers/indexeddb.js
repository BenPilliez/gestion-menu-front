import {Store,get, set} from "idb-keyval"

export const createDbStore = async (name) => {
    try {
       return await new Store(name)
    } catch (error) {
        throw new Error(error)
    }

}

export const setInDb = async (key, data) => {

    try {
        const getData = await get(key);
        if (getData && typeof getData === "object") {
            const copyData = [...getData, data]
            await set(key, copyData)
            return copyData
        } else {
            await set(key, data)
        }
    } catch (err) {
        throw new Error(err)
    }
}

export const getDb = async (key) => {
    try {
        return await get(key)

    } catch (err) {
        throw  new Error(err)
    }
}
