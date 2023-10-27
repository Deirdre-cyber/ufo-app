<template>
    <div class="updateSighting">
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
                <label for="id">ID</label>
                <input type="text" id="id" v-model="formData._id" readonly>
            </div>
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
            default: "Update Your Sighting",
        },
        intro: {
            type: String,
            default: "Updating sighting details is an essential part of our platform, allowing you to keep your UFO encounters up to date",
        }
    },
    data() {
        return {
            formData: {
                _id: "",
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
    async created() {
        const sightingId = this.$route.params.id;
        try {
            const existingSighting = await db.get(sightingId);
            this.formData = {
                _id: existingSighting._id || "",
                date: existingSighting.date || "",
                time: existingSighting.time || "",
                city: existingSighting.city || "",
                state: existingSighting.state || "",
                shape: existingSighting.shape || "",
                duration: existingSighting.duration || "",
                summary: existingSighting.summary || "",
                images: existingSighting.images || "Yes",
                img_link: existingSighting.img_link || "",
                lat: existingSighting.lat || "",
                lng: existingSighting.lng || "",
                population: existingSighting.population || "",
            };
        } catch (error) {
            console.error('Error getting sighting data:', error);
        }
    },
    methods: {
        async submitForm() {
            try {
                const sightingId = this.$route.params.id;
                const existingSighting = await db.get(sightingId);

                const updatedSighting = {};

                for (const key in existingSighting) {
                    updatedSighting[key] = existingSighting[key];
                }
                for (const key in this.formData) {
                    updatedSighting[key] = this.formData[key];
                }


                const response = await db.put(updatedSighting);
                console.log('Document updated:', response);

                this.formData = {
                    date: '',
                    shape: '',
                    duration: '',
                    summary: ''
                };
                this.$router.push('/sightings');

            } catch (error) {
                console.error('Error updating sighting details:', error);
            }
        },
    },
};
</script>
  
<style scoped>
 #id {
    width: 18rem;
    background-color: rgb(232, 240, 232);
 }
</style>
  
  