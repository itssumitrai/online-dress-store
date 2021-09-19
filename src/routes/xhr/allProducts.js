import admin from 'firebase-admin';

const getProcessedItem = async (item, bucket) => {
	const { images } = item;
	const imageFileNames = images.map(({ name }) => {
		if (!name) {
			return '';
		}
		const fileName = name.replace(/\.[^/.]+$/, '');
		return fileName;
	});
	for (let i = 0; i < imageFileNames.length; i++) {
		if (!imageFileNames[i]) {
			continue;
		}
		const resizedImages = await Promise.all([
			bucket
				.file(`resized/${imageFileNames[i]}_80x112.webp`)
				.getSignedUrl({
					action: 'read',
					expires: '01-01-2050'
				})
				.then((data) => data[0]),
			bucket
				.file(`resized/${imageFileNames[i]}_250x350.webp`)
				.getSignedUrl({
					action: 'read',
					expires: '01-01-2050'
				})
				.then((data) => data[0]),
			bucket
				.file(`resized/${imageFileNames[i]}_400x560.webp`)
				.getSignedUrl({
					action: 'read',
					expires: '01-01-2050'
				})
				.then((data) => data[0]),
			bucket
				.file(`resized/${imageFileNames[i]}_500x700.webp`)
				.getSignedUrl({
					action: 'read',
					expires: '01-01-2050'
				})
				.then((data) => data[0]),
			bucket
				.file(`resized/${imageFileNames[i]}_800x1120.webp`)
				.getSignedUrl({
					action: 'read',
					expires: '01-01-2050'
				})
				.then((data) => data[0])
		]);

		item.images[i] = {
			...item.images[i],
			'80x112': resizedImages[0],
			'250x350': resizedImages[1],
			'400x560': resizedImages[2],
			'500x700': resizedImages[3],
			'800x1120': resizedImages[4]
		};
	}

	return item;
};

export const get = async ({ query }) => {
	const sku = query.get('sku');
	const db = admin.firestore(); // for firestore
	const bucket = admin.storage().bucket(); // for storage
	let productsRef = db.collection('products');
	if (sku) {
		productsRef = productsRef.where('sku', '==', sku);
	}
	try {
		const snapshot = await productsRef.get();
		if (snapshot.empty) {
			console.error('>> No matching data in database');
			throw {
				status: 404,
				body: 'No matching records'
			};
		}
		const snapshotItems = [];
		snapshot.forEach((doc) => {
			snapshotItems.push(doc.data());
			getProcessedItem(doc.data(), bucket).then((itemData) => {
				finalData.push(itemData);
			});
		});
		const finalData = [];
		for (let i = 0; i < snapshotItems.length; i++) {
			finalData[i] = await getProcessedItem(snapshotItems[i], bucket);
		}

		return {
			status: 200,
			body: finalData
		};
	} catch (ex) {
		return {
			status: ex.status || 500,
			body: ex.message || 'Downstream error'
		};
	}
};
