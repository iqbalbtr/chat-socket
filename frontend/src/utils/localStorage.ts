export function getLocalItem<T>(name: string, callback: (status: boolean, result?: T) => void){
    
    const get = window.localStorage.getItem(name);

    if(get === null) return callback(false);
    
    try {
        const parse: T = JSON.parse(get);
        return parse
    } catch (error) {
        return get;
    }
}

export function storeLocalItem(value: string, name: string, callback: (status: boolean) => void){
    
    const get = window.localStorage.setItem(JSON.stringify(value), name);

    callback(true)
}