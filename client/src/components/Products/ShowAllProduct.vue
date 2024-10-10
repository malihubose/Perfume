<template>
    <div class="content-container">
        <p align="right">
            <button class="create-product-button" v-on:click="navigateTo('/product/create')">Add Perfume</button>
        </p>
        <!-- Search input and brand filter -->
        <div class="search-container">
            <input type="text" v-model="searchQuery" @input="filterProducts" placeholder="Search name or brand" />
            <select v-model="selectedBrand" @change="filterProducts">
                <option value="">All</option>
                <option v-for="brand in uniqueBrands" :key="brand" :value="brand">
                    {{ brand }}
                </option>
            </select>
            <button @click="filterProducts">Search</button>
        </div>
        <h3>All Perfume: {{ filteredProducts.length }}</h3>
        <!-- Product table display -->
        <div v-if="filteredProducts.length > 0">
            <table class="product-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Image</th>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Brand</th>
                        <th>View</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="product in filteredProducts" :key="product.id">
                        <td>{{ product.id }}</td>
                        <td>
                            <img :src="BASE_URL + product.picture" alt="product image" class="product-image" />
                        </td>
                        <td>{{ product.title }}</td>
                        <td>{{ product.content }}</td>
                        <td>{{ product.brand }}</td>
                        <td>
                            <button v-on:click="navigateTo('/product/' + product.id)"><i class="fa fa-eye"></i></button>
                        </td>
                        <td>
                            <button v-on:click="navigateTo('/product/edit/' + product.id)"><i
                                    class="fas fa-pen"></i></button>
                        </td>
                        <td>
                            <button v-on:click="deleteProduct(product)"><i class="fas fa-trash-alt"></i></button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <div v-else>
            <p>No products available</p>
        </div>
    </div>
</template>

<script>
import ProductsService from '@/services/ProductsService';

export default {
    data() {
        return {
            products: [],
            filteredProducts: [],
            searchQuery: '',
            selectedBrand: '',
            BASE_URL: "http://localhost:8081/assets/uploads/"
        };
    },
    async created() {
        const response = await ProductsService.index();
        this.products = response.data;
        this.filteredProducts = this.products;
    },
    computed: {
        uniqueBrands() {
            const brands = this.products.map(product => product.brand);
            return [...new Set(brands)];
        }
    },
    methods: {
        navigateTo(route) {
            this.$router.push(route);
        },
        async deleteProduct(product) {
            const result = confirm("ต้องการลบข้อมูลนี้หรือไม่?");
            if (result) {
                try {
                    await ProductsService.delete(product);
                    this.refreshData();
                } catch (err) {
                    console.log(err);
                }
            }
        },
        async refreshData() {
            this.products = (await ProductsService.index()).data;
            this.filterProducts();
        },
        filterProducts() {
            const searchQuery = this.searchQuery.toLowerCase();
            this.filteredProducts = this.products.filter(product => {
                const matchesSearch = product.title.toLowerCase().includes(searchQuery) ||
                    product.brand.toLowerCase().includes(searchQuery);
                const matchesBrand = this.selectedBrand === '' || product.brand === this.selectedBrand;
                return matchesSearch && matchesBrand;
            });
        }
    }
};
</script>

<style scoped>
.content-container {
    padding: 20px;
    max-width: 1200px;
    margin: 0 auto;
}

h3 {
    font-size: 1em;
    color: #666;
    font-weight: normal;
    margin-top: 10px;
}

/* Search and filter section styling */
.search-container {
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    gap: 10px;
}

.search-container input[type="text"],
.search-container select {
    padding: 12px 16px;
    border: 1px solid #ccc;
    border-radius: 20px;
    font-size: 1em;
    outline: none;
    transition: box-shadow 0.3s ease, border-color 0.3s ease;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

/* Placeholder color */
.search-container input[type="text"]::placeholder {
    color: #aaa;
}

/* Hover and focus effects */
.search-container input[type="text"]:hover,
.search-container select:hover {
    border-color: #b9dff5;
}

.search-container input[type="text"]:focus,
.search-container select:focus {
    border-color: #b9dff5;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

/* Search button styling */
.search-container button {
    padding: 10px 20px;
    background: linear-gradient(135deg, #b9dff5, #d0b9f5);
    color: white;
    border: none;
    border-radius: 20px;
    cursor: pointer;
    font-weight: bold;
    transition: background 0.3s, transform 0.2s;
}

.search-container button:hover {
    background: linear-gradient(135deg, #f3b8d1);
    transform: translateY(-2px);
}

/* Styling for "สร้าง product" button */
button.create-product-button {
    padding: 10px 20px;
    background: black;
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-weight: bold;
    font-size: 1em;
    transition: background 0.3s, box-shadow 0.3s, transform 0.2s;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

button.create-product-button:hover {
    background: linear-gradient(135deg, #f3b8d1);
    box-shadow: 0 6px 10px rgba(0, 0, 0, 0.15);
    transform: translateY(-2px);
}

/* Product table styles */
.product-table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
    font-family: Arial, sans-serif;
    background-color: #fff;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    overflow: hidden;
}

.product-table thead {
    background: linear-gradient(135deg, #b9dff5, #d0b9f5);
    color: white;
    text-align: left;
}

.product-table th,
.product-table td {
    padding: 12px 15px;
    border-bottom: 1px solid #eee;
}

.product-table th {
    font-weight: bold;
}

.product-table tbody tr:hover {
    background-color: #f3f4f6;
}

/* Icon-only button styles */
.product-table button {
    background: transparent;
    border: none;
    cursor: pointer;
    font-size: 1.1em;
    color: #666;
    transition: color 0.3s;
    padding: 4px;
}

.product-table button:hover {
    color: #2196f3;
}

.product-image {
    width: 100px;
    height: 100px;
    object-fit: cover;
}
</style>
