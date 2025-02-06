import axios from 'axios';

const PINATA_API = 'https://api.pinata.cloud';

export async function pinMetadataToIPFS(metadata) {
    try {
        const apiKey = process.env.NEXT_PUBLIC_PINATA_API_KEY;
        const apiSecret = process.env.NEXT_PUBLIC_PINATA_SECRET_KEY;

        if (!apiKey || !apiSecret) {
            throw new Error('Pinata credentials not found');
        }

        console.log('Using Pinata API key:', apiKey);

        if (metadata.image) {
            console.log('Uploading image to IPFS...');
            const imageResponse = await fetch(metadata.image);
            const imageBlob = await imageResponse.blob();
            const formData = new FormData();
            formData.append('file', imageBlob, 'achievement.jpg');

            const imageUploadResponse = await axios.post(
                `${PINATA_API}/pinning/pinFileToIPFS`,
                formData,
                {
                    headers: {
                        'pinata_api_key': apiKey,
                        'pinata_secret_api_key': apiSecret,

                        'Accept': 'application/json',
                    },
                    maxBodyLength: Infinity,
                }
            );

            console.log('Image upload response:', imageUploadResponse.data);
            metadata.image = `ipfs://${imageUploadResponse.data.IpfsHash}`;
        }

        console.log('Uploading metadata to IPFS...');
        const metadataResponse = await axios.post(
            `${PINATA_API}/pinning/pinJSONToIPFS`,
            metadata,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'pinata_api_key': apiKey,
                    'pinata_secret_api_key': apiSecret,
                },
            }
        );

        console.log('Metadata upload response:', metadataResponse.data);
        return `ipfs://${metadataResponse.data.IpfsHash}`;
    } catch (error) {
        console.error('Pinata Error:', {
            status: error.response?.status,
            data: error.response?.data,
            message: error.message
        });
        throw new Error(`IPFS upload failed: ${error.response?.data?.message || error.message}`);
    }
}
