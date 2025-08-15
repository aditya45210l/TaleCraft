import { Separator } from "@/components/ui/separator";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="mt-16">
      <Separator />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          <div className="col-span-2 md:col-span-1">
            <h3 className="text-lg font-bold text-white">TaleCraft</h3>
            <p className="mt-4 text-gray-400 text-sm">
              The decentralized platform for collaborative storytelling.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-300">Marketplace</h4>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <Link className="text-gray-400 hover:text-white" href="/">
                  All Stories
                </Link>
              </li>
              <li>
                <Link className="text-gray-400 hover:text-white" href="#">
                  Collectibles
                </Link>
              </li>
              <li>
                <Link className="text-gray-400 hover:text-white" href="#">
                  Art
                </Link>
              </li>
              <li>
                <Link className="text-gray-400 hover:text-white" href="#">
                  Worlds
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-gray-300">My Account</h4>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <Link className="text-gray-400 hover:text-white" href="#">
                  Profile
                </Link>
              </li>
              <li>
                <Link className="text-gray-400 hover:text-white" href="#">
                  Favorites
                </Link>
              </li>
              <li>
                <Link className="text-gray-400 hover:text-white" href="#">
                  My Collections
                </Link>
              </li>
              <li>
                <Link className="text-gray-400 hover:text-white" href="#">
                  Settings
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-gray-300">Resources</h4>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <Link className="text-gray-400 hover:text-white" href="#">
                  Help Center
                </Link>
              </li>
              <li>
                <Link className="text-gray-400 hover:text-white" href="#">
                  Platform Status
                </Link>
              </li>
              <li>
                <Link className="text-gray-400 hover:text-white" href="#">
                  Partners
                </Link>
              </li>
              <li>
                <Link className="text-gray-400 hover:text-white" href="#">
                  Blog
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-gray-300">Community</h4>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <Link className="text-gray-400 hover:text-white" href="#">
                  Discord
                </Link>
              </li>
              <li>
                <Link className="text-gray-400 hover:text-white" href="#">
                  Twitter
                </Link>
              </li>
              <li>
                <Link className="text-gray-400 hover:text-white" href="#">
                  Instagram
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
          <p>© 2024 TaleCraft. All rights reserved.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Link className="text-gray-400 hover:text-white" href="#">
              Terms of Service
            </Link>
            <Link className="text-gray-400 hover:text-white" href="#">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
