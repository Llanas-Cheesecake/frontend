<template>
  <div class="main">
    <div class="header">
      <div class="edit-icon">
        <img src="/icons/edit.svg" alt="Customize Order" />
      </div>
      <div class="title">
        <h3>Customize your order</h3>
      </div>
    </div>
    <hr />
    <div class="content">
      <form>
        <label for="size"> <h4>1. Select size of the cake</h4> </label><br />
        <select id="size" name="size" class="form-select">
          <option value="">Select size</option>
          <option value="half">1/2 slice (1-2 pax)</option>
          <option value="whole">1 whole (5-6 pax)</option>
          <option value="fourth">1/4 slice (1 pax)</option>
          <option value="two">2 slices (3-4 pax)</option>
        </select>
        <br />
        <label for="details"><h4>2. Tell us about the details</h4></label><br />
        <input
          type="text"
          id="details"
          name="details"
          class="form-control"
          placeholder="Flavor, Message on cake, Additional detailing etc."
        /><br />
        <label for="delivery"><h4>3. Delivery details</h4></label><br />
        <input
          type="name"
          id="name"
          name="name"
          placeholder="Name"
          class="form-control"
        /><br />
        <input
          type="tel"
          id="num"
          name="num"
          class="form-control"
          placeholder="Enter your phone no."
        /><br />
        <!-- Metro Manila-->
        <select id="city" name="city" class="form-select">
          <option value="">Select City</option>
          <option value="Caloocan">Caloocan</option>
          <option value="Calumpang">Calumpang</option>
          <option value="Dasmariñas Village">Dasmariñas Village</option>
          <option value="Ermita">Ermita</option>
          <option value="Intramuros">Intramuros</option>
          <option value="Las Piñas">Las Piñas</option>
          <option value="Makati">Makati</option>
          <option value="Malabon">Malabon</option>
          <option value="Malate">Malate</option>
          <option value="Mandaluyong">Mandaluyong</option>
          <option value="Manila">Manila</option>
          <option value="Marikina">Marikina</option>
          <option value="Muntinlupa">Muntinlupa</option>
          <option value="National Capital Region">
            National Capital Region
          </option>
          <option value="Navotas">Navotas</option>
          <option value="Niugan">Niugan</option>
          <option value="Paco">Paco</option>
          <option value="Pandacan">Pandacan</option>
          <option value="Parañaque">Parañaque</option>
          <option value="Pasay">Pasay</option>
          <option value="Pasig">Pasig</option>
          <option value="Pateros">Pateros</option>
          <option value="Port Area">Port Area</option>
          <option value="Quezon City">Quezon City</option>
          <option value="Quiapo">Quiapo</option>
          <option value="Sambayanihan People's Village">
            Sambayanihan People's Village
          </option>
          <option value="San Juan">San Juan</option>
          <option value="San Miguel">San Miguel</option>
          <option value="Santa Ana">Santa Ana</option>
          <option value="Santa Cruz">Santa Cruz</option>
          <option value="Singkamas">Singkamas</option>
          <option value="Taguig">Taguig</option>
          <option value="Tanza">Tanza</option>
          <option value="Tanza">Tanza</option>
          <option value="Tondo">Tondo</option>
          <option value="Valenzuela">Valenzuela</option></select
        ><br />
        <label for="date"><h4>4. Delivery Date and Time</h4></label><br />
        <input
          type="date"
          id="date"
          name="date"
          class="form-control"
          placeholder="Delivery Date"
        /><br />
        <input
          type="time"
          id="time"
          name="time"
          class="form-control"
          placeholder="Delivery Time"
        /><br />
      </form>
    </div>
    <div class="btn-container">
      <button class="btn-submit">SUBMIT</button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.main {
  background-color: #77a042;
  border-radius: 15px;
  margin-top: 50px;
  margin-bottom: 50px;
  padding: 60px;
}

.main h3 {
  color: white;
  font-weight: bold;
}

.main hr {
  background-color: white;
  position: relative;
  top: 20px;
  border: none;
  height: 5px;
  margin-bottom: 50px;
  opacity: 100%;
  margin-left: -60px;
  margin-right: -60px;
}

.content {
  text-align: center !important;
  background-color: #d9d9d9;
  border-radius: 15px;
  margin-top: 40px;
  width: 45%;
  margin: auto;
  padding: 40px;
}

.content h4 {
  font-weight: bold;
  margin-bottom: 15px;
}

.header {
  display: flex;
}

.edit-icon {
  margin-right: 15px;
}

.btn-container {
  text-align: center;
}

.btn-submit {
  background-color: black; /* Green */
  border: none;
  color: white;
  padding: 15px 50px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin-top: 50px;
  border-radius: 30px;
  cursor: pointer;
  -webkit-transition-duration: 0.4s;
  transition-duration: 0.4s;
}
.btn-submit:hover {
  box-shadow: 0 12px 16px 0 rgba(0, 0, 0, 0.24),
    0 17px 50px 0 rgba(0, 0, 0, 0.19);
}
</style>
