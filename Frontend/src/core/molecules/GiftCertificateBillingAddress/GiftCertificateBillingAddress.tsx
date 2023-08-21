import React from 'react';
import classNames from 'classnames';
import { useTranslate } from 'hooks/useTranslate';
import { useContext, useEffect } from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import TooltipContent from 'core/atoms/TooltipContent';
import { FieldErrors, useFormContext } from 'react-hook-form';
import { FormValidationContext } from '../GenericForm/FormContext';
import { billingAddressSchema } from 'src/schemas/formSchemas/BillingAddressSchema';
import { GiftCertificateBillingAddressProps } from './GiftCertificateBillingAddress.type';
import { DEFAULT_IS_FULLWIDTH, IS_FULLWIDTH } from 'constants/alignment';
import {
  BILLING_ADDRESS_FIELDS_MAXLENGTH,
  BILLING_ADDRESS_ZIPCODE_MAXLENGTH,
} from 'constants/query-config';

const GiftCertificateBillingAddress = (props: GiftCertificateBillingAddressProps) => {
  const {
    fields: { States },
    params,
  } = props || {};
  const { t } = useTranslate();
  const {
    register,
    formState: { errors },
  } = useFormContext();
  const { addValidationSchema } = useContext(FormValidationContext);
  const IsFullWidth = params?.IsFullWidth || DEFAULT_IS_FULLWIDTH;
  useEffect(() => {
    addValidationSchema(billingAddressSchema);
  }, []);
  const formItemRowClasses = classNames('align-items-baseline pb-3');
  const formLabelColumnClasses = classNames('text-end d-none d-sm-block');
  return (
    <div
      className={classNames({
        'container p-0': IsFullWidth !== IS_FULLWIDTH,
      })}
    >
      <Form.Group className="my-3" controlId="registrationForm">
        <Row className="justify-content-center align-items-center">
          <Col xl={9}>
            <Row className={formItemRowClasses}>
              <Col xs={3} className={formLabelColumnClasses}>
                <Form.Label className="text-nowrap">
                  <span className="text-danger pe-1">*</span>
                  {t('GiftCertificateBillingAddress_FirstName')}
                </Form.Label>
              </Col>
              <Col xs={12} sm={8}>
                <Form.Control
                  {...register('billingAddress.firstname')}
                  placeholder={t('GiftCertificateBillingAddress_FirstName')}
                  type="text"
                  className="w-100"
                  maxLength={BILLING_ADDRESS_FIELDS_MAXLENGTH}
                />
              </Col>
              <Col xs={1}>
                {(errors?.billingAddress as FieldErrors)?.firstname && (
                  <TooltipContent
                    message={(errors?.billingAddress as FieldErrors)?.firstname?.message as string}
                  ></TooltipContent>
                )}
              </Col>
            </Row>
          </Col>
          <Col xl={9}>
            <Row className={formItemRowClasses}>
              <Col xs={3} className={formLabelColumnClasses}>
                <Form.Label className="text-nowrap">
                  <span className="text-danger pe-1">*</span>
                  {t('GiftCertificateBillingAddress_LastName')}
                </Form.Label>
              </Col>
              <Col xs={12} sm={8}>
                <Form.Control
                  {...register('billingAddress.lastname')}
                  placeholder={t('GiftCertificateBillingAddress_LastName')}
                  type="text"
                  className="w-100"
                  maxLength={BILLING_ADDRESS_FIELDS_MAXLENGTH}
                />
              </Col>
              <Col xs={1}>
                {(errors?.billingAddress as FieldErrors)?.lastname && (
                  <TooltipContent
                    message={(errors?.billingAddress as FieldErrors)?.lastname?.message as string}
                  ></TooltipContent>
                )}
              </Col>
            </Row>
          </Col>
          <Col xl={9}>
            <Row className={formItemRowClasses}>
              <Col xs={3} className={formLabelColumnClasses}>
                <Form.Label className="text-nowrap">
                  {t('GiftCertificateBillingAddress_Company')}
                </Form.Label>
              </Col>
              <Col xs={12} sm={8}>
                <Form.Control
                  {...register('billingAddress.company')}
                  placeholder={t('GiftCertificateBillingAddress_Company')}
                  type="text"
                  className="w-100"
                  maxLength={BILLING_ADDRESS_FIELDS_MAXLENGTH}
                />
              </Col>
              <Col xs={1}>
                {(errors?.billingAddress as FieldErrors)?.company && (
                  <TooltipContent
                    message={(errors?.billingAddress as FieldErrors)?.company?.message as string}
                  ></TooltipContent>
                )}
              </Col>
            </Row>
          </Col>
          <Col xl={9}>
            <Row className={formItemRowClasses}>
              <Col xs={3} className={formLabelColumnClasses}>
                <Form.Label className="text-nowrap">
                  <span className="text-danger pe-1">*</span>
                  {t('GiftCertificateBillingAddress_Address')}
                </Form.Label>
              </Col>
              <Col xs={12} sm={8}>
                <Form.Control
                  {...register('billingAddress.address')}
                  placeholder={t('GiftCertificateBillingAddress_Address')}
                  type="text"
                  className="w-100"
                  maxLength={BILLING_ADDRESS_FIELDS_MAXLENGTH}
                />
              </Col>
              <Col xs={1}>
                {(errors?.billingAddress as FieldErrors)?.address && (
                  <TooltipContent
                    message={(errors?.billingAddress as FieldErrors)?.address?.message as string}
                  ></TooltipContent>
                )}
              </Col>
            </Row>
          </Col>
          <Col xl={9}>
            <Row className={formItemRowClasses}>
              <Col xs={3} className={formLabelColumnClasses}>
                <Form.Label className="text-nowrap">
                  {t('GiftCertificateBillingAddress_ApartmentSuite')}
                </Form.Label>
              </Col>
              <Col xs={12} sm={8}>
                <Form.Control
                  {...register('billingAddress.apartmentSuite')}
                  placeholder={t('GiftCertificateBillingAddress_ApartmentSuite')}
                  type="text"
                  className="w-100"
                  maxLength={BILLING_ADDRESS_FIELDS_MAXLENGTH}
                />
              </Col>
              <Col xs={1}>
                {(errors?.billingAddress as FieldErrors)?.apartmentSuite && (
                  <TooltipContent
                    message={
                      (errors?.billingAddress as FieldErrors)?.apartmentSuite?.message as string
                    }
                  ></TooltipContent>
                )}
              </Col>
            </Row>
          </Col>
          <Col xl={9}>
            <Row className={formItemRowClasses}>
              <Col xs={3} className={formLabelColumnClasses}>
                <Form.Label className="text-nowrap">
                  <span className="text-danger pe-1">*</span>
                  {t('GiftCertificateBillingAddress_City')}
                </Form.Label>
              </Col>
              <Col xs={12} sm={8}>
                <Form.Control
                  {...register('billingAddress.city')}
                  placeholder={t('GiftCertificateBillingAddress_City')}
                  type="text"
                  className="w-100"
                  maxLength={BILLING_ADDRESS_FIELDS_MAXLENGTH}
                />
              </Col>
              <Col xs={1}>
                {(errors?.billingAddress as FieldErrors)?.city && (
                  <TooltipContent
                    message={(errors?.billingAddress as FieldErrors)?.city?.message as string}
                  ></TooltipContent>
                )}
              </Col>
            </Row>
          </Col>
          <Col xl={9}>
            <Row className={formItemRowClasses}>
              <Col xs={3} className={formLabelColumnClasses}>
                <Form.Label className="text-nowrap">
                  <span className="text-danger pe-1">*</span>
                  {t('GiftCertificateBillingAddress_State')}
                </Form.Label>
              </Col>
              <Col xs={12} sm={8}>
                <Form.Select
                  {...register('billingAddress.state')}
                  placeholder={t('GiftCertificateBillingAddress_StatePlaceholder')}
                  className="w-100"
                >
                  <option selected value="">
                    {t('GiftCertificateBillingAddress_StatePlaceholder')}
                  </option>
                  {States.map((item, index: number) => (
                    <option key={index} value={item?.fields?.Name?.value}>
                      {item?.fields?.Name?.value}
                    </option>
                  ))}
                </Form.Select>
              </Col>
              <Col xs={1}>
                {(errors?.billingAddress as FieldErrors)?.state && (
                  <TooltipContent
                    message={(errors?.billingAddress as FieldErrors)?.state?.message as string}
                  ></TooltipContent>
                )}
              </Col>
            </Row>
          </Col>
          <Col xl={9}>
            <Row className={formItemRowClasses}>
              <Col xs={3} className={formLabelColumnClasses}>
                <Form.Label className="text-nowrap">
                  <span className="text-danger pe-1">*</span>
                  {t('GiftCertificateBillingAddress_Zip')}
                </Form.Label>
              </Col>
              <Col xs={12} sm={8}>
                <Form.Control
                  {...register('billingAddress.zip')}
                  placeholder={t('GiftCertificateBillingAddress_Zip')}
                  type="text"
                  className="w-100"
                  maxLength={BILLING_ADDRESS_ZIPCODE_MAXLENGTH}
                />
              </Col>
              <Col xs={1}>
                {(errors?.billingAddress as FieldErrors)?.zip && (
                  <TooltipContent
                    message={(errors?.billingAddress as FieldErrors)?.zip?.message as string}
                  ></TooltipContent>
                )}
              </Col>
            </Row>
          </Col>
        </Row>
      </Form.Group>
    </div>
  );
};

export default GiftCertificateBillingAddress;
