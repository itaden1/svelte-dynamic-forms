<script lang="ts">
    import GenericInputField from "./GenericInputField.svelte";
    import GenericFileField from "./GenericFileField.svelte";
    import RichTextField from "./RichTextField.svelte";

    import { existingComponents } from "../stores";

    import type { WidgetComponent } from "../models";

    export let widget: WidgetComponent;

    const componentMap = {
        "file": GenericFileField,
        "input": GenericInputField,
        "contentEditable": RichTextField
    }

    function handleFieldChange(event: { target: HTMLInputElement; }){
        // if the target is a file field we create a data url of the file and apply it to the element
        let component:WidgetComponent = $existingComponents.filter(c => c.active).pop();

        if (event.target.type === "file"){
            let fReader = new FileReader();
            fReader.readAsDataURL(event.target.files[0]);
            fReader.onloadend = (e) => {
                const tmpImage = e.target.result.toString();
                component.setElementAttributes("src", tmpImage)
                component.setFieldByName(event.target.name, event.target.value);
                component.setFieldByName("url", "");
                existingComponents.patch(component);
            }            
        }        
        else if (event.target.name === "url"){
            component.setElementAttributes("src", event.target.value);
            component.setFieldByName(event.target.name, event.target.value);
            existingComponents.patch(component);
        } else {
            component.setFieldByName(event.target.name, event.target.value);
            existingComponents.patch(component);
        }

    }

</script>
<form class="widget-form" >
    {widget.index} - {widget.type}
    {#each widget.fields as field, index}
        <svelte:component 
            this={componentMap[field.type]}
            {field} 
            {widget}
            on:fieldChange={() => handleFieldChange(event)} 
        />
    {/each}
</form>

