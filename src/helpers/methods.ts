export const qtyToArray = (qty: number) => {
    const array = []
    for (let i = 0; i < qty; i++) {
        array.push(i);
    }
    return array;
};