<script lang="ts">
    import H1Component from "./H1Component.svelte";
    import H2Component from "./H2Component.svelte";
    import H3Component from "./H3Component.svelte";
    import PComponent from "./PComponent.svelte";

    import { createEventDispatcher } from "svelte";

    const dispatch = createEventDispatcher();

    export let field;
    export let widget;

    let value: string = "";

    const HTMLElementMap = {
        "H1": H1Component,
        "H2": H2Component,
        "H3": H3Component,
        "P": PComponent,
    }

    function handleInput(event){
        if (event.inputType === "insertText") {
            value += event.data;
        }
        else if (event.inputType === "insertParagraph") {
            value += "<br/>"
        }
    }

</script>
<div id="ediatableContent">
    <svelte:component
        this={HTMLElementMap[field.type]}
        content={field.value}
        on:input={(e) => handleInput(e)}
    />
    <input type="text" name={field.name} on:input={(event) => dispatch("fieldChange", event)} value={value} />
</div>

