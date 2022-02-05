import { getDatabase, getStorage } from '../../../firebaseUtil.js';

const getProcessedItem = async (item, bucket) => {
	const { images } = item;
	const imageSizes = ['80x112', '250x350', '400x560', '500x700', '800x1120'];
	const imageFileNames = images.map(({ name }) => {
		if (!name) {
			return '';
		}
		const fileName = name.replace(/\.[^/.]+$/, '');
		return fileName;
	});
	const signedUrlPromises = [];
	for (let i = 0; i < imageFileNames.length; i++) {
		if (!imageFileNames[i]) {
			continue;
		}
		imageSizes.forEach((size) => {
			signedUrlPromises.push(
				bucket
					.file(`resized/${imageFileNames[i]}_${size}.webp`)
					.getSignedUrl({
						action: 'read',
						expires: '01-01-2050'
					})
					.then((data) => data[0])
			);
		});
	}
	const signedUrls = await Promise.all(signedUrlPromises);
	const imageLength = imageSizes.length;
	const loopCounter = signedUrls.length / imageLength;
	for (let i = 0; i < loopCounter; i++) {
		const offset = imageLength * i;
		item.images[i] = {
			...item.images[i],
			'80x112': signedUrls[offset],
			'250x350': signedUrls[offset + 1],
			'400x560': signedUrls[offset + 2],
			'500x700': signedUrls[offset + 3],
			'800x1120': signedUrls[offset + 4]
		};
	}

	return item;
};

export const get = async ({ url }) => {
	const { searchParams } = url;
	const sku = searchParams.get('sku');
	const count = Math.min(searchParams.get('count') || 20, 50); // items per page
	const offset = Math.max(searchParams.get('offset') || 0, 0); // page number
	const storage = await getStorage();
	const bucket = storage.bucket(); // for storage
	const db = await getDatabase(); // for firestore
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
		let snapshotCount = 0;
		let itemCount = 0;
		const itemOffset = offset * count;
		snapshot.forEach((doc) => {
			if (itemCount < count && snapshotCount >= itemOffset) {
				snapshotItems.push(doc.data());
				itemCount++;
			}
			snapshotCount++;
		});
		const loopCount = Math.min(count, snapshotItems.length);
		const processItemPromises = [];
		for (let i = 0; i < loopCount; i++) {
			processItemPromises.push(getProcessedItem(snapshotItems[i], bucket));
		}
		// Finally get all the data
		const finalData = await Promise.all(processItemPromises);

		return {
			status: 200,
			body: {
				meta: {
					count,
					offset,
					pageSize: count > 0 ? Math.ceil(snapshotCount / count) : 0
				},
				items: finalData
			}
		};
	} catch (ex) {
		return {
			status: ex.status || 500,
			body: ex.message || 'Downstream error'
		};
	}
};
