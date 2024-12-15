<!--
    Copyright 2024 Son of Binary
    The Fantasktick Project
    This component is the basic structure of the app, featuring left and top navigations.
-->


<script setup>
import TopNav from './TopNav.vue'
import LeftNav from './LeftNav/Nav.vue'
</script>


<template>
    <div class="appframe-root">

        <LeftNav />
        <div class="d-flex flex-column" style="flex-grow: 1; gap: 1.5em;">
            <TopNav style="position:sticky; top:0.5em; z-index:2" />
            <slot style="flex-grow:1;" class="d-flex flex-column justify-center align-center"></slot>
        </div>

    </div>
</template>

<style scoped>
.appframe-root {
    display: flex;
    gap: 2em;
}
</style>