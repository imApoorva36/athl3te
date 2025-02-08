import { uploadToNillion, fetchFromNillion } from './nillion/utils/user.js';

const data = [
    {
        age: 25,
        gender: "Male",
        name: "John Doe 2",
        weight: 75,
        height: 180,
        injuryDescription: "Broken leg"
    },
    {
        age: 25,
        gender: "Male",
        name: "John Doe 3",
        weight: 75,
        height: 180,
        injuryDescription: "Broken hand"
    }
]

// Write
const uploadResponse = await uploadToNillion(data);
console.log('Upload Response:', uploadResponse);


// Read
const fetchResponse = await fetchFromNillion('9a43762d-e07a-4ddc-a0df-ac6bd5f5b0ec');
console.log('Fetch Response:', fetchResponse);