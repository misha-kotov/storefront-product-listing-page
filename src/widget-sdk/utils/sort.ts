import { Language } from '../../context/translation';
import { GQLSortInput, SortMetadata, SortOption } from '../../types/interface';

const defaultSortOptions = (): SortOption[] => {
  return [
    { label: 'Most Relevant', value: 'relevance_DESC' },
    { label: 'Price: Low to High', value: 'price_ASC' },
    { label: 'Price: High to Low', value: 'price_DESC' },
  ];
};

const getSortOptionsfromMetadata = (
  translation: Language,
  sortMetadata: SortMetadata[],
  displayOutOfStock?: string,
  categoryPath?: string
): SortOption[] => {
  const sortOptions = categoryPath
    ? [
        {
          label: translation.SortDropdown.positionLabel,
          value: 'position_ASC',
        },
      ]
    : [
        {
          label: translation.SortDropdown.relevanceLabel,
          value: 'relevance_DESC',
        },
      ];
  const displayInStockOnly = displayOutOfStock !== '1';

  if (sortMetadata && sortMetadata.length > 0) {
    sortMetadata.forEach((e) => {
      if (
        !e.attribute.includes('relevance') &&
        !(e.attribute.includes('inStock') && displayInStockOnly) &&
        !e.attribute.includes('position')
        /* conditions for which we don't display the sorting option: 
                1) if the option attribute is relevance
                2) if the option attribute is "inStock" and display out of stock products is set to no
                3) if the option attribute is "position" and there is not a categoryPath (we're not in category browse mode) -> the conditional part is handled in setting sortOptions
                */
      ) {
        if (e.numeric && e.attribute.includes('price')) {
          sortOptions.push({
            label: `${e.label}: Low to High`,
            value: `${e.attribute}_ASC`,
          });
          sortOptions.push({
            label: `${e.label}: High to Low`,
            value: `${e.attribute}_DESC`,
          });
        } else {
          sortOptions.push({
            label: `${e.label}`,
            value: `${e.attribute}_DESC`,
          });
        }
      }
    });
  }
  return sortOptions;
};

const generateGQLSortInput = (
  sortOption: string
): GQLSortInput[] | undefined => {
  // results sorted by relevance or position by default
  if (!sortOption) {
    return undefined;
  }

  // sort options are in format attribute_direction
  const index = sortOption.lastIndexOf('_');
  return [
    {
      attribute: sortOption.substring(0, index),
      direction: sortOption.substring(index + 1) === 'ASC' ? 'ASC' : 'DESC',
    },
  ];
};

export { defaultSortOptions, generateGQLSortInput, getSortOptionsfromMetadata };
