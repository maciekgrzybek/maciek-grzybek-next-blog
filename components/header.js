import Link from 'next/link';

import Logo from './logo';

export default function Header() {
  return (
    <section className="flex-row flex justify-between mt-10 mb-10 md:mb-12">
      <div className="flex w-28">
        <Logo />
      </div>
      <ul className="flex-row flex font-mono text-sm">
        <li className=" mr-6">
          <Link href={'/blog'}>about me</Link>
        </li>
        <li>
          <Link href={'/blog'}>blog</Link>
        </li>
      </ul>
    </section>
  );
}
