
const modifyList = list => {
    //reduce price
    const reducedPrice = list.map( product => ({
        price: product.price/2,
        title: product.title,
        description: product.description,
        image: product.image
    }))

    //shuffle
    return reducedPrice
    .map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value)
}

export default modifyList;