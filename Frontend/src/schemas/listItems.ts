import {
  BuyerProduct as OCBProduct,
  MetaWithFacets as OCMeta,
  PriceBreak as OCPriceBreak,
} from 'ordercloud-javascript-sdk';

const mapPriceBreak = (priceBreak: OCPriceBreak): PriceBreak => {
  return {
    quantity: priceBreak.Quantity ?? 0,
    price: priceBreak.Price ?? 0,
    salePrice: priceBreak.SalePrice,
    subscriptionPrice: priceBreak.SubscriptionPrice,
  };
};

export const mapOCBuyerProduct = (Meta: OCMeta, items: OCBProduct[]): BuyerProductItems => {
  if (items) {
    return {
      items: items.map((item) => {
        const priceSchedule: PriceSchedule = {
          id: item.PriceSchedule?.ID ?? '',
          name: item.PriceSchedule?.Name,
          minQuantity: item.PriceSchedule?.MinQuantity,
          maxQuantity: item.PriceSchedule?.MaxQuantity,
          priceBreaks: item.PriceSchedule?.PriceBreaks?.map(mapPriceBreak) ?? [],
        };

        const xp: XP = {
          image: item.xp?.Image,
          link: item.xp?.Link,
          autoshipProduct: item.xp?.AutoshipProduct,
          commissionType: item.xp?.CommissionType,
          commissionableSale: item.xp?.CommissionableSale,
          productSKU: item.xp?.ProductSKU,
          size: item.xp?.Size,
          scancode: item.xp?.Scancode,
          avalaraTaxCode: item.xp?.AvalaraTaxCode,
          tableauProductName: item.xp?.TableauProductName,
          tableauDivision: item.xp?.TableauDivision,
          tableauSubdivision: item.xp?.TableauSubdivision,
          tableauProductVariant: item.xp?.TableauProductVariant,
          tableauProductLine: item.xp?.TableauProductLine,
        };

        return {
          priceSchedule,
          id: item.ID,
          isParent: item.IsParent,
          name: item.Name,
          description: item.Description,
          quantityMultiplier: item.QuantityMultiplier ?? 0,
          shipWeight: item.ShipWeight,
          shipHeight: item.ShipHeight,
          shipWidth: item.ShipWidth,
          shipLength: item.ShipLength,
          active: item.Active,
          specCount: item.SpecCount,
          variantCount: item.VariantCount,
          shipFromAddressID: item.ShipFromAddressID,
          defaultSupplierID: item.DefaultSupplierID,
          allSuppliersCanSell: item.AllSuppliersCanSell,
          returnable: item.Returnable,
          xp,
        };
      }),
      Meta: {
        page: Meta.Page,
        pageSize: Meta.PageSize,
        totalCount: Meta.TotalCount,
        totalPages: Meta.TotalPages,
        itemRange: Meta.ItemRange,
        nextPageKey: Meta.NextPageKey,
      },
    };
  }

  return {
    items: [],
    Meta: {
      page: Meta.Page,
      pageSize: Meta.PageSize,
      totalCount: Meta.TotalCount,
      totalPages: Meta.TotalPages,
      itemRange: Meta.ItemRange,
      nextPageKey: Meta.NextPageKey,
    },
  };
};
