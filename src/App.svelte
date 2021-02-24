<script lang="ts">
	import lodash from "lodash";

	import WidgetBase from "./components/WidgetBase.svelte"; 
	import WidgetPreview from "./components/WidgetPreview.svelte";
	import { componentOptions, existingComponents } from "./stores";
	import type {iComponentOption, iElement } from "./interface";

	import { WidgetComponent, BaseElement, ImageElement } from "./models";

	const _ = lodash;

	export let callBack;
	export let existing_widgets: Array<object>;
	
	
	let widgetsOpen = false;

	function addComponent(name: string, index: number){
		// const option: iComponentOption = _.cloneDeep($componentOptions[name]);
		const option: iComponentOption = $componentOptions[name];
		let element: iElement;
		if (name === "image"){
			element = new ImageElement();
		}
		else {
			element = new BaseElement();
		}
		$existingComponents.length > 0 ? index++ : index;
		const newComponent = new WidgetComponent(index, {...option, element});
		existingComponents.insert(index, newComponent);
		existingComponents.open(index);
	}

</script>

<main>
	{#if $existingComponents.length > 0}
		{#each $existingComponents as widget, index}
			{#if widget.active }
				<WidgetBase {widget} />
			{:else}
				<WidgetPreview {widget} 
					on:open={() => existingComponents.open(index)}
				/>
			{/if}
			<button 
				on:click={() => existingComponents.delete(index)}>
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
					on:click="{() => addComponent("H1", index) }">
					[H1]
				</button>
				<button
					on:click="{() => addComponent("P", index) }">
					[P]
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
			on:click="{() => addComponent("H1", 0) }">
			[H1]
		</button>
		<button
			on:click="{() => addComponent("P", 0) }">
			[P]
		</button>
	{/if}

</main>

<style>

</style>