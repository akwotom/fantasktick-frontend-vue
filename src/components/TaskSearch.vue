<!--
    Copyright 2024 Son of Binary
    The Fantasktick Project
    This component helps a user search for tasks
-->

<script setup>


import router from '@/router';
import strings from '@/stores/strings';
import { MagnifyingGlassIcon } from '@heroicons/vue/24/solid';
import { ref } from 'vue';

const inputValue = ref();

function triggerSearch(event) {
    if (event.code == 'Enter') {
        router.push({
            path: '/search',
            query: {
                query: inputValue.value
            }
        })
    }
}

</script>



<template>
    <div class="search-root">
        <div class="d-flex">
            <MagnifyingGlassIcon
                style="width: 1.25em; top: calc(50% - 0.5em); left: 0.5em; position:absolute; color: var(--theme-orange);" />

            <input v-model="inputValue" type="text" class="form-control" :placeholder="strings().values.search"
                @keydown="triggerSearch" style="padding-left: 3em;" />
        </div>
    </div>
</template>