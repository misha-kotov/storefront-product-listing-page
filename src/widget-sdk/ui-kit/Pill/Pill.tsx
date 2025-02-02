import { FunctionComponent } from 'preact';
import { JSXInternal } from 'preact/src/jsx';

import CloseIcon from '../../icons/plus.svg';
export interface PillProps {
  label: string;
  onClick: () => void;
  CTA?: JSXInternal.Element;
  classes?: string;
}

const defaultIcon = (
  <CloseIcon className="h-[12px] w-[12px] rotate-45 inline-block ml-sm cursor-pointer  fill-gray-700" />
);

// TODO: add support later to pass classes to the container div
export const Pill: FunctionComponent<PillProps> = ({
  label,
  onClick,
  CTA = defaultIcon,
}) => {
  return (
    <div
      key={label}
      className="ds-sdk-pill inline-flex justify-content items-center bg-gray-100 rounded-full w-fit outline outline-gray-200 min-h-[32px] px-4 py-1"
    >
      <span className="ds-sdk-pill__label font-normal text-sm">{label}</span>
      <span className="ds-sdk-pill__cta" onClick={onClick}>
        {CTA}
      </span>
    </div>
  );
};
