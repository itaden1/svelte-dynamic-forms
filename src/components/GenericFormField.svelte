<script lang="ts">
    import ImagePreview from "./ImagePreview.svelte";

    export let field;

    let previewPath: string = "https://via.placeholder.com/150";

    function handleInput(target: HTMLInputElement){
        if (target.type === "file"){
            previewPath = URL.createObjectURL(target.files[0]);
        }
        /// update data here
    }
</script>


    <label for={field.name}>{field.name}</label>
    <input type={field.type} on:input="{(e) => handleInput(e.target)}"/><br>
    {#if field.type === "file"}
        <ImagePreview src={previewPath} alt={widget.alt}/>
    {/if}