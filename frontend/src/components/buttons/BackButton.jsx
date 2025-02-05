import LayeredCard from "../LayeredCard";
import Image from 'next/image';

export default function BackButton({ onClick }) {
    return (
        <LayeredCard>
            <Image
                src="/back.png" alt="Back Button Image" width={40} height={40} onClick={onClick}
            />
        </LayeredCard>
    );
}