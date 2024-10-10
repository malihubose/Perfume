module.exports = (sequelize, DataTypes) => {
    const Product = sequelize.define('Product', {
        title: DataTypes.STRING,
        picture: DataTypes.STRING,
        content: DataTypes.TEXT,
        brand: DataTypes.STRING,
        size: DataTypes.STRING,
        price: DataTypes.FLOAT,
    })
    return Product
}
