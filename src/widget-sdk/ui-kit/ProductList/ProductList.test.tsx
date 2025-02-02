import { render } from '@testing-library/preact';

import { ProductList } from './ProductList';

describe('WidgetSDK - UIKit/ProductList', () => {
  test('renders', () => {
    const { container } = render(
      <ProductList
        products={[]}
        numberOfColumns={0}
        currencySymbol=""
        currencyRate=""
        showFilters={true}
        setRoute={undefined}
        refineProduct={() => {}}
      />
    );

    const elem = container.querySelector('.ds-sdk-product-list');

    expect(!!elem).toEqual(true);
  });
});
