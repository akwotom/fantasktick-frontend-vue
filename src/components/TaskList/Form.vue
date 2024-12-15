<!--
    Copyright 2024 Son of Binary
    The Fantasktick Project
    This component (form) allows us to enter information that could be use to create or edit tasks.
-->

<script>

</script>


<script setup>

import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'

import { ref, defineProps, defineModel, onMounted, getCurrentInstance, watch } from 'vue'


import _strings from '@/stores/strings/index.js'
const strings = _strings().values

const loading = ref(false)


defineProps({
    onComplete: {
        type: Function,
        default: () => undefined,
    },
    title: {
        type: String,
        default: undefined,
    },
    actionText: {
        type: String,
        default: undefined,
    },
    initials: {
        type: Object,
        default: {},
    },
});


const model = defineModel({
    default: {
        label: '',
        description: '',
        date: ''
    }
})

let onConfirm;


onMounted(function () {

    const instance = getCurrentInstance()

    onConfirm = async () => {
        loading.value = true;
        try {
            await instance.props.onComplete?.();
        } finally {
            setTimeout(() => loading.value = false, 100);
        }
    }


    Object.assign(model.value, instance.props.initials)

})

defineEmits({
    'close': {}
})



async function setDate(date) {
    model.value.date = date
}



</script>


<template>
    <div class="form-root" @click="$emit('close')">
        <div class="content flex-column" @click="e => e.stopPropagation()">
            <h4 class="title">{{ title || strings.createNewTask }}</h4>
            <div class="input-area mt-4">

                <div class="main-input-section">

                    <form class="mb-5 gap-4 d-flex flex-column">
                        <div>
                            <label for="inputLabel">{{ strings.Name }}</label>
                            <input class="form-control" name="inputLabel" v-model="model.label">
                        </div>

                        <div>
                            <label for="inputDescription">{{ strings.Description }}</label>
                            <textarea class="form-control" id="inputDescription" v-model="model.description" />
                        </div>
                    </form>


                </div>


                <div class="d-flex flex-column gap-1 justify-content-center align-items-center mt-3"
                    style="font-size:0.5em;">
                    <VueDatePicker :action-row="{ showSelect: true }" class="calendar-input" inline
                        :enable-time-picker="false" @update:model-value="setDate" :model-value="model.date">
                    </VueDatePicker>
                </div>


            </div>


            <button type="button" class="btn btn-primary action-button d-flex gap-2"
                style="gap: 1em; justify-content:center; align-items:center;" @click="onConfirm">
                <span style="place-self:center;">{{ actionText ||
                    strings.create }}</span>
                <span :class="`spinner-border ${loading == true ? '' : 'd-none'}`"
                    style="font-size: 0.5em;height: 2em; width: 2em; margin-left: 2em;"></span>
            </button>

        </div>
    </div>
</template>


<style scoped>
.form-root {
    position: fixed;
    height: 100%;
    width: 100%;
    z-index: 2;
    background-color: rgba(255, 166, 0, 0.295);
    top: 0px;
    left: 0px;
    display: flex;
    justify-content: center;
    align-items: flex-end;
    backdrop-filter: blur(4px);
}

.form-root>.content {
    display: flex;
    background-color: white;
    padding: 2em;
    border-radius: 1em;
    --main-input-section-width: clamp(100px, 100%, 300px);
    width: calc(var(--main-input-section-width) + clamp(5em, 30em, 50vw));
    margin-bottom: 1em;
    overflow: auto;
    position: relative;
    max-height: 32em;
}

.form-root>.content>.input-area {
    display: flex;
    gap: 1em;
    justify-content: space-between;
    flex-wrap: wrap;
}


.form-root>.content>.input-area>.main-input-section {
    width: var(--main-input-section-width);
}

.form-root>.content>.action-button {
    max-width: var(--main-input-section-width);
    transform: translateY(-70px);
}



@media screen and (max-width: 776px) {

    .form-root>.content {
        --main-input-section-width: clamp(100px, 100vw - 4em, 400px);
        width: calc(var(--main-input-section-width) + clamp(5em, 5em, 5em));
        gap: 2em;
        display: inline-flex;
    }

    .form-root>.content>.action-button {
        transform: unset;
    }


    .form-root>.content .calendar-input {
        width: var(--main-input-section-width);
        position: relative;
    }

}
</style>

<style>
.calendar-input>*:has(.dp__outer_menu_wrap) {
    width: var(--main-input-section-width, 100%);
}


.calendar-input .dp__outer_menu_wrap {
    width: var(--main-input-section-width, 100%);
}
</style>