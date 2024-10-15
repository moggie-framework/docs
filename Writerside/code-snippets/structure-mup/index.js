import { Application } from '@moggie/core/framework'
import { HttpPlugin, RoutePlugin, ServerKernel } from "@moggie/core/http"

const storage = new Map()

class Router extends RoutePlugin {
	routes(router) {
		router.get("/items", (_, response) => {
			response.statusCode = 200
			response.setHeader('Content-Type', 'application/json')
			response.write(JSON.stringify(Object.fromEntries(storage)))
		})

		router.post("/items", (request, response) => {
			const key = request.headers['mog-key']
			const value = request.headers['mog-value']

			if (!key ||!value) {
				response.statusCode = 400
				response.write('Missing or invalid Mog-Key or Mog-Value headers')
				return
			}

			let status = 200
			if (!storage.has(key)) {
				status = 201
			}
			storage.set(key, value)

			response.statusCode = status
			response.setHeader('Content-Type', 'application/json')
			response.write(JSON.stringify({ [key]: value }))
		})

		router.delete("/items", (request, response) => {
			const key = request.headers['mog-key']

			if (!key) {
				response.statusCode = 400
				response.write('Missing Mog-Key header')
				return
			}

			storage.delete(key)
			response.statusCode = 204
		})
	}
}

const config = {
    disable: {
        fs: true,
        env: true,
    },
    config: {
        http: {
            server: {
                port: 6767
            }
        }
    }
}

async function main() {
    const app = new Application(ServerKernel, config)
    app.register(HttpPlugin, Router)
    await app.launch()
}

main().catch(console.error)