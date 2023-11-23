import type { ExternalImageService } from "astro";

import { baseService } from "astro/assets";
import { isESMImportedImage, isRemoteAllowed, joinPaths } from "./utils.js";

const service: ExternalImageService = {
	...baseService,
	getURL(options, imageConfig) {
		const searchParams = new URLSearchParams();
		if (isESMImportedImage(options.src)) {
			searchParams.append("href", options.src.src);
		} else if (isRemoteAllowed(options.src, imageConfig)) {
			searchParams.append("href", options.src);
		} else {
			return options.src;
		}
		const params = {
			w: "width",
			h: "height",
			q: "quality",
			f: "format",
		};
		for (const [param, key] of Object.entries(params)) {
			options[key] && searchParams.append(param, options[key].toString());
		}
		Object.entries(params).forEach(([param, key]) => {
			options[key] && searchParams.append(param, options[key].toString());
		});

		const serviceUrl = "https://a.stro.pictures"
		const imageEndpoint = joinPaths(import.meta.env.BASE_URL, "/_image");
		return `${serviceUrl}${imageEndpoint}?${searchParams}`;
	},
};

export default service;
