import {NextResponse} from "next/server"

export async function GET(request) {
	const params = new URL(request.url).searchParams
	const address = params.get("address")
	const apiKey = process.env.OPENWEATHERMAP_API_KEY

	let url = `https://api.openweathermap.org/data/2.5/weather?q=${address}&appid=${apiKey}&units=metric`

	const res = await fetch(url)

	if (!res.ok) {
		return NextResponse.error("Error fetching data", res.status)
	} else if (res.status === 404) {
		return NextResponse.error("No data found", res.status)
	} else {
		let data = await res.json()
		return NextResponse.json(data)
	}
}
