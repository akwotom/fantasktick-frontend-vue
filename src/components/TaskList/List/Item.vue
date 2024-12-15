<!--
    Copyright 2024 Son of Binary
    The Fantasktick Project
    This component represents a single task on a task list
-->

<script setup>
import strings from '@/stores/strings';
import Form from '../Form.vue';
import { ref, } from 'vue'
import api from '@/api/api';
import { ModalsContainer, useModal } from 'vue-final-modal';
import Modal from '@/components/Modal.vue';


const editing = ref(false)

const langStrings = strings().values;

const formValues = ref({});

const checkboxLoading = ref(false);



const props = defineProps({
    id: String,
    label: {
        type: String,
        default: "Do Workout",

    },
    description: {
        type: String,
        default: "Do a great workout"

    },
    date: {
        type: String

    },
    created_at: String,
    updated_at: String,
    status: String,
})

const emit = defineEmits({
    'statusChanged': String,
    'fieldsChanged': String,
})


const finalValues = ref({
    ...props
})


function showError(e) {
    useModal({
        component: Modal,
        attrs: {
            title: langStrings.error,

        },
        slots: {
            default: `${e}`
        }
    }).open()
}


async function doEdit() {

    try {
        await api.update({
            id: props.id,
            ...formValues.value,
        });
        Object.assign(finalValues.value, formValues.value);
        emit('fieldsChanged', finalValues.value)
        editing.value = false;
    } catch (e) {
        showError(e);
    }
}


async function changeStatus(e) {

    const status = e.target.checked ? 'completed' : 'pending';
    try {
        checkboxLoading.value = true;
        await api.update({
            id: finalValues.value.id,
            status: status,
        });
        finalValues.value.status = status;
        emit('fieldsChanged', finalValues.value)
        emit('statusChanged', status)
    } catch (e) {
        showError(e)
    } finally {
        checkboxLoading.value = false;
    }


}

</script>

<template>
    <div class="item-root" @click="editing = true">
        <div class="main">
            <div class="left d-flex flex-row" style="align-items:center; justify-content:center;">
                <div class="actions d-flex flex-row" style="align-items:center; justify-content:center;"
                    @click="e => e.stopPropagation()">
                    <span class="spinner-border" v-if="checkboxLoading"
                        style="color: var(--theme-orange); font-size: 0.5em; height: 2em; width: 2em;" />
                    <input v-else type="checkbox" class="form-check-input" @click="changeStatus"
                        :checked="finalValues.status == 'completed'">
                </div>
                <slot name="label">{{ finalValues.label }}</slot>
            </div>
            <div class="right">
                <div class="date">{{ new Date(finalValues.date).toDateString() }}</div>
            </div>
        </div>

        <ModalsContainer />


    </div>
    <Form v-if="editing" @close="editing = false" :title="langStrings.editTask" :initials="finalValues"
        @complete="doEdit" v-model="formValues" :action-text="langStrings.save"></Form>
</template>


<style scoped>
.item-root {
    display: flex;
    flex-direction: column;
    padding: 1em;
    background-color: white;
    border-radius: 0.75em;
    position: relative;
    cursor: pointer;
}

.item-root::before {
    width: 100%;
    height: 100%;
    top: 0px;
    left: 0px;
    content: '';
    position: absolute;
    box-shadow: 0px 0px 0.75em lightgrey;
    border-radius: inherit;
    z-index: -1;
}

.item-root>.main {
    display: flex;
    justify-content: space-between;
    gap: 1em;
}


.item-root>.main>:is(.left, .right) {
    display: flex;
    gap: 1em;
}

.item-root>.main>.right>.date {
    color: var(--theme-purple);
}
</style>