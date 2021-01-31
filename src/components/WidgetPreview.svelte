<script lang="ts">
    import { createEventDispatcher } from "svelte";
    
    export let widget;

    const dispatch = createEventDispatcher();

    function handleClick( event: { target: HTMLElement; }){
        dispatch("open", event.target);
    }

</script>
<div class="widget-preview" on:click={(e) => handleClick(e)} >
    {widget.index}
    {#if widget.type === "image"}
        <img src={widget.element.src} alt={widget.element.alt}/>  
    {/if}
</div>