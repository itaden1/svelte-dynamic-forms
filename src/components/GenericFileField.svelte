<script lang="ts">
    import { createEventDispatcher } from "svelte";
    import ImagePreview from "./ImagePreview.svelte";

    const dispatch = createEventDispatcher();

    export let field;

    let data = {
        src: "https://via.placeholder.com/250",
        alt: "",
        url: ""
    }

    let src = "https://via.placeholder.com/250";

    let fileField: HTMLInputElement;

    function handleInput(event: { target: HTMLInputElement; }){
        if (event.target.type === "file"){
            var fReader = new FileReader();
            fReader.readAsDataURL(event.target.files[0]);
            fReader.onloadend = (e) => {
                src = e.target.result.toString();
            }
        }
        dispatch("fileUpdated", )
    }

    // pass the click event from the image box onto the input element
    function passClickToField(){
        fileField.click()
    }

</script>

<label for={field.name}>{field.name}</label>
<input 
    bind:this={fileField} 
    bind:value={src}
    type="file" 
    on:input={(e) => handleInput(e)} 
/>
<br>
<ImagePreview 
    src={src} 
    alt={widget.alt} 
    on:click={(e) => passClickToField()} 
/>



<style>
    input[type="file"]{
        display: none;
    }
</style>