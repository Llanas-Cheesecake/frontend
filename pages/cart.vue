<script setup lang="ts">
definePageMeta({
  title: "Menu",
  meta: [
    {
      name: "description",
      content: `Llana's Cheesecake offers a wide variety of pastry`,
    }, // TODO: SEO Management
  ],
});
</script>

<template>
  <h1>My Cart</h1>
  <div class="pb-5">
    <div class="container">
      <div class="row">
        <div class="col-lg-12 p-5 bg-white rounded shadow-sm mb-5">
          <!-- Shopping cart table -->
          <div class="table-responsive">
            <table class="table">
              <thead>
                <tr>
                  <th scope="col">
                    <div class="p-2 px-3 text-uppercase">Product</div>
                  </th>
                  <th scope="col">
                    <div class="py-2 text-uppercase">Price</div>
                  </th>
                  <th scope="col">
                    <div class="py-2 text-uppercase">Quantity</div>
                  </th>
                  <th scope="col">
                    <div class="py-2 text-uppercase">Total</div>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row" class="border-0">
                    <div class="p-2">
                      <img
                        src="https://static.wixstatic.com/media/10d1e0_776dc703c344456e80d686035bc6179c~mv2.jpg/v1/fill/w_768,h_576,al_c,q_85,enc_auto/10d1e0_776dc703c344456e80d686035bc6179c~mv2.jpg"
                        alt=""
                        width="70"
                        class="img-fluid rounded shadow-sm"
                      />
                      <div class="ml-3 d-inline-block align-middle">
                        <h5 class="mb-0">Sinless Cheesecake</h5>
                      </div>
                    </div>
                  </th>
                  <td class="border-0 align-middle">
                    <strong>P120.00</strong>
                  </td>
                  <td class="border-0 align-middle"><strong>3</strong></td>
                  <td class="border-0 align-middle"></td>
                </tr>
                <tr>
                  <th scope="row" class="border-0">
                    <div class="p-2">
                      <img
                        src="https://static.wixstatic.com/media/10d1e0_776dc703c344456e80d686035bc6179c~mv2.jpg/v1/fill/w_768,h_576,al_c,q_85,enc_auto/10d1e0_776dc703c344456e80d686035bc6179c~mv2.jpg"
                        alt=""
                        width="70"
                        class="img-fluid rounded shadow-sm"
                      />
                      <div class="ml-3 d-inline-block align-middle">
                        <h5 class="mb-0">Cheesecake</h5>
                      </div>
                    </div>
                  </th>
                  <td class="border-0 align-middle">
                    <strong>P120.00</strong>
                  </td>
                  <td class="border-0 align-middle"><strong>3</strong></td>
                  <td class="border-0 align-middle"></td>
                </tr>
              </tbody>
            </table>
          </div>
          <!-- End -->
        </div>
      </div>
    </div>
  </div>
</template>
