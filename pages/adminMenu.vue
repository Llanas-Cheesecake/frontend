<script setup lang="ts">
definePageMeta({
  title: "AdminMenu",
  meta: [
    {
      name: "description",
      content: `Llana's Cheesecake offers a wide variety of pastry`,
    }, // TODO: SEO Management
  ],
});
</script>

<template>
  <div class="menuCard">
    <div class="menuHeader">
      <div class="menuHeaderContents">
        <div id="homeAndName">
          <a href="https://youtube.com" id="homeButton"></a>
          <h3>Menu</h3>
        </div>
        <button id="addMenuButton" @click="addClick"></button>

        <select v-model="sortby" id="sortDropDown">
          <option value="alphabetical">A-Z</option>
          <option value="reverseA">Z-A</option>
        </select>
      </div>
    </div>
    <div class="menuItems">
      <!-- <div v-for="item in sortedItems" :key="JSON.stringify(item)">
        {{ item.alphabetical }} {{ item.price }}
      </div> -->
      <div
        class="menuItem"
        v-for="item in sortedItems"
        :key="JSON.stringify(item)"
      >
        <img :src="item.images" alt="" />
        <h1>{{ item.alphabetical }}</h1>
        <div hidden>{{ item.id }}</div>
        <div>
          <h2>Available: {{ item.availability }}</h2>
          <h2>Sold: {{ item.sold }}</h2>
          <h2>Price: ₱{{ item.price }}</h2>
        </div>
        <button @click="editClick(item.id)" id="editBtn">Edit</button>
        <button @click="deleteClick(item.id)" id="deleteBtn">Delete</button>
      </div>

      <div id="addPopupContainer" class="popup-container">
        <div class="popup-content" id="addContent">
          <!-- Close button -->
          <span class="close" @click="closeAddPopup">&times;</span>

          <!-- Popup content -->
          <h2>Add Product</h2>
          <form @submit.prevent="addItem">
            <img :src="imageUrl" alt="Uploaded Image" class="displayImage" />

            <label for="itemImages" id="imgLabel"
              ><img src="../icons/font_awesome.png" alt="" /> Upload
              Image</label
            >
            <input
              type="file"
              id="itemImages"
              name="filename"
              required
              accept="image/*"
              @change="displayImage"
              hidden
            />

            <div>
              <div>
                <label for="productId">Product ID</label>
                <input
                  type="text"
                  id="productId"
                  v-model="newItem.id"
                  readonly
                />
                <label for="itemCategory">Category</label>
                <select id="itemCategory" v-model="newItem.category" required>
                  <option value='Cakes 6"'>Cakes 6"</option>
                  <option value='Cakes 8"'>Cakes 8"</option>
                  <option value="Cakes (Slices)">Cakes (Slices)</option>
                  <option value="Iced Drink">Iced Drink</option>
                  <option value="Hot Drink">Hot Drink</option>
                  <option value="Frapeese">Frapeese</option>
                </select>
                <label for="itemName">Product Name</label>
                <input
                  type="text"
                  id="itemName"
                  v-model="newItem.alphabetical"
                  required
                />
                <label for="itemPrice">Price</label>
                <input
                  type="number"
                  id="itemPrice"
                  v-model="newItem.price"
                  required
                />
              </div>
              <div>
                <label for="itemAvailability">Stock</label>
                <input
                  type="number"
                  id="itemAvailability"
                  v-model="newItem.availability"
                  required
                />
                <input
                  type="number"
                  id="itemSold"
                  v-model="newItem.sold"
                  readonly
                  hidden
                />
                <label for="itemDescription">Description</label>
                <textarea
                  type="text"
                  id="itemDescription"
                  v-model="newItem.description"
                  maxlength="200"
                  required
                ></textarea>
              </div>
            </div>
            <button type="submit">Confirm</button>
          </form>
        </div>
      </div>

      <div id="editPopupContainer" class="popup-container">
        <div class="popup-content">
          <!-- Close button -->
          <span class="close" @click="closeEditPopup">&times;</span>

          <!-- Popup content -->
          <h2>Edit Product</h2>
          <form @submit.prevent="editItem(editingItem.id)">
            <img
              :src="editingItem.images"
              alt="Uploaded Image"
              class="displayImage"
            />

            <label for="itemImages" id="imgLabel"
              ><img src="../icons/font_awesome.png" alt="" /> Change
              Image</label
            >
            <input
              type="file"
              id="itemImages"
              name="filename"
              accept="image/*"
              @change="displayImage"
              hidden
            />

            <div>
              <div>
                <label for="productId">Product ID</label>
                <input
                  type="text"
                  id="productId"
                  v-model="editingItem.id"
                  readonly
                />
                <label for="itemCategory">Category</label>
                <select id="itemCategory" v-model="editingItem.category">
                  <option value='Cakes 6"'>Cakes 6"</option>
                  <option value='Cakes 8"'>Cakes 8"</option>
                  <option value="Cakes (Slices)">Cakes (Slices)</option>
                  <option value="Iced Drink">Iced Drink</option>
                  <option value="Hot Drink">Hot Drink</option>
                  <option value="Frapeese">Frapeese</option>
                </select>
                <label for="itemName">Product Name</label>
                <input
                  type="text"
                  id="itemName"
                  v-model="editingItem.alphabetical"
                />
                <label for="itemPrice">Price</label>
                <input
                  type="number"
                  id="itemPrice"
                  v-model="editingItem.price"
                />
              </div>
              <div>
                <label for="itemAvailability">Stock</label>
                <input
                  type="number"
                  id="itemAvailability"
                  v-model="editingItem.availability"
                />
                <input
                  type="number"
                  id="itemSold"
                  v-model="editingItem.sold"
                  readonly
                  hidden
                />
                <label for="itemDescription">Description</label>
                <textarea
                  type="text"
                  id="itemDescription"
                  v-model="editingItem.description"
                  maxlength="200"
                ></textarea>
              </div>
            </div>
            <button type="submit">Confirm</button>
          </form>
        </div>
      </div>

      <div id="deletePopupContainer" class="popup-container">
        <div class="popup-content" id="deleteContent">
          <!-- Close button -->
          <span class="close" @click="closeDeletePopup">&times;</span>

          <!-- Popup content -->
          <form @submit.prevent="deleteItem(deletingItem.id)">
            <div>
              <img
                :src="deletingItem.images"
                alt="Uploaded Image"
                class="displayImage"
              />
            </div>
            <div id="divDeleteInfo">
              <h2>Delete Product?</h2>
              <p>
                Are you sure you want to remove
                {{ deletingItem.alphabetical }} from the menu?
              </p>

              <button type="submit">Confirm</button>
              <button @click="closeDeletePopup" id="closeBtn">Cancel</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
// Color Palette
// https://colors.muz.li/palette/77A042/59702e/f2ffda/e5ffb4/ffffff

.menuCard {
  background-color: #77a042;
  margin: 50px 0px;
  border-radius: 20px;
}

.menuHeader {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: white solid 5px;
}

.menuHeader div {
  padding-top: 12px;
}

.menuHeaderContents {
  margin-left: 20px;
  margin-right: 20px;
  margin-bottom: 0;
  justify-content: space-between;
  display: flex; /* Use flexbox */
  align-items: center;
  flex: 1;
}

.menuHeaderContents h3 {
  color: white;
  font-weight: bold;
  padding-top: 10px;
  cursor: default;
}

#homeAndName {
  display: inline-flex;
  padding-bottom: 10px;
  justify-content: space-between;
  vertical-align: middle;
}

#homeButton {
  background-image: url("../icons/homeBtn.png");
  background-size: 50px;
  background-color: transparent;
  background-repeat: no-repeat;
  height: 52px;
  width: 52px;
  border: none;
  outline: none;
  margin-right: 12px;
}

#addMenuButton {
  background-image: url("../icons/addMenu.png");
  background-size: 50px;
  background-color: transparent;
  background-repeat: no-repeat;
  height: 52px;
  width: 52px;
  border: none;
  outline: none;
}

#sortDropDown {
  color: white;
  background-color: #77a042;
  border: none;
  outline: none;
  font-weight: bold;
  padding: 0 20px 0 20px;
  border-radius: 5px;
  font-size: 20px;
  cursor: pointer;
}

#sortDropDown option {
  font-weight: bold;
  align-self: center;
}

.menuItems {
  padding: 40px 30px 20px 30px;
  display: flex;
  flex-wrap: wrap;
  align-content: space-between;
  justify-content: center;
}

.menuItem {
  background-color: white;
  border-radius: 20px;
  width: 272px;
  padding: 36px 30px;
  margin: 0px 10px 20px 10px;
  text-align: center;

  button {
    color: white;
    border-radius: 50px; /* Makes the button round */
    height: 44px;
    width: 96px;
    border: none;
    margin: 4px 5px 0 5px;
    box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
  }
}

.menuItem h1 {
  font-weight: bold;
  font-size: 22px;
  margin: 8px 0 8px 0;
}

.menuItem h2 {
  font-weight: bold;
  font-size: 18px;
}

.menuItem img {
  height: 136px;
  width: 136px;
}

.menuItem div {
  text-align: left;
}

#editBtn {
  background-color: #4295a0;
}

#deleteBtn {
  background-color: #ce3030;
}

/* Popup container styles */
.popup-container {
  display: none;
  position: fixed;
  z-index: 999;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* Semi-transparent background */
  overflow: auto;
}

/* Popup content styles */
.popup-content {
  background-color: #77a042;
  color: white;
  border-radius: 50px;
  margin: 14% auto;
  padding: 26px 36px;
  width: 60%;
  font-weight: bold;
  text-align: center;

  form {
    flex-wrap: wrap;
    justify-content: center;
    overflow: hidden;
    .displayImage {
      height: 120px;
      width: 120px;
      display: flex;
      margin: 12px auto 16px auto;
      border-radius: 100%;
    }
  }

  h2 {
    font-weight: bold;
    margin-top: 16px;
  }
  div {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    div {
      display: flex;
      flex-direction: column;
      margin: 0 68px;
      label {
        color: black;
      }
      input {
        border-radius: 20px;
        border: none;
        height: 36px;
        text-align: center;
      }
    }
  }
  button {
    background-color: black;
    color: white;
    font-weight: bold;
    border: none;
    padding: 14px 26px;
    margin-top: 24px;
    border-radius: 16px;
    width: 140px;
  }
}

#imgLabel {
  background-color: white;
  color: black;
  font-weight: bold;
  border-radius: 20px;
  font-size: 18px;
  padding: 10px 20px;
  img {
    height: 24px;
    margin-right: 4px;
  }
  cursor: pointer;
}

#itemCategory {
  height: 36px;
  border: none;
  border-radius: 20px;
  text-align: center;
}

#itemDescription {
  border: none;
  border-radius: 20px;
  padding: 10px;
  height: 158px;
  resize: none;
}

/* Close button styles */
.close {
  color: white;
  float: right;
  font-size: 40px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: rgb(209, 209, 209);
  text-decoration: none;
  cursor: pointer;
}

#deleteContent {
  form {
    display: flex;
    justify-content: space-around;
    padding: 12px 0px 12px 12px;

    div {
      margin-top: 40px;
      display: block;

      img {
        height: 200px;
        width: 200px;
      }

      p {
        font-weight: normal;
        font-size: 20px;
        margin-top: 20px;
      }
      button {
        margin: 20px;
      }
    }
  }
}
#divDeleteInfo {
  width: 500px;
}
#closeBtn {
  background-color: white;
  color: black;
}
</style>

<script lang="ts">
export default {
  data() {
    return {
      imageUrl: "../images/itemPlaceholder.png",
      search: "",
      sortby: "alphabetical",
      items: [
        {
          id: 4,
          alphabetical: "D Cheesecake",
          images: "../images/cheese.jpg",
          availability: 4,
          sold: 200,
          price: 4,
          category: 'Cakes 6"',
          description: "D tastes good",
        },
        {
          id: 3,
          alphabetical: "C Cheesecake",
          images: "../images/cheese.jpg",
          availability: 3,
          sold: 300,
          price: 33,
          category: 'Cakes 8"',
          description: "C tastes good",
        },
        {
          id: 2,
          alphabetical: "B Cheesecake",
          images: "../images/llana_logo_m.png",
          availability: 2,
          sold: 220,
          price: 2,
          category: "Cakes (Slices)",
          description: "B tastes good",
        },
        {
          id: 1,
          alphabetical: "A Cheesecake",
          images: "../images/cheese.jpg",
          availability: 1,
          sold: 100,
          price: 100,
          category: 'Cakes 8"',
          description: "A tastes good",
        },
      ],
      newItem: {
        id: 5, // Starting id for new items
        alphabetical: "",
        images: "",
        availability: 0,
        sold: 0,
        price: 0,
        category: 'Cakes 6"',
        description: "",
      },
      editingItem: {
        id: 1,
        alphabetical: "",
        images: "",
        availability: 0,
        sold: 0,
        price: 0,
        category: 'Cakes 6"',
        description: "",
      },
      deletingItem: {
        id: 1,
        alphabetical: "",
        images: "",
        availability: 0,
        sold: 0,
        price: 0,
        category: 'Cakes 6"',
        description: "",
      },
    };
  },
  computed: {
    filteredItems() {
      return this.items.filter((item) =>
        item.alphabetical
          .toLowerCase()
          .includes(this.search.toLowerCase().trim())
      );
    },
    sortedItems() {
      return this.items.sort((a, b) => {
        if (this.sortby === "alphabetical") {
          return a.alphabetical.localeCompare(b.alphabetical);
        } else if (this.sortby === "reverseA") {
          return b.alphabetical.localeCompare(a.alphabetical);
        }
        return 0; // Default case
      });
    },
  },
  methods: {
    displayImage(event: any) {
      const file = event.target.files[0];
      const reader = new FileReader();

      reader.onload = (e) => {
        if (e.target && e.target.result !== null) {
          this.imageUrl = e.target.result as string; // Update imageUrl with the data URL
        }
      };

      reader.readAsDataURL(file);
    },
    editClick: function (number: number) {
      // Find the item to edit by its id
      const itemToEdit = this.items.find((item) => item.id === number);

      // Set the editingItem data property to the item being edited
      if (itemToEdit) {
        this.editingItem = { ...itemToEdit }; // Copy the item's properties

        const fileInput = document.getElementById(
          "itemImages"
        ) as HTMLInputElement;

        // fileInput.value = "../images/itemPlaceholder.png";
        // const realFile = fileInput.value.toString().split("\\").pop();
      }

      // Show the popup by setting its display property to "block"
      const popupContainer = document.getElementById("editPopupContainer");
      if (popupContainer) {
        popupContainer.style.display = "block";
      }
    },
    deleteClick: function (number: number) {
      const itemToDelete = this.items.find((item) => item.id === number);

      if (itemToDelete) {
        this.deletingItem = { ...itemToDelete }; // Copy the item's properties
      }

      const popupContainer = document.getElementById("deletePopupContainer");
      if (popupContainer) {
        popupContainer.style.display = "block";
      }
    },
    addClick: function () {
      const popupContainer = document.getElementById("addPopupContainer");
      if (popupContainer) {
        popupContainer.style.display = "block";
      }
    },

    addItem() {
      // Incrementing the id for new item
      this.newItem.id =
        this.items.length > 0 ? this.items[this.items.length - 1].id + 1 : 1;
      // Adding the new item to the items array
      const fileInput = document.getElementById(
        "itemImages"
      ) as HTMLInputElement;
      const realFile = fileInput.value.toString().split("\\").pop();
      this.items.push({
        id: this.newItem.id,
        alphabetical: this.newItem.alphabetical,
        images: "../images/" + realFile,
        availability: this.newItem.availability,
        sold: this.newItem.sold,
        price: this.newItem.price,
        category: this.newItem.category,
        description: this.newItem.description,
      });
      // Resetting the form
      this.newItem = {
        id: this.newItem.id + 1,
        alphabetical: "",
        images: "../images/itemPlaceholder.png",
        availability: 0,
        sold: 0,
        price: 0,
        category: 'Cakes 6"',
        description: "",
      };

      // Reset the value of the file input
      if (fileInput) {
        fileInput.value = "";
      }
      this.closeAddPopup();
    },

    editItem: function (itemID: number) {
      // Find the index of the item to edit
      const itemIndex = this.items.findIndex((item) => item.id === itemID);
      //const itemActual = this.items.find((item) => item.id === itemID);

      const fileInput = document.getElementById(
        "itemImages"
      ) as HTMLInputElement;
      const realFile = fileInput.value.toString().split("\\").pop();

      // If the item is found
      if (itemIndex !== -1) {
        // Update the item's properties with the modified properties

        this.editingItem.images = "../images/" + realFile; // Assuming realFile contains the filename

        this.items[itemIndex] = { ...this.editingItem };
        // Close the popup after editing
        this.closeEditPopup();
      }
    },

    deleteItem: function (itemID: number) {
      // Find the index of the item to delete
      const index = this.items.findIndex((item) => item.id === itemID);
      if (index !== -1) {
        // Remove the item from the items array
        this.items.splice(index, 1);
        this.closeDeletePopup();
      }
    },

    closeAddPopup() {
      const popupContainer = document.getElementById("addPopupContainer");
      if (popupContainer) {
        popupContainer.style.display = "none";
        this.newItem = {
          id: this.newItem.id,
          alphabetical: "",
          images: "../images/itemPlaceholder.png",
          availability: 0,
          sold: 0,
          price: 0,
          category: 'Cakes 6"',
          description: "",
        };
      }
    },
    closeEditPopup() {
      const EpopupContainer = document.getElementById("editPopupContainer");
      if (EpopupContainer) {
        EpopupContainer.style.display = "none";
        // Resetting the form
      }
    },
    closeDeletePopup() {
      const DpopupContainer = document.getElementById("deletePopupContainer");
      if (DpopupContainer) {
        DpopupContainer.style.display = "none";
        // Resetting the form
      }
    },
  },
};
</script>
