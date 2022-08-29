<template>
<div class="project">
    <h1 class="subheading grey--text">Projects</h1>

    <v-container class="my-5">
        <template>
            <v-row justify="center">
                <v-expansion-panels accordion>
                    <v-expansion-panel v-for="project in myprojects" :key="project.title">
                        <v-expansion-panel-header>{{project.title}}</v-expansion-panel-header>
                        <v-expansion-panel-content>
                            <v-card flat>
                                <v-card-text class="px-4 grey--text">
                                    <div class="font-weight-bold">{{ project.due }}</div>
                                    <div>{{ project.content }}</div>
                                </v-card-text>
                            </v-card>
                        </v-expansion-panel-content>
                    </v-expansion-panel>
                </v-expansion-panels>
            </v-row>
        </template>
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
    computed:{
      myprojects(){
        return this.projects.filter(project=>{ return project.person=== 'Dr Ismail Fahad'})
      }
    },
    methods: {
        async fetchProjects() {
            let projectsSnapShot = await getDocs(projectsColRe)
            let projects = [];
            projectsSnapShot.forEach((project) => {
                projects.push(project.data())
            });
            this.projects = projects;

        }
    },
    created() {
        this.fetchProjects();
    }
}
</script>
