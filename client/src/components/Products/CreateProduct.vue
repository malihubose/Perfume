<template>
  <div class="add-product-container">
    <h1>Add Perfume</h1>
    <form v-on:submit.prevent="createProduct" class="add-product-form">
      <div class="form-group">
        <label>Picture:</label>
        <ul class="pictures">
          <li v-for="picture in pictures" :key="picture.id">
            <img :src="BASE_URL + picture.name" alt="picture image" class="picture-preview">
          </li>
        </ul>
        <input type="file" multiple @change="filesChange($event.target.files)" accept="image/*" />  
      </div>

      <div class="form-group">
        <label>Name:</label>
        <input type="text" v-model="product.title" placeholder="Enter product title" />
      </div>

      <div class="form-group">
        <label>Description:</label>
        <input type="text" v-model="product.content" placeholder="Enter product description" />
      </div>

      <div class="form-group">
        <label>Brand:</label>
        <select v-model="product.brand" placeholder="Enter brand name">
          <option value="dior">Dior</option>
          <option value="ysl">YSL</option>
          <option value="chanel">Chanel</option>
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
        <input type="text" v-model="product.price" placeholder="Enter product price" />
      </div>

      <div class="button-group">
        <button type="submit" class="create-button">Create Product</button>
      </div>
    </form>
  </div>
</template>

<script>
import ProductsService from "@/services/ProductsService";
import UploadService from "@/services/UploadService";

export default {
  data() {
    return {
      product: {
        title: '',
        content: '',
        brand: '',
        size: '',
        price: 0.00,
      },
      pictures: [],
      BASE_URL: "http://localhost:8081/assets/uploads/",
    };
  },
  methods: {
    async createProduct() {
      if (this.pictures.length === 0) {
        alert("Please upload at least one picture.");
        return;
      }

      this.product.picture = this.pictures.map(p => p.name).join(", ");

      try {
        await ProductsService.post(this.product);
        this.$router.push({ name: "allproduct" });
      } catch (err) {
        console.log(err);
      }
    },
    async filesChange(fileList) {
      const formData = new FormData();
      Array.from(fileList).forEach(file => {
        formData.append('images', file);
        this.pictures.push({ id: this.pictures.length + 1, name: file.name });
      });
      await UploadService.upload(formData);
    },
  },
};
</script>

<style scoped>
.add-product-container {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
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

h1 {
  text-align: center;
  color: #333;
  margin-bottom: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
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

.form-group label {
  font-weight: bold;
  color: #555;
  margin-bottom: 5px;
}

.form-group input {
  width: 100%;
  padding: 10px;
  font-size: 1em;
  border: 1px solid #ccc;
  border-radius: 5px;
  outline: none;
  transition: border-color 0.3s;
}

.form-group input:focus {
  border-color: #888;
}

.pictures {
  list-style: none;
  padding: 0;
  display: flex;
  gap: 10px;
}

.picture-preview {
  width: 150px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.button-group {
  text-align: center;
  margin-top: 20px;
}

.create-button {
  padding: 10px 20px;
  font-size: 1em;
  font-weight: bold;
  color: white;
  background-color: #333;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;
}

.create-button:hover {
  background-color: #000;
  transform: translateY(-2px);
}
</style>
