import { cx } from 'npm:class-variance-authority';

import { Container } from '../components/Container.tsx';
import { Document } from '../components/Document.tsx';
import { SocialLinks } from '../components/SocialLinks.tsx';

function Header() {
  return (
    <header className="bg-cat-base">
      <Container className="flex items-center justify-between py-8">
        <a href="/">
          <h1
            className={cx(
              'bg-gradient-to-r from-cat-blue to-cat-mauve bg-clip-text text-transparent',
              'text-xl font-semibold lg:text-2xl',
            )}
          >
            Francisco Veracoechea
          </h1>
          <span className="font-normal leading-tight text-cat-subtext1 lg:text-lg">
            Frontend Engineer
          </span>
        </a>

        <SocialLinks size="md" />
      </Container>
    </header>
  );
}

function Footer() {
  return (
    <footer className="bg-cat-base">
      <Container className="flex flex-col justify-between md:flex-row">
        <div className="flex items-center gap-2">
          <p className="text-lg font-medium text-cat-subtext0">Francisco Veracoechea</p>
          <SocialLinks size="sm" />
        </div>
        <div className="flex gap-2">
          <span>Copyright &copy; {new Date().getFullYear()}</span>
          <span>|</span>
          <span>All rights reserved.</span>
        </div>
      </Container>
    </footer>
  );
}

type Props = Lume.Data;

export default function MainLayout(props: Props) {
  const { children, ...layoutData } = props;
  return (
    <Document {...layoutData}>
      <Header />
      <Container style={{ minHeight: 'calc(100vh - 196px)' }}>
        <main>{children}</main>
      </Container>
      <Footer />
    </Document>
  );
}
