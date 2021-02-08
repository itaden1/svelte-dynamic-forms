<script lang="ts">
    import ImagePreview from "./ImagePreview.svelte";
    import { createEventDispatcher } from "svelte";

    const dispatch = createEventDispatcher();

    export let field;
    export let widget;

    let fileField: HTMLInputElement;

    function handleInput(event: { target: HTMLInputElement; }){
        dispatch("fieldChange", event);
    }

    // pass the click event from the image box onto the input element
    function passClickToField(){
        fileField.click();
    }

</script>

<label for={field.name}>{field.name}</label>
<input 
    bind:this={fileField}
    bind:value={widget.element.src}
    name={field.name}
    type="file" 
    on:input={(event) => handleInput(event)} 
/>
<br>
<ImagePreview 
    src={widget.element.getAttribute("src")} 
    alt={widget.element.getAttribute("alt")}
    on:click={() => passClickToField()} 
/>

<style>
    input[type="file"]{
        display: none;
    }
</style>