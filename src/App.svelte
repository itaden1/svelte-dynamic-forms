<script lang="ts">

	import WidgetBase from "./components/WidgetBase.svelte"; 
	import WidgetPreview from "./components/WidgetPreview.svelte";
	import { componentOptions, existingComponents } from "./stores";

	import { WidgetComponent, ImageElement } from "./models";

	export let callBack;
	export let existing_widgets: Array<object>;
	
	
	let widgetsOpen = false;


	function mapComponentsByIndex(components: Array<WidgetComponent>){
		// Sort the components by index
		let sorted = components.sort((a, b) => a.index > b.index ? 1 : -1);
		return sorted;
	}

	function openComponent(index: number){
		// Open the widget with the given index and close all others
		let components = $existingComponents.map(w => {
			if (w.index === index) {
				w.active = true;
			} else {
				w.active = false;
			}
			return w;
		})

		$existingComponents = mapComponentsByIndex(components);
	}

	function closeComponents(widgets: Array<WidgetComponent>){
		// close all widgets by setting active to false
		let closed = widgets.map((i) => {
			i.active = false;
			return i;
		})
		return closed;
	}

	function reIndexComponents(index: number, components: Array<WidgetComponent>){
		// When a new component is added pr remove we need to reindex the exisisting to maintain order
		let reIndexed = components.map((c, i) => {
			if (index === 0){
				c.index = i;
			}
			else if (c.index >= index) {
				c.index++;
			}
			return c;
		})
		return reIndexed;
	}

	function addComponent(name: string, index: number){
		const option = $componentOptions[name];
		if (name === "image"){
			option.element = new ImageElement();
		}

		index++;
		const newComponent = new WidgetComponent(index, option);
		newComponent.active = true;
		let existing = reIndexComponents(index, $existingComponents);
		let components = [...closeComponents(existing), newComponent];
		$existingComponents = mapComponentsByIndex(components);
	}

	function removeComponent(index: number){
		let components = [...$existingComponents];
		components.splice(index, 1);
		const reindexed = reIndexComponents(0, components);
		$existingComponents = reindexed;

	}

</script>

<main>
	{#if $existingComponents.length > 0}
		{#each $existingComponents as widget, index}
			{#if widget.active }
				<WidgetBase {widget} />
			{:else}
				<WidgetPreview {widget} 
					on:open={() => openComponent(index)}
				/>
			{/if}
			<button 
				on:click={() => removeComponent(index)}>
				-
			</button>
			<button 
				on:click={() => widgetsOpen = !widgetsOpen} >
				+
			</button>
			{#if widgetsOpen}
				<button 
					on:click="{() => addComponent("image", index) }">
					[image]
				</button>
				<button
				on:click="{() => addComponent("title", index) }">
				[title]
				</button>
				<button 
					on:click="{() => addComponent("table", index) }">
					[table]
				</button>

				<button 
					on:click="{() => widgetsOpen = !widgetsOpen}">
					close
				</button>
			{/if}
		{/each}
	{/if}
	{#if $existingComponents.length <= 0}
		<button 
			on:click="{() => addComponent("image", 0) }">
			[image]
		</button>
		<button
			 on:click="{() => addComponent("title", 0) }">
			 [title]
		</button>
		<button
			on:click="{() => addComponent("table", 0) }">
			[table]
		</button>
	{/if}

</main>

<style>

</style>