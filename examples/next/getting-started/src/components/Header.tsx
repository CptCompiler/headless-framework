import React from 'react';
import styles from 'scss/components/Header.module.scss';
import Link from 'next/link';
import { client, MenuLocationEnum } from 'client';
import { useRouter } from 'next/router';

interface Props {
  title?: string;
  description?: string;
}

function Header({
  title = 'Headless by WP Engine',
  description,
}: Props): JSX.Element {
  const { menuItems } = client.useQuery()
  const links = menuItems({
    where: { location: MenuLocationEnum.PRIMARY },
  }).nodes;
  const {locale, pathname} = useRouter()
  return (
    <header>
      <div className={styles.wrap}>
        <div className={styles['title-wrap']}>
          <p className={styles['site-title']}>
            <Link href="/">
              <a>{title}</a>
            </Link>
          </p>
          {description && <p className={styles.description}>{description}</p>}
        </div>
        <div className={styles.menu}>
          <ul>
            {links?.map((link) => (
              <li key={`${link.label}$-menu`}>
                <Link href={link.url ?? ''}>
                  <a href={link.url}>{link.label}</a>
                </Link>
              </li>
            ))}
            <li>
              <Link href="https://github.com/wpengine/headless-framework">
                <a
                  className="button"
                  href="https://github.com/wpengine/headless-framework">
                  GitHub
                </a>
              </Link>
            </li>
            <li>
              <Link href={pathname ?? "/"} locale={locale === "de" ? "en" : "de"}>
                <a>{locale === "de" ? "EN" : "DE"}</a>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}

export default Header;
