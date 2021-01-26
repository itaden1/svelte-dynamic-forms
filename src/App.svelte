<script lang="ts">

	import WidgetBase from "./components/WidgetBase.svelte"; 
	import WidgetPreview from "./components/WidgetPreview.svelte";

	import type { iField, iComponentOption } from "./interface";

	export let callBack;
	export let existing_widgets: Array<object>;

	class WidgetComponent {
		index: number;
		type: string;
		name: string;
		active: boolean = false;
		fields: Array<iField>;

		constructor(index: number, type: string, name: string, fields: Array<iField>){
			this.index = index;
			this.type = type;
			this.name = name;
			this.fields = fields;
		}
	}

	let existingComponents: Array<WidgetComponent> = [
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
	]

	const componentOptions: {[key: string]: iComponentOption} = {
		"image": {
				type:"image",
				name: "image",
				fields: [
					{type: "input", name: "url"}, 
					{type: "file", name: "upload"},
					{type: "input", name: "alt"}
				]
			}
		}
	
	
	let widgetsOpen = false;

	function addWidget(name: string){
		const option = componentOptions[name];
		let index = existingComponents.length + 1;

		const new_widget = new WidgetComponent(index, option.type, option.name, option.fields);

		let oldWidgets = existingComponents.map((i) => {
			i.active = false;
			return i;
		})
		new_widget.active = true;
		existingComponents = [...oldWidgets, new_widget];
		widgetsOpen = false;
	}

	function removeWidget(index: number){
		let components = [...existingComponents];
		components.splice(index, 1);
		existingComponents = components;

	}

	function getWidget(index){
		return existingComponents[index]
	}

</script>

<main>
	{#each existingComponents as widget, index}
		{#if widget.active }
			<WidgetBase widget={getWidget(index)} />
		{:else}
			<WidgetPreview widget={getWidget(index)} />
		{/if}
		<button 
			on:click={() => removeWidget(index)}>
			-
		</button>
		<button 
			on:click={() => widgetsOpen = !widgetsOpen} >
			+
		</button>
		{#if widgetsOpen}
			<button 
				on:click="{() => addWidget("image") }">
				[image]
			</button>
			<button
			   on:click="{() => addWidget("title") }">
			   [title]
			</button>
			<button 
				on:click="{() => addWidget("table") }">
				[table]
			</button>

			<button 
				on:click="{() => widgetsOpen = !widgetsOpen}">
				close
			</button>
		{/if}
	{/each}
	{#if existing_widgets.length <= 0}
		<button 
			on:click="{() => addWidget("image") }">
			[image]
		</button>
		<button
			 on:click="{() => addWidget("title") }">
			 [title]
		</button>
		<button
			on:click="{() => addWidget("table") }">
			[table]
		</button>
	{/if}

</main>

<style>

</style>