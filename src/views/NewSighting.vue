<template>
  <div class="newSighting">
    <nav class="navbar">
      <div class="navbar-items">
        <router-link to="/">Home</router-link>
        <router-link to="/sightings">All Sightings</router-link>
      </div>
    </nav>

    <h1>{{ msg }}</h1>
    <div class="intro">
      <p>{{ intro }}</p>
    </div>

    <router-view />
  </div>

  <div class="sighting-form">
    <form @submit.prevent="submitForm">
      <div class="form-group">
        <label for="date">Date</label>
        <input type="date" id="date" v-model="formData.date" required>
      </div>

      <div class="form-group">
        <label for="time">Time</label>
        <input type="time" id="time" v-model="formData.time" required>
      </div>

      <div class="form-group">
        <label for="city">City</label>
        <input type="text" id="city" v-model="formData.city" required>
      </div>

      <div class="form-group">
        <label for="state">State</label>
        <input type="text" id="state" v-model="formData.state" required>
      </div>

      <div class="form-group">
        <label for="shape">Shape</label>
        <input type="text" id="shape" v-model="formData.shape" required>
      </div>

      <div class="form-group">
        <label for="duration">Duration</label>
        <input type="text" id="duration" v-model="formData.duration" required>
      </div>

      <div class="form-group">
        <label for="summary">Summary</label>
        <textarea id="summary" v-model="formData.summary" rows="4" cols="50" required></textarea>
      </div>

      <div class="form-group">
        <label for="images">Images</label>
        <select id="images" v-model="formData.images" required>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
      </div>

      <div class="form-group">
        <label for="img_link">Image Link</label>
        <input type="url" id="img_link" v-model="formData.img_link">
      </div>

      <div class="form-group">
        <label for="lat">Latitude</label>
        <input type="text" id="lat" v-model="formData.lat" required>
      </div>

      <div class="form-group">
        <label for="lng">Longitude</label>
        <input type="text" id="lng" v-model="formData.lng" required>
      </div>

      <div class="form-group">
        <label for="population">Population</label>
        <input type="text" id="population" v-model="formData.population" required>
      </div>

      <button type="submit">Submit</button>
    </form>
  </div>
</template>

<script>
import PouchDB from 'pouchdb';

var db = new PouchDB('my-ufo-sightings');

export default {

  props: {
    msg: {
      type: String,
      default: "Add Your Sighting",
    },
    intro: {
      type: String,
      default: "Have you ever had a mysterious encounter with an unidentified flying object? We invite you to share your own UFO sighting with us! "
    }
  },
  data() {
    return {
      formData: {
        date: "",
        time: "",
        city: "",
        state: "",
        shape: "",
        duration: "",
        summary: "",
        images: "Yes",
        img_link: "",
        lat: "",
        lng: "",
        population: "",
      },
    };
  },
  methods: {
    async submitForm() {
      try {
        const response = await db.post(this.formData);
        console.log('Document added:', response);

        this.formData = {
          date: "",
          time: "",
          city: "",
          state: "",
          shape: "",
          duration: "",
          summary: "",
          images: "Yes",
          img_link: "",
          lat: "",
          lng: "",
          population: "",
        };
      } catch (error) {
        console.error('Error adding document to PouchDB:', error);
      }
    }

  }
};
</script>