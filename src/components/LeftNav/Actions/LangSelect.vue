<!--
    Copyright 2024 Son of Binary
    The Fantasktick Project
    This component allows the user to switch languages
-->


<script setup>
import strings from '@/stores/strings';
import { watch } from 'vue';
import { nextTick, ref } from 'vue';

const langs = ref({});

const setLabels = () => {

    langs.value = {
        en: strings().values.lang_en,
        fr: strings().values.lang_fr
    }
}

nextTick(setLabels)




async function changeLang(code) {
    strings().setLang(code);
}


</script>


<template>

    <div class="lang-select-root">
        <div class="title">{{ strings().values.chooseLanguage }}</div>
        <div class="options">

            <div v-for="(label, code) in langs" @click="changeLang(code)">{{ strings().values[`lang_${code}`] }}</div>
        </div>
    </div>

</template>


<style scoped>
.lang-select-root {
    display: flex;
    flex-direction: column;
    gap: 1em;
}

.lang-select-root>.options {
    display: flex;
    gap: 2em;
    flex-wrap: wrap;
}

.lang-select-root>.options>* {
    display: inline-flex;
    padding: 0.5em;
    border-radius: 0.75em;
    background-color: rgb(255, 255, 255);
    color: var(--theme-orange);
    cursor: pointer;
    transition: 0.5s 0.125s;
}

.lang-select-root>.options>*:hover {

    color: rgb(255, 255, 255);
    background-color: var(--theme-orange);
}
</style>