<script lang="ts">
    export let content;
    export let key;
</script>
<h2 contenteditable="true" data-element-key={key} on:input>{content}</h2>