<template>
<div class="team">
    <h1 class="subheading grey--text">Doctors</h1>

    <v-container class="my-5">
        <v-layout row class="mb-3 ml-4">
            <Doccss class="mr-3" />
            <v-tooltip top>
                <template v-slot:activator="{ on, attrs }">
                    <v-btn small depressed color="gray" @click="sortBy('name')" v-bind="attrs" v-on="on">
                        <v-icon left small>mdi-folder-account-outline</v-icon>
                        <span class="caption text-lowercase">By Project Name</span>
                    </v-btn>
                </template>
                <span>Order By Projects</span>
            </v-tooltip>
            <v-tooltip top>
                <template v-slot:activator="{ on, attrs }">
                    <v-btn small depressed color="gray" class="ml-3" @click="sortBy('specialty')" v-bind="attrs" v-on="on">
                        <v-icon left small>mdi-account-tie</v-icon>
                        <span class="caption text-lowercase">By Person</span>
                    </v-btn>
                </template>
                <span>Order By Drs Name</span>
            </v-tooltip>
        </v-layout>
        <v-layout row wrap>
            <v-flex xs6 sm6 md4 lg2 v-for="doctor in doctors" :key="doctor.id">
                <v-card flat class="text-center ma-3">
                    <v-responsive class="pt-4">
                        <v-avatar size="100" class="grey lighten-2">
                            <img :src="doctor.avater">
                        </v-avatar>
                    </v-responsive>
                    <v-card-text>
                        <div class="subheading">{{doctor.name}}</div>
                        <div class="grey--text">{{doctor.specialty}}</div>
                    </v-card-text>
                    <v-card-actions>
                        <v-btn text color="teal accent-4" @click="reveal=true">
                            <v-icon small left>mdi-android-messages</v-icon>
                            Send Message
                        </v-btn>
                    </v-card-actions>
                     <v-card-actions>
                        <v-btn text color="teal accent-4" @click="deleteDoctor(doctor.id)">
                            <v-icon small left>mdi-trash-can-outline</v-icon>
                            Delete Info
                        </v-btn>
                    </v-card-actions>
                    <v-card-actions>
                        <v-icon small left>mdi-information-variant</v-icon>
                        <router-link :to="{ path: `/doctors/${doctor.id}` }" text class="v-btn depressed">More Info</router-link>
                    </v-card-actions>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</div>
</template>

<script>
import doctorsColRef from "../firebase2";
import {
    getDocs,
    doc,
    deleteDoc
} from 'firebase/firestore';
import Doccss from '../components/Doccss.vue'
export default {
    components: {
        Doccss,
    },
    data() {
        return {
            doctors: [],
            selectedDoc: null,
        };

    },
    methods: {
        sortBy(prop) {
            this.doctors.sort((a, b) => a[prop] < b[prop] ? -1 : 1)
        },
        async fetchdoctors() {
            let doctorsSnapShot = await getDocs(doctorsColRef)
            let doctors = [];
            doctorsSnapShot.forEach((doctor) => {
                let doctorData = doctor.data();
                doctorData.id = doctor.id;
                doctors.push(doctorData);
            });
            console.log(doctors)
            this.doctors = doctors;

        },
        async deleteDoctor(doctorId){
           let doctorRef = doc(doctorsColRef, doctorId);
           await deleteDoc(doctorRef);
           alert('this details have been succesfully deleted');
           this.$router.go();
        }
    },
    mounted() {
        this.fetchdoctors();
    }

};
</script>

<style>

</style>
