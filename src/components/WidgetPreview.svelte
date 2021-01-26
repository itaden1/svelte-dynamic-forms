<script lang="ts">
    export let widget;
    console.log(widget);

    function getImgSrc(fields){
        fields.forEach(i => {
            i.type === "file" ? i : "foo";
        })
    }
</script>
<div class="widget-preview">
    {#if widget.type === "image"}
        <img src={getImgSrc(widget.fields)} alt={widget.alt}/>  
    {/if}
</div>