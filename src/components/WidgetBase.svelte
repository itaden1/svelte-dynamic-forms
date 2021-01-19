<script lang="ts">
    import GenericInputField from "./GenericInputField.svelte";
    import GenericFileField from "./GenericFileField.svelte";

    export let widget;

</script>
<div class="widget-form">
    {#if widget.active}
        {#each widget.fields as field, index}
            {#if field.type === "file"}
                <GenericFileField {field} />
            {:else}
                <GenericInputField {field} />
            {/if}

        {/each}
    {:else}
        <p> widget preview here</p>
    {/if}
</div>

