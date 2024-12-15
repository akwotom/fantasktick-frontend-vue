<!--
    Copyright 2024 Son of Binary
    The Fantasktick Project
    This component represents the left navigation
-->

<script setup>
import TaskSearch from '../TaskSearch.vue';
import LangSelect from './Actions/LangSelect.vue';
</script>

<template>
    <div class="left-nav-root">
        <TaskSearch style="position:sticky; top:1em;" />
        <LangSelect />
    </div>
</template>


<style scoped>
.left-nav-root {
    display: flex;
    flex-direction: column;
    gap: 2em;
    padding: 1em;
    background-color: var(--theme-purple);
    color: white;
    border-radius: 0.5em;
    min-width: 150px;
    min-height: calc(100vh - 4em);
}
</style>