import type { ContentTabsProps } from './ContentTabs.types';
import styles from './ContentTabs.module.scss';
import { Container, Tab, Tabs } from 'react-bootstrap';
import { RichText, Text, useSitecoreContext } from '@sitecore-jss/sitecore-jss-nextjs';
import classNames from 'classnames';
import { VARIANTS } from 'constants/variants';
import TabComponent from 'core/molecules/TabComponent';
import { TabComponentType } from 'core/molecules/TabComponent/TabComponent.type';

const ContentTabs = (props: ContentTabsProps): JSX.Element => {
  const { TabsList } = props?.fields || [];
  const { Variation } = props?.fields || VARIANTS.CLASSIC;
  const { sitecoreContext } = useSitecoreContext();
  const isEditing = sitecoreContext && sitecoreContext?.pageEditing;
  return (
    <Container className={`${styles.contentTabs_Container} mx-auto contentTabComponent px-0`}>
      {/* Normal Mode */}
      <Tabs
        className={classNames(`${styles.tabs} `, {
          [`modern_tab`]: Variation?.fields?.Value?.value === VARIANTS.MODERN,
        })}
      >
        {!isEditing &&
          (TabsList || []).map((tabItem, index) => (
            <Tab
              key={index}
              eventKey={tabItem?.fields?.Title?.value?.toString()}
              title={tabItem?.fields?.Title?.value}
              className={classNames({
                [`bg-black text-white`]: Variation?.fields?.Value?.value === VARIANTS.MODERN,
              })}
            >
              <TabComponent
                fields={tabItem?.fields}
                variant={props?.fields?.Variation?.fields?.Value?.value}
              />
            </Tab>
          ))}
      </Tabs>
      {/* Experience Editor */}
      {isEditing &&
        (TabsList || []).map((tabItem: TabComponentType, index) => {
          return (
            <Tabs className={styles.tabs} key={index}>
              <Tab key={index} eventKey={tabItem?.fields?.Title?.value?.toString()} title={''}>
                <Text field={tabItem.fields.Title} />
                <RichText className={styles.nav} field={tabItem?.fields?.Description} />
              </Tab>
            </Tabs>
          );
        })}
    </Container>
  );
};

export default ContentTabs;
