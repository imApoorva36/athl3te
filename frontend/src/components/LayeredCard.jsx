import React from 'react';
import { Card } from '@/components/ui/card';
import { motion } from 'framer-motion';

const LayeredCard = ({ children }) => {
    return (
        <>
            <motion.div
                transition={{ type: "spring" }} whileHover={{ scale: 1.02 }}
            >
                <div className="relative w-fit pt-1 pr-1">
                    {/* Background Card */}
                    <div
                        className="absolute top-3 left-3 w-full h-full rounded-3xl bg-primary"
                    />
                    {/* Main Card */}
                    <Card className="relative w-full bg-white p-6 shadow-lg rounded-3xl border-black border-[3px]">
                        {children}
                    </Card>
                </div>
            </motion.div>
        </>
    );
};


export default LayeredCard;