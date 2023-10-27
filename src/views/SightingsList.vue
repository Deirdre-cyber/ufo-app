<template>
  <div class="sightings">
    <nav class="navbar">
      <div class="navbar-items">
        <router-link to="/">Home</router-link>
        <router-link to="/sightings/new">Add Sighting</router-link>
      </div>
    </nav>

    <h1>{{ msg }}</h1>
    <div class="intro">
      <p>{{ intro }}</p>
    </div>

    <router-view></router-view>

  </div>

  <div class="table-container">
    <table>
      <tr>
        <th>Date</th>
        <th>Time</th>
        <th>City</th>
        <th>State</th>
        <th>Shape</th>
        <th>Duration</th>
        <th>Summary</th>
        <th>Image Included?</th>
        <th>Image URL</th>
        <th>Actions</th>
      </tr>
      <tr v-for="(sighting) in displayedSightings" :key="sighting._id">
        <td>{{ sighting.date }}</td>
        <td>{{ sighting.time }}</td>
        <td>{{ sighting.city }}</td>
        <td>{{ sighting.state }}</td>
        <td>{{ sighting.shape }}</td>
        <td>{{ sighting.duration }}</td>
        <td>{{ sighting.summary }}</td>
        <td>{{ sighting.images }}</td>
        <td>
          <a id="url_link" :href="sighting.img_link" target="_blank">{{ sighting.img_link }}</a>
        </td>
        <td>
          <router-link :to="{ name: 'UpdateSighting', params: { id: sighting._id } }">
            <button>Edit</button>
          </router-link>

          <button @click="deleteSighting(sighting._id)">Delete</button>
        </td>
      </tr>
    </table>

    <div class="pagination">
      <button @click="prevPage" :disabled="currentPage === 1">Previous</button>
      <span>Page {{ currentPage }}</span>
      <button @click="nextPage" :disabled="currentPage * 10 >= sightings.length">Next</button>
    </div>
  </div>
</template>

<script>
import PouchDB from 'pouchdb';
var db = new PouchDB('my-ufo-sightings');

export default {
  name: 'SightingsList',
  props: {
    msg: {
      type: String,
      default: "All Sightings",
    },
    intro: {
      type: String,
      default: "Here, you'll find a diverse array of encounters from people across the globe, each offering a glimpse into the unexplained.",
    },
  },
  data() {
    return {
      sightings: [],
      currentPage: 1,
    };
  },
  async created() {
    try {
      const result = await db.allDocs({ include_docs: true });

      this.sightings = result.rows
        .filter(row => row.doc && row.doc.date && row.doc.time && row.doc.city && row.doc.state && row.doc.shape && row.doc.duration && row.doc.summary && row.doc.images && row.doc.img_link)
        .map(row => row.doc);
    } catch (error) {
      console.error('Error getting data from db:', error);
    }
  },
  computed: {
    displayedSightings() {
      const startIndex = (this.currentPage - 1) * 10;
      const endIndex = startIndex + 10;
      return this.sightings.slice(startIndex, endIndex);
    },
  },
  methods: {
    async deleteSighting(sightingId) {
      const existingSighting = await db.get(sightingId);
      await db.remove(existingSighting);
      console.log('Document deleted:', existingSighting);
      this.$router.push('/sightings');
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
    nextPage() {
      if (this.currentPage * 10 < this.sightings.length) {
        this.currentPage++;
      }
    },
  }
};
</script>

<style scoped>
#url_link {
  color: rgb(17, 132, 11);
  text-decoration: none;
  font-size: 0.8rem;
  font-weight: normal;
}

.table-container {
  overflow-x: auto;
  max-width: 100%;
}

table {
  border-collapse: collapse;
  margin: auto;
}

th {
  border: 2px solid black;
  padding: 0.3rem;
  font-size: 1.2rem;
  font-weight: normal;
  background-color: rgb(17, 132, 11);
  color: #fff;
}

td {
  border: 1px solid black;
  text-align: center;
  padding: 0.1rem 0.5rem;
  background-color: #f1f9f5;
}
</style>