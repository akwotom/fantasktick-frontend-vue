<!--
    Copyright 2024 Son of Binary
    The Fantasktick Project
    This view represents a section containing tasks; for example, a pending tasks section.
-->


<template>
    <div class="section-root">
        <slot name="label"></slot>
        <slot></slot>
    </div>
</template>

<style scoped>
.section-root {
    display: flex;
    flex-direction: column;
    gap: 1em;
}
</style>