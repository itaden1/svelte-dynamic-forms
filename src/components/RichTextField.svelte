<script lang="ts">
    import H1Component from "./H1Component.svelte";
    import PComponent from "./PComponent.svelte";

    export let field;
    export let widget;


    const HTMLElementMap = {
        "h1": H1Component,
        "p": PComponent,
    }

    const data = [
        {type: "h1", content: "Heading"},
        {type: "p", content: "All of the other contents"},
    ];

    function handleInput(e){
        console.log(e);
    }

</script>
<div class="controls">
    <button on:click|preventDefault="{() => console.log("h1")}">H1</button>
    <button on:click|preventDefault="{() => console.log("h2")}">H2</button>
    <button on:click|preventDefault="{() => console.log("h3")}">H3</button>
    <button on:click|preventDefault="{() => console.log("p")}">P</button>
</div>
<div>
    {#each data as el, k}
        <svelte:component
            this={HTMLElementMap[el.type]}
            content={el.content}
        />
    {/each}
</div>
