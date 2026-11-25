import { APP_NAME } from '../config';

function Footer() {
  return (
    <footer className="border-t border-sand-200 bg-sand-100 py-6 text-center text-sm text-stone-600">
      © {new Date().getFullYear()} {APP_NAME}. B.Tech CSE capstone project.
    </footer>
  );
}

export default Footer;
