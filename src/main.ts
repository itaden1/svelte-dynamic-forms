import App from './App.svelte';

const callBack = () => {
	console.log("Hello")
}

const app = new App({
	target: document.getElementById("widget"),
	props: {
		callBack,
		existing_widgets: [
			// {index:2, name:"title", type:"title"} 
		]
	}
});

export default app;