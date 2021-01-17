<script lang="ts">
    import ImagePreview from "./ImagePreview.svelte";

    export let field;

    let showPreview: boolean = false;
    let previewPath: string = "";

    function handleInput(event: Event){
        if (event.target.type === "file"){
            console.log(event.target)
            previewPath = URL.createObjectURL(event.target.files[0]);
        }
        /// update data here
    }
</script>


    <label for={field.name}>{field.name}</label>
    <input type={field.type} on:input="{(e) => handleInput(e)}"/><br>
    {#if field.type === "file"}
        <ImagePreview src={previewPath} alt={widget.alt}/>
    {/if}