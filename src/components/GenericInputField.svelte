<script lang="ts">
    import { createEventDispatcher } from "svelte";

    const dispatch = createEventDispatcher();

    export let field;
    export let widget;


    function handleInput(event:{ target: HTMLInputElement }){
        dispatch("fieldChange", event);
    }

</script>
    <label for={field.name}>{field.name}</label>
    <input 
        type={field.type}
        on:input="{(e) => handleInput(e)}"
        name={field.name}
        value={field.value}
    /><br>
