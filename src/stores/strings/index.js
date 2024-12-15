/**
 * Copyright 2024 Son of Binary
 * The Fantasktick Project
 * This state object contains strings used by the app
 */

import { defineStore } from "pinia";
import stringsEn from "./en";
import { nextTick, ref, watch } from "vue";
import stringsFr from "./fr";

const stringsRef = ref({})

function getLang() {
    return localStorage.getItem('lang')
}


const strings = defineStore('strings', () => {
    // TODO: Implement language selection logic
    return {
        values: stringsRef,
        setLang: (code = getLang()) => {
            code = code == 'fr' ? code : 'en';
            stringsRef.value = code == 'en' ? stringsEn : stringsFr
            localStorage.setItem('lang', code)
        },
        getLang,
    }
})
export default strings;