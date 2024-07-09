export interface ICategoryResponse {
	categories: ICategory[]
}

export interface ICategory {
	name: string
	image: Image
	id: string
}

export interface Image {
	url: string
}

export interface IProductResponse {
	products: IProduct[]
}

export interface IProduct {
	name: string
	image: Image
	id: string
	description: Description
	video: Image
	category: ICategory
	sertificateFiles: any[]
	price: number
}

export interface Image {
	url: string
}

export interface Description {
	html: string
}
