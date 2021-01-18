<script lang="ts">
    export let field;

    function handleInput(target: EventTarget){
        console.log("do the things");
    }
</script>
    <label for={field.name}>{field.name}</label>
    <input type={field.type} on:input="{(e) => handleInput(e.target)}"/><br>
