import type { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case 'GET': {
      const data = {
        RateList: {
          USPS: [
            {
              Carrier: 'USPS',
              CarrierAccountId: 'ca_ee1909efeb52443eb4f300bc15b16ef7',
              Currency: 'USD',
              DeliveryDate: null,
              DeliveryDateGuaranteed: false,
              DeliveryDays: 2,
              EstDeliveryDays: 2,
              ListCurrency: 'USD',
              ListRate: '10.27',
              Price: '7.47',
              RetailCurrency: 'USD',
              RetailRate: '14.05',
              Service: 'Priority',
              ShipmentId: 'shp_de57ee4428d247988c47da36c98f1837',
            },
            {
              Carrier: 'USPS',
              CarrierAccountId: 'ca_ee1909efeb52443eb4f300bc15b16ef7',
              Currency: 'USD',
              DeliveryDate: null,
              DeliveryDateGuaranteed: false,
              DeliveryDays: null,
              EstDeliveryDays: null,
              ListCurrency: 'USD',
              ListRate: '46.85',
              Price: '46.85',
              RetailCurrency: 'USD',
              RetailRate: '54.20',
              Service: 'Express',
              ShipmentId: 'shp_de57ee4428d247988c47da36c98f1837',
            },
            {
              Carrier: 'USPS',
              CarrierAccountId: 'ca_ee1909efeb52443eb4f300bc15b16ef7',
              Currency: 'USD',
              DeliveryDate: null,
              DeliveryDateGuaranteed: false,
              DeliveryDays: 5,
              EstDeliveryDays: 5,
              ListCurrency: 'USD',
              ListRate: '8.91',
              Price: '7.47',
              RetailCurrency: 'USD',
              RetailRate: '8.91',
              Service: 'ParcelSelect',
              ShipmentId: 'shp_de57ee4428d247988c47da36c98f1837',
            },
          ],
          UPS: [
            {
              Carrier: 'UPS',
              CarrierAccountId: 'ca_fdba699c62c64b8ba7fda19882300656',
              Currency: 'USD',
              DeliveryDate: '2023-05-08T23:00:00Z',
              DeliveryDateGuaranteed: true,
              DeliveryDays: 1,
              EstDeliveryDays: 1,
              ListCurrency: 'USD',
              ListRate: '123.36',
              Price: '52.97',
              RetailCurrency: 'USD',
              RetailRate: '117.89',
              Service: 'NextDayAirSaver',
              ShipmentId: 'shp_de57ee4428d247988c47da36c98f1837',
            },
            {
              Carrier: 'UPS',
              CarrierAccountId: 'ca_fdba699c62c64b8ba7fda19882300656',
              Currency: 'USD',
              DeliveryDate: '2023-05-08T10:30:00Z',
              DeliveryDateGuaranteed: true,
              DeliveryDays: 1,
              EstDeliveryDays: 1,
              ListCurrency: 'USD',
              ListRate: '129.73',
              Price: '55.71',
              RetailCurrency: 'USD',
              RetailRate: '121.58',
              Service: 'NextDayAir',
              ShipmentId: 'shp_de57ee4428d247988c47da36c98f1837',
            },
            {
              Carrier: 'UPS',
              CarrierAccountId: 'ca_fdba699c62c64b8ba7fda19882300656',
              Currency: 'USD',
              DeliveryDate: '2023-05-10T23:00:00Z',
              DeliveryDateGuaranteed: false,
              DeliveryDays: 3,
              EstDeliveryDays: 3,
              ListCurrency: 'USD',
              ListRate: '33.58',
              Price: '18.04',
              RetailCurrency: 'USD',
              RetailRate: '30.94',
              Service: '3DaySelect',
              ShipmentId: 'shp_de57ee4428d247988c47da36c98f1837',
            },
            {
              Carrier: 'UPS',
              CarrierAccountId: 'ca_fdba699c62c64b8ba7fda19882300656',
              Currency: 'USD',
              DeliveryDate: '2023-05-09T23:00:00Z',
              DeliveryDateGuaranteed: false,
              DeliveryDays: 2,
              EstDeliveryDays: 2,
              ListCurrency: 'USD',
              ListRate: '48.54',
              Price: '26.67',
              RetailCurrency: 'USD',
              RetailRate: '45.06',
              Service: '2ndDayAirAM',
              ShipmentId: 'shp_de57ee4428d247988c47da36c98f1837',
            },
            {
              Carrier: 'UPS',
              CarrierAccountId: 'ca_fdba699c62c64b8ba7fda19882300656',
              Currency: 'USD',
              DeliveryDate: '2023-05-09T23:00:00Z',
              DeliveryDateGuaranteed: false,
              DeliveryDays: 2,
              EstDeliveryDays: 2,
              ListCurrency: 'USD',
              ListRate: '16.68',
              Price: '10.58',
              RetailCurrency: 'USD',
              RetailRate: '16.09',
              Service: 'Ground',
              ShipmentId: 'shp_de57ee4428d247988c47da36c98f1837',
            },
            {
              Carrier: 'UPS',
              CarrierAccountId: 'ca_fdba699c62c64b8ba7fda19882300656',
              Currency: 'USD',
              DeliveryDate: '2023-05-08T08:00:00Z',
              DeliveryDateGuaranteed: true,
              DeliveryDays: 1,
              EstDeliveryDays: 1,
              ListCurrency: 'USD',
              ListRate: '164.01',
              Price: '173.53',
              RetailCurrency: 'USD',
              RetailRate: '155.86',
              Service: 'NextDayAirEarlyAM',
              ShipmentId: 'shp_de57ee4428d247988c47da36c98f1837',
            },
            {
              Carrier: 'UPS',
              CarrierAccountId: 'ca_fdba699c62c64b8ba7fda19882300656',
              Currency: 'USD',
              DeliveryDate: '2023-05-09T23:00:00Z',
              DeliveryDateGuaranteed: false,
              DeliveryDays: 2,
              EstDeliveryDays: 2,
              ListCurrency: 'USD',
              ListRate: '43.13',
              Price: '23.18',
              RetailCurrency: 'USD',
              RetailRate: '40.23',
              Service: '2ndDayAir',
              ShipmentId: 'shp_de57ee4428d247988c47da36c98f1837',
            },
          ],
          FedEx: [
            {
              Carrier: 'FedEx',
              CarrierAccountId: 'ca_99fe8b9a0a9d4ab793bcad10cb5fae97',
              Currency: 'USD',
              DeliveryDate: '2023-05-08T08:30:00Z',
              DeliveryDateGuaranteed: true,
              DeliveryDays: 3,
              EstDeliveryDays: 3,
              ListCurrency: 'USD',
              ListRate: '173.98',
              Price: '162.52',
              RetailCurrency: null,
              RetailRate: null,
              Service: 'FIRST_OVERNIGHT',
              ShipmentId: 'shp_de57ee4428d247988c47da36c98f1837',
            },
            {
              Carrier: 'FedEx',
              CarrierAccountId: 'ca_99fe8b9a0a9d4ab793bcad10cb5fae97',
              Currency: 'USD',
              DeliveryDate: '2023-05-08T10:30:00Z',
              DeliveryDateGuaranteed: true,
              DeliveryDays: 3,
              EstDeliveryDays: 3,
              ListCurrency: 'USD',
              ListRate: '138.56',
              Price: '38.13',
              RetailCurrency: null,
              RetailRate: null,
              Service: 'PRIORITY_OVERNIGHT',
              ShipmentId: 'shp_de57ee4428d247988c47da36c98f1837',
            },
            {
              Carrier: 'FedEx',
              CarrierAccountId: 'ca_99fe8b9a0a9d4ab793bcad10cb5fae97',
              Currency: 'USD',
              DeliveryDate: '2023-05-08T16:30:00Z',
              DeliveryDateGuaranteed: true,
              DeliveryDays: 3,
              EstDeliveryDays: 3,
              ListCurrency: 'USD',
              ListRate: '131.10',
              Price: '34.80',
              RetailCurrency: null,
              RetailRate: null,
              Service: 'STANDARD_OVERNIGHT',
              ShipmentId: 'shp_de57ee4428d247988c47da36c98f1837',
            },
            {
              Carrier: 'FedEx',
              CarrierAccountId: 'ca_99fe8b9a0a9d4ab793bcad10cb5fae97',
              Currency: 'USD',
              DeliveryDate: '2023-05-09T10:30:00Z',
              DeliveryDateGuaranteed: true,
              DeliveryDays: 4,
              EstDeliveryDays: 4,
              ListCurrency: 'USD',
              ListRate: '54.47',
              Price: '21.79',
              RetailCurrency: null,
              RetailRate: null,
              Service: 'FEDEX_2_DAY_AM',
              ShipmentId: 'shp_de57ee4428d247988c47da36c98f1837',
            },
            {
              Carrier: 'FedEx',
              CarrierAccountId: 'ca_99fe8b9a0a9d4ab793bcad10cb5fae97',
              Currency: 'USD',
              DeliveryDate: '2023-05-09T16:30:00Z',
              DeliveryDateGuaranteed: true,
              DeliveryDays: 4,
              EstDeliveryDays: 4,
              ListCurrency: 'USD',
              ListRate: '45.92',
              Price: '16.67',
              RetailCurrency: null,
              RetailRate: null,
              Service: 'FEDEX_2_DAY',
              ShipmentId: 'shp_de57ee4428d247988c47da36c98f1837',
            },
            {
              Carrier: 'FedEx',
              CarrierAccountId: 'ca_99fe8b9a0a9d4ab793bcad10cb5fae97',
              Currency: 'USD',
              DeliveryDate: '2023-05-09T23:59:00Z',
              DeliveryDateGuaranteed: true,
              DeliveryDays: 2,
              EstDeliveryDays: 2,
              ListCurrency: 'USD',
              ListRate: '17.97',
              Price: '9.29',
              RetailCurrency: null,
              RetailRate: null,
              Service: 'FEDEX_GROUND',
              ShipmentId: 'shp_de57ee4428d247988c47da36c98f1837',
            },
            {
              Carrier: 'FedEx',
              CarrierAccountId: 'ca_99fe8b9a0a9d4ab793bcad10cb5fae97',
              Currency: 'USD',
              DeliveryDate: '2023-05-10T16:30:00Z',
              DeliveryDateGuaranteed: true,
              DeliveryDays: 5,
              EstDeliveryDays: 5,
              ListCurrency: 'USD',
              ListRate: '41.40',
              Price: '18.54',
              RetailCurrency: null,
              RetailRate: null,
              Service: 'FEDEX_EXPRESS_SAVER',
              ShipmentId: 'shp_de57ee4428d247988c47da36c98f1837',
            },
          ],
        },
      };
      res.status(200).json(data);
      break;
    }
    default:
      res.send(404);
      break;
  }
};

export default handler;
