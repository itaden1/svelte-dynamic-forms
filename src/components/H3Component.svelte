<script lang="ts">
    export let content;
    export let key;
</script>
<h3 contenteditable="true" data-element-key={key} on:input>{content}</h3>