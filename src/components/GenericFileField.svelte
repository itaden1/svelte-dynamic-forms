<script lang="ts">
    import type { WidgetComponent } from "../models";
    import ImagePreview from "./ImagePreview.svelte";
    import { existingComponents } from "../stores";

    export let field;
    export let widget;

    let src = "https://via.placeholder.com/250";

    let fileField: HTMLInputElement;

    function getCurrentComponent(components: Array<WidgetComponent>){
        return $existingComponents.filter(c => c.active).pop();
    }

    function handleInput(event: { target: HTMLInputElement; }){
        if (event.target.type === "file"){
            var fReader = new FileReader();
            fReader.readAsDataURL(event.target.files[0]);
            fReader.onloadend = (e) => {
                src = e.target.result.toString();
                let current = getCurrentComponent($existingComponents);
                current.setElementAttributes("src", src);
            }
        }
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