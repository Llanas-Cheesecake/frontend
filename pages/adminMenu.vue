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
          <button id="homeButton"></button>
          <h3>Menu</h3>
        </div>
        <button id="addMenuButton"></button>

        <select v-model="sortby" id="sortDropDown">
          <option value="alphabetical">A-Z</option>
          <option value="reverseA">Z-A</option>
        </select>
      </div>
    </div>
    <div class="menuItems">
      <div v-for="item in sortedItems" :key="JSON.stringify(item)">
        {{ item.alphabetical }}
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
}

.menuItems {
  padding: 10px;
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
}

#sortDropDown option {
  font-weight: bold;
  align-self: center;
}
</style>

<script lang="ts">
export default {
  data() {
    return {
      search: "",
      sortby: "alphabetical",
      items: [
        { alphabetical: "Dob Andrew" },
        { alphabetical: "Cody Bobby" },
        { alphabetical: "Bob Codys" },
        { alphabetical: "Andrew Dick" },
      ],
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
    sortedItems(): { alphabetical: string }[] {
      return this.filteredItems.sort((a, b) => {
        if (this.sortby === "alphabetical") {
          return a.alphabetical.localeCompare(b.alphabetical);
        } else if (this.sortby === "reverseA") {
          return b.alphabetical.localeCompare(a.alphabetical);
        }
        return 0; // Default case
      });
    },
  },
};
</script>
