import React from 'react';
import { Link } from '@sitecore-jss/sitecore-jss-nextjs';
import styles from './Linklist.module.scss';
import { LinklistProps } from './Linklist.type';

const Linklist = (props: LinklistProps) => {
  const { Links: links } = props?.fields || {};
  return (
    <ul className="list-unstyled m-0">
      {links.map((link) => (
        <li key={link.id} className={`${styles.link} py-2`}>
          <Link field={link?.fields?.Link}>{link?.fields?.Link?.value?.text}</Link>
        </li>
      ))}
    </ul>
  );
};

export default Linklist;
