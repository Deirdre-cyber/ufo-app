<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h3>Welcome to the Alien Sightings</h3>
    <ul>
      <li><router-link to="/sightings">Sightings</router-link></li>
      <li><router-link to="/sightings/new">New Sighting</router-link></li>
    </ul>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: {
      type: String,
      default: "Welcome"
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
    display: inline-block;
    margin: 0 10px;
    padding: 0.5rem;
    border: 2px solid black;
    border-radius: 0.5rem;
    background-color: rgb(17, 132, 11);
  }
  a {
    font-family:'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', 'Geneva', Verdana, sans-serif;
    font-size: 1.5rem;
    font-weight: bold;
    color: #e5f1ec;
    text-decoration: none;
  }
</style>
