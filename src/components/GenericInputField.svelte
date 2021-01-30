<script lang="ts">
    export let field;
    export let widget;

    let value: string = "";

    function handleInput(event:{ target: HTMLInputElement }){
        value = event.target.value;
    }

</script>
    <label for={field.name}>{field.name}</label>
    <input 
        type={field.type} 
        on:input="{(e) => handleInput(e)}"
        value={value}    
    /><br>
