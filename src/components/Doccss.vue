<template>
<div class="text-center">
    <v-dialog v-model="dialog" width="600">
        <template v-slot:activator="{ on, attrs }">
            <v-btn small depressed color="gray" v-bind="attrs" v-on="on">
                <v-icon small left>mdi-account-plus</v-icon>
                Add Doctor
            </v-btn>
        </template>

        <v-card>
            <v-card-title>
                <h2> Add Doctors Details</h2>
            </v-card-title>

            <v-card-text>
                <v-form class="px-3" ref="form">
                    <v-file-input :rules="rules" accept="image/png, image/jpeg, image/bmp" placeholder="Pick an avatar" prepend-icon="mdi-camera" label="Upload Picture"></v-file-input>
                    <v-text-field label="Enter Full Name" v-model="name" prepend-icon="mdi-card-account-details-outline" :rules="inputRules"></v-text-field>
                    <v-text-field label="Enter Email" v-model="email" prepend-icon="mdi-email" :rules="inputRules"></v-text-field>
                    <v-text-field label="Enter Contact" v-model="contact" prepend-icon="mdi-contacts" :rules="inputRules"></v-text-field>
                    <v-select v-model="specialty" :items="items" prepend-icon="mdi-doctor" :rules="[v => !!v || 'Item is required']" label="Select Specialty" required></v-select>
                    <v-textarea label="More Information" v-model="content" prepend-icon="mdi-pencil" :rules="inputRules"></v-textarea>
                    <v-menu ref="menu" v-model="menu" :close-on-content-click="false" :return-value.sync="date" transition="scale-transition" offset-y min-width="auto">
                        <template v-slot:activator="{ on, attrs }">
                            <v-text-field :rules="inputRules" v-model="due" label="Select Date Of Birth" prepend-icon="mdi-calendar" readonly v-bind="attrs" v-on="on"></v-text-field>
                        </template>
                        <v-date-picker v-model="due" no-title scrollable>
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
                    <v-btn depressed class="primary mx-0 mt-3" @click="submit" :loading="loading">
                        Add Doctors
                    </v-btn>
                </v-form>
            </v-card-text>

            <v-divider></v-divider>

            <v-card-actions>
                <v-spacer></v-spacer>
            </v-card-actions>
        </v-card>
    </v-dialog>
</div>
</template>

<script>
import doctorsColRe from "../firebase2";
import {
    addDoc
} from "firebase/firestore";
import format from 'date-fns/format'
export default {
    data() {
        return {
            name: null,
            email: null,
            contact: null,
            specialty: null,
            content: null,
            due: null,
            inputRules: [

                v => v.length >= 3 || 'Minimum lenght is 3 characters'
            ],

            loading: false,
            dialog: false,
            items: [
                "Radiologist",
                "opthalmology",
                "anesthesiology",
                "Dermatology",
                "Pediatrics",
                "Psychiatry",
                "Cardiology",
                "Neurology",
                "Nephrology",
                "General Surgery",
            ],
        };
    },

    methods: {
        async submit() {
            this.loading = true;
            const project = {
                name: this.name,
                email: this.email,
                contact: this.contact,
                specialty: this.specialty,
                content: this.content,
                due: this.due,
            }
            const addedDoc = await addDoc(doctorsColRe, project);
            console.log(addedDoc);
            this.loading = false;
            this.dialog = false
            this.$emit('projectAdded')
            this.name = "";
            this.email = "";
            this.contact = "";
            this.specialty = "";
            this.content = "";
            this.due = "";
            this.$router.go();

        },
    },

    computed: {
        formattedDate() {
            return this.due ? format(this.due, 'Do MMM YYYY') : ''
        }
    }

}
</script>
