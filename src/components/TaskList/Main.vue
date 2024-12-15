<!--
    Copyright 2024 Son of Binary
    The Fantasktick Project
    This view is where the user sees a list of the tasks he has to do.
-->

<script setup>

import { CheckBadgeIcon, SunIcon } from '@heroicons/vue/24/solid';
import List from './List/Main.vue'
import Section from './Section.vue'
import strings from '@/stores/strings';

async function reorderTask(item) {
    lists.forEach(view => {
        if (view.props.filter.status == item.status) {
            view.exposed.push(JSON.parse(JSON.stringify(item)));
        } else {
            // view.exposed.remove(item.id)
        }

    })
}


const lists = [];

async function onListItemMounted(view) {
    lists.push(view.component)
}

</script>


<template>
    <div class="tasklist-root d-flex flex-column gap-5">
        <Section>
            <template #label>
                <div class="d-flex flex-row gap-2">
                    <SunIcon style="width:1.5em; color: var(--theme-orange)" />
                    <div>{{ strings().values.Pending }}</div>
                </div>
            </template>
            <List :filter="{ status: 'pending' }" @itemStatusChanged="reorderTask" @vue:mounted="onListItemMounted">
            </List>
        </Section>
        <Section>
            <template #label>
                <div class="d-flex flex-row gap-2">
                    <CheckBadgeIcon style="width:1.5em; color: var(--theme-orange)" />
                    <div>{{ strings().values.Completed }}</div>
                </div>
            </template>
            <List :filter="{ status: 'completed' }" @item-status-changed="reorderTask" @vue:mounted="onListItemMounted">
            </List>
        </Section>
    </div>
</template>
