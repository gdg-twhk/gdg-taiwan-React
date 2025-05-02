import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="py-10 border-t border-gray-400 border-t-3">
      <div className="mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-left text-google-blue">免責聲明</h2>
          <p className="text-lg mb-2 text-left">
            GDG Taiwan 是一個獨立的團體，我們的活動和意見表達與 Google 公司無任何關聯。欲了解 GDG 計畫的更多資訊，請參閱
          </p>
          <a
            href="https://developers.google.com/community/gdg/"
            className="underline break-all text-left block mb-6 text-google-blue"
            target="_blank"
            rel="noopener noreferrer"
          >
            https://developers.google.com/community/gdg/
          </a>
          <p className="text-left text-base mt-8">
            © 2025 <Link href="/" className="underline text-google-blue">GDG Taiwan</Link>・<Link href="/code_of_conduct" className="underline text-google-blue">行為準則</Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
