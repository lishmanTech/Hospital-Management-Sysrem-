<template>
<div class="project">
    <h1 class="subheading grey--text">View/Edit Doctors Information</h1>

    <v-container class="my-5">
        <template>
            <v-form class="px-3" ref="form" @submit.prevent="updateDoctor">
                <v-file-input :rules="rules" accept="image/png, image/jpeg, image/bmp" placeholder="Pick an avatar" prepend-icon="mdi-camera" label="Upload Picture"></v-file-input>
                <v-text-field label="Full Name" v-model="doctorInfo.name" prepend-icon="mdi-card-account-details-outline" :rules="inputRules"></v-text-field>
                <v-text-field label="Email" v-model="doctorInfo.email" prepend-icon="mdi-email" :rules="inputRules"></v-text-field>
                <v-text-field label="Contact" v-model="doctorInfo.contact" prepend-icon="mdi-contacts" :rules="inputRules"></v-text-field>
                <v-text-field label="Specialty" v-model="doctorInfo.specialty" prepend-icon="mdi-doctor" :rules="inputRules"></v-text-field>
                <v-textarea label="More Information" v-model="doctorInfo.content" prepend-icon="mdi-pencil" :rules="inputRules"></v-textarea>
                <v-menu ref="menu" v-model="menu" :close-on-content-click="false" :return-value.sync="date" transition="scale-transition" offset-y min-width="auto">
                    <template v-slot:activator="{ on, attrs }">
                        <v-text-field :rules="inputRules" v-model="doctorInfo.due" label="Date Of Birth" prepend-icon="mdi-calendar" readonly v-bind="attrs" v-on="on"></v-text-field>
                    </template>
                    <v-date-picker v-model="doctorInfo.due" no-title scrollable>
                        <v-spacer></v-spacer>
                        <v-btn text color="primary" @click="menu = false">
                            Cancel
                        </v-btn>
                        <v-btn text color="primary" @click="$refs.menu.save(due)">
                            OK
                        </v-btn>
                    </v-date-picker>
                </v-menu>
                <p>Date in ISO format: <strong>{{ date }}</strong></p>
               <v-btn depressed class="primary mx-0 mt-3" @click="updateDoctor" :loading="loading">
                        Update Details
                    </v-btn>
            </v-form>
        </template>
    </v-container>
</div>
</template>

<script>
import doctorsColRe from "../firebase2";
import {
    getDoc,
    doc,
    setDoc,
} from 'firebase/firestore';
//import doctorsColRef from '../firebase2';
export default {
    data() {
        return {
            selectedDoctor: {},
            doctorId: null,
            docRef: null,
            doctorInfo:{
            name: null,
            email: null,
            contact: null,
            specialty: null,
            content: null,
            due: null,
            }
        }
    },
    methods: {
        async getDoctor() {
            let doctorRef = doc(doctorsColRe, this.doctorId);
            this.docRef = doctorRef;
            let doctor = await getDoc(this.docRef);
            let doctorData = doctor.data();
            this.doctorInfo.name=doctorData.name;
            this.doctorInfo.email=doctorData.email;
            this.doctorInfo.contact=doctorData.contact;
            this.doctorInfo.specialty=doctorData.specialty;
            this.doctorInfo.content=doctorData.content;
            this.doctorInfo.due=doctorData.due;
        },
        async updateDoctor(){
            await setDoc(this.docRef, this.doctorInfo);
            alert(`The doctor with the following identity ${this.doctorId} has been updated succefully`);
            this.$router.push('/team');

        },
    },
    created() {
        let doctorId = this.$route.params.doctorId;
        this.doctorId = doctorId;
        this.getDoctor();
    }
};
</script>
