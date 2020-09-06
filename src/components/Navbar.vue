<template>
  <nav class="green">
    <div>
      <div class="nav-wrapper">
        <router-link to="/" class=""><span class="flow-text">To-do application</span></router-link>
        <ul id="nav-mobile" class="right">
          <router-link tag="li" exact to="/">
            <a class="list__link" href="#">Create</a>
          </router-link>
          <router-link tag="li" exact to="/list">
            <a class="list__link" href="#">List</a>
          </router-link>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Navbar',
}
</script>

<style lang="scss" scoped>
nav {
  padding: 0 30px;
  .list__link {
    font-size: 1.3rem;
  }
}
</style>
