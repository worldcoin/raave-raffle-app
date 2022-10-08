import { gql } from '@apollo/client'

export const APP_NAME = '👻 rAAVE tix raffle 🍃 🪩'

export const LENS_API_URL = 'https://api.lens.dev'

export const HUMANS_QUERY = gql`
	query ($profileIds: [ProfileId!]) {
		profiles(request: { profileIds: $profileIds }) {
			items {
				id
				ownedBy
				handle
				name
				bio
				picture {
					__typename
					... on NftImage {
						contractAddress
						tokenId
						uri
						verified
					}
					... on MediaSet {
						original {
							url
							mimeType
						}
					}
				}
				attributes {
					key
					traitType
					value
				}
			}
		}
	}
`
