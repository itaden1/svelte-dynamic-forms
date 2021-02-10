<script lang="ts">
    export let content;
    export let key;
</script>
<p contenteditable="true" data-element-key={key} on:input>{content}</p>