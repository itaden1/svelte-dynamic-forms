<script lang="ts">
    import GenericInputField from "./GenericInputField.svelte";
    import GenericFileField from "./GenericFileField.svelte";

    import { existingComponents } from "../stores";

    import type { iField } from "../interface";
    import type { WidgetComponent } from "../models";

    export let widget;
    let fields: Array<iField> = widget.fields;

    function getCurrentComponent(components: Array<WidgetComponent>){
        return components.filter(c => c.active)[0];
    }

    function handleFieldChange(event: { target: HTMLInputElement; }){
        // if the target is a file field we create a data url of the file and apply it to the element
        if (event.target.type === "file"){
            let fReader = new FileReader();
            fReader.readAsDataURL(event.target.files[0]);
            fReader.onloadend = (e) => {
                const tmpImage = e.target.result.toString();
                let components = $existingComponents.map(c => {
                    if (c.active === true) {
                        c.setElementAttributes("src", tmpImage)
                        c.setFieldByName(event.target.name, event.target.value);
                        c.setFieldByName("url", "");
                    }
                    return c;
                });
                $existingComponents = components;
            }            
        }        
        else if (event.target.name === "url"){
            let components = $existingComponents.map(c => {
                    if (c.active === true) {
                        c.setElementAttributes("src", event.target.value);
                        c.setFieldByName(event.target.name, event.target.value);
                    }
                    return c;
                });
                $existingComponents = components;
        } else {
            let components = $existingComponents.map(c => {
                if (c.active) {
                    c.setFieldByName(event.target.name, event.target.value);
                }
                return c;
            });
            $existingComponents = components;
        }
    }

</script>
<div class="widget-form">
    {widget.index}
    {#each widget.fields as field, index}
        {#if field.type === "file"}
            <GenericFileField 
                {field} 
                {widget} 
                on:fieldChange={() => handleFieldChange(event)}
            />
        {:else}
            <GenericInputField 
                {field} 
                {widget}
                on:fieldChange={() => handleFieldChange(event)}
            />
        {/if}
    {/each}
</div>

