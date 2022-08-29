<template>
<div class="dashboard">
    <h1 class="subheading grey--text">DashBoard</h1>
    <v-container class="my-5">
        <v-layout row class="mb-3 ml-4">
            <v-tooltip top>
                <template v-slot:activator="{ on, attrs }">
                    <v-btn small depressed color="gray" @click="sortBy('title')" v-bind="attrs" v-on="on">
                        <v-icon left small>mdi-folder-account-outline</v-icon>
                        <span class="caption text-lowercase">By Project Name</span>
                    </v-btn>
                </template>
                <span>Order By Projects</span>
            </v-tooltip>
            <v-tooltip top>
                <template v-slot:activator="{ on, attrs }">
                    <v-btn small depressed color="gray" class="ml-3" @click="sortBy('person')" v-bind="attrs" v-on="on">
                        <v-icon left small>mdi-account-tie</v-icon>
                        <span class="caption text-lowercase">By Person</span>
                    </v-btn>
                </template>
                <span>Order By Drs Name</span>
            </v-tooltip>
             <v-tooltip top>
                <template v-slot:activator="{ on, attrs }">
                    <v-btn small depressed color="gray" class="ml-3" @click="refresh" v-bind="attrs" v-on="on">
                        <v-icon left small>mdi-account-tie</v-icon>
                        <span class="caption text-lowercase">Refresh List</span>
                    </v-btn>
                </template>
                <span>Refresh List</span>
            </v-tooltip>
        </v-layout>
        <v-card flat class="pa-3" v-for="project in projects" :key="project.title">
            <v-layout row wrap :class="`pa-3 project ${project.status}`">
                <v-flex xs12 md6>
                    <div class="caption grey--text">Project Title</div>
                    <div>{{project.title}}</div>
                </v-flex>
                <v-flex xs6 sm4 md2>
                    <div class="caption grey--text">Person</div>
                    <div>{{project.person}}</div>
                </v-flex>
                <v-flex xs4 sm4 md2>
                    <div class="caption grey--text">Due by</div>
                    <div>{{project.due}}</div>
                </v-flex>
                <v-flex xs2 sm4 md2>
                    <div class="right">
                        <v-chip small :class="`${project.status} white--text caption my-2`" color="primary" outlined>{{ project.status }}</v-chip>
                    </div>
                </v-flex>
            </v-layout>
            <v-divider></v-divider>
        </v-card>
    </v-container>
</div>
</template>

<script>
import projectsColRe from "../firebase";
import {
    getDocs
} from 'firebase/firestore';
export default {
    data() {
        return {
            projects: []
        }
    },
    methods: {
        sortBy(prop) {
            this.projects.sort((a, b) => a[prop] < b[prop] ? -1 : 1)
        },
        async fetchProjects() {
            let projectsSnapShot = await getDocs(projectsColRe)
            let projects = [];
            projectsSnapShot.forEach((project) => {
                projects.push(project.data())
            });
            this.projects = projects;

        },
    },
   mounted() {
       this.fetchProjects();
    }
}
</script>

<style>
.project.Completed {
    border-left: 4px solid #3cd1c2;
}

.project.ongoing {
    border-left: 4px solid orange;
}

.project.Overdue {
    border-left: 4px solid tomato;
}
</style>
