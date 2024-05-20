<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          {{ $route.meta.title }}
        </q-toolbar-title>

        <!-- I'd like to make this only display on mobil -->
        <!--<div>Fall 2023 - CIS4301 - Group 15</div>-->
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" bordered>
      <q-list>
        <q-item-label header> Navigation </q-item-label>

        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container class="bg-image">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from "vue";
import EssentialLink from "components/EssentialLink.vue";

const linksList = [
  {
    title: "Home",
    caption: "Baseball Statistics Visualizations",
    icon: "home",
    link: "#/",
  },
  {
    title: "Runs-to-Outs",
    caption: "By salary range",
    icon: "sports_baseball",
    link: "#/runsToOuts",
  },
  {
    title: "Team Spending",
    caption: "For each win",
    icon: "sports_baseball",
    link: "#/spendingPerWin",
  },
  {
    title: "Foreign-born Players and Wins",
    caption: "MLB player distributions vs wins",
    icon: "sports_baseball",
    link: "#/foreignBorn",
  },
  {
    title: "Player Height & Performance",
    caption: "Are short players better?",
    icon: "sports_baseball",
    link: "#/sizePerformance",
  },
  {
    title: "Home Runs & Post Season",
    caption: "Do home run hitters reach the post season more frequently?",
    icon: "sports_baseball",
    link: "#/hrPost",
  },
  {
    title: "Feedback",
    caption: "Submit Feedback or general inquiries",
    icon: "feedback",
    link: "#/feedback",
  },
];

export default defineComponent({
  name: "MainLayout",

  components: {
    EssentialLink,
  },

  setup() {
    const leftDrawerOpen = ref(false);

    return {
      essentialLinks: linksList,
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
    };
  },
});
</script>

<style>
.bg-image {
  background-image: url("../assets/bg1.png");
  background-size: fit;
}
</style>
