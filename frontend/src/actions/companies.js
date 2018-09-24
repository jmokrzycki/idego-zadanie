export const setCompanies = companies => ({
  type: "SET_COMPANIES",
  companies
});

export const addCompany = company => ({
  type: "ADD_COMPANY",
  company
});

export const updateForm = (key, value) => ({
  type: "UPDATE_COMPANY_FORM",
  key,
  value
});
