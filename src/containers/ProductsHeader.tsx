import { FunctionComponent } from 'preact';
import { useCallback, useContext, useEffect, useState } from 'preact/hooks';

import Facets from '../components/Facets';
import { useAttributeMetadata, useSearch, useStore } from '../context';
import { TranslationContext } from '../context/translation';
import { Facet } from '../types/interface';
import { getValueFromUrl, handleUrlSort } from '../utils/handleUrlFilters';
import { FilterButton, SearchBar, SortDropdown } from '../widget-sdk/ui-kit';
import {
  defaultSortOptions,
  generateGQLSortInput,
  getSortOptionsfromMetadata,
} from '../widget-sdk/utils/sort';

interface Props {
  facets: Facet[];
  totalCount: number;
  screenSize: {
    mobile: boolean;
    tablet: boolean;
    desktop: boolean;
    columns: number;
  };
}
export const ProductsHeader: FunctionComponent<Props> = ({
  facets,
  totalCount,
  screenSize,
}) => {
  const searchCtx = useSearch();
  const storeCtx = useStore();
  const attributeMetadata = useAttributeMetadata();

  const translation = useContext(TranslationContext);

  const [showMobileFacet, setShowMobileFacet] = useState(false);
  const [sortOptions, setSortOptions] = useState(defaultSortOptions());

  const getSortOptions = useCallback(() => {
    setSortOptions(
      getSortOptionsfromMetadata(
        translation,
        attributeMetadata?.sortable,
        storeCtx?.config?.displayOutOfStock,
        storeCtx?.config?.currentCategoryUrlPath
      )
    );
  }, [storeCtx, translation, attributeMetadata]);

  useEffect(() => {
    getSortOptions();
  }, [getSortOptions]);

  const defaultSortOption = storeCtx.config?.currentCategoryUrlPath
    ? 'position_ASC'
    : 'relevance_DESC';
  const sortFromUrl = getValueFromUrl('product_list_order');
  const sortByDefault = sortFromUrl ? sortFromUrl : defaultSortOption;
  const [sortBy, setSortBy] = useState<string>(sortByDefault);
  const onSortChange = (sortOption: string) => {
    setSortBy(sortOption);
    searchCtx.setSort(generateGQLSortInput(sortOption));
    handleUrlSort(sortOption);
  };

  return (
    <div className="flex flex-col max-w-5xl lg:max-w-7xl mx-auto w-full h-full">
      <div className="flex justify-between">
        <div>
          {screenSize.mobile
            ? totalCount > 0 && (
                <FilterButton
                  displayFilter={() => setShowMobileFacet(!showMobileFacet)}
                  type="mobile"
                />
              )
            : storeCtx.config.displaySearchBox && (
                <SearchBar
                  phrase={searchCtx.phrase}
                  onKeyPress={(e: any) => {
                    if (e.key === 'Enter') {
                      searchCtx.setPhrase(e?.target?.value);
                    }
                  }}
                  onClear={() => searchCtx.setPhrase('')}
                  placeholder={translation.SearchBar.placeholder}
                />
              )}
        </div>
        {totalCount > 0 && (
          <SortDropdown
            sortOptions={sortOptions}
            value={sortBy}
            onChange={onSortChange}
          />
        )}
      </div>
      {showMobileFacet && <Facets searchFacets={facets} />}
    </div>
  );
};
