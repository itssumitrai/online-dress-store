<script context="module">
	import loadProducts from '../actions/loadProducts.js';
	export async function load(context) {
		const { page } = context;
		const { query } = page;
		const sku = query.get('sku');
		if (!sku) {
			return {
				props: {
					item: undefined
				}
			};
		}
		const [itemRes] = await Promise.allSettled([loadProducts(context, { sku })]);
		const item = itemRes.status === 'fulfilled' ? itemRes.value[0] : undefined;

		return {
			props: {
				item
			}
		};
	}
</script>

<script>
    /* global firebase */
	import ImgUpload from '../components/ImgUpload.svelte';
	import { getStore } from '../store';
	export let item = null;
	let additionalImages = [];
	let isAdminUser = false;
	let isEditing = !!item?.sku;
	let itemImages = item?.images || [];
	if (!item) {
		formReset();
	}

	getStore('auth').subscribe(({ isAdmin }) => {
		isAdminUser = isAdmin;
	});

	function addAdditionalImage() {
		additionalImages = [...additionalImages, true];
	}
	function formReset(forceReset = false) {
		item =
			isEditing && !forceReset
				? item
				: {
						sku: '',
						title: '',
						description: '',
						productUrl: '',
						availability: 'In stock',
						measurements: '',
						size: '',
						color: '',
						brand: 'TVC',
						pattern: '',
						images: [],
						price: 0,
						taxCategory: 'Apparel',
						tax: 0,
						availabilityDate: '',
						shippingCost: 0,
						currency: '₹',
						gender: 'Female',
						ageGroup: 'Adult',
						material: 'Cotton',
						productType: 'Casual Dress',
						productCategory: 'Dresses',
						stitchingType: 'Semi-Stitched'
				  };
		itemImages = item.images || [];
	}
	async function onSubmit(e) {
		e.preventDefault();
		const db = firebase.firestore();
		try {
			const formNode = e.currentTarget;
			const formData = new FormData(formNode);
			const firebaseDoc = {};
			for (const pair of formData) {
				if (typeof pair[1] !== 'object') {
					firebaseDoc[pair[0]] = pair[1];
				}
			}
			firebaseDoc.images = itemImages;
			const docRef = await db.collection('products').doc(firebaseDoc.sku);
			await docRef.set(firebaseDoc); // if sku is present, its overriden otherwise a new one is created (Edit/Add)
			alert(`Product ${isEditing ? 'edited' : 'added '} successfully!`);

			// Reset the form
			formReset();
		} catch (ex) {
			console.error(ex);
		}
	}
	async function onChange(e) {
		const { target } = e;
		if (target.getAttribute('type') === 'file') {
			const { files } = target;
			const [file] = files;
			const storageRef = firebase.storage().ref();
			const fileRef = storageRef.child(file.name);
			try {
				await fileRef.put(file);
				const origImgUrl = await fileRef.getDownloadURL();
				itemImages[Number(target.getAttribute('index'))] = {
					name: file.name,
					orig: origImgUrl
				};
			} catch (ex) {
				console.error(ex);
			}
		}
	}
	async function onDelete() {
		if (
			window.confirm('Do you really want to delete this product ? This action cannot be undone.')
		) {
			try {
				// delete from database
				const db = firebase.firestore();
				await db.collection('products').doc(item.sku).delete();
				alert(`Product deleted successfully!`);
				formReset(true);
			} catch (ex) {
				console.error(ex);
			}
		}
	}
</script>

<svelte:head>
	<title>Vinaayak Collection - Add/Edit Product</title>
	<meta name="robots" content="noindex" />
</svelte:head>
<section>
	{#if isAdminUser}
		<h1>{isEditing ? `Edit Product: ${item.sku}` : 'Add Product'}</h1>
		<form on:submit={onSubmit} on:change={onChange} method="POST">
			<fieldset>
				<h2>Basic</h2>
				<label
					><span>SKU:</span><input type="text" name="sku" required bind:value={item.sku} /><i
						class="asterisk">*</i
					></label
				>
				<label
					><span>Title:</span><input type="text" name="title" required bind:value={item.title} /><i
						class="asterisk">*</i
					></label
				>
				<label
					><span>Description:</span><textarea
						type="text"
						name="description"
						required
						bind:value={item.description}
					/><i class="asterisk">*</i></label
				>
				<label
					><span>Product link:</span><input
						type="url"
						name="productUrl"
						bind:value={item.productUrl}
					/></label
				>
				<label>
					<span>Condition:</span>
					<select name="condition" bind:value={item.condition}>
						<option>New</option>
						<option>Refurbished</option>
						<option>Used</option>
					</select>
				</label>
				<label
					><span>Colors:</span><input
						type="text"
						placeholder="Red,Green"
						name="color"
						bind:value={item.color}
					/></label
				>
				<ImgUpload index={0} image={itemImages[0]} />
				{#each additionalImages as img, i}
					<ImgUpload index={i + 1} image={itemImages[i]} />
				{/each}
				<button type="button" on:click={addAdditionalImage}>Add another image</button>
			</fieldset>
			<fieldset>
				<h2>Details</h2>
				<label
					><span>Measurements:</span><input
						type="text"
						name="measurements"
						bind:value={item.measurements}
					/></label
				>
				<label
					><span>Product Category:</span><input
						type="text"
						name="productCategory"
						bind:value={item.productCategory}
					/></label
				>
				<label
					><span>Product Type:</span><input
						type="text"
						name="productType"
						bind:value={item.productType}
					/></label
				>
				<label><span>Brand:</span><input type="text" name="brand" bind:value={item.brand} /></label>
				<label
					><span>Material:</span><input
						type="text"
						name="material"
						bind:value={item.material}
					/></label
				>
				<label>
					<span>Stiching Type:</span>
					<select name="stitchingType" bind:value={item.stitchingType}>
						<option>Semi-Stitched</option>
						<option>Fabric</option>
						<option>Stitched</option>
					</select>
				</label>
				<label
					><span>Pattern:</span><input
						type="text"
						name="pattern"
						bind:value={item.pattern}
					/></label
				>
				<label
					><span>Size:</span><input
						type="text"
						name="size"
						placeholder="38,40,42"
						required
						bind:value={item.size}
					/><i class="asterisk">*</i></label
				>
				<label>
					<span>Gender:</span>
					<select name="gender" bind:value={item.gender}>
						<option>Female</option>
						<option>Male</option>
						<option>Unisex</option>
					</select>
				</label>
				<label>
					<span>Age group:</span>
					<select name="ageGroup" bind:value={item.ageGroup}>
						<option>Adult</option>
						<option>Newborn (0-3 mon)</option>
						<option>Infant (3-12 mon)</option>
						<option>Toddler (1-5)</option>
						<option>Kids (5-13)</option>
					</select>
				</label>
				<label
					><span>Promotion Id:</span><input
						type="text"
						name="promoId"
						bind:value={item.promoId}
					/></label
				>
				<label
					><span>Global Trade Item Number (GTIN):</span><input
						type="text"
						name="gtin"
						bind:value={item.gtin}
					/></label
				>
				<label
					><span>Manufacturer Part Number (MPN):</span><input
						type="text"
						name="mpn"
						bind:value={item.mpn}
					/></label
				>
			</fieldset>
			<fieldset>
				<h2>Availability</h2>
				<label
					><span>Price:</span><input
						type="number"
						name="price"
						step="0.01"
						required
						bind:value={item.price}
					/><i class="asterisk">*</i></label
				>
				<label
					><span>Currency:</span><input
						type="text"
						name="currency"
						bind:value={item.currency}
					/></label
				>
				<label>
					<span>Availability:</span>
					<select name="availability" bind:value={item.availability}>
						<option>In stock</option>
						<option>Out of stock</option>
						<option>Preorder</option>
						<option>Backorder</option>
					</select>
				</label>
				<label
					><span>Availability date:</span><input
						type="date"
						name="availabilityDate"
						bind:value={item.availabilityDate}
					/></label
				>
				<label
					><span>Shipping cost:</span><input
						type="number"
						name="shippingCost"
						step="0.01"
						bind:value={item.shippingCost}
					/></label
				>
				<label
					><span>Tax:</span><input
						type="number"
						name="tax"
						step="0.01"
						bind:value={item.tax}
					/></label
				>
				<label
					><span>Tax Category:</span><input
						type="text"
						name="taxCategory"
						bind:value={item.taxCategory}
					/></label
				>
			</fieldset>
			<button>Submit</button>
			{#if isEditing}
				<button type="button" class="delBtn" on:click={onDelete}>Delete Product</button>
			{/if}
		</form>
	{:else}
		<div>
			<h1>Not Authorized</h1>
			<p>You are not authorized to view this page</p>
		</div>
	{/if}
</section>

<style>
	.asterisk {
		display: inline;
		color: red;
		margin: 0 4px 0 4px;
	}
	textarea {
		min-height: 200px;
		min-width: 300px;
	}
	label {
		display: flex;
		justify-content: center;
		margin-bottom: 0.5rem;
	}
	label > span {
		margin-right: 1rem;
	}
	fieldset {
		text-align: center;
	}
	button {
		margin: 0.8rem auto;
		background-color: var(--link);
		color: white;
		padding: 6px 10px;
		border: 0;
		border-radius: 4px;
	}
	.delBtn {
		background-color: var(--negative);
	}
	button:hover,
	button:focus {
		background-color: var(--link-active);
	}
</style>
