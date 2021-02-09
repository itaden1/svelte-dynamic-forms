<script lang="ts">
    export let content;
</script>
<p contenteditable="true" on:input={(e) => console.log(e)}>{content}</p>