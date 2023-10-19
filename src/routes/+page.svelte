<script lang="ts">
	import { onMount } from 'svelte';
	import type { ActionData } from './$types';
	import { enhance } from '$app/forms';

	export let form: ActionData;
	let dialog: HTMLDialogElement;
	onMount(() => {
		dialog = document.getElementById('successDialog') as HTMLDialogElement;
	});

	let progval: number = 0;
	let inter: number;

	$: if (form?.status === 200 && dialog) {
		dialog.showModal();
		progress();
	}

	function progress() {
		if (progval === 0) {
			inter = setInterval(() => {
				progval += 1;
				if (progval >= 100) {
					clearInterval(inter);
					if (dialog.open) {
						dialog.close();
						progval = 0;
					}
				}
			}, 20);
		}
	}

	$: console.log(form);
</script>

<h1 class="text-4xl my-2 text-center border-b-2 p-2 border-black">Form Validation Example</h1>
<div class="flex flex-col items-center">
	<form class="flex flex-col gap-2 w-1/2" method="post" use:enhance>
		<div class="flex flex-col">
			<label class="text-2xl" for="firstName">First Name</label>
			<input
				class="border-2 border-black rounded-md mt-2 p-2"
				type="text"
				name="firstName"
				value={form?.data?.firstName ?? ''}
			/>
			{#if form?.errors?.firstName}
				<label for="firstName" class="border-red-500 border-2 rounded-md mt-1 p-2"
					>{form?.errors?.firstName[0]}</label
				>
			{/if}
		</div>
		<div class="flex flex-col">
			<label class="text-2xl" for="lastName">Last Name</label>
			<input
				class="border-2 border-black rounded-md mt-2 p-2"
				type="text"
				name="lastName"
				value={form?.data?.lastName ?? ''}
			/>
			{#if form?.errors?.lastName}
				<label for="lastName" class="border-red-500 border-2 rounded-md mt-1 p-2"
					>{form?.errors?.lastName[0]}</label
				>
			{/if}
		</div>
		<div class="flex flex-col">
			<label class="text-2xl" for="email">Email</label>
			<input
				class="border-2 border-black rounded-md mt-2 p-2"
				type="email"
				name="email"
				value={form?.data?.email ?? ''}
			/>
			{#if form?.errors?.email}
				<label for="email" class="border-red-500 border-2 rounded-md mt-1 p-2"
					>{form?.errors?.email[0]}</label
				>
			{/if}
		</div>
		<div class="flex flex-col">
			<label class="text-2xl" for="age">Age</label>
			<input
				class="border-2 border-black rounded-md mt-2 p-2"
				type="number"
				name="age"
				value={form?.data?.age ?? ''}
			/>
			{#if form?.errors?.age}
				<label for="age" class="border-red-500 border-2 rounded-md mt-1 p-2"
					>{form?.errors?.age[0]}</label
				>
			{/if}
		</div>
		<div class="flex flex-col">
			<label class="text-2xl" for="height">Height</label>
			<input class="border-2 border-black rounded-md mt-2 p-2" type="number" name="height" />
			{#if form?.errors?.height}
				<label for="height" class="border-red-500 rounded-md border-2 mt-1 p-2"
					>{form?.errors?.height[0]}</label
				>
			{/if}
		</div>
		<button
			class="border-2 border-slate-700 rounded-md bg-slate-700 text-white text-2xl p-2"
			type="submit"
			value="Submit">Submit</button
		>
	</form>
	<p class="text-gray-500 opacity-50 text-lg">Show console for return object from action</p>
</div>

<dialog id="successDialog" class=" backdrop:bg-slate-500/40 p-2 rounded-md">
	<div class="flex flex-col items-center gap-4">
		<h1 class="text-4xl mt-2 text-center border-b-2 p-2 border-black">Success</h1>
		<p class="text-2xl mt-2">Form Submitted Successfully</p>
		<progress class="w-full rounded-md" max="100" value={progval} />
	</div>
</dialog>
