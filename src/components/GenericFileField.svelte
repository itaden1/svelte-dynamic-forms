<script lang="ts">
    import type { WidgetComponent } from "../models";
    import ImagePreview from "./ImagePreview.svelte";
    import { existingComponents } from "../stores";

    export let field;
    export let widget;

    // let src = "https://via.placeholder.com/250";

    let fileField: HTMLInputElement;

    function getCurrentComponent(components: Array<WidgetComponent>){
        return components.filter(c => c.active)[0];
    }

    function handleInput(event: { target: HTMLInputElement; }){
        if (event.target.type === "file"){
            var fReader = new FileReader();
            fReader.readAsDataURL(event.target.files[0]);
            fReader.onloadend = (e) => {
                const tmpImage = e.target.result.toString();
                let components = $existingComponents.map(c => {
                    if (c.active) {
                        c.setElementAttributes("src", tmpImage)
                    }
                    return c;
                });
                $existingComponents = components;
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
    bind:value={widget.element.src}
    type="file" 
    on:input={(e) => handleInput(e)} 
/>
<br>
<ImagePreview 
    src={getCurrentComponent($existingComponents).element.getAttribute("src")} 
    alt={getCurrentComponent($existingComponents).element.getAttribute("alt")} 
    on:click={(e) => passClickToField()} 
/>



<style>
    input[type="file"]{
        display: none;
    }
</style>