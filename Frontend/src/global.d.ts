interface LinkField {
  Title: string;
  Link: string;
}

interface ValueField {
  value: string;
}

interface ValueObjectField {
  Value?: ValueField;
}

interface CustomFields {
  name?: string;
  fields?: ValueObjectField;
}

interface ColorFields {
  name: string;
  displayName: string;
  fields: {
    BackgroundColor: ValueField;
    BackgroundOpacity: ValueField;
    FontColor: ValueField;
  };
}

interface CustomFormField {
  id: string;
  name: string;
  value: string;
}

interface CustomClassField {
  cssClass: string;
  cssClassOptions: [];
  manualCssClasses: string;
}

type ImageItem = {
  src: string;
  height: string;
  width: string;
  alt: string;
};

type IconField = {
  id?: string;
  fields: {
    Icon: {
      value: ImageField;
    };
    Text: Field<string>;
  };
};

interface LoginUserResponse {
  token: string;
}

interface User {
  id: string;
  name: string;
  companyID: string;
  surname: string;
  email: string;
  phone: string;
  roles: string[];
  active: boolean;
  username: string;
  xp: {
    HighRank?: string;
    FileNum?: string;
    UserType?: string;
    IsAutoShip?: boolean;
    PriceLevel?: string;
    AutoshipFrequency?: string;
  };
}

interface UserGroup {
  groupId: string;
}

interface Address {
  Items: AddressItem[];
}

interface XP_AddressItem {
  CCPANoticeView?: boolean;
  CCPANoticeViewDate?: string;
  Email?: string;
  UpdateAutoship?: boolean;
}

interface AddressItem {
  readonly ID?: string;
  Shipping?: boolean;
  Billing?: boolean;
  readonly Editable?: boolean;
  readonly DateCreated?: string;
  CompanyName?: string;
  FirstName?: string;
  LastName?: string;
  Street1?: string;
  Street2?: string;
  City?: string;
  State?: string;
  Zip?: string;
  Country?: string;
  Phone?: string;
  AddressName?: string;
  xp?: XP_AddressItem;
  Email?: string;
}

interface SignInUserInput {
  username: string;
  password: string;
  remember?: boolean;
}

interface AuthResponse {
  accessToken: string;
  refreshToken?: string;
  permissions: string[];
}

interface SearchParamOptions {
  type: string;
  name: string;
  categories: string;
  tags: string;
  author: string;
  price: string;
  manufacturer: string;
  status: string;
  is_active: string;
  shop_id: string;
  min_price: string;
  max_price: string;
}

interface UpdateUserPasswordInput {
  oldPassword: string;
  password: string;
  confirmNewPassword: string;
}

interface PasswordChangeResponse {
  status: number;
  user: User;
}

interface AddressChangeResponse {
  status: number;
  address: AddressItem;
}

interface ValidateAddressErrors {
  Code: string;
  Field: string;
  Message: string;
}

interface ValidateAddressData extends Partial<AddressItem> {
  Success: boolean;
  Errors: ValidateAddressErrors[];
}

interface ValidateAddressResponse {
  StatusCode: string;
  Message: string;
  Data: ValidateAddressData;
}

interface ValidateAddressBody {
  street1: string;
  street2: string;
  city: string;
  state: string;
  zip: string;
}

interface ChangeUsernameUserInput {
  username: string;
}

interface UserAddressInput {
  street_address: string;
  country: string;
  city: string;
  state: string;
  zip: string;
  phone: string;
  id: string;
}

interface ShippingAddressForm {
  firstName: string;
  lastName: string;
  address: string;
  apartment?: string;
  city: string;
  state: string;
  zip: string;
  phone?: string;
  email?: string;
}

interface UpdateCart {
  billing_address?: UserAddressInput;
  shipping_address?: UserAddressInput;
  shippingCost?: number;
  xp?: AnyObject;
}

interface Pdf {
  id: string;
  url: string;
  name: string;
  displayName: string;
  fields: {
    FileTitle: Field<string>;
    File: FileField;
  };
}

interface AnyObject {
  [key: string]: AnyObject | string | string[] | number | number[] | boolean | null;
}

interface Order {
  id: string;
  fromCompanyID: string;
  toCompanyID: string;
  fromUserID: string;
  billingAddressID: string;
  shippingAddressID: string;
  comments: string;
  status: string;
  dateCreated: string;
  dateSubmitted: string;
  dateApproved: string;
  dateDeclined: string;
  dateCanceled: string;
  dateCompleted: string;
  lastUpdated: string;
  subtotal?: number;
  shippingCost: number;
  taxCost: number;
  giftCards?: number;
  promotionDiscount: number;
  currency: string;
  total: number;
  orderTotal?: number;
  isSubmitted: boolean;
  retailSavings?: number;
  xp: AnyObject;
  autoshipTotal?: number;
  retailTotal?: number;
  items?: BuyerProduct[];
}
interface InformationRequestFormInput {
  name: string;
  email?: string;
  phone: number;
  bestTimeToCall?: string;
  timeZone?: string;
  fieldRepName?: string;
  message?: string;
}

type TimeToCall_Zone = {
  name: string;
  displayName: string;
  id: string;
  url: string;
  fields: ValueObjectField;
};

type PriceBreak = {
  quantity?: number;
  price?: number;
  salePrice?: number;
  subscriptionPrice?: number;
};

type PriceSchedule = {
  id?: string;
  name?: string;
  minQuantity?: number | undefined;
  maxQuantity?: number;
  priceBreaks?: PriceBreak[];
};

type XP = {
  image: ImageField;
  link: string;
  autoshipProduct: boolean;
  commissionType: string;
  commissionableSale: number;
  productSKU: string;
  size: string;
  scancode: string;
  avalaraTaxCode: string;
  tableauProductName: string;
  tableauDivision: string;
  tableauSubdivision: string;
  tableauProductVariant: string;
  tableauProductLine: string;
};

interface ProductPriceSchedules {
  Id: string;
  Name: string;
  MinQuantity: number;
  MaxQuantity: number;
  PriceBreaks?: ProductPriceBreaks[];
  Currency: string;
  Xp: object;
}

interface ProductPriceBreaks {
  Quantity: number;
  Price: number;
  SalePrice: number | null;
}

interface BuyerProduct {
  priceSchedule?: PriceSchedule;
  id?: string;
  productId?: string;
  quantity?: number;
  parentID?: string;
  isParent?: boolean;
  name?: string;
  description?: string;
  quantityMultiplier?: number;
  shipWeight?: number;
  shipHeight?: number;
  shipWidth?: number;
  shipLength?: number;
  active?: boolean;
  specCount?: number;
  variantCount?: number;
  shipFromAddressID?: string;
  inventory?: AnyObject;
  defaultSupplierID?: string;
  allSuppliersCanSell?: boolean;
  returnable?: boolean;
  xp?: XP;
  PriceSchedules?: ProductPriceSchedules[];
  Id?: string;
  Name?: string;
  Image?: ImageField;
  Link?: string;
  RetailPrice?: number;
}

interface PageFacets {
  page?: number;
  pageSize?: number;
  totalCount?: number;
  totalPages?: number;
  itemRange?: number[];
  nextPageKey?: null | string;
}

interface BuyerProductItems {
  Meta: PageFacets;
  items: BuyerProduct[];
}

interface ProductDetailsType {
  id?: string;
  productId: string;
  quantity: string;
  isAuthenticated: boolean;
}

interface GiftCardItem {
  ID: string;
  Name: string;
  Balance: number;
  AllowAsPaymentMethod: boolean;
  RedemptionCode: string;
  StartDate: string;
  EndDate: string;
  xp: {
    UserId: string;
    OrderGroupId: string;
    LastModified: string;
    InitialAmount: number;
    GiftCertificateTo: string;
    GiftCertificateFrom: string;
    GiftCertificateMessage: string;
    GiftCertificateEmail: string;
    GiftCertificateStyle: number;
  };
}

type GiftCertificateListItemProps = {
  Items: GiftCardItem[];
};

interface AddressUpdateForm extends Record<string, string | undefined> {
  id?: string;
  firstName: string;
  lastName: string;
  companyName: string;
  address: string;
  apartment?: string;
  city: string;
  state: string;
  zip: string;
  lastNameBilling: string;
  firstNameBilling: string;
  companyNameBilling: string;
  apartmentBilling?: string;
  addressBilling: string;
  cityBilling: string;
  stateBilling: string;
  zipBilling: string;
  emailBilling?: string;
  areaCodeBilling: string;
  phonePrefixBilling: string;
  phoneLineNumberBilling: string;
  phoneExtBilling?: string;
}

type OrdersMe = {
  Items: [];
  Meta: PageFacets;
};

type GiftCertificateBalance = {
  Id: string;
  Balance: number;
  RedemptionCode: string;
  EndDate: null | Date;
};

type RequestQuery = Partial<{
  [key: string]: string | string[] | boolean;
}>;

type Translate = (key: string) => string;

interface WareHouseItem {
  city: Field<string>;
  state: Field<string>;
  warehouseID: Field<string>;
  description: Field<string>;
}

interface WarehouseRequest {
  item: {
    id: string;
    name: string;
    children: {
      total: number;
      results: WareHouseItem[];
    };
  };
}

type ShippingRates = {
  RateList: RateListItems;
};

type RateListItems = {
  [key: string]: CarrierRate[];
};

type CarrierRate = {
  Carrier: string;
  CarrierAccountId: string;
  Currency: string;
  DeliveryDate: string | null;
  DeliveryDateGuaranteed: boolean;
  DeliveryDays: number | null;
  EstDeliveryDays: number;
  ListCurrency: string;
  ListRate: string;
  Price: string;
  RetailCurrency: string | null;
  RetailRate: string | null;
  Service: string;
  ShipmentId: string;
};

interface DateTimeFormatOptions {
  weekday?: 'long' | 'short' | 'narrow';
  era?: 'long' | 'short' | 'narrow';
  year?: 'numeric' | '2-digit';
  month?: 'numeric' | '2-digit' | 'long' | 'short' | 'narrow';
  day?: 'numeric' | '2-digit';
  hour?: 'numeric' | '2-digit';
  minute?: 'numeric' | '2-digit';
  second?: 'numeric' | '2-digit';
  timeZoneName?: 'long' | 'short';
}

interface ShippingOptionDetail {
  shippingCost: string;
  xp: {
    [key: string]: string | number | boolean;
  };
}

interface RegionItem {
  code: Field<string>;
  group: Field<string>;
  name_c1d60e037d5a4c45a67b498684d40990: Field<string>;
}
interface RegionCodesRequest {
  item: {
    id: string;
    name: string;
    children: {
      total: number;
      results: RegionItem[];
    };
  };
}

interface PaymentTypePromoCode {
  Type: string;
  Amount?: Number;
  SpendingAccountID?: string;
}

interface PromoCodeApplied {
  code: string;
  balance: number;
  id: string;
}

interface ProgressUrl {
  url: string | undefined;
}

interface SignUpUserInput {
  email?: string;
}

interface IFailedOrder {
  // TODO Update when real data is available
  id: string;
}

type AutoshipUser = {
  xp: {
    autoshipFrequency: string;
    IsAutoShip: boolean;
  };
};

interface AutoShipDetail {
  cartId?: string;
  xp: {
    [key: string]: string | number | boolean;
  };
}

type orderDirection = 'Incoming' | 'Outgoing' | 'All';

interface UserXp {
  FileNum?: string;
  ReplicatorSiteName?: string;
}

interface UserInfo {
  ID?: string;
  readonly CompanyID?: string;
  Username: string;
  Password?: string;
  FirstName: string;
  LastName: string;
  Email: string;
  Phone?: string;
  TermsAccepted?: string;
  Active: boolean;
  xp?: UserXp;
  readonly AvailableRoles?: string[];
  readonly Locale?: Locale;
  readonly DateCreated?: string;
  readonly PasswordLastSetDate?: string;
}

interface CartSubmitModel {
  isAutoShip: boolean;
  isGiftOrder: boolean;
  frequency: string;
  giftOrderMessage: string;
  shippingAddress: {
    id: string;
    dateCreated: string;
    companyName: string;
    firstName: string;
    lastName: string;
    street1: string;
    street2: string;
    city: string;
    state: string;
    zip: string;
    country: string;
    phone: string;
    addressName: string;
  };
  registrationInformation: {
    userName: string;
    password: string;
    email: string;
    phoneNumber: string;
  };
  lineItems: {
    quantity: string;
    productId: string;
  }[];
  redemptionCodes: string[];
}

type AutoshipOrder = {
  Total: number;
  ShippingCost: number;
  TaxCost: number;
  Subtotal: number;
};

interface ProductXp {
  RetailPrice?: number;
}

interface Product<TProductXp = ProductXp> {
  OwnerID?: string;
  DefaultPriceScheduleID?: string;
  AutoForward?: boolean;
  ID?: string;
  ParentID?: string;
  IsParent?: boolean;
  Name: string;
  Description?: string;
  QuantityMultiplier?: number;
  ShipWeight?: number;
  ShipHeight?: number;
  ShipWidth?: number;
  ShipLength?: number;
  Active?: boolean;
  readonly SpecCount?: number;
  readonly VariantCount?: number;
  ShipFromAddressID?: string;
  DefaultSupplierID?: string;
  AllSuppliersCanSell?: boolean;
  Returnable?: boolean;
  xp?: TProductXp;
}
