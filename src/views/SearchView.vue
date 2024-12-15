<!--
    Copyright 2024 Son of Binary
    The Fantasktick Project
    This view is where the user sees search results
-->


<script setup>
import api from '@/api/api';
import Item from '@/components/TaskList/List/Item.vue';
import router from '@/router';
import { ref, watch } from 'vue';
import { ArrowLeftIcon } from '@heroicons/vue/24/solid';
import strings from '@/stores/strings';



const items = ref([]);
const isSearching = ref(false);

function doSearch() {
    isSearching.value = true;
    api.list({
        search: (router.currentRoute.value.query.query)
    }).then(searchItems => {
        items.value = [...searchItems];
    }).finally(() => {
        setTimeout(() => {
            isSearching.value = false
        }, 1000);
    })
}

doSearch();


// Since the search results page still has input for search, let's watch out for when a search is requested
// This means watching for changes to the current route
watch(router.currentRoute, function () {
    doSearch()
})

</script>


<template>

    <div class='search-results-root'>
        <div class="d-flex flex-row gap-2" style="align-items:center;">
            <div v-if="isSearching" class="spinner-border"
                style="font-size: 0.5em;height: 2em; width: 2em; color:var(--theme-orange);">
            </div>
            <ArrowLeftIcon style="width: 1.25em; cursor:pointer;" @click="router.push({ path: '/' })" />
            <h6>{{ strings().values.searchResults }}</h6>
        </div>
        <div class="spacer mt-3" />
        <Item v-for="item in items" v-bind=item />
    </div>

</template>