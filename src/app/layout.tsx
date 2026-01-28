// Root layout - minimal wrapper
// Each route group ((frontend) and (payload)) has its own html/body layout

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
