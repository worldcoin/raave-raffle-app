import { useMemo } from 'react'
import { useAccount } from 'wagmi'
import { gql, useQuery } from '@apollo/client'
import { PaginatedProfileResult, Profile } from '@/types/lens'

const PROFILES_QUERY = gql`
	query ($address: EthereumAddress!) {
		profiles(request: { ownedBy: [$address], limit: 5 }) {
			items {
				id
				isDefault
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
				coverPicture {
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

				onChainIdentity {
					worldcoin {
						isHuman
					}
				}
			}
		}
	}
`

const useProfiles = () => {
	//const { address } = useAccount()
	const address = '0xE340b00B6B622C136fFA5CFf130eC8edCdDCb39D'
	const { data, loading, error } = useQuery<{ profiles: PaginatedProfileResult }, { address: string }>(
		PROFILES_QUERY,
		{ variables: { address: address }, skip: !address }
	)

	const profiles = useMemo<Profile[] | null>(() => {
		if (!data) return

		return data?.profiles?.items
	}, [data])

	return { profiles, loading, error }
}

export default useProfiles
