<script lang="ts">
    import { loop_guard } from "svelte/internal";
import H1Component from "./H1Component.svelte";
    import H2Component from "./H2Component.svelte";
    import H3Component from "./H3Component.svelte";
    import PComponent from "./PComponent.svelte";

    export let field;
    export let widget;


    const HTMLElementMap = {
        "h1": H1Component,
        "h2": H2Component,
        "h3": H3Component,
        "p": PComponent,
    }

    const data = [
        {type: "h1", content: "Heading"},
        {type: "p", content: "All of the other contents"},
    ];


    function handleKeyPress(e){
        console.log(e.target);
        if e.target.parentElement.id === 
    }

    function handleInput(e){
        // console.log(e);
        const elementKey = e.target.getAttribute("data-element-key");
        data[elementKey].content = e.target.textContent;
    }

    function setElementType(elementType: string){
        const selection = window.getSelection();
        const elementKey = selection.anchorNode.parentElement.getAttribute("data-element-key");
        data[elementKey].type = elementType;
    }

</script>
<div class="controls">
    <button on:click|preventDefault="{() => setElementType("h1")}">H1</button>
    <button on:click|preventDefault="{() => setElementType("h2")}">H2</button>
    <button on:click|preventDefault="{() => setElementType("h3")}">H3</button>
    <button on:click|preventDefault="{() => setElementType("p")}">P</button>
</div>
<div id="ediatableContent">
    {#each data as el, k}
        <svelte:component
            this={HTMLElementMap[el.type]}
            content={el.content}
            key={k}
            on:input={(e) => handleInput(e)}
        />
    {/each}
</div>
<svelte:window on:keypress={e => handleKeyPress(e)} />

