import classNames from 'classnames';
import { VARIANTS } from 'constants/variants';
import dynamic from 'next/dynamic';
import { NextComponentType } from 'next';
import React from 'react';
import { Container } from 'react-bootstrap';
import styles from './TabComponent.module.scss';
import { TabComponentType } from './TabComponent.type';

const Modern = dynamic(() => import('core/molecules/TabComponent/Modern'));
const Classic = dynamic(() => import('core/molecules/TabComponent/Classic'));

const MAP_THEME_TO_TAB_COMPONENT: Record<string, NextComponentType> = {
  classic: Classic,
  modern: Modern,
};

const TabComponent = (props: TabComponentType): JSX.Element => {
  const Component = props?.variant ? MAP_THEME_TO_TAB_COMPONENT[props?.variant] : Classic;

  return (
    <Container
      fluid
      className={classNames(`${styles.nav} `, {
        [`bg-black text-white`]: props?.variant === VARIANTS.MODERN,
      })}
    >
      <Component {...props} />
    </Container>
  );
};

export default TabComponent;
