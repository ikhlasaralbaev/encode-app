import { gql, request } from 'graphql-request'
import { ICategoryResponse, IProductResponse } from './products.types'
const url =
	'https://api-us-east-1-shared-usea1-02.hygraph.com/v2/clxm4h9i2021e07vxco6u87g4/master'
export const ProductsService = {
	async getCategories(): Promise<ICategoryResponse> {
		const req = gql`
			query Categories {
				categories {
					name
					image {
						url
					}
					id
				}
			}
		`

		const res: any = await request(url, req)

		return res
	},
	async getProductsByCategoryId(categoryId: string): Promise<IProductResponse> {
		const req = gql`
			query Products($id: ID) {
				products(where: { category: { id: $id } }) {
					name
					image {
						url
					}
					id
					description {
						html
					}
					video {
						url
					}
					category {
						id
						name
						image {
							url
						}
					}
					sertificateFiles {
						url
					}
					price
				}
			}
		`

		return request(url, req, { id: categoryId })
	},
	async getAllProducts(): Promise<IProductResponse> {
		const req = gql`
			query Products {
				products {
					name
					image {
						url
					}
					id
					description {
						html
					}
					video {
						url
					}
					category {
						id
						name
						image {
							url
						}
					}
					sertificateFiles {
						url
					}
					price
				}
			}
		`

		return request(url, req)
	},
	async getProducts(categoryId?: string): Promise<IProductResponse> {
		if (categoryId) {
			return this.getProductsByCategoryId(categoryId)
		} else {
			return this.getAllProducts()
		}
	},
	getProductById(id: string): Promise<IProductResponse> {
		const req = gql`
			query Products($id: ID) {
				products(where: { id: $id }) {
					name
					image {
						url
					}
					id
					description {
						html
					}
					video {
						url
					}
					category {
						id
						name
						image {
							url
						}
					}
					sertificateFiles {
						url
					}
					price
				}
			}
		`

		return request(url, req, { id })
	},
}
