<script lang="ts">
    import GenericFormField from "./GenericFormField.svelte";
    export let widget;

    let inputString: string;



</script>
<div class="widget-form">
    {#each widget.fields as field, index}
        <GenericFormField {field} />
    {/each}
</div>