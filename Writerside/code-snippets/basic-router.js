// Set up routes by extending RoutePlugin

class Routes extends RoutePlugin {
    async boot() {
        await super.boot()
        // Perform some setup here
    }

    routes(router) {
        router.get("/hello", (req, res) => {
            res.statusCode = 200
            res.write("Hello, World!")
        })
    }
}

async function main() {
	const app = new Application(ServerKernel)
	app.register(HttpPlugin, Routes)
	await app.launch()
}
