import {ThemeEnum} from "@/enums/theme.enum";
<template>
    <nav class="tk-nav tk-animation tk-animation--fade-in">
        <div class="tk-nav__items">
            <div class="tk-nav__left-items">
                <div class="tk-nav__item tk-nav__item--fix-top">
                    <a href="javascript:void(0)" class="tk-link tk-link--default tk-nav__logo">
                        <img src="../../assets/img/origin-logo.svg" alt="Origin - Logo">
                    </a>
                </div>
            </div>
            <div class="tk-nav__right-items">
                <div class="tk-nav__item">
                    <a id="tk-nav__dark-mode" class="tk-link tk-link--primary tk-link--small" v-bind:class="currentTheme === 'DARK' ? 'tk-link--active' : ''" v-on:click="changeToDarkMode">
                        Dark mode
                    </a>
                </div>
                <div class="tk-nav__item">
                    <a id="tk-nav__light-mode" class="tk-link tk-link--primary tk-link--small" v-bind:class="currentTheme === 'LIGHT' ? 'tk-link--active' : ''" v-on:click="changeToLightMode">
                        Light mode
                    </a>
                </div>
            </div>
        </div>
    </nav>

</template>

<script lang="ts">
    import {Options, Vue} from "vue-class-component";
    import {ThemeEnum} from "@/enums/theme.enum";
    import Theme from "@/services/theme";

    @Options({
    })
    export default class Navbar extends Vue {

        private theme: Theme;

        currentTheme: ThemeEnum = ThemeEnum.DARK;

        mounted() {
            this.theme = Theme.getInstance();
            this.registerListerners();
        }

        changeToDarkMode(): void {
            this.theme.changeColorSchemePref(true);
        }

        changeToLightMode(): void {
            this.theme.changeColorSchemePref(false);
        }

        private registerListerners(): void {
            this.theme.getCurrentTheme().subscribe((theme: ThemeEnum) => {
                if (theme) {
                    this.currentTheme = theme;
                }
            });
        }
    }
</script>

<style lang="scss">
    @import "navbar";
</style>
