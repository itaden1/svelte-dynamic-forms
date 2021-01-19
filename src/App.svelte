<script lang="ts">

	import WidgetBase from "./components/WidgetBase.svelte"; 
	import WidgetPreview from "./components/WidgetPreview.svelte";

	export let callBack;
	export let existing_widgets: Array<object>;

	const widgetComponents: {[key: string]:object} = {
		existing:[
			{
				index: 0,
				type:"image",
				name: "image",
				active: true,
				fields: [
					{type: "input", name: "url"}, 
					{type: "file", name: "upload"},
					{type: "input", name: "alt"}
				]
			},
		],
		options: {
			"image":{
				type:"image",
				name: "image",
				fields: [
					{type: "input", name: "url"}, 
					{type: "file", name: "upload"},
					{type: "input", name: "alt"}
				]
			}
		}
		}
		// "title": {name:"title", type:"title", fields: [{type: "input", name: "url"}]},
		// "table": {name:"table", type:"table", fields: [{type: "input", name: "url"}]}
	
	

	let widgetsOpen = false;

	function addWidget(name: string){
		const new_widget = widgetComponents.options[name];

		let oldWidgets = existing_widgets.map((i) => {
			i.active = false;
			return i;
		})
		new_widget.active = true;
		existing_widgets = [...oldWidgets, new_widget];
		widgetsOpen = false;
	}

	function removeWidget(index: number){
		let widgets = [...existing_widgets];
		widgets.splice(index, 1);
		existing_widgets = widgets;

	}

	function getWidget(index){
		return widgetComponents.existing[index]
	}

</script>

<main>
	{#each existing_widgets as widget, index}
	{widget.active}
		<WidgetBase widget={getWidget(index)} />
		<!-- <WidgetPreview widget={getWidget(widget)} /> -->
		<button on:click={() => removeWidget(index)}>-</button>
		<button on:click={() => widgetsOpen = !widgetsOpen} >+</button>
		{#if widgetsOpen}
			<button on:click="{() => addWidget("image") }">[image]</button>
			<button on:click="{() => addWidget("title") }">[title]</button>
			<button on:click="{() => addWidget("table") }">[table]</button>

			<button on:click="{() => widgetsOpen = !widgetsOpen}">close</button>
		{/if}
	{/each}
	{#if existing_widgets.length <= 0}
		<button on:click="{() => addWidget("image") }">[image]</button>
		<button on:click="{() => addWidget("title") }">[title]</button>
		<button on:click="{() => addWidget("table") }">[table]</button>
	{/if}

</main>

<style>

</style>