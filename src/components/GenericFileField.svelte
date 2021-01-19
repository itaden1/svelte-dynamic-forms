<script lang="ts">
    import ImagePreview from "./ImagePreview.svelte";
    import WidgetPreview from "./WidgetPreview.svelte";

    export let field;

    let data = {
        src: "https://via.placeholder.com/250",
        alt: "",
        url: ""
    }
    let src = "https://via.placeholder.com/250";

    let fileField: HTMLInputElement;

    function handleInput(event: { target: HTMLInputElement; }){
        if (event.target.type === "file"){
            var fReader = new FileReader();
            fReader.readAsDataURL(event.target.files[0]);
            fReader.onloadend = (e) => {
                data.src = e.target.result.toString();
            }
        }
    }

    function passClickToField(){
        // pass the click event from the image box onto the input
        fileField.click()
    }
</script>

<label for={field.name}>{field.name}</label>
<input 
    bind:this={fileField} 
    bind:value={data.src}
    type="file" 
    on:input={(e) => handleInput(e)} 
/>
<br>
<ImagePreview 
    src={data.src} 
    alt={widget.alt} 
    on:click={(e) => passClickToField(e)} 
/>



<style>
    input[type="file"]{
        display: none;
    }
</style>