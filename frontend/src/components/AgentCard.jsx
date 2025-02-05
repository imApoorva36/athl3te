import Image from 'next/image';
import { getAgentDescription, getAgentImagePath, getAgentName } from "../utils/utils";
import LayeredCard from "./LayeredCard";

function AgentCard({ agentName }) {
    return (
        <>
            <LayeredCard>
                <div className='w-[]'>
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-5">
                        <Image
                            src={getAgentImagePath(agentName)}
                            alt="Agent Image"
                            width={35}
                            height={35}
                        />
                        <h1 className="text-xl font-bold text-black">{getAgentName(agentName)}</h1>
                    </div>
                    <Image src="/ai.png" alt="AI Image" width={35} height={35} />
                </div>

                <div className="flex flex-row place-items-center mt-8 mb-2 gap-6">
                    <Image src="/info.png" alt="Agent Image" width={26} height={26} className="mt-1" />
                    <p className='max-w-xs'>
                        {getAgentDescription(agentName)}
                    </p>
               </div>
               </div>

            </LayeredCard>
        </>

    );
}

export default AgentCard;
