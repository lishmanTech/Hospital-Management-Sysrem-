<template>
<div class="text-center">
    <v-dialog v-model="dialog" width="600">
        <template v-slot:activator="{ on, attrs }">
            <v-btn depressed color="primary" dark v-bind="attrs" v-on="on">
                Add a New Project
            </v-btn>
        </template>

        <v-card>
            <v-card-title>
                <h2> Add a New Project</h2>
            </v-card-title>

            <v-card-text>
                <v-form class="px-3" ref="form">
                    <v-text-field label="Title" v-model="title" prepend-icon="mdi-folder" :rules="inputRules"></v-text-field>
                    <v-textarea label="Information" v-model="content" prepend-icon="mdi-pencil" :rules="inputRules"></v-textarea>
                    <v-menu ref="menu" v-model="menu" :close-on-content-click="false" :return-value.sync="date" transition="scale-transition" offset-y min-width="auto">
                        <template v-slot:activator="{ on, attrs }">
                            <v-text-field :rules="inputRules" v-model="due" label="Due Date" prepend-icon="mdi-calendar" readonly v-bind="attrs" v-on="on"></v-text-field>
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
                        Add Project
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
import projectsColRe from "../firebase";
import {
    addDoc
} from "firebase/firestore";
import format from 'date-fns/format'
export default {
    data() {
        return {
            title: null,
            content: null,
            due: null,
            inputRules: [

                v => v.length >= 3 || 'Minimum lenght is 3 characters'
            ],

            loading: false,
            dialog: false
        };
    },

    methods: {
        async submit() {
            this.loading = true;
            const project = {
                title: this.title,
                content: this.content,
                due: this.due,
                person: 'Dr Ismail Fahad',
                status: 'ongoing'
            }
            const addedDoc = await addDoc(projectsColRe, project);
            console.log(addedDoc);
            this.loading = false;
            this.dialog = false
            this.$emit('projectAdded')
            this.title = "";
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
