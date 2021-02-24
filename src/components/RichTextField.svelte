<script lang="ts">
    import { loop_guard, onMount, select_value } from "svelte/internal";
    import { beforeUpdate, afterUpdate } from 'svelte';

    import { editorTarget } from "../stores";
    import type { iIndexedObj } from "../interface";
    import reIndexComponents from "../lib/helpers";
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

    let data: Array<IIndexedObj> = [
        {index: 0, type: "h1", content: "Heading"},
        {index: 1, type: "p", content: "All of the other contents"},
    ];

    afterUpdate(() => {
            console.log($editorTarget);
            const targetElement = document.querySelector(`[data-element-key="${String($editorTarget)}"]`);
            let node = targetElement.parentNode.childNodes
            let selection = window.getSelection();
            console.log(targetElement, "<<<<<<<<<<");
            let range = document.createRange();
            selection.removeAllRanges();
            range.selectNodeContents(targetElement);
            range.collapse(false);
            selection.addRange(range);
            targetElement.focus()
    });


    function handleKeyPress(e){
        if (e.target.parentElement.id === "ediatableContent" && e.code === "Enter"){
            e.preventDefault();
            let selection = window.getSelection();
            const currentTargetKey = String(selection.anchorNode.parentElement.getAttribute("data-element-key"));
            const newField = {key: currentTargetKey + 1, type: "p", content: ""};
            let dataCopy = [...data];
            dataCopy.splice(Number(currentTargetKey) + 1, 0, newField)
            console.log($editorTarget, "]]]]]]]]]]]]")
            console.log(currentTargetKey, "!!!!!!");
            editorTarget.update(n => Number(currentTargetKey) + 1);
            console.log($editorTarget, ":::::::")
            data = reIndexComponents(Number(currentTargetKey) - 1, dataCopy);

        }
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

