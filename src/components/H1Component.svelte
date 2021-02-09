<script lang="ts">
    export let content;
</script>
<h1 contenteditable="true" on:input={(e) => console.log(e)}>{content}</h1>