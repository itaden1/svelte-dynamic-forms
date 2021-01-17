<script lang="ts">

	import WidgetBase from "./components/WidgetBase.svelte"; 

	export let callBack;
	export let existing_widgets: Array<object>;

	const widgetComponents: {[key: string]: object} = {
		"image": {
			name:"image", 
			type:"image", 
			fields: [
				{type: "input", name: "url"}, 
				{type: "file", name: "upload"},
				{type: "input", name: "alt"}
			]
		},
		// "title": {name:"title", type:"title", fields: [{type: "input", name: "url"}]},
		// "table": {name:"table", type:"table", fields: [{type: "input", name: "url"}]}
	}

	let widgetsOpen = false;

	function addWidget(name: string){
		const new_widget = widgetComponents[name];
		existing_widgets = [...existing_widgets, new_widget];
		widgetsOpen = false;
	}

	function removeWidget(index: number){
		let widgets = [...existing_widgets];
		widgets.splice(index, 1);
		existing_widgets = widgets;

	}

	function getWidget(widget){
		return widgetComponents[widget.type]
	}

</script>

<main>
	{#each existing_widgets as widget, index}
		<WidgetBase widget={ getWidget(widget) } />
		<button on:click="{() => removeWidget(index)}">-</button>
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