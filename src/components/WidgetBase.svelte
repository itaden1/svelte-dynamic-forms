<script lang="ts">
    import GenericInputField from "./GenericInputField.svelte";
    import GenericFileField from "./GenericFileField.svelte";

    import type { iField } from "../interface";

    export let widget;
    let fields: Array<iField> = widget.fields;

</script>
<div class="widget-form">
    {#if widget.active}
        {#each fields as field, index}
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

