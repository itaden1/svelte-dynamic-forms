<script lang="ts">
    import GenericInputField from "./GenericInputField.svelte";
    import GenericFileField from "./GenericFileField.svelte";

    export let widget;

    let inputString: string;



</script>
<div class="widget-form">
    {#each widget.fields as field, index}
        {#if field.type === "file"}
            <GenericFileField {field} />
        {:else}
            <GenericInputField {field} />
        {/if}

    {/each}
</div>