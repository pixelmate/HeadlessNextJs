import { useSitecoreContext } from '@sitecore-jss/sitecore-jss-nextjs';
import { SearchIcon, CloseIcon } from 'core/atoms/Icons';
import style from './SearchBar.module.scss';
import { Form, FormControl, Button } from 'react-bootstrap';
import classNames from 'classnames';
import { useI18n } from 'next-localization';
import type { SearchBarProps } from './searchBar.type';
import { FormEvent, MouseEvent, useEffect, useRef } from 'react';

const SearchBar = (props: SearchBarProps): JSX.Element => {
  const { t } = useI18n();
  const { sitecoreContext } = useSitecoreContext();
  const searchPage = sitecoreContext?.SearchPage as string;
  const searchRef = useRef<HTMLInputElement>(null);
  const handleSearch = (e: MouseEvent<HTMLButtonElement> | FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (searchRef.current) {
      window.location.href = searchPage + '?searchtext=' + searchRef.current.value;
    }
  };

  useEffect(() => {
    if (props.isSearchBarVisible) {
      searchRef.current && searchRef.current.focus();
    }
  }, [props.isSearchBarVisible]);

  return (
    <div
      className={classNames(`${style.searchBar}`, {
        [`${style.searchBar_hidden}`]: !props.isSearchBarVisible,
      })}
    >
      <Form
        onSubmit={handleSearch}
        className="d-flex justify-content-center p-5 align-items-center w-100"
      >
        <FormControl
          autoFocus
          type="text"
          ref={searchRef}
          placeholder={t('Form_Generic_Placeholders_EnterYourSearchTerm')}
          className={`mx-2 ${style.input}`}
        />
        <Button onClick={handleSearch} className={style.searchCTA} aria-label="search-icon">
          <SearchIcon />
        </Button>
        <Button onClick={props.toggleSearchBar} className={style.searchCTA} aria-label="close-icon">
          <CloseIcon />
        </Button>
      </Form>
    </div>
  );
};

export default SearchBar;
