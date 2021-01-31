<script lang="ts">
    import GenericInputField from "./GenericInputField.svelte";
    import GenericFileField from "./GenericFileField.svelte";

    import type { iField } from "../interface";

    export let widget;
    let fields: Array<iField> = widget.fields;

</script>
<div class="widget-form">
    {widget.index}
    {#each widget.fields as field, index}
        {#if field.type === "file"}
            <GenericFileField {field} {widget}/>
        {:else}
            <GenericInputField {field} {widget}/>
        {/if}
    {/each}
</div>

