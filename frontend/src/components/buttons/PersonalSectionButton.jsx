import LayeredCard from "../LayeredCard";
import Image from 'next/image';

export default function PersonalSectionButton({ onClick }) {
    return (
        <LayeredCard>
            <Image
                src="/fire.png" alt="Personal Section Button Image" width={40} height={40} onClick={onClick}
            />
        </LayeredCard>
    );
}