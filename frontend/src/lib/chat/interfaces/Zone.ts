export type Zone = {
	id: string;
	name: string;
	edge1: string;
	edge2: string;
	edge3: string;
	edge4: string;
	edge5: string;
}

type Coordinate= {
	latitude: string;
	longitude: string;
}

export type ZoneItem = {
	name: string;
	id: string;
	coordinates: Coordinate[];
}
