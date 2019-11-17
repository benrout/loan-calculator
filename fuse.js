const { FuseBox, WebIndexPlugin, SassPlugin, CSSPlugin } = require("fuse-box");

const fuse = FuseBox.init({
	homeDir: "src",
	target: "browser@es6",
	output: "dist/$name.js",
	plugins: [
		[SassPlugin(), CSSPlugin()],
		WebIndexPlugin({
			template: 'src/index.html'
		})
	],
});

fuse.dev(); // launch http server

fuse
	.bundle("app")
	.instructions("> index.tsx")
	.hmr()
	.watch();

fuse.run();