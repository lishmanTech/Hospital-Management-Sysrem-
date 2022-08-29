<template>
<nav>
    <v-snackbar v-model="snackbar" :timeout="4000" top>
        Awesome!!! You have added a new document

        <template v-slot:action="{ attrs }">
            <v-btn color="blue" text v-bind="attrs" @click="snackbar = false">
                Close
            </v-btn>
        </template>
    </v-snackbar>
    <v-app-bar flat app>
        <v-app-bar-nav-icon class="grey--text" @click="drawer = !drawer"></v-app-bar-nav-icon>
        <v-app-bar-title class="text-uppercase grey-text">
            <span class="font-weight-light">ViewHospital</span>
            <span>Hospital</span>
        </v-app-bar-title>
        <v-spacer></v-spacer>
        <v-menu offset-y>
            <template v-slot:activator="{ on, attrs }">
                <v-btn outlined color="grey" dark v-bind="attrs" v-on="on">
                    <v-icon left>mdi-chevron-down</v-icon>
                    <span>Menu</span>
                </v-btn>
            </template>
            <v-list>
                <v-list-item v-for="link in links" :key="link.text" router :to="link.route">
                    <v-list-item-title>{{ link.text }}</v-list-item-title>
                </v-list-item>
            </v-list>
        </v-menu>
        <v-btn outlined color="grey" class="ma-4">
            <span>Sign Out</span>
            <v-icon right>mdi-logout</v-icon>
        </v-btn>
    </v-app-bar>
    <v-navigation-drawer app v-model="drawer" class="primary">
        <v-layout column align-center>
            <v-flex class="mt-5">
                <v-avatar size="100">
                    <img src="/ELISHA PASSPORT.jpg" alt="">
                </v-avatar>
                <p class="white--text subheading mt-1">
                    Welcome Admin
                </p>
            </v-flex>
            <v-flex class="mt-4 mb-3">
                <popup @projectAdded="snackbar=true" />
            </v-flex>
        </v-layout>
        <v-list-item v-for="link in links" :key="link.text" router :to="link.route">
            <v-list-item-icon>
                <v-icon class="white--text">{{link.icon}}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
                <v-list-item-title class="white--text">{{link.text}}</v-list-item-title>
            </v-list-item-content>
        </v-list-item>
    </v-navigation-drawer>
</nav>
</template>

<script>
import Popup from './Popup.vue'
export default {
    components: {
        Popup
    },
    data() {
        return {
            drawer: false,
            links: [{
                    icon: 'mdi-view-dashboard-outline',
                    text: 'Doctors Project',
                    route: '/'
                },
                {
                    icon: 'mdi-folder-account-outline',
                    text: 'Appointments',
                    route: '/project'
                },
                {
                    icon: 'mdi-account-tie',
                    text: 'Doctors',
                    route: '/team'
                },
                 {
                    icon: 'mdi-account-tie',
                    text: 'Nurses',
                    route: '/team'
                },

            ],
            snackbar: false
        }
    }
}
</script>
