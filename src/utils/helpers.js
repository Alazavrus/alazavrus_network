export const updateObjInArray = (items, updateItemId, findPropsName, updateProps) => {
    return items.map(item => {
        return item["id"] === updateItemId
            ? {...item, ...updateProps}
            : item;
    })
}