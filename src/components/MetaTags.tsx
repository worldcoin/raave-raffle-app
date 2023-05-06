import Head from 'next/head'
import coverImg from '@images/cover.jpg'

const MetaTags = () => {
	const meta = {
		title: "We're giving away 5 rAAVE Bogotá tickets!",
		image: coverImg.src,
		url: 'https://raave-raffle-app.vercel.app',
		description:
			"We've partnered with Lens to give away 5 rAAVE Bogotá tickets to WorldID-verified Lens profiles. See you on the dance floor! 🕺",
	}

	return (
		<Head>
			<title>{meta.title}</title>
			<meta name="title" content={meta.title} />
			<meta name="description" content={meta.description} />

			<meta property="og:type" content="website" />
			<meta property="og:url" content={meta.url} />
			<meta property="og:title" content={meta.title} />
			<meta property="og:description" content={meta.description} />
			<meta property="og:image" content={meta.url + meta.image} />

			<meta property="twitter:card" content="summary_large_image" />
			<meta property="twitter:url" content={meta.url} />
			<meta property="twitter:title" content={meta.title} />
			<meta property="twitter:description" content={meta.description} />
			<meta property="twitter:image" content={meta.url + meta.image} />
		</Head>
	)
}

export default MetaTags
