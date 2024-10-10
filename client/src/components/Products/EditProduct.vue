<template>
    <div class="edit-product-container">
        <h1>Edit Product</h1>
        <form v-on:submit.prevent="editProduct" class="edit-form">
            <div class="image-preview">
                <img :src="BASE_URL + product.picture" alt="Product image">
            </div>

            <div class="form-group">
                <label>Title:</label>
                <input type="text" v-model="product.title" placeholder="Enter product title">
            </div>

            <div class="form-group">
                <label>Description:</label>
                <input type="text" v-model="product.content" placeholder="Enter product description">
            </div>

            <div class="form-group">
                <label>Brand:</label>
                <select v-model="product.brand" placeholder="Enter brand name" class="custom-select">
                    <option value="dior">Dior</option>
                    <option value="ysl">YSL</option>
                    <option value="chanel">Chanel</option>
                    <option value="coco">Coco</option>
                    <option value="jo malone">Jo Malone London</option>
                    <option value="lancome">Lancôme</option>
                </select>
            </div>

            <div class="form-group">
                <label>Size:</label>
                <div class="radio-group">
                    <label>
                        <input type="radio" v-model="product.size" value="15"> 15 ml.
                    </label>
                    <label>
                        <input type="radio" v-model="product.size" value="20"> 20 ml.
                    </label>
                    <label>
                        <input type="radio" v-model="product.size" value="30"> 30 ml.
                    </label>
                    <label>
                        <input type="radio" v-model="product.size" value="40"> 40 ml.
                    </label>
                    <label>
                        <input type="radio" v-model="product.size" value="50"> 50 ml.
                    </label>
                </div>
            </div>

            <div class="form-group">
                <label>Price:</label>
                <input type="text" v-model="product.price" placeholder="Enter product price">
            </div>

            <div class="button-group">
                <button type="submit" class="update-button">Update</button>
                <button type="button" class="back-button" v-on:click="navigateTo('/allproduct')">Back</button>
            </div>
        </form>
    </div>
</template>

<script>
import ProductsService from '@/services/ProductsService'

export default {
    data() {
        return {
            product: {
                title: '',
                pictures: 'null',
                content: '',
                brand: '',
                size: '',
                price: 0.00,
            },
            BASE_URL: "http://localhost:8081/assets/uploads/",
        }
    },
    methods: {
        async editProduct() {
            try {
                await ProductsService.put(this.product)
                this.$router.push({
                    name: 'allproduct'
                })
            } catch (err) {
                console.log(err)
            }
        },
        navigateTo(route) {
            this.$router.push(route)
        }
    },
    async created() {
        try {
            let productId = this.$route.params.productId
            this.product = (await ProductsService.show(productId)).data
        } catch (error) {
            console.log(error)
        }
    },
}
</script>

<style scoped>
.edit-product-container {
    padding: 20px;
    max-width: 1200px;
    margin: 0 auto;
}

h1 {
    font-size: 1.8em;
    color: #333;
    text-align: center;
    margin-bottom: 20px;
}

.image-preview img {
    width: 100%;
    max-width: 150px;
    border-radius: 8px;
    display: block;
    margin: 0 auto 20px;
}

.form-group {
    display: flex;
    flex-direction: column;
    margin-bottom: 15px;
}

.form-group label {
    font-weight: bold;
    color: #666;
    margin-bottom: 5px;
}

.form-group input,
.form-group select {
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    outline: none;
    font-size: 1em;
    transition: border-color 0.3s ease;
}

.form-group input:focus,
.form-group select:focus {
    border-color: #888;
}

/* Styling for the custom brand dropdown */
.custom-select {
    padding: 12px;
    background-color: #f5f5f5;
    border: 1px solid #ccc;
    border-radius: 8px;
    font-size: 1em;
    color: #555;
    appearance: none;
    cursor: pointer;
    transition: background-color 0.3s, border-color 0.3s;
}

.custom-select:hover {
    background-color: #eee;
    border-color: #888;
}

.custom-select:focus {
    background-color: #fff;
    border-color: #555;
}

/* Styling for Radio Group */
.radio-group {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
}

.radio-group label {
    display: flex;
    align-items: center;
    gap: 5px;
    cursor: pointer;
    font-weight: normal;
}

.radio-group input[type="radio"] {
    width: 18px;
    height: 18px;
    margin-right: 5px;
}

/* Button Group Styling */
.button-group {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
}

.update-button {
    padding: 10px 20px;
    background-color: #333;
    color: white;
    border: none;
    border-radius: 5px;
    font-weight: bold;
    cursor: pointer;
    transition: background-color 0.3s ease, transform 0.2s ease;
}

.update-button:hover {
    background-color: #000;
    transform: translateY(-2px);
}

.back-button {
    padding: 10px 20px;
    background-color: #ccc;
    color: white;
    border: none;
    border-radius: 5px;
    font-weight: bold;
    cursor: pointer;
    transition: background-color 0.3s ease, transform 0.2s ease;
}

.back-button:hover {
    background-color: #aaa;
    transform: translateY(-2px);
}
</style>
