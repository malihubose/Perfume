<template>
    <div class="product-container">
        <!-- Back Button -->
        <button class="back-button" v-on:click="navigateTo('/products')">Back</button>

        <!-- Product Display Section -->
        <div class="product-display">
            <!-- Product Image -->
            <div class="product-image-container">
                <img :src="BASE_URL + product.picture" alt="product image" class="product-image">
            </div>

            <!-- Product Details -->
            <div class="product-details">
                <h2 class="product-brand">{{ product.brand }}</h2>
                <h1 class="product-title">{{ product.title }}</h1>
                <p class="product-description">{{ product.content }}</p>
                <p class="product-size">size: {{ product.size }} ml</p>
                <div class="product-price-section">
                    <span class="product-price">฿{{ product.price }}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import ProductsService from '@/services/ProductsService'
export default {
    data() {
        return {
            product: null,
            BASE_URL: "http://localhost:8081/assets/uploads/",
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
    methods: {
        navigateTo(route) {
            this.$router.push(route)
        },
    }
}
</script>

<style scoped>
.product-container {
    padding: 20px;
    max-width: 1000px;
    margin: 0 auto;
    font-family: Arial, sans-serif;
    position: relative;
}

/* Back Button Styling */
.back-button {
    position: absolute;
    top: 20px;
    left: 20px;
    background-color: #333;
    color: #fff;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 1em;
    font-weight: bold;
    transition: background-color 0.3s ease;
}

.back-button:hover {
    background-color: #000;
}

/* Product Display Flex Layout */
.product-display {
    display: flex;
    gap: 30px;
    margin-top: 60px;
}

/* Product Image Styling */
.product-image-container {
    flex: 1;
    max-width: 50%;
}

.product-image {
    width: 100%;
    border-radius: 8px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

/* Product Details Styling */
.product-details {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.product-brand {
    font-size: 1.2em;
    color: #666;
    font-weight: bold;
}

.product-title {
    font-size: 1.8em;
    font-weight: bold;
    color: #333;
    margin-bottom: 10px;
}

.product-description {
    font-size: 1em;
    color: #666;
    margin-bottom: 15px;
}

.product-size {
    font-size: 0.9em;
    color: #888;
    margin-bottom: 15px;
}

/* Product Price and Discount */
.product-price-section {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 20px;
}

.product-price {
    font-size: 1.8em;
    font-weight: bold;
    color: #e91e63;
}


</style>
