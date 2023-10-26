<template>
    <div class="newSighting">
      <h1>{{ msg }}</h1>
      <h3>Add a New Sighting</h3>
      <ul>
        <li><router-link to="/">Home</router-link></li>
        <li><router-link to="/sightings">All Sightings</router-link></li>
      </ul>
      <router-view />
    </div>
    <form @submit.prevent="createDocument">
      <label for="date">Date:</label>
      <input type="date" id="date" v-model="formData.date" required><br><br>
  
      <label for="shape">Shape:</label>
      <select id="shape" v-model="formData.shape" required>
        <option value="triangle">Triangle</option>
        <option value="circle">Circle</option>
        <option value="rectangle">Rectangle</option>
        <option value="other">Other</option>
      </select><br><br>
  
      <label for="duration">Duration:</label>
      <input type="text" id="duration" v-model="formData.duration" required><br><br>
  
      <label for="description">Description:</label>
      <textarea id="description" v-model="formData.description" rows="4" cols="50" required></textarea><br><br>
  
      <button type="submit">Submit</button>
    </form>
  </template>
  
  <script>
  import PouchDB from 'pouchdb';
  
  export default {
    name: 'NewSighting',
    data() {
      return {
        formData: {
          date: '2020-01-01',
          shape: 'triangle',
          duration: '1 hour',
          description: 'It was a triangle',
        },
      };
    },
    methods: {
      createDocument() {
        // Create a new PouchDB instance
        const dbName = 'my-ufo-sightings';
        const db = new PouchDB(dbName);
  
        // Save the new document to the database
        db.put(this.formData)
          .then((response) => {
            console.log('Document created:', response);
            // Clear the form data
            this.formData.date = '';
            this.formData.shape = '';
            this.formData.duration = '';
            this.formData.description = '';
          })
          .catch((error) => {
            console.error('Error creating document:', error);
          });
      },
    },
    props: {
      msg: {
        type: String,
        default: "Add Your Sighting",
      },
    },
  };
  </script>
  
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
    font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', 'Geneva', Verdana, sans-serif;
    font-size: 1.5rem;
    font-weight: bold;
    color: #e5f1ec;
    text-decoration: none;
  }
  </style>
  