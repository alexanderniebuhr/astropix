import type { AstroIntegration } from "astro";

const createPlugin = (): AstroIntegration => {
	return {
		name: "astropix",
		hooks: {
			"astro:config:setup": ({ command, config, updateConfig }) => {
				updateConfig({
					image: {
						...config.image,
						service: {
							...config.image.service,
							entrypoint:
								command === "dev"
									? "astro/assets/services/sharp"
									: "astropix/image-service",
						},
					},
				});
			},
		},
	};
};

export default createPlugin;
