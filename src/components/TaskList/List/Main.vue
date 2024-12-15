<!--
    Copyright 2024 Son of Binary
    The Fantasktick Project
    This component represents a specific list; for example a list of pending tasks
    This component is directly responsible for fetching the contents
-->


<script setup>
import { getCurrentInstance, nextTick, ref } from 'vue';
import Item from './Item.vue'
import api from '@/api/api';

const items = ref([]);

const props = defineProps({
    filter: Object
})

api.list({
    page: 1, // For now, let's not think of pagination
    filters: props.filter
}).then((values) => {
    items.value = values;
    itemStatusChanged(true)
});

let itemFilterTimeout;


function itemStatusChanged(noDelay) {

    // So, when an item's status changes, we decide if we still have to keep it, based on the filter
    const requiredStatus = props.filter.status;

    if (requiredStatus) {
        clearTimeout(itemFilterTimeout);

        itemFilterTimeout = setTimeout(() => {
            const snapshot = JSON.parse(JSON.stringify(items.value));
            const retained = []
            const changed = [];
            snapshot.forEach(x => {
                (x.status == requiredStatus ? retained : changed).push(x)
            });

            nextTick(() => {
                items.value = [];
                nextTick(() => {
                    items.value.push(...retained);
                    changed.forEach(item => {
                        emit('itemStatusChanged', item)
                    })
                })
            })
        }, noDelay ? 0 : 500)
    }


}

const emit = defineEmits({
    'itemStatusChanged': Object
})



defineExpose({
    push(item) {
        items.value.push(item);
    }
})


function assignFields(input) {
    const target = items.value.find(x => x.id == input.id)
    if (target) {
        Object.assign(target, input);
    }
}


</script>


<template>
    <div class="list-root">
        <Item v-for="item in items" v-bind="item" @status-changed="() => { itemStatusChanged(false); }"
            @fields-changed="e => assignFields(e)">
        </Item>
    </div>


</template>

<style scoped>
.list-root {
    display: flex;
    flex-direction: column;
    gap: 2em;
}
</style>