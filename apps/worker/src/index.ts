/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

export interface Env {
	// Example binding to KV. Learn more at https://developers.cloudflare.com/workers/runtime-apis/kv/
	// MY_KV_NAMESPACE: KVNamespace;
	//
	// Example binding to Durable Object. Learn more at https://developers.cloudflare.com/workers/runtime-apis/durable-objects/
	// MY_DURABLE_OBJECT: DurableObjectNamespace;
	//
	// Example binding to R2. Learn more at https://developers.cloudflare.com/workers/runtime-apis/r2/
	// MY_BUCKET: R2Bucket;
	//
	// Example binding to a Service. Learn more at https://developers.cloudflare.com/workers/runtime-apis/service-bindings/
	// MY_SERVICE: Fetcher;
	//
	// Example binding to a Queue. Learn more at https://developers.cloudflare.com/queues/javascript-apis/
	// MY_QUEUE: Queue;
}

export default {
	async fetch(
		request: Request,
		env: Env,
		ctx: ExecutionContext
	): Promise<Response> {
		// Parse request URL to get access to query string
		const url = new URL(request.url);
		// You can get pretty far with simple logic like if/switch-statements
		switch (url.pathname) {
			case "/_image": {
				// let options = {
				// 	cf: {
				// 		image: {
				// 			anim: false,
				// 			fit: "scale-down", // see https://developers.cloudflare.com/images/image-resizing/resize-with-workers/#fit
				// 			metadata: "copyright",
				// 			format: url.searchParams.get("f") ?? "webp",
				// 			height: url.searchParams.get("h"),
				// 			width: url.searchParams.get("w"),
				// 			quality: Number(url.searchParams.get("q") ?? "85")
				// 		}
				// 	}
				// }

				// // Cloudflare-specific options are in the cf object.
				// let options = { cf: { image: {} } };

				// // Copy parameters from query string to request options.
				// // You can implement various different parameters here.
				// if (url.searchParams.has("fit")) options.cf.image.fit = url.searchParams.get("fit")
				// if (url.searchParams.has("width")) options.cf.image.width = url.searchParams.get("width")
				// if (url.searchParams.has("height")) options.cf.image.height = url.searchParams.get("height")
				// if (url.searchParams.has("quality")) options.cf.image.quality = url.searchParams.get("quality")

				// // Your Worker is responsible for automatic format negotiation. Check the Accept header.
				// const accept = request.headers.get("Accept");
				// if (/image\/avif/.test(accept)) {
				// 	options.cf.image.format = 'avif';
				// } else if (/image\/webp/.test(accept)) {
				// 	options.cf.image.format = 'webp';
				// }
				// http://localhost:4321/_image?href=%2F%40fs%2FUsers%2Falexanderniebuhr%2FDeveloper%2FProjects%2Fterra-astralis%2Fsrc%2Fassets%2Flighthouse.jpg%3ForigWidth%3D2048%26origHeight%3D2048%26origFormat%3Djpg&w=512&h=512&q=100&f=png

				// Get URL of the original (full size) image to resize.
				// You could adjust the URL here, e.g., prefix it with a fixed address of your server,
				// so that user-visible URLs are shorter and cleaner.
				const imageURL = url.searchParams.get("href")?.startsWith("http")
					? url.searchParams.get("href")
					: `${request.headers
							.get("Referer")
							?.slice(0, -1)}${url.searchParams.get("href")}`;

				if (!imageURL)
					return new Response('Missing "href" value', { status: 400 });

				try {
					// TODO: Customize validation logic
					const { host, pathname } = new URL(imageURL);
					console.log("IMAGEURL", imageURL);
					console.log("IMAGEURL-STRING", imageURL.toString());

					// Optionally, only allow URLs with JPEG, PNG, GIF, or WebP file extensions
					// @see https://developers.cloudflare.com/images/url-format#supported-formats-and-limitations
					if (!/\.(jpe?g|png|gif|webp)$/i.test(pathname)) {
						return new Response("Disallowed file extension", { status: 400 });
					}

					// Demo: Only accept "example.com" images
					// if (hostname !== 'example.com') {
					// 	return new Response('Must use "example.com" source images', { status: 403 })
					// }
				} catch (err) {
					return new Response('Invalid "href" value', { status: 400 });
				}

				return fetch(imageURL.trim(), {
					cf: {
						image: {
							anim: false,
							fit: "scale-down", // see https://developers.cloudflare.com/images/image-resizing/resize-with-workers/#fit
							metadata: "copyright",
							format: "webp",
							height: 512,
							width: 512,
							quality: 85,
						},
					},
				});
			}

			default:
				return new Response("Not found", { status: 404 });
		}
	},
};
