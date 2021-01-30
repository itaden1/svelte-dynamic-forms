<script lang="ts">
    export let widget;
    console.log("***", widget)
</script>
<div class="widget-preview">
    {#if widget.type === "image"}
        <img src={widget.element.src} alt={widget.alt}/>  
    {/if}
</div>