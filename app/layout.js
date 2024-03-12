export const metadata = {
  title: "Flashify",
  description: "Made by - Anonymous 😈",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
