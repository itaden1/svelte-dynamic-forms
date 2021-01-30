<script lang="ts">

	import WidgetBase from "./components/WidgetBase.svelte"; 
	import WidgetPreview from "./components/WidgetPreview.svelte";
	import { componentOptions, existingComponents } from "./stores";

	import { WidgetComponent } from "./models";

	export let callBack;
	export let existing_widgets: Array<object>;
	
	
	let widgetsOpen = false;

	function addWidget(name: string){
		const option = $componentOptions[name];
		let index = $existingComponents.length + 1;

		const new_widget = new WidgetComponent(index, option);

		let oldWidgets = $existingComponents.map((i) => {
			i.active = false;
			return i;
		})

		new_widget.active = true;
		$existingComponents = [...oldWidgets, new_widget];
		console.log("----->", $existingComponents)

		widgetsOpen = false;
	}

	function removeWidget(index: number){
		let components = [...$existingComponents];
		components.splice(index, 1);
		$existingComponents = components;

	}

	function getWidget(index){
		return $existingComponents[index]
	}

</script>

<main>
	{#if $existingComponents.length > 0}
		{#each $existingComponents as widget, index}
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
	{/if}
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