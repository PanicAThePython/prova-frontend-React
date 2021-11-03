export function toNumber(array){
    let items = array
    for (let i = 0; i < items.length; i++){
        items[i] = parseInt(items[i])
    }
    return items
}
