import fs from "fs";
import path from "path";
import Navbar from "./Navbar";

export default function NavbarServer() {
  const filePath = path.join(
    process.cwd(),
    "src/data/layout/navbar.json"
  );

  const navConfig = JSON.parse(
    fs.readFileSync(filePath, "utf8")
  );

  return <Navbar navConfig={navConfig} />;
}
