// Set up routes using functional callbacks

function createRouter(router) {
    router.get("/hello", (req, res) => {
        res.statusCode = 200
        res.write("Hello, World!")
    })
}

async function main() {
	const app = new Application(ServerKernel)
	app.register(HttpPlugin, RoutePlugin.create(createRouter))
	await app.launch()
}
