import { Card } from '@/components/ui/card';

const LayeredCard = ({
    children,
    mainColor,
    bgColor,
    borderWidth,
    topOffset,
    leftOffset,
    roundedness,
    textColor
}) => {
    return (
        <div className='hover:scale-105 transform transition-transform duration-300'>
            <div className={`relative pt-1 pr-1`}>
                {/* Background Card */}
                <div
                    className={`absolute ${topOffset} ${leftOffset} w-[95%] h-[95%] ${roundedness} ${bgColor} border-black  ${borderWidth}`}
                />
                {/* Main Card */}
                <Card className={`relative w-full ${mainColor} ${roundedness} border-black ${borderWidth} ${textColor}`}>
                    {children}
                </Card>
            </div>
        </div>
    );
};


export default LayeredCard;