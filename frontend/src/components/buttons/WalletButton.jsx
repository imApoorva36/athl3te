import { motion } from "framer-motion";
import LayeredCard from "../LayeredCard";
import Image from 'next/image';

export default function WalletButton({ onClick }) {
  return (
   
      <LayeredCard>
        <Image
          src="/wallet.png"
          alt="Wallet Button Image"
          width={40}
          height={40}
          onClick={onClick}
        />
      </LayeredCard>
  );
}