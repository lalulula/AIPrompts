import "@styles/globals.css"; //Do not have to directly mention the full path, we can just use @filename
export const metadata = {
  title: "AIPrompts",
  description: "Discover and Share AI Prompts",
};
const Layout = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <div className="main">
          <div className="gradient" />
        </div>
        <main className="app">{children}</main>
      </body>
    </html>
  );
};

export default Layout;
