<!--
    Copyright 2024 Son of Binary
    The Fantasktick Project
    This view is where the user can create a new 
-->

<script setup>
import api from '@/api/api';
import Modal from '@/components/Modal.vue';
import Form from '@/components/TaskList/Form.vue';
import router from '@/router';
import strings from '@/stores/strings';
import { useTemplateRef, ref } from 'vue';
import { ModalsContainer, useModal } from 'vue-final-modal';

const form = useTemplateRef('form')


const formValue = ref({})

async function doCreate() {
    console.log('form value ', formValue.value);
    try {
        await api.create({
            ...formValue.value
        })
        router.back()
    } catch (e) {
        showError(e)
    }
}


function showError(e) {
    useModal({
        component: Modal,
        attrs: {
            title: (strings().values).error,
        },
        slots: {
            default: `${e}`
        }
    }).open()
}



</script>


<template>
    <Form @close="router.push({ path: '/' })" @complete="doCreate()" ref="form" v-model="formValue" />
    <ModalsContainer />
</template>