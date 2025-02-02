import { FunctionComponent } from 'preact';
import { useState } from 'preact/hooks';

import {
  Media,
  Product,
  RedirectRouteFunc,
  RefinedProduct,
} from '../../../types/interface';
import NoImage from '../../icons/NoImage.svg';
import { SwatchButtonGroup } from '../../ui-kit';
import {
  getProductImageURL,
  htmlStringDecode,
  SEARCH_UNIT_ID,
} from '../../utils';
import ProductPrice from './ProductPrice';

export interface ProductProps {
  item: Product;
  currencySymbol: string;
  currencyRate?: string;
  setRoute?: RedirectRouteFunc | undefined;
  refineProduct: (optionIds: string[], sku: string) => any;
}

export const ProductItem: FunctionComponent<ProductProps> = ({
  item,
  currencySymbol,
  currencyRate,
  setRoute,
  refineProduct,
}: ProductProps) => {
  const { productView } = item;
  const [selectedSwatch, setSelectedSwatch] = useState('');
  const [productImages, setImages] = useState<Media[] | null>();
  const [product, setProduct] = useState<RefinedProduct>();

  const handleSelection = async (optionIds: string[], sku: string) => {
    const data = await refineProduct(optionIds, sku);
    setSelectedSwatch(optionIds[0]);
    setImages(data.refineProduct.images);
    setProduct(data);
  };

  const isSelected = (id: string) => {
    const selected = selectedSwatch ? selectedSwatch === id : false;
    return selected;
  };

  const productImage = getProductImageURL(
    productImages ? productImages ?? [] : productView.images ?? []
  ); // get image for PLP

  // will have to figure out discount logic for amount_off and percent_off still
  const discount: boolean = product
    ? product.refineProduct?.priceRange?.minimum?.regular?.amount?.value >
      product.refineProduct?.priceRange?.minimum?.final?.amount?.value
    : productView?.priceRange?.minimum?.regular?.amount?.value >
      productView?.priceRange?.minimum?.final?.amount?.value;
  const isComplexProductView = productView?.__typename === 'ComplexProductView';

  const onProductClick = () => {
    window.magentoStorefrontEvents?.publish.searchProductClick(
      SEARCH_UNIT_ID,
      productView?.sku
    );
  };

  const productUrl = setRoute
    ? setRoute({ sku: productView?.sku })
    : productView?.url;

  return (
    <div className="ds-sdk-product-item group relative flex flex-col max-w-sm justify-between h-full">
      <a
        href={productUrl as string}
        onClick={onProductClick}
        className="!text-primary hover:no-underline hover:text-primary"
      >
        <div className="ds-sdk-product-item__main relative flex flex-col justify-between h-full">
          <div className="ds-sdk-product-item__image relative w-full h-full rounded-md overflow-hidden">
            {/*
                  NOTE:
                  we could use <picture> <source...
                  or srcset in <img /> for  breakpoint based img file
                  in future for better performance
                 */}
            {productImage ? (
              <div class="min-h-80 aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none">
                <img
                  src={productImage}
                  alt={productView.name}
                  loading="eager"
                  className="max-h-[45rem] h-full w-full object-cover object-center lg:h-full lg:w-full"
                />
              </div>
            ) : (
              <NoImage
                className={`max-h-[45rem] w-full object-cover object-center lg:w-full`}
              />
            )}
          </div>
          <div className="flex flex-col">
            <div className="ds-sdk-product-item__product-name mt-md text-sm text-primary">
              {htmlStringDecode(productView.name)}
            </div>
            <ProductPrice
              item={product ?? item}
              isComplexProductView={isComplexProductView}
              discount={discount}
              currencySymbol={currencySymbol}
              currencyRate={currencyRate}
            />
          </div>
        </div>
      </a>
      <div className="ds-sdk-product-item__product-swatch flex flex-row mt-sm text-sm text-primary pb-6">
        {productView?.options?.map(
          (swatches) =>
            swatches.id == 'color' && (
              <SwatchButtonGroup
                key={productView?.sku}
                isSelected={isSelected}
                swatches={swatches.values ?? []}
                showMore={onProductClick}
                productUrl={productUrl as string}
                onClick={handleSelection}
                sku={productView?.sku}
              />
            )
        )}
      </div>
    </div>
  );
};

export default ProductItem;
