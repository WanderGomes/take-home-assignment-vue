<template>
    <section class="tk-dashboard">
        <Navbar />

        <router-view />
    </section>
</template>

<script lang="ts">
    import { Options, Vue } from "vue-class-component";
    import Navbar from "@/components/navbar/navbar.vue";

    @Options({
        components: {
            Navbar
        }
    })
    export default class Dashboard extends Vue {
    }
</script>

<style scoped lang="scss">
    @import "dashboard";
</style>

