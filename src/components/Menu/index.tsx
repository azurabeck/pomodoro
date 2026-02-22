import { HouseIcon, MoonIcon, SettingsIcon, SunIcon, TimerIcon } from 'lucide-react';
import { useState, useEffect } from 'react';
import styles from './styles.module.css';

type AvailableThemes = 'light' | 'dark';

export function Menu() {
  const [theme, setTheme] = useState<AvailableThemes>(() => {
    const storageTheme =
      (localStorage.getItem('theme') as AvailableThemes) || 'dark';
    return storageTheme;
  });

  const nextThemeIcon = {
    light: <MoonIcon />,
    dark: <SunIcon />
  }

  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme)
  }, [theme]);

  return (
    <nav className={styles.Menu}>
      <a href='#' className={styles.MenuLink}>
        <TimerIcon />
      </a>

      <a href='#' className={styles.MenuLink}>
        <HouseIcon />
      </a>

      <a href='#' className={styles.MenuLink}>
        <SettingsIcon />
      </a>

      <a href='#' className={styles.MenuLink} onClick={handleClick}>
        {nextThemeIcon[theme]}
      </a>
    </nav>
  );
}
