import React from 'react';
import styles from '../scss/_style.module.scss';

export const ThemeToggle = ({ value, onChange }) => {
  return (
    <label className={styles.switch} htmlFor="toggler">
      <input id="toggler" type="checkbox" checked={value} onClick={onChange} readOnly />
      <span className={styles.slider} />
      <span className={styles.wave} />
    </label>
  );
};
