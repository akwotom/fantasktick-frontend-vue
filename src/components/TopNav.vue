<!--
    Copyright 2024 Son of Binary
    The Fantasktick Project
    This component is the top navigation, that's found everywhere on the app
-->

<script setup>
import router from '@/router';
import strings from '@/stores/strings';

async function gotoNew() {
    router.push({
        path: '/new',
    })
}
</script>



<template>
    <div class="top-nav-root">
        <div class="main">
            <div class="title">{{ strings().values.appName }}</div>
            <div class="action btn btn-primary" style="align-items:center;" @click="gotoNew">{{ strings().values.add }}
            </div>
        </div>
    </div>
</template>


<style scoped lang="scss">
.top-nav-root>.main {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    gap: 2em;
    background-color: var(--theme-purple);
    padding: 0.75em;
    border-radius: 0.5em;
    color: white;
    align-items: center;
}

.top-nav-root>.main>.title {
    flex-grow: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 2em;
}
</style>