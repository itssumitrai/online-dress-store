<script>
    import ImgUpload from '../components/ImgUpload.svelte';
    let additionalImages = [];
    function addAdditionalImage() {
        additionalImages = [...additionalImages, true];
    }
    let imageUrls = [];
    async function onSubmit(e) {
        e.preventDefault();
        const db = firebase.firestore();
        try {0
            const formNode = e.currentTarget;
            const formData = new FormData(formNode);
            const document = {};
            for (const pair of formData) {
                if (typeof pair[1] !== 'object') {
                    document[pair[0]] = pair[1];
                }
            }
            document.images = imageUrls;
            await db.collection('products').add(document);
            alert('Product added successfully!');
            // Reset the form
            formNode.reset();
            imageUrls = [];
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
                const fileUrl = await fileRef.getDownloadURL();
                imageUrls[Number(target.getAttribute('index'))] = fileUrl;
                console.log('>> Image succesfully uploaded:', fileUrl);
            } catch (ex) {
                console.error(ex);
            }
        }
    }
</script>
<section>
    <h1>Add Product</h1>
    <form on:submit={onSubmit} on:change={onChange} method="POST">
        <fieldset>
            <h2>Basic</h2>
            <label><span>SKU:</span><input type="text" name="sku" required></label>
            <label><span>Title:</span><input type="text" name="title" required></label>
            <label><span>Description:</span><textarea type="text" name="description" required/></label>
            <label><span>Product link:</span><input type="url" name="productUrl"></label>
            <label>
                <span>Condition:</span>
                <select name="condition">
                    <option>New</option>
                    <option>Refurbished</option>
                    <option>Used</option>
                </select>
            </label>
            <label><span>Colors (seperate with comma for multiple):</span><input type="text" name="color"></label>
            <ImgUpload index={0} previewUrl={imageUrls[0]}/>
            {#each additionalImages as image, i}
                <ImgUpload index={i + 1} previewUrl={imageUrls[i]}/>
            {/each}
            <button type="button" on:click={addAdditionalImage}>Add another image</button>
        </fieldset>
        <fieldset>
            <h2>Details</h2>
            <label><span>Measurements:</span><input type="text" name="measurements"></label>
            <label><span>Product Category:</span><input type="text" name="productCategory" value="Dresses"></label>
            <label><span>Product Type:</span><input type="text" name="productType" value="Party Dress"></label>
            <label><span>Brand:</span><input type="text" name="brand" value="TVC"></label>
            <label><span>Material:</span><input type="text" name="material" value="Cotton"></label>
            <label><span>Pattern:</span><input type="text" name="pattern" value=""></label>
            <label><span>Size:</span><input type="text" name="size"></label>
            <label>
                <span>Gender:</span>
                <select name="gender">
                    <option>Female</option>
                    <option>Male</option>
                    <option>Unisex</option>
                </select>
            </label>
            <label>
                <span>Age group:</span>
                <select name="ageGroup">
                    <option>Adult</option>
                    <option>Newborn (0-3 mon)</option>
                    <option>Infant (3-12 mon)</option>
                    <option>Toddler (1-5)</option>
                    <option>Kids (5-13)</option>
                </select>
            </label>
            <label><span>Promotion Id:</span><input type="text" name="promoId"></label>
            <label><span>Global Trade Item Number (GTIN):</span><input type="text" name="gtin"></label>
            <label><span>Manufacturer Part Number (MPN):</span><input type="text" name="mpn"></label>
        </fieldset>
        <fieldset>
            <h2>Availability</h2>
            <label><span>Price:</span><input type="number" name="price" value="0" step="0.01"></label>
            <label><span>Currency:</span><input type="text" name="currency" value="₹"></label>
            <label>
                <span>Availability:</span>
                <select name="availability">
                    <option>In stock</option>
                    <option>Out of stock</option>
                    <option>Preorder</option>
                    <option>Backorder</option>
                </select>
            </label>
            <label><span>Availability date:</span><input type="date" name="availabilityDate"></label>
            <label><span>Shipping cost:</span><input type="number" name="shippingCost" value="0" step="0.01"></label>
            <label><span>Tax:</span><input type="number" name="tax" value="0" step="0.01"></label>
            <label><span>Tax Category:</span><input type="text" name="taxCategory" value="Apparel"></label>
        </fieldset>
        <button>Submit</button>
    </form>
</section>
<style>
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
        margin: auto;
    }
</style>