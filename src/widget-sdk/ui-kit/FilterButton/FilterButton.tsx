import { FunctionComponent } from 'preact';
import { useContext } from 'preact/hooks';

import { TranslationContext } from '../../../context/translation';
import AdjustmentsIcon from '../../icons/adjustments.svg';

export interface FilterButtonProps {
  displayFilter: () => void;
  type: string;
  title?: string;
}
export const FilterButton: FunctionComponent<FilterButtonProps> = ({
  displayFilter,
  type,
  title,
}: FilterButtonProps) => {
  const translation = useContext(TranslationContext);
  return type == 'mobile' ? (
    <div className="ds-sdk-filter-button">
      <button
        className="flex items-center bg-gray-100 ring-black ring-opacity-5 rounded-md p-sm  outline outline-gray-200 hover:outline-gray-800 h-[32px]"
        onClick={displayFilter}
      >
        <AdjustmentsIcon className="w-md" />
        {translation.Filter.title}
      </button>
    </div>
  ) : (
    <div className="ds-sdk-filter-button-desktop">
      <button
        className="flex items-center bg-gray-100 ring-black ring-opacity-5 rounded-md p-sm h-[32px]"
        onClick={displayFilter}
      >
        {title}
      </button>
    </div>
  );
};
