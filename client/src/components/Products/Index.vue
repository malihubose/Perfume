<template>
    <div class="products-container">
        <h4>products: {{ filteredProducts.length }}</h4>

        <!-- Search input and brand filter buttons -->
        <div class="search-container">
            <input type="text" v-model="searchQuery" placeholder="Search name or brand" />
        </div>
        <div class="brand-buttons">
            <button v-for="brand in uniqueBrands" :key="brand" @click="filterByBrand(brand)">
                {{ brand }}
            </button>
            <button @click="clearBrandFilter">Clear</button>
        </div>

        <!-- Display products as cards -->
        <div class="product-grid">
            <div v-for="product in filteredProducts" :key="product.id" class="product-card">
                <img :src="BASE_URL + product.picture" alt="product image" class="product-image">
                <div class="product-info">
                    <h3 class="product-title">{{ product.title }}</h3>
                    <p class="product-brand">{{ product.brand }}</p>
                    <p class="product-price">฿ {{ product.price }}</p>
                    <button @click="navigateTo('/product/' + product.id)" class="view-product-button">View</button>
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
            products: [],
            BASE_URL: "http://localhost:8081/assets/uploads/",
            searchQuery: '',
            selectedBrand: '',
        }
    },
    computed: {
        filteredProducts() {
            return this.products.filter(product => {
                const matchesTitleOrBrand = product.title.includes(this.searchQuery) || product.brand.includes(this.searchQuery)
                const matchesBrand = this.selectedBrand ? product.brand === this.selectedBrand : true
                return matchesTitleOrBrand && matchesBrand
            })
        },
        uniqueBrands() {
            return [...new Set(this.products.map(product => product.brand))]
        }
    },
    async created() {
        this.products = (await ProductsService.index()).data
    },
    methods: {
        navigateTo(route) {
            this.$router.push(route)
        },
        async deleteProduct(product) {
            let result = confirm("Want to delete?")
            if (result) {
                try {
                    await ProductsService.delete(product)
                    this.refreshData()
                } catch (err) {
                    console.log(err)
                }
            }
        },
        async refreshData() {
            this.products = (await ProductsService.index()).data
        },
        filterByBrand(brand) {
            this.selectedBrand = brand
        },
        clearBrandFilter() {
            this.selectedBrand = ''
        }
    }
}
</script>

<style scoped>
/* Container to add padding around the content */
.products-container {
    padding: 20px;
    max-width: 1200px;
    margin: 0 auto;
}

/* General container styles */
.search-container {
    margin-bottom: 15px;
}

.search-container input[type="text"] {
    width: 100%;
    padding: 12px 20px;
    border: 1px solid #ccc;
    border-radius: 20px;
    font-size: 1em;
    outline: none;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    transition: box-shadow 0.3s ease, border-color 0.3s ease;
}

.search-container input[type="text"]::placeholder {
    color: #aaa;
}

.search-container input[type="text"]:hover {
    border-color: #b9dff5;
}

.search-container input[type="text"]:focus {
    border-color: #b9dff5;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}


.brand-buttons {
    margin-bottom: 20px;
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
}

.brand-buttons button {
    background: linear-gradient(135deg, #b9dff5, #d0b9f5);
    color: #333;
    padding: 10px 20px;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-size: 0.9em;
    font-weight: bold;
    transition: all 0.3s ease;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

/* Specific style for the "Clear Brand Filter" button */
.brand-buttons button:last-child {
    background: #f44336;
    color: #fff;
    font-weight: bold;
}

.brand-buttons button:last-child:hover {
    background: #d32f2f;
    box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
    transform: translateY(-3px);
}

.brand-buttons button:hover {
    background: linear-gradient(135deg,#f3b8d1 );
    box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
    transform: translateY(-3px);
}

.product-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 20px;
}

/* Product card styles */
.product-card {
    border: 1px solid #dfdfdf;
    padding: 20px;
    background-color: #fff;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    text-align: center;
    transition: transform 0.2s, box-shadow 0.2s;
}

.product-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}

.product-image {
    width: 150px;
    height: 200px;
    object-fit: cover;
    margin-bottom: 15px;
    transition: transform 0.3s;
}

.product-card:hover .product-image {
    transform: scale(1.1);
}

.product-info {
    margin-top: 10px;
}

.product-title {
    font-size: 1.1em;
    font-weight: bold;
    color: #333;
    margin-bottom: 8px;
}

.product-brand {
    font-size: 0.9em;
    color: #888;
    margin-bottom: 5px;
}

.product-price {
    font-size: 1.2em;
    color: #e91e63;
    font-weight: bold;
    margin: 10px 0;
}

/* Button styles */
.view-product-button,
.delete-product-button {
    display: inline-block;
    width: calc(50% - 5px);
    padding: 10px;
    margin-top: 10px;
    border: none;
    border-radius: 5px;
    font-size: 0.9em;
    cursor: pointer;
    transition: background-color 0.3s, transform 0.3s ease;
}

.view-product-button {
    background: linear-gradient(135deg, #b9dff5, #d0b9f5); /* Gradient color */
    color: #333;
    font-weight: bold;
    margin-right: 5px;
}

.view-product-button:hover {
    background: linear-gradient(135deg,#f3b8d1 ); /* Reversed gradient for hover */
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
    transform: translateY(-3px);
}

.delete-product-button {
    background-color: #f44336;
    color: #fff;
}

.delete-product-button:hover {
    background-color: #d32f2f;
}
</style>
