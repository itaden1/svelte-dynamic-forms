<script>
    export let src;
    export let alt;

</script>

<div class="content-builder__image-preview" 
    on:click >
        <img src="{src}" alt="{alt}"/>
</div>
<style>
    .content-builder__image-preview{
        display:inline-block;
    }
    .content-builder__image-preview img{
        height:250px
    }
</style>