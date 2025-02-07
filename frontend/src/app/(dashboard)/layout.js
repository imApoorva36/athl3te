import NavBar from "@/components/NavBar";

export const metadata = {
  title: "ATHL3TE"
};

export default function RootLayout({ children }) {
  return (
    <>
        {children}
        <NavBar className="absolute top-0 left-0 right-0" />
    </>
  );
}
