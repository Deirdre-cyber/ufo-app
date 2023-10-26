<template>
  <div class="sightings">
    <h1>{{ msg }}</h1>
    <h3>Alien Sightings</h3>
    <ul>
      <li><router-link to="/">Home</router-link></li>
      <li><router-link to="/sightings/new">Add New Sighting</router-link></li>
    </ul>
    <router-view />
  </div>

  <div>
    <table>
      <tr>
        <th>Date</th>
        <th>Shape</th>
        <th>Duration</th>
        <th>Description</th>
      </tr>
      <tr>
        <td>1/1/2020</td>
        <td>Triangle</td>
        <td>1 hour</td>
        <td>It was a triangle</td>
      </tr>
    </table>
  </div>

  <div>
    <h2>All Documents</h2>
    <ul>
      <li v-for="document in documents" :key="document._id">
        <pre>{{ document }}</pre>
      </li>
    </ul>
  </div>

  <div>
    <button @click="checkPouchDBConnection">Check PouchDB Connection</button>
  </div>
</template>
  
<script>
import PouchDB from 'pouchdb';

export default {
  name: 'SightingsList',
  props: {
    msg: {
      type: String,
      default: "All Sightings"
    }
  },
  data() {
    return {
      documents: [],
    };
  },
  methods: {
    checkPouchDBConnection() {
      const dbName = 'my-ufo-sightings';
      const db = new PouchDB(dbName);

      db.info()
        .then((info) => {
          console.log('PouchDB connection is established:', info);
          alert('Connection established');
        })
        .catch((error) => {
          console.error('Error checking PouchDB connection:', error);
          alert('Connection error');
        });
    },
    async fetchDocuments() {
      const db = new PouchDB('my-ufo-sightings');

      try {
        const result = await db.allDocs({ include_docs: true });
        this.documents = result.rows.map(row => row.doc);
      } catch (error) {
        console.error('Error fetching documents:', error);
      }
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

table {
  border-collapse: collapse;
  width: 50rem;
  margin: auto;
}

th {
  border: 2px solid black;
}
</style>
