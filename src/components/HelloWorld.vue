<template>
  <div class="hello">
    <nav class="navbar">
      <div class="navbar-items">
        <router-link to="/sightings">All Sightings</router-link>
        <router-link to="/sightings/new">Add Sighting</router-link>
      </div>
    </nav>

    <h1>{{ msg }}</h1>
    <div class="intro">
      <p>{{ intro }}</p>
      <p>{{ intro_two }}</p>
      <p>{{ intro_three }}</p>
    </div>
    <router-view />
  </div>
</template>

<script>
import PouchDB from 'pouchdb';

var db = new PouchDB('my-ufo-sightings');
db.sync('http://admin:mtu12345@localhost:5984/ufo-sightings', {
  live: true,
  retry: true
}).on('change', function (change) {
  console.log('Change:', change);
}).on('paused', function (info) {
  console.log('Info:', info);
}).on('active', function (info) {
  console.log('Info:', info);
}).on('error', function (err) {
  console.error('Error:', err);
});

export default {
  name: 'HelloWorld',
  props: {
    msg: {
      type: String,
      default: "Welcome to our UFO Sighting Records database!"
    },
    intro: {
      type: String,
      default: "If you've ever gazed up at the night sky in wonder and fascination, you're in the right place!"
    },
    intro_two: {
      type: String,
      default: "Our platform is a comprehensive repository of mysterious encounters, unexplained phenomena, and eyewitness accounts of unidentified flying objects."
    },
    intro_three: {
      type: String,
      default: "Whether you're a believer, a skeptic, or simply curious, our collection of UFO sightings will take you on a journey through the uncharted realms of the unexplained. "
    }
  }
}
</script>