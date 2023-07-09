import * as yup from 'yup';

export const ethereumAddressValidationSchema = yup.object().shape({
  address: yup.string().required(),
  organization_id: yup.string().nullable().required(),
});
