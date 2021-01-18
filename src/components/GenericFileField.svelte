<script lang="ts">
    import ImagePreview from "./ImagePreview.svelte";
    import GenericInputField from "./GenericInputField.svelte"

    export let field;

    let previewPath: string = "https://via.placeholder.com/250";

    function handleInput(event: { target: HTMLInputElement; }){
        if (event.target.type === "file"){
            previewPath = URL.createObjectURL(event.target.files[0]);
        }
        /// update data here
    }
</script>

<div class="content-builder__image-widget-container">
    <div class="content-builder__image-widget-child">
        <label for={field.name}>{field.name}</label>
        <input type={field.type} on:input="{(e) => handleInput(e)}"/>
        <!-- <GenericInputField field={field} on:input="{(e) => handleInput(e)}" /><br> -->
    </div>
    <div class="content-builder__image-widget-container-child">
        <ImagePreview src={previewPath} alt={widget.alt}/>
    </div>
</div>

<style>
    .content-builder__image-widget-container{
        display:flex;
    }
    .content-builder__image-widget-child{
       flex: 1;
    }
</style>